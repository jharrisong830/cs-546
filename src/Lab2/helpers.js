let isNumber = (val) => {
  // throws an error if val is not of valid type 'number'
  if (val === undefined || typeof val !== 'number' || isNaN(val)) {
    throw 'Error: invalid number.';
  }
};

let isArray = (arr) => {
  // throws an error if arr is not of type 'array'
  if (arr === undefined || !Array.isArray(arr)) {
    throw 'Error: not an array.';
  }
};




let returnValidString = (str) => {
  // throws an error if a string parameter is not defined or is not a string, otherwise, returns a trimmed version of the string
  if (str === undefined || typeof str !== 'string') {
    throw "Error: invalid string.";
  }
  return str.trim();
};


let isPalindrome = (str) => {
  // helper to determine if a string is a palindrome
  str = str.toLowerCase(); // set the string to be all lowercase
  
  let i = 0;
  let j = str.length - 1;

  while (i < j) {
    if (str[i].match(/[a-z]|[0-9]/) === null) { // change index and continue if a non-alphanumeric character is encountered
      i++;
      continue;
    }
    else if (str[j].match(/[a-z]|[0-9]/) === null) {
      j--;
      continue;
    }
    if (str[i] !== str[j]) return false; // return false if characters at opposite ends don't match
    i++; // otherwise...
    j--; // keep moving inwards and check the next set of characters
  }
  return true; // return true at the end (all opposite pairs of chars are equal, so the word is spelt the same reversed!)
};

let elemCount = (coll, elem) => {
  // given a collection and an element, returns the number of occurrences of that element
  let count = 0;
  for (let i = 0; i < coll.length; i++) {
    if (coll[i] === elem) count++;
  }
  return count;
}

let isIsogram = (str) => {
  // helper to determine if a string is an isogram
  str = str.toLowerCase(); // set the string to be all lowercase
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]|[0-9]/) === null) continue; // ignore non-alphanumeric characters
    if (elemCount(str, str[i]) !== 1) return false; // will return false if any character appears more than once
  }
  return true; // return true only if each character appears only once
};




let isObject = (obj) => {
  // throws an error if obj is not a proper object (arrays and null will throw)
  if (obj === undefined || typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
    throw "Error: invalid object.";
  }
};


export {isNumber, isArray, returnValidString, isPalindrome, isIsogram, isObject, elemCount};
