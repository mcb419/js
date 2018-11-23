# MCB 419 javascript files

<h3><a href="https://mcb419.github.io/js/mplot.js">mplot.js</a> - simple matlab-like plotting</h3>
- figure
- gcf, gca
- plot
- xlabel, ylabel
- xlim, ylim
- xticks, yticks
- onclick functionality

<h3><a href="https://mcb419.github.io/js/rand.js">rand.js</a> - a seedable random number generator</h3>

uses LCG if the user specifies a seed, otherwise uses Math.random (faster)

- **rand()**     return uniform random number in [0, 1)
- **seed(val)**  sets the seed and starts using LCG algorithm
- **seed()**     returns the current seed value
- **unseed()**   switches back to unseeded mode, starts using Math.random();
- **isSeeded()** returns seeded status (true/false)

<h2><a href="https://mcb419.github.io/js/util.js">util.js</a> - useful utilities</h2>

- **arange([start,] stop, [step=1])** creates an array of evenly spaced values
  - the stop point is NOT included
  - arange(5) returns [0, 1, 2, 3, 4]
  - arange(6, 10) returns [6, 7, 8, 9]
  - arange(0, 3, 0.5) returns [0, 0.5, 1.0, 1.5, 2.0, 2.5]
- **assert(condition, message)** throws and error if condition is not satisfied
- **f2t(num, [places=2])** float-to-text conversion, non-integers truncated to "places" decimal places
- **hist(data, bins)** computes histogram counts in specified bins (display with plot(counts, bins, 'b|')
  - data is an array of data points
  - bins is an array of lower bin edges, equally spaced
  - returns {counts, bins, underflow, overflow}
- **linespace(start, stop, N=50, endpt = true)** creates an array of N evenly spaced numbers
  - the stop point IS included by default
  - linspace(0, 5, 5) returns [0, 1.25, 2.5, 3.75, 5]
  - linspace(0, 5, 5, false) returns [0, 1, 2, 3, 4]
  - linspace(0, 5, 6) returns [0, 1, 2, 3, 4, 5]
  
