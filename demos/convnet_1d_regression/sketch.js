var itick;
var paused;

var xtrain, ytrain;      // training data
var net, trainer;        // neural net and trainer
var neval = 0;           // number of evaluations so far
var avloss = 0;          // average loss from last set of evaluation
var lossHistory = {neval:[], avloss:[], msec:[]}; // for plotting
var chosenLayer = 2;     // layer id that we would like to display

if (document.readyState === 'complete') {
    setup();
} else {
document.addEventListener('DOMContentLoaded', function () {
    document.removeEventListener('DOMContentLoaded', arguments.callee, false);
    setup();
  }, false);
}

function setup() {
  
  // load the text box with network specification
  select('#specs').value = 
    `let layer_defs = [];
layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:1});
layer_defs.push({type:'fc', num_neurons:6, activation:'tanh'});
layer_defs.push({type:'regression', num_neurons:1});

net = new convnetjs.Net();
net.makeLayers(layer_defs);

trainer = new convnetjs.SGDTrainer(net, {method:'sgd', learning_rate:0.01, momentum:0.1, batch_size:1, l2_decay:0.001});
`;
  
  // setup figures
  figure(1, {width:700, height:500});
  xlabel('input');
  ylabel('output');
  xticks(-10, 10, 10);
  yticks(-8, 8, 8);
  // add mouse click functionality
  gca().onclick = function (x,y) {
    // add a data point when mouse is clicked in canvas
    xtrain.push([x]);
    ytrain.push([y]);
    draw();
  }
  
  figure(2, {width:350, height:250});
  xlabel('evaluations');
  ylabel('log10(average loss)');
  
  figure(3, {width:350, height:250});
  xlabel('evaluations');
  ylabel('msec per tick');
  
  // make data
  regen_data(); // make training data
  
  // reset simulation
  reset();
}

function reset() {
  itick = 0;
  neval = 0;
  lossHistory = {neval:[], avloss:[], msec:[]};
  // load network from textbox
  eval(select('#specs').value);
  drawLayerButtons();
  stop();
}

function update() {
  // forward prop the data
  itick++;
  let numPts = xtrain.length;
  let numIters = 500;
  avloss = 0.0;
  var input = new convnetjs.Vol(1, 1, 1);
  let tstart = performance.now();
  for (let iters = 0; iters < numIters; iters++) {
    let idx = randi(numPts);
    input.w = xtrain[idx];
    var stats = trainer.train(input, ytrain[idx]);
    neval++;
    avloss += stats.loss;
  }
  avloss /= numIters;
  let dt = performance.now() - tstart;
  lossHistory.neval.push(neval);
  lossHistory.avloss.push(avloss);
  lossHistory.msec.push(dt);
}

function draw() {

  // checkbox status
  var draw_neuron_outputs = select('#layer_outs').checked;

  // update unless paused or finished
  if (!paused) {
    setTimeout(draw, 1000/30);
    const stopEval = 50000;
    if(neval >= stopEval){
      console.log(`stopping after ${stopEval} evaluations`);
      paused = true;
    } else {
      update();
    }
  }

  // draw background
  var layerOutput = [];
  for (let i=0; i<net.layers[chosenLayer].out_depth; i++) layerOutput.push([]); // init one empty array per neuron
  var netx = new convnetjs.Vol(1, 1, 1);
  let xplt = linspace(-9, 9, 100);
  let yplt = [];
  let xin = new convnetjs.Vol(1, 1, 1);
  for (let i = 0; i < xplt.length; i++) {
    xin.w[0] = xplt[i];
    let yout = net.forward(xin);
    yplt.push(yout.w[0]);
    if (draw_neuron_outputs) {
      for (let i=0; i<net.layers[chosenLayer].out_depth; i++) {
      layerOutput[i].push(net.layers[chosenLayer].out_act.w[i]);
      }
    }
  }
  figure(1);
  clf();
  plot(xtrain, ytrain, 'ko');
  plot(xplt, yplt, 'k-');
  if (draw_neuron_outputs) {
    let choices = ['r-', 'g-', 'b-', 'c-', 'm-', 'i-'];
    var nchoices = choices.length;
    for (let i = 0; i < layerOutput.length; i++) {
      plot(xplt, layerOutput[i], choices[i % nchoices]);
    }
  }
  
  gtext('num evaluations: ' + neval, -9, 7.5, 'b');
  gtext('average loss: ' + avloss.toFixed(6), -9, 7.0, 'b');

  figure(2);
  clf();
  plot(lossHistory.neval, lossHistory.avloss.map(x => Math.log10(x)));
  
  figure(3);
  clf();
  plot(lossHistory.neval, lossHistory.msec, 'g-');
}

function drawLayerButtons() {
  // redraw the layer buttons based on the new network specification
  let bdiv = select('#layer_buttons');
  bdiv.innerHTML = ''; // clear the button div
  for (var i = 1; i < net.layers.length - 1; i++) { // ignore input and regression layers (first and last)
    let bid = 'button' + i;
    let bval = net.layers[i].layer_type;
    let b = document.createElement(bval)
    b.setAttribute('id', bid);
    b.setAttribute('class', 'layerButton');
    b.setAttribute('onclick', 'updateLayerButtons(' + i + ')');
    b.style.bgcolor =  'white';
    bdiv.appendChild(b);
  }
  // highlight the button for the layer we want to view (chosenLayer)
  select('#button' + chosenLayer).style.bgcolor =  'gainsboro';
}

function updateLayerButtons(layerNum) {
  for (let i = 1; i < net.layers.length - 1; i++) {
    select('#button' + i).style.bgcolor =  'white'; // erase highlight
  }
  chosenLayer = layerNum;
  select('#button' + chosenLayer).style.bgcolor =  'gainsboro';
  draw();
}

function regen_data() {
  let numPts = +select('#npts').value; // plus sign makes it a number
  xtrain = [];
  ytrain = [];
  for (let i = 0; i < numPts; i++) {
    let x = randf(-5, 5);
    let y = x * Math.sin(x);
    xtrain.push([x]);
    ytrain.push([y]);
  }
  reset();
}

function run() {
  paused = false;
  draw();
}

function stop() {
  paused = true;
  draw();
}

function singleStep() {
  paused = true;
  update();
  draw();
}