# MCB 419 javascript files

## mplot.js
## rand.js - a seedable random number generator
use LCG if the user specifies a seed, otherwise uses Math.random because it is faster
//
- rand()     return uniform random number in [0, 1)
- seed(val)  sets the seed and starts using LCG algorithm
- seed()     returns the current seed value
- unseed()   switches back to unseeded mode, starts using Math.random();
- isSeeded() returns seeded status (true/false)

## util.js
- arange([start,] stop, [step=1]) creates an array of evenly spaced values
  - the stop point is NOT included
  - arange(5) returns [0, 1, 2, 3, 4]
  - arange(6, 10) returns [6, 7, 8, 9]
  - arange(0, 3, 0.5) returns [0, 0.5, 1.0, 1.5, 2.0, 2.5]
- assert(condition, message) throws and error if condition isn't satisfied
- f2t(num, [places=2]) float-to-text conversion, non-integers truncated to "places" decimal places
- hist(data, bins) 
  - data is an array of data points
  - bins is an array of lower bin edges, equally spaced
  - returns {counts, bins, underflow, overflow}
- linespace(start, stop, npt=50, endpt = true) creates an array of evenly spaced numbers
  - the stop point is included by default
  - linspace(0, 5, 5) returns [0, 1.25, 2.5, 3.75, 5]
  - linspace(0, 5, 5, false) returns [0, 1, 2, 3, 4]
  - linspace(0,5, 6) returns [0, 1, 2, 3, 4, 5]
  
  
