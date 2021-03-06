# MCB 419 javascript libraries

If needed for your MCB 419 assignment, you can include the libraries listed below by adding them to your html header like this:

```html
<head>
...
<script src="https://mcb419.github.io/js/util.js"></script>
...
</head>
```

You need to add a separate line for each library that you want to include; just edit the filename (e.g., util.js), everything else stays the same.

Here are the libraries that you can choose from:

<div style="background-color: gainsboro">
<h3><a href="https://mcb419.github.io/js/convnet.js">convnet.js</a> - convolution neural networks</h3>
</div>

library for building and training deep neural nets
by Andrej Karpathy<br>
[1d regression demo](demos/convnet_1d_regression/)  
[Karpathy demos and docs](https://cs.stanford.edu/people/karpathy/convnetjs/)

<div style="background-color: gainsboro">
<h3><a href="https://mcb419.github.io/js/mplot.js">mplot.js</a> - some simple matlab-like plotting capabilities</h3>
</div>

[demo - general mplot functionality](demos/mplot_demo.html)  
[demo - histogramming](demos/rand_demo.html)


The following are implemented
- **figure(num, [opts])** set current figure, creates it if it does not exist (num=1,2,...)<br>
looks for (or creates) \<canvas id="fig1"\> tag in html<br>
example opts: {width: 600px, height: 400px, bgcolor: 'lightCyan'}
- **gca**  global variable, current axis (javascript object)
- **gcf**  global variable, fig id (string matching id of canvas: "fig1", "fig2", etc.)
- **plot([xdata,], ydata, [style])** - plots the data<br> 
style examples: 'b-' (blue line), 'ro-' (red line with open points), 'k|' (black bars)

- **xlabel, ylabel(text)**  dd axis labels
- **xlim, ylim(min, max)** set axis limits; also ylim([min, max])
- **xticks, yticks(min, max, step)** sets ticks and turns off autoranging
- **gca.onclick** method for click functionality

<div style="background-color: gainsboro">
<h3><a href="https://mcb419.github.io/js/rand.js">rand.js</a> - a seedable random number generator</h3>
</div>

(NOTE: you won't need rand.js if you're using the P5 library, which has it's own random number generator)

rand.js uses the [LCG algorithm](https://en.wikipedia.org/wiki/Linear_congruential_generator)
if the user specifies a seed, and uses Math.random() otherwise

[demo - histogram random numbers](demos/rand_demo.html)

- **randi(a, b)** returns random integers in [a, b) 
- **randf(a, b)** returns random floats in [a, b) 
- **randn(std=1)** returns normally distributed numbers
- **rand()** returns random floats in [0, 1) 
- **seed(val)**  sets the seed and starts using LCG algorithm
- **seed()**     returns the current seed value
- **unseed()**   switches back to unseeded mode, starts using Math.random();
- **isSeeded()** returns seeded status (true/false)

<div style="background-color: gainsboro">
<h3><a href="https://mcb419.github.io/js/recurrent.js">recurrent.js</a> - recurrent neural networks</h3>
</div>

library for building and training recurrent neural nets (RNNs and LSTMs)
by Andrej Karpathy

[demos and documentation](https://github.com/karpathy/recurrentjs)


<div style="background-color: gainsboro">
<h3><a href="https://mcb419.github.io/js/sprintf.js">sprintf.js</a> - formatted output</h3>
</div>

javascript version of sprintf for generating formatted output

[documentation](https://www.npmjs.com/package/sprintf-js)


<div style="background-color: gainsboro">
<h3><a href="https://mcb419.github.io/js/util.js">util.js</a> - other useful utilities</h3>
</div>

- **arange([start,] stop, [step=1])** creates an array of evenly spaced values
  - the stop point is NOT included
  - arange(5) returns [0, 1, 2, 3, 4]
  - arange(6, 10) returns [6, 7, 8, 9]
  - arange(0, 3, 0.5) returns [0, 0.5, 1.0, 1.5, 2.0, 2.5]
- **assert(condition, message)** throws and error if condition is not satisfied
- **f2t(num, [places=2])** float-to-text conversion, non-integers truncated to "places" decimal places
- **hist(data, bins)** computes histogram counts in specified bins
  - bins is an array of lower bin edges, equally spaced
  - returns {counts, bins, underflow, overflow}
- **linspace(start, stop, N=50, endpt = true)** creates an array of N evenly spaced numbers
  - the stop point IS included by default
  - linspace(0, 5, 5) returns [0, 1.25, 2.5, 3.75, 5]
  - linspace(0, 5, 5, false) returns [0, 1, 2, 3, 4]
  - linspace(0, 5, 6) returns [0, 1, 2, 3, 4, 5]
  
