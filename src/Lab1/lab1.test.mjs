import * as lab1 from './lab1.mjs';


// questionOne
console.log(lab1.questionOne(0)); // should be 0
console.log(lab1.questionOne(1)); // should be 1
console.log(lab1.questionOne(6)); // should be 8
console.log(lab1.questionOne(10)); // should be 55
console.log(lab1.questionOne(11)); // should be 89



// questionTwo
console.log(lab1.questionTwo([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // should be false except 2, 3, 5, 7
console.log(lab1.questionTwo([])); // should be {}
console.log(lab1.questionTwo()); // should be {}
console.log(lab1.questionTwo([69, 0, 1, -5])); // should be all false lol
console.log(lab1.questionTwo([2, 3, 5, 7, 11, 13, 420])); // should be all true except 420 lol



// questionThree (sorry i copied these from the writeup, I wasn't coming up with my own examples lol)
console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// returns and then outputs: {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}
console.log(lab1.questionThree("How now brown cow!!!"));
// returns and then outputs: {consonants: 10, vowels: 4, numbers: 0, spaces: 3, punctuation: 3, specialCharacters: 0}
console.log(lab1.questionThree("One day, the kids from the neighborhood carried my mother's groceries all the way home. You know why? It was out of respect."));
// returns and then outputs: {consonants: 61, vowels: 36, numbers: 0, spaces: 22, punctuation: 5, specialCharacters: 0}
console.log(lab1.questionThree("CS 546 is going to be fun & I'm looking forward to working with you all this semester!!" )); 
// returns and then outputs: {consonants: 40, vowels: 23, numbers: 3, spaces: 17, punctuation: 3, specialCharacters: 1}
console.log(lab1.questionThree("")); 
// returns and then outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}




// questionFour
console.log(lab1.questionFour([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])); // should be [1]
console.log(lab1.questionFour([1, '1', 2, '2', 3, '3'])); // should be [1, '1', 2, '2', 3, '3'] (unchanged) 
console.log(lab1.questionFour([3, 3, 2, 2, 1, 1])); // should be [3, 2, 1]
console.log(lab1.questionFour([])); // should be []
console.log(lab1.questionFour()); // should be []

