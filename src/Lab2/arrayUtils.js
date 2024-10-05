/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import {isArray, isNumber} from "./helpers.js";


let arrayPartition = (arrayToPartition, partitionFunc) => {
  isArray(arrayToPartition); // check for valid array
  if (arrayToPartition.length < 2) {
    throw 'Error: invalid array supplied.';
  }
  if (partitionFunc === undefined || typeof partitionFunc !== 'function') { // check if the second arg exists and is a function
    throw 'Error: invalid partition function.'
  }

  let satisfy = arrayToPartition.filter((x) => partitionFunc(x)); // filter into two arrays, those that satisfy the partition function... 
  let others = arrayToPartition.filter((x) => !partitionFunc(x)); // and those that don't

  return [satisfy, others]; // return an array, containing partitioned subarrays
};

let arrayShift = (arr, n) => {
  isArray(arr); // check for valid array
  if (arr.length < 2) {
    throw 'Error: invalid array supplied.';
  }
  isNumber(n); // check for valid number
  if (n % 1 !== 0) throw 'Error: not an integer'; // make sure its an integer

  let actualShift = n % arr.length; // shifting by length is a full cycle (same array)
  let i = 0;
  let newArr = Array.from(arr); // create a copy of the original array
  if (actualShift < 0) actualShift += arr.length; // WHY DOESN'T JS DO MOD CORRECTLY LMAOOO
  
  while (i < arr.length) {
    newArr[(i + actualShift) % arr.length] = arr[i] // ith element has index of i + shift (wraps around to 0)
    i++;
  }

  return newArr;
};

let matrixOne = (matrix) => {
  isArray(matrix); // check for valid input
  let m = matrix.length;
  if (m === 0) throw 'Error: invalid matrix supplied.';

  matrix.forEach((row) => isArray(row)); // check that each subarray is a valid array, and that their lengths are equal
  let n = matrix[0].length;
  if (!matrix.every((row) => row.length === n)) throw 'Error: invalid matrix supplied.';
  matrix.forEach((row) => row.forEach((elem) => isNumber(elem))); // throw error if any element is not a number

  let rowsToMark = []; // keep track of which rows/cols to change
  let colsToMark = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) { // if any element in the matrix is 0, keep track of its row and column index
        if (!rowsToMark.includes(i)) rowsToMark.push(i);
        if (!colsToMark.includes(j)) colsToMark.push(j);
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rowsToMark.includes(i) || colsToMark.includes(j)) { // if the element is in a marked row or col, then change its value to 1
        matrix[i][j] = 1;
      }
    }
  }

  return matrix;
};


export {arrayPartition, arrayShift, matrixOne};
