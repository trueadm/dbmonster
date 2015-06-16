
var im7 = (function() {
  "use strict";

  var vectorTree = {};
  var recordTree = {};

  //TODO add a DEV mode that lets the user know that they can only use im7 objects within im7 objects
  //except strings and numbers as these are already immutable. why? because im7 objects return
  //unique key (Symbol) on their toString() methods, allowing them have unique key indexes

  function getUniqueKey() {
    return Symbol();
  }

  function getVectorTreeEntry(entryPoint, key) {
    if(entryPoint === null) {
      entryPoint = vectorTree;
    }

    var id = key.toString();

    if(entryPoint[id] == undefined) {
      entryPoint[id] = {};
    }
    return entryPoint[id];
  };

  function getRecordTreeEntry(entryPoint, key, val) {
    var id = null;
    if(entryPoint === null) {
      entryPoint = recordTree;
    }

    if(val == null) {
      id = "null";
    } else {
      id = val.toString();
    }

    if(entryPoint[key] == undefined) {
      entryPoint[key] = {};
    }
    if(entryPoint[key][id] == undefined) {
      entryPoint[key][id] = {};
    }
    return entryPoint[key][id];
  };

  function Record(data) {
    var i = 0, key = null;

    for(key in data) {
      this[key] = data[key];
    }

    this._key = getUniqueKey();
    this._type = "Record";
  };

  Record.prototype.toString = function() {
    return this._key;
  }

  function ImmutableVector(data) {
    var i = 0,
        l = data.length;

    for(; i < l; ++i) {
      this[i] = data[i];
    }

    this.length = l;
    this._key = getUniqueKey();
    this._type = "ImmutableVector";
  }

  ImmutableVector.prototype.toString = function() {
    return this._key;
  }

  function im7(data) {
    var result = null, key = null, hash = "", entryPoint = null, i = 0, l = 0;

    //extremely fast method doing this
    if(data instanceof Array) {
      for(l = data.length; i < l; i++) {
        entryPoint = getVectorTreeEntry(entryPoint, data[i]);
      }

      if(entryPoint.end == undefined) {
        entryPoint.end = new ImmutableVector(data);
      }

      return entryPoint.end;
    } else {
      for(key in data) {
        entryPoint = getRecordTreeEntry(entryPoint, key, data[key]);
      }

      if(entryPoint.end == undefined) {
        entryPoint.end = new Record(data);
      }

      return entryPoint.end;
    }
  };

  return im7;

})();

if(typeof module != "undefined" && module.exports != null) {
  module.exports = im7;
}
