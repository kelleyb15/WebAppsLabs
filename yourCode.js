/*
 * Name 1: Brandon Kelley
 * Name 2: Johnny Seewer
 */

/*
 * BINARY SEARCH
 */
var binarySearch = function binarySearch(arr, val) {
   var lo, hi, mid;

   lo=0;
   hi=arr.length-1;
   mid=Math.floor((arr.length-1)/2);
   var acc=0;

   if (arr.length===0) {
      return false;
   }

   if (arr.length === 2) {
      if (arr[0]===val || arr[1] === val) {
         return true;
      }
      return false;
   }

   while (acc < 1000) {
      if (val===arr[mid]) {
         return true;
      }

      if (arr[mid] > val) {
         hi=mid;
         mid=Math.floor(hi/2);
      }

      if (arr[mid] < val) {
         lo=mid;
         mid=hi-Math.floor((hi-lo)/2);
      }

      if (hi-lo===1||hi===lo) {
         return false;
      }
      acc+=1;
   }
   console.log("don't get here");
};

/*
 * COUNTING TAGS
 */
var countTags = function countTags(items) {
   var tagCounts = {};
   var tags;

   for (var i = 0; i < items.length; i++) {
      tags=items[i].tags;

      if (Array.isArray(tags)) {
         for (var j = 0; j < tags.length; j++) {

            if (tagCounts.hasOwnProperty(tags[j])) {
               tagCounts[tags[j]]++;
            }

            else {
               tagCounts[tags[j]]=1;
            }
         }
      }
   }

   return tagCounts;
};

/*
 * EXTRACT HASHTAGS
 */
var extractHashTags = function extractHashTags(str) {
   var r = /#\w+/g;

   for (var i = Things.length - 1; i >= 0; i--) {
      Things[i]
   };
   return str.match(r);

};
