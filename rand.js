// seedable pseudo-random number generation
// https://en.wikipedia.org/wiki/Linear_congruential_generator
// rand(), seed(), unseed(), isSeeded()

class LCG {

  constructor() {
    const m = 4294967296;
    this._seed = (Math.random() * m) >>> 0; // default seed
    this.z = this._seed;
  }

  next() {
    // define the recurrence relationship
    // returns a float in [0, 1); 
    const m = 4294967296;
    const a = 1664525;
    const c = 1013904223;
    this.z = (a * this.z + c) % m;
    return this.z / m; 
  }
  
  get seed() {
    return this._seed;
  }

  set seed(val) {
    this._seed = val >>> 0;
    this.z = this._seed;
  }
  
}


// make a random number generator
// use LCG if the user specified a seed,
// otherwise use Math.random because it is faster
//
// rand()     return uniform random number in [0, 1)
// seed(#)    sets the seed and starts using LCG algorithm
// seed()     returns the seed
// unseed()   switches back to unseeded mode using Math.random();
// isSeeded() returns seeded status (true/false)

var _lcg = new LCG();
var _isSeeded = false;
var rand = function() {
  return _isSeeded ? _lcg.next() : Math.random();
};
var isSeeded = function() {return _isSeeded;};
var unseed = function() {
  _isSeeded = false;
};
var seed = function(val) {
  if (val == null) {
    return _lcg.seed; // return the current seed
  } else {
    _isSeeded = true;
    _lcg.seed = val;
  }
};

function randi(a, b) {
  // randi() returns 0 or 1
  // randi(a) returns random interger in [0, a)
  // randi(a, b) return random integers in [a, b)
  if (a == null) return Math.floor(2 * rand()); // 0 or 1
  if (b == null) return Math.floor(a * rand());
  return Math.floor(a + (b - a) * rand());
}

function randf(a, b) {
  // randf() returns a random float in [0, 1)
  // randf(a) returns a random float in [0, a)
  // randf(a, b) returns a random float in [a, b)
  if (a == null) return rand();
  if (b == null) return a * rand();
  return a + (b - a) * rand();
}

function randn(std) {
  // randn() returns random gaussian with mean 0, std 1
  // randn(std) returns zero-mean random gaussian with std
  if (std == null) std = 1.0;
  if (this.cached) {
    this.cached = false;
    return this.cachedValue;
  }
  let u = 2 * rand() - 1;
  let v = 2 * rand() - 1;
  let r = u * u + v * v;
  if (r === 0 || r > 1) return randn(std);
  let c = Math.sqrt(-2 * Math.log(r) / r);
  this.cachedValue = v * c * std; // cache this
  this.cached = true;
  return u * c * std;
}
