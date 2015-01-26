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
      expect(map.has("test").to.equal(false));
   });
   it('lookup should return the value stored in that key', function() {
      map.add("test",5);
      expect(map.lookup("test").to.equal(5));
   });
   it('lookup should throw an error if the key does not exist', function() {
      expect(function() { map.lookup("notThere"); }).to.throw(Error);
   });
   it('add should add the key-value pair to the map and return `theMap`', function() {
      var result = map.add("test2",10);
      expect(map.lookup("test2").to.equal(10));
      expect(result).to.be.a('object');
   });
   it('add should throw an error if the key already exists', function() {
      expect(function() { map.add("test2"); }).to.throw(Error);
   });
   it('update should update the value associated with the key', function() {
      map.update("test2",2);
      expect(map.lookup("test2").to.equal(2));
   });
   it('update should return `theMap` to allow chaining', function() {
      var result2 = map.update("test2",3);
      expect(result2).to.be.a('object');
   });
   it('update if the key does not already exist in the map, it should throw an error', function() {
      expect(function() { map.update("test3"); }).to.throw(Error);
   });
   it('remove should remove the pair stored in that key', function() {
      expect(map.has("test2").to.equal(true));
      map.remove("test2");
      expect(map.has("test2").to.equal(false));
   });
   it('remove should throw an error if the key does not exist in the map', function() {
      expect(function() { map.remove("test3"); }).to.throw(Error);
   });
});