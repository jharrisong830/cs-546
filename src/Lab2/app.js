import * as arrayUtils from "./arrayUtils.js";
import * as stringUtils from "./stringUtils.js";
import * as objectUtils from "./objectUtils.js";

console.log(arrayUtils.arrayPartition([1, 2, 3, 4, 5], (num) => num % 2 == 0)); // returns [[2, 4], [1, 3, 5]]
console.log(arrayUtils.arrayPartition([10, 15, 20, 25, 30], (num) => num > 18)) // returns [[20, 25, 30], [10, 15]]
try {
    console.log(arrayUtils.arrayPartition([1, 2, 3, 4, 5])); // error!
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.arrayPartition(1, (num) => num === 1)); // error!
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.arrayPartition([1, 2, 3, 4, 5], 2)); // error!
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.arrayPartition()); // error!
} catch (e) {
    console.log(e);
}



console.log(arrayUtils.arrayShift([3, 4, 5, 6, 7], 3)); // returns [5, 6, 7, 3, 4]
console.log(arrayUtils.arrayShift(["Hello",true, 5,"Patrick","Goodbye"], 4)); // returns [true, 5, "Patrick", "Goodbye", "Hello"]
console.log(arrayUtils.arrayShift([1,2,3,4], -2)); // returns [3,4,1,2]
console.log(arrayUtils.arrayShift([7,8,9,10], 0)); // returns [7,8,9,10]
try {
    console.log(arrayUtils.arrayShift([7, 11, 15], 3.5)) // error!
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.arrayShift(2, 3)); // error!
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.arrayShift([1], 2)); // error!
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.arrayShift([1, 2], "hello")); // error!
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.arrayShift(1)); // error!
} catch (e) {
    console.log(e);
}


console.log(arrayUtils.matrixOne([[2,2,2],[2,0,2],[2,2,2]])); // returns [[2,1,2],[1,1,1],[2,1,2]] 
console.log(arrayUtils.matrixOne([[0,1,2,0],[3,5,4,2],[1,7,3,5]])); // returns [[1,1,1,1],[1,5,4,1],[1,7,3,1]] 
try {
    console.log(arrayUtils.matrixOne([[0,1,2,0],[3,5,4]])); // throws error
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.matrixOne([])); // throws error
} catch (e) {
    console.log(e);
}




console.log(stringUtils.swapChars("Patrick", "Hill")); //Returns "Hillick Patr"
console.log(stringUtils.swapChars("hello", "world")); //Returns "worlo helld"
try {
    console.log(stringUtils.swapChars("Patrick", "")); // throws error
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.swapChars()); // throws error
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.swapChars("John")); // throws error
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.swapChars ("h", "Hello")); // throws error
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.swapChars ("h","e")); // throws error
} catch (e) {
    console.log(e);
}




let str1 = "abcdxyz"; 
let str2 = "xyzabcd"; 
let commonSubstring = stringUtils.longestCommonSubstring(str1, str2); // Expected Result: "abcd"
console.log(commonSubstring); 
str1 = "programming"; 
str2 = "programmer"; 
commonSubstring = stringUtils.longestCommonSubstring(str1, str2); // Expected Result: "programm"
console.log(commonSubstring);
str1 = "abcdef"; 
str2 = "123456"; 
commonSubstring = stringUtils.longestCommonSubstring(str1, str2); // Expected Result: "" // No common substring in this case
console.log(commonSubstring);
str1 = "abcdef"; 
str2 = "acdfgh"; 
commonSubstring = stringUtils.longestCommonSubstring(str1, str2); // Expected Result: "cd"
console.log(commonSubstring);
try {
    console.log(stringUtils.longestCommonSubstring("", "")); // throws error! both strings must have len >= 5
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.longestCommonSubstring("", "         ")); // throws error! both strings must have len >= 5
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.longestCommonSubstring("        ", "         ")); // throws error! both strings must have len >= 5 (after trimming)
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.longestCommonSubstring("")); // throws error! both params must be defined
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.longestCommonSubstring(4, {})); // throws error! both params must be strings
} catch (e) {
    console.log(e);
}





const checkStrings = (["Madam", "Lumberjack", "He did, eh?", "Background", "Taco cat? Taco cat.", "Invalid String"]); 
const results = stringUtils.palindromeOrIsogram(checkStrings); 
console.log(results);
//returns and then logs: { "Madam": "Palindrome", "Lumberjack": "Isogram", "He did, eh?": "Palindrome", "Background": "Isogram", "Taco cat? Taco cat.": "Palindrome", "Invalid String": "Neither" }

const strings1 = ["level", "Racecar", "Palindrome", "Isogram"]; 
const results1 = stringUtils.palindromeOrIsogram(strings1); 
console.log(results1);
//returns and then outputs: { "level": "Palindrome", "Racecar": "Palindrome", "Palindrome": "Isogram", "Isogram": "Isogram" }

const strings2 = ["hello", "world", "Java", "Python"]; 
const results2 = stringUtils.palindromeOrIsogram(strings2); 
console.log(results2);
//returns and then outputs { "hello": "Neither", "world": "Isogram", "Java": "Neither", "Python": "Isogram" }

const strings3 = ["abba", "abcd", "Is it OK?", "No lemon, no melon", "a"]; 
const results3 = stringUtils.palindromeOrIsogram(strings3); 
console.log(results3);
//returns and then outputs { "abba": "Palindrome", "abcd": "Isogram", "Is it OK?": "Neither", "No lemon, no melon": "Palindrome", "a": "Both" }

try {
    console.log(stringUtils.palindromeOrIsogram()); // error! no array
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.palindromeOrIsogram(["hello!"])); // error! array of length < 2
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.palindromeOrIsogram(["hello!", "im gonna throw   ", "          ", "         "])); // error! empty strings after trimming
} catch (e) {
    console.log(e);
}




const arrayOfObjects1 = [ { a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 }, { x: 5, y: 10, z: 15 }, { p: -2, q: 0, r: 5, s: 3.5 }, ]; 
const statsResult1 = objectUtils.objectStats(arrayOfObjects1); 
console.log(statsResult1); // Expected Result:{ mean: 8.346, median: 10, mode: 15, range: 17, minimum: -2, maximum: 15, count: 13, sum: 108.5 }
const arrayOfObjects2 = [ { p: 10, q: 15, r: 20 }, { x: -5, y: 8, z: 10 }, { a: 5, b: 5, c: 5 }, ]; 
const statsResult2 = objectUtils.objectStats(arrayOfObjects2); 
console.log(statsResult2);// Expected Result:{ mean: 8.111, median: 8, mode: 5, range: 25, minimum: -5, maximum: 20, count: 9, sum: 73 }
const arrayOfObjects3 = [ { alpha: 3.5, beta: 7.2, gamma: 4.8 }, { x: 0, y: 0, z: 0 }, { p: -2, q: -8, r: -5 }, ]; 
const statsResult3 = objectUtils.objectStats(arrayOfObjects3); 
console.log(statsResult3); // Expected Result: { mean: 0.056, median: 0, mode: 0, range: 15.2, minimum: -8, maximum: 7.2, count: 9, sum: 0.5 }




const xobj1 = { key1: "value1", key2: { nestedKey: "nestedValue", arrayKey: [1, 2, 3], }, }; 
const xobj2 = { key1: "value1", key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4], }, key3: "newKey", }; 
const differences = objectUtils.nestedObjectsDiff(xobj1, xobj2); 
console.log(differences);
// Example Output:   { key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4], }, key3: "newKey" }

const yobj1 = { a: 1, b: { c: 2, d: [3, 4] }, e: "hello" }; 
const yobj2 = { a: 1, b: { c: 2, d: [3, 5] }, f: "world" }; 
const differences1 = objectUtils.nestedObjectsDiff(yobj1, yobj2); // Expected Result: { b: { d: [3, 5] }, e: undefined, f: "world" }
console.log(differences1);

const zobj3 = { x: { y: { z: 1 } } }; 
const zobj4 = { x: { y: { z: 1 } } }; 
const differences2 = objectUtils.nestedObjectsDiff(zobj3, zobj4); // Expected Result: {} // Both objects are identical, so no differences are found.
console.log(differences2);

try {
    objectUtils.nestedObjectsDiff({}, {"hi": 1}); // throws error, empty obj
} catch (e) {
    console.log(e);
}





const object1 = { a: 3, b: 7, c: "5" };
const object2 = { b: 2, c: "8", d: "4" };
const object3 = { a: 5, c: 3, e: 6 };
const resultMergedAndSummed = objectUtils.mergeAndSumValues(object1, object2, object3);
console.log(resultMergedAndSummed);
// Expected Result: { a: 8, b: 9, c: 16, d: 4, e: 6 }

const obj1 = { a: 1, b: 2, c: 3 }; 
const obj2 = { b: 3, c: 4, d: 5 }; 
const obj3 = { a: 2, c: 1, e: 6 }; 
const result1 = objectUtils.mergeAndSumValues(obj1, obj2, obj3); // Expected Result: { a: 3, b: 5, c: 8, d: 5, e: 6 }
console.log(result1);

const obj4 = { x: 10, y: 5, z: 3 }; 
const obj5 = { x: 5, y: 2, z: 7 }; 
const obj6 = { x: 3, y: 8, z: 1 }; 
const result2 = objectUtils.mergeAndSumValues(obj4, obj5, obj6); // Expected Result: { x: 18, y: 15, z: 11 }
console.log(result2);

const obj7 = { one: 15, two: 20 }; 
const obj8 = { one: 5, two: 10 }; 
const obj9 = { two: 5, three: 8 }; 
const result3 = objectUtils.mergeAndSumValues(obj7, obj8, obj9); // Expected Result: { one: 20, two: 35, three: 8 }
console.log(result3);

const obj10 = { a: 1, b: "2", c: 3 }; 
const obj11 = { b: 3, c: 4, d: 5 }; 
const obj12 = { a: 2, c: "hello", e: 6 }; 
try {
    const result4 = objectUtils.mergeAndSumValues(obj10, obj11, obj12); // Throws an error
} catch (e) {
    console.log(e);
}
