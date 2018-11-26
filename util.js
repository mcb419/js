//===========================================================
// util.js: arange, assert, f2t, hist, linspace
//===========================================================

/* global exports */

(function (target) { // target is 'window' (browser) or 'exports' (node.js)

  function arange() {
    // return an array of evenly spaced values
    // usage: arange([start,] stop, [step])
    // values are generated in [start, stop)
    // examples:
    // arange(6) returns [0, 1, 2, 3, 4, 5]
    // arange(6, 10) returns [6, 7, 8, 9]
    // arange(0, 2, 0.5) returns [0, 0.5, 1.0, 1.5]

    let args = arguments;
    let nargs = args.length;
    var start, stop, step;

    if (nargs === 1) {
      start = 0;
      stop = args[0];
      step = 1;
    } else if (nargs === 2) {
      start = args[0];
      stop = args[1];
      step = 1;
    } else if (nargs === 3) {
      start = args[0];
      stop = args[1];
      step = args[2];
    } else {
      throw new Error('arange: invalid arguments');
    }

    let a = [];
    for (let i = start; i < stop; i += step) a.push(i);
    return a;
  }

  function assert(condition, message) {
    if (!condition) {
      message = message || 'Assertion failed';
      throw new Error(message);
    }
  }

  function f2t(x, places = 2) {
    // float to text conversion
    let power10 = Math.pow(10, places);
    return '' + Math.round(x * power10) / power10;
  }

  function hist(data, bins) {
    // data is an array of data points
    // bins is an array of lower bin edges, equally spaced
    let underflow = 0;
    let overflow = 0;
    let counts = bins.map(() => 0); // array of zeros, same size as bins
    let bmin = bins[0];
    let bwidth = bins[1] - bins[0];
    let bmax = bins[0] + bins.length * bwidth;

    for (let i = 0; i < data.length; i++) {
      if (data[i] < bmin) {
        underflow++;
      } else if (data[i] > bmax) {
        overflow++;
      } else {
        let idx = Math.floor((data[i] - bmin) / bwidth);
        counts[idx]++;
      }
    }
    return {
      counts,
      bins,
      underflow,
      overflow
    };
  }

  function linspace(x1, x2, n = 50, endpt = true) {
    // return an array of n evenly spaced values
    // usage: linspace(x1, x2, [n=50], [endpt=true])
    // by default the endpt is included, values in [start, stop]
    // call with endpt = false to exclude endpoint
    // examples: 
    // linspace(0, 5, 5) returns [0, 1.25, 2.5, 3.75, 5.0]
    // linspace(0, 5, 6) returns [0, 1, 2, 3, 4, 5]
    // linspace(0, 5, 5, false) returns [0, 1, 2, 3, 4]

    let a = [];
    if (endpt) {
      if (n < 2) throw new Error('linspace: invalid n');
      let step = (x2 - x1) / (n - 1);
      for (let i = 0; i <= (n - 1); i++)a.push(x1 + i * step);
    } else {
      if (n < 1) throw new Error('linspace: invalid n');
      let step = (x2 - x1) / n;
      for (let i = 0; i < n; i++) a.push(x1 + i * step);
    }
    return a;
  }
  target.arange = arange;
  target.assert = assert;
  target.f2t = f2t;
  target.hist = hist;
  target.linspace = linspace;

})(typeof window !== 'undefined' ? window : exports); // browser or node.js