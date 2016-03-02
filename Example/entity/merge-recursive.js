var MergeRecursive = function(){
}

function mergeRecursive(obj1, obj2){
    for (var p in obj2) {
        try {
          // Property in destination object set; update its value.
          if ( obj2[p].constructor==Object ) {
            obj1[p] = mergeRecursive(obj1[p], obj2[p]);

          } else {
            obj1[p] = obj2[p];

          }

        } catch(e) {
          // Property in destination object not set; create it and set its value.
          obj1[p] = obj2[p];

        }
      }

      return obj1;
}

MergeRecursive.prototype.merge = function(obj1, obj2) {
  return mergeRecursive(obj1, obj2);
}

module.exports = MergeRecursive;