import {returnValidString, isArray, isPalindrome, isIsogram} from "./helpers.js";


let swapChars = (string1, string2) => {
  let s1 = returnValidString(string1);
  let s2 = returnValidString(string2);

  if (s1.length < 4 || s2.length < 4) {
    throw "Error: invalid amount of characters (< 4).";
  }
  
  return `${s2.slice(0, 4)}${s1.slice(4)} ${s1.slice(0, 4)}${s2.slice(4)}`; // s2[:4] + s1[4:] + " " + s1[:4] + s2[4:] (i miss python)
};

let longestCommonSubstring = (str1, str2) => {
  let s1 = returnValidString(str1);
  let s2 = returnValidString(str2);

  if (s1.length < 5 || s2.length < 5) {
    throw "Error: invalid amount of characters (< 5).";
  }

  let lcsLen = 0; // length of longest common substring
  let currString = ""; // the current longest common substring (stored in case of ties)
  let lcsMap = {}; // object of `${ind1},${ind2}` -> lenOfSubstring, where ind1 and ind2 are the end indexes (inclusive) in the respective strings (ind1 - lcsLen -> start of substring)

  for (let i = 0; i < s1.length; i++) {
    for (let j = 0; j < s2.length; j++) {
      if (s1[i] === s2[j]) { // if the current characters are equal...
        if (i === 0 || j === 0) { // if at the start of either string... 
          lcsMap[`${i},${j}`] = 1; // length if at the start of either string is 1
        }
        else { // otherwise...
          lcsMap[`${i},${j}`] = 1 + lcsMap[`${i - 1},${j - 1}`]; // length is 1 + length of lcs at the previous positions
        }
        if (lcsMap[`${i},${j}`] > lcsLen) { // if our new result is larger than the current result...
          lcsLen = lcsMap[`${i},${j}`]; // update the current length and the result string accordingly
          currString = s1.slice(i - (lcsLen - 1), i + 1); // currString = s1[i - (lcsLen - 1) : i + 1] (since i is inclusive in lcsMap)
        }
      }
      else lcsMap[`${i},${j}`] = 0; // if characters are not the same, set the length of the current substring to be 0
    }
  }

  return currString;
};

let palindromeOrIsogram = (arrStrings) => {
  isArray(arrStrings); // check that the array is valid
  if (arrStrings.length < 2) {
    throw 'Error: invalid array supplied.';
  }
  let trimmedStrings = arrStrings.map((str) => returnValidString(str)); // checks that each element is a string, and trims each string
  trimmedStrings.forEach((str) => {
    if (str.length === 0) {
      throw "Error: invalid amount of characters (empty string).";
    }
  });

  let ans = {};
  for (let i = 0; i < trimmedStrings.length; i++) { // check if each string is a palindrome/isogram, and place it in the object accordingly
    let pal = isPalindrome(trimmedStrings[i]);
    let iso = isIsogram(trimmedStrings[i]);

    if (pal && iso) ans[arrStrings[i]] = "Both";
    else if (pal) ans[arrStrings[i]] = "Palindrome";
    else if (iso) ans[arrStrings[i]] = "Isogram";
    else ans[arrStrings[i]] = "Neither";
  }

  return ans; // return the object!
};



export {swapChars, longestCommonSubstring, palindromeOrIsogram};