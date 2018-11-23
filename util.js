//===========================================================
// utilities: arange, assert, f2t, hist, linspace
//===========================================================

function arange() {
  // return an array of evenly spaced values (python-like)
  // (see also: linspace, which is matlab-like)
  // usage: arange([start,] stop, [step])
  // values are generated in the half open interval [start, stop)

  let args = arguments;
  let nargs = args.length;

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
    throw new Error("arange: invalid arguments");
  }

  let a = [];
  for (let i = start; i < stop; i += step) a.push(i);
  return a;
}

function assert(condition, message) {
  if (!condition) {
    message = message || "Assertion failed";
    throw new Error(message);
  }
}

function f2t(x, places) {
  // float to text conversion
  if (arguments.length === 1) places = 2;
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

function linspace(x1, x2, n = 100) {
  // return an array of n evenly spaced values (matlab-like)
  // (see also: arange, which is python-like)
  //
  // usage: linspace(x1, x2, [n=100])
  // values are generated in the half open interval [start, stop)

  let a = [];
  if (n < 2) throw new Error('linspace: invalid n');
  let step = (x2 - x1) / (n - 1);
  for (let i = 0; i < n; i++) a.push(x1 + i * step);
  return a;
}
