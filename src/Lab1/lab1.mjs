export const questionOne = (index) => {
  // question 1: calculates the fibonacci number at a given index
  if (index == 0 || index == 1) {
    return index; // base case
  }
  else {
    return questionOne(index - 1) + questionOne(index - 2); // else, return the sum of the previous two fibonacci numbers 
  }
};

export const questionTwo = (arr) => {
  // question 2: return an object mapping each element in the array to a boolean value, whether it is prime or not
  let ans = {}; // object to store mapping of nums -> primality
  if (arr == [] || arr == undefined) {
    return ans; // return empty obj for [] or undef.
  }

  arr.forEach((num) => { // for each num...
    if (num <= 1) {
      ans[num] = false; // numbers 1 or below are not prime
    }
    else {
      let prime = true;
      for (let i = 2; i <= Math.sqrt(num); i++) { // up to sqrt(num)
        if (num % i == 0) { // if some i evenly divides num (i.e. no remainder)...
          prime = false; // then set this number as prime!
          break;
        }
      }
      ans[num] = prime; // set tbe value in the object
    }
  });
  return ans;
};

export const questionThree = (str) => {
  // question 3: return an object of counts of the number of consonants, vowels, numbers, spaces, punctuation, and special characters in the given string
  let counts = { // initial object
    "consonants": 0,
    "vowels": 0,
    "numbers": 0,
    "spaces": 0,
    "punctuation": 0,
    "specialCharacters": 0
  };
  if (str == "" || str == undefined) { // return all 0's if empty string
    return counts;
  }

  const vowels = ["a", "e", "i", "o", "u"]; // some arrays of the character types
  const cons = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
  const puncs = [".", ",", "\'", "\"", ";", ":", "!", "?", "-", "–", "…", "(", ")", "[", "]", "{", "}"];
  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  str = str.toLowerCase(); // set to lowercase to make my life easier lol
  for (let i = 0; i < str.length; i++) { // for each char in the string
    let currCharVal = str.charAt(i); // check if it belongs to any of the above defined arrays, and increment the count accordingly
    if (vowels.includes(currCharVal)) {
      counts["vowels"]++;
    }
    else if (cons.includes(currCharVal)) {
      counts["consonants"]++;
    }
    else if (puncs.includes(currCharVal)) {
      counts["punctuation"]++;
    }
    else if (nums.includes(currCharVal)) {
      counts["numbers"]++;
    }
    else if (str.charAt(i) == " ") { // increment if we find a space
      counts["spaces"]++;
    }
    else { // if no other cases match, we have a special character 
      counts["specialCharacters"]++;
    }
  }
  return counts;
};

export const questionFour = (arr) => {
  // question 4: returns a new array with no duplicated values
  if (arr == [] || arr == undefined) {
    return [];
  }
  let ans = [] // new array, without duplicates
  arr.forEach((elem) => { // for each original array element...
    if (!ans.includes(elem)) { // ...add it to the new array if it is not already present in the new array
      ans.push(elem);
    }
  });
  return ans;
};




// I pledge my honor that I have abided by the Stevens Honor System.
export const studentInfo = {
  firstName: 'John',
  lastName: 'Graham',
  studentId: '20006581'
};
