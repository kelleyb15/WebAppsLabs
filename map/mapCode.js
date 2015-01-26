/*
 * Name 1: YourNameHere
 * Name 2: YourNameHere
 */

// Do not change the name of this function
var makeMap = function() {
// All your code will go inside this function
   // Use this object to store the key-value pairs:
   var storedPairs = {};

   // This object should contain the methods you want to expose:
   var o = {
      has: function(key) {
         return storedPairs.hasOwnProperty(key);
      },
      lookup: function(key) {
         var temp = o.has(key);
         if(temp === true) {
            return storedPairs[key];
         } else {
            throw new Error("Error: Method: lookup(); no key-value pair with key: " + key);
         }
      },
      add: function(key, value) {
         if(o.has(key)){
            throw new Error("Error: Method: add(); map already has key: " + key);
         } else {
            storedPairs[key] = value;
            return storedPairs;
         }
      },
      update: function(key, value) {
         if(o.has(key) === false){
            throw new Error("Error: Method: update(); map doesn't have key: " + key);
         } else {
            storedPairs[key] = value;
            return storedPairs;
         }
      },
      remove: function(key) {
         if(o.has(key) === false){
            throw new Error("Error: Method: remove(); map doesn't have key: " + key);
         } else {
            delete storedPairs[key];
         }
      }
   };

   // Add initialization code here

   // Add local functions here

   // Prepare the object o before returning it

   return o;
}

// Do NOT change anything below this line.
/*
 * To allow node.js to run our tests. DO NOT CHANGE!
 */
try {
   module.exports = {
      makeMap: makeMap
   };
} catch (e) {}
