try {
   var chai = require('./../chai.js');
   var expect = chai.expect;
   var methods = require('./mapCode.js');
   var binarySearch = methods.binarySearch;
   var countTags = methods.countTags;
   var extractHashTags = methods.extractHashTags;
} catch (e) {}

function randomString(len) {
   var arr = [], caseRange, i;
   if (len == null) { len = 5; }
   for (i = 0; i < len; i += 1) {
      caseRange = [65, 97][Math.floor(Math.random() * 2)];
      arr.push(Math.floor(Math.random() * 26) + caseRange);
   }
   return String.fromCharCode.apply(String, arr);
}
// DO NOT CHANGE ANYTHING ABOVE THIS LINE

// Add your tests below

describe('Code for makeMap', function() {
   it('creates a new empty map', function() {
      var map = makeMap();
      expect(map).to.be.a('object')
   });
});

describe('Test for makeMap keys', function() {
   var map = makeMap();
   it('returns an object with methods has, lookup, add, update, remove', function() {
       ['has', 'lookup', 'add', 'update', 'remove'].forEach(function(key) {
           expect(map[key]).to.be.a('function');
       });
   });
});

describe('Test method functionalities', function() {
   var map = makeMap();
   it('has should return a boolean saying if your map has a key that equals the passed argument', function(){
      var key = randomString(5);
      expect(map.has(key)).to.equal(false);
   });
   it('lookup should return the value stored in that key', function() {
      var key = randomString(5);
      map.add(key,5);
      expect(map.lookup(key)).to.equal(5);
   });
   it('lookup should throw an error if the key does not exist', function() {
      expect(function() { map.lookup("notThere"); }).to.throw(Error);
   });
   it('add should add the key-value pair to the map and return `theMap`', function() {
      var key = randomString(5);
      var result = map.add(key,10);
      expect(map.lookup(key)).to.equal(10);
      expect(result).to.be.a('object');
   });
   it('add should throw an error if the key already exists', function() {
      var key = randomString(5);
      map.add(key,45);
      expect(function() { map.add(key); }).to.throw(Error);
   });
   it('update should update the value associated with the key', function() {
      var key = randomString(5);
      map.add(key,17);
      map.update(key,2);
      expect(map.lookup(key)).to.equal(2);
   });
   it('update should return `theMap` to allow chaining', function() {
      var key = randomString(5);
      map.add(key,21);
      expect(map.update(key,3)).to.be.a('object');
   });
   it('update if the key does not already exist in the map, it should throw an error', function() {
      var key = randomString(5);
      expect(function() { map.update(key); }).to.throw(Error);
   });
   it('remove should remove the pair stored in that key', function() {
      var key = randomString(5);
      map.add(key,20);
      expect(map.has(key)).to.equal(true);
      map.remove(key);
      expect(map.has(key)).to.equal(false);
   });
   it('remove should throw an error if the key does not exist in the map', function() {
      var key = randomString(5);
      expect(function() { map.remove(key); }).to.throw(Error);
   });
   it('a randomized set of pushes and pops should behave properly', function() {
      var iters = 10, steps = 200, iter, step;
      var noItems, randomNum, key, temp, map;
      var myArray = [];
      for (iter = 0; iter < 10; iter += 1) {
         map = makeMap();
         randomNum = Math.random();
         noItems = 0;
         for (step = 0; step < 200; step += 1) {
            key = randomString(5);
            myArray.push(key);
            if (Math.random() > 0.5) { // 50-50 do a push
               noItems += 1;
               map.add(key,Math.random());
            } else { // or do a pop
               if (noItems === 0) {
                  expect(function() { map.remove(myArray.pop()); }).to.throw(Error);
               }else {
                  if (map.has(key)) {
                     temp = myArray.pop();
                     map.remove(temp);
                     expect(map.has(temp)).to.equal(false);
                     noItems -= 1;
                  }
               }
            }
         }
      }
   });
});