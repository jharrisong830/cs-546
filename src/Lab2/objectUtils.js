import {isArray, isObject, isNumber, elemCount} from "./helpers.js";

let objectStats = (arrObjects) => {
  isArray(arrObjects); // check that arrObjects is an array
  arrObjects.forEach((obj) => { // will throw errors if any of the objects in the array are invalid
    isObject(obj); // check for proper object
    if (Object.keys(obj).length < 1) { // check that each object has at least one k/v pair
      throw "Error: empty object.";
    }
    Object.keys(obj).forEach((k) => isNumber(obj[k])); // check that each value in the object is a number
  });

  let allNums = [];
  arrObjects.forEach((obj) => Object.keys(obj).forEach((k) => allNums.push(obj[k]))); // collect all numbers
  allNums.sort((a, b) => a - b); // sort the items numerically (js defaults to sorting by string values WTF?????)

  let stats = {};

  stats["mean"] = Math.round((allNums.reduce((x, y) => x + y) / allNums.length) * 1000) / 1000;

  if (allNums.length % 2 === 0) {
    let medLoc = allNums.length / 2;
    stats["median"] = (Math.round((allNums[medLoc - 1] + allNums[medLoc]) / 2) * 1000) / 1000;
  }
  else {
    stats["median"] = Math.round(allNums[Math.floor(allNums.length / 2)] * 1000) / 1000
  }

  let counts = {}; // here we go...
  allNums.forEach((num) => { // gets the counts of each number, and puts it in the counts object
    if (!Object.keys(counts).includes(num)) counts[num] = elemCount(allNums, num);
  });
  let maxCount = Object.values(counts).reduce((x, y) => Math.max(x, y)); // gets the max of all the counts
  let modes = [];
  Object.keys(counts).forEach((num) => { // if a number's count is the max count, add it to the list of modes (and convert to a number)
    if (counts[num] === maxCount) modes.push(parseFloat(num));
  });
  if (modes.length === 1) { // single mode!
    stats["mode"] = modes[0];
  }
  else if (modes.length === allNums.length) { // no mode (all nums appear the same amount, mode = 0)
    stats["mode"] = 0;
  }
  else { // multiple modes
    modes.sort((a, b) => a - b); // sort the modes (lowest to highest)
    stats["mode"] = modes; // return the array as the modes
  }
  stats["range"] = allNums[allNums.length - 1] - allNums[0];
  stats["minimum"] = allNums[0];
  stats["maximum"] = allNums[allNums.length - 1];
  stats["count"] = allNums.length;
  stats["sum"] = Math.round(allNums.reduce((x, y) => x + y) * 1000) / 1000;

  return stats;
};

let nestedObjectsDiff = (obj1, obj2) => {
  isObject(obj1);
  isObject(obj2);
  if (Object.keys(obj1).length < 1 || Object.keys(obj2).length < 1) {
    throw "Error: empty object.";
  }

  // console.log(obj1);
  // console.log(obj2);

  let diff = {};
  Object.keys(obj1).forEach((k) => {
    if (Object.keys(obj2).includes(k)) {
      if (typeof obj1[k] !== typeof obj2[k]) { // different types -> put it in the diff
        diff[k] = obj2[k];
      } // btw i'm not checking the diff for objects inside of arrays, or function types. i'm not even sure how to do that lmao
      else if (typeof obj1[k] === 'number' && obj1[k] !== obj2[k]) { // if both numbers and not equal -> put it in the diff
        diff[k] = obj2[k];
      }
      else if (typeof obj1[k] === 'boolean' && !(obj1[k] && obj2[k])) { // if both booleans and oppsoite values -> put it in the diff
        diff[k] = obj2[k];
      }
      else if (typeof obj1[k] === 'string' && obj1[k] !== obj2[k]) { // different strings -> put it in the diffffffffffff
        diff[k] = obj2[k];
      }
      else if (Array.isArray(obj1[k]) && Array.isArray(obj2[k])) { // if both are arrays, we check if the arrays are the same
        if (obj1[k].length !== obj2[k].length) { // different lengths -> different arrays, lets get diffy
          diff[k] = obj2[k];
        }
        else {
          if (!obj1[k].every((elem, ind) => elem !== obj2[k][ind])) { // if some element is not equal to an element in obj2[k], then we add this to the diff
            diff[k] = obj2[k];
          }
        }
      }
      else if (typeof obj1[k] === 'object') {
        if (!(Object.keys(obj1[k]).length === 0 && Object.keys(obj2[k]).length === 0)) { // if both are not empty, then we need to check the diff between these two objects
          let nestedDiff = nestedObjectsDiff(obj1[k], obj2[k]);
          if (Object.keys(nestedDiff).length !== 0) { // if the diff isnt empty, then we're getting diffy with it
            diff[k] = nestedDiff;
          }
        } // at this point, either one or both have an empty diff
        else if (Object.keys(obj1[k]).length !== Object.keys(obj2[k]).length) { // if the objects have different amounts of keys, then they're different
          diff[k] = obj2[k];
        } // otherwise, there's no difference between these objects, so don't include this in the diff
      }
    }
    else { // if k doesn't exist in obj2, set it to undefined in the diff object
      diff[k] = undefined;
    }
  });
  Object.keys(obj2).forEach((newK) => { // add all of the keys present in obj2 that weren't in obj1 to the diff
    if (!Object.keys(obj1).includes(newK)) {
      diff[newK] = obj2[newK];
    }
  });
  return diff; // am i done?
};

let mergeAndSumValues = (...args) => {
  let result = {};
  args.forEach((arg) => { // iterate through all of the objects
    isObject(arg); // check for valid object
    if (Object.keys(arg).length < 1) { // check that the object isn't empty
      throw "Error: empty object.";
    }

    Object.keys(arg).forEach((k) => { // begin to merge each object into the result object
      let num = parseFloat(arg[k]); // convert to number (if needed)
      isNumber(num); // check to make sure we have a valid number
      if (Object.keys(result).includes(k)) { // if the key is already in results, then we sum...
        result[k] += num; 
      }
      else { // otherwise, add this k/v pair to the result
        result[k] = num;
      }
    });
  });

  return result;
};


export {objectStats, nestedObjectsDiff, mergeAndSumValues};
