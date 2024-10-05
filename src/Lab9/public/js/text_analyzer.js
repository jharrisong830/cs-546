const form = document.getElementById("main_form");
const textArea = document.getElementById("text_to_analyze");
const results = document.getElementById("text_output");
const error = document.getElementById("error"); // i did a separate element for errors instead of appending it to the output


/**
 * analyzes the given text
 * 
 * @param {string} text 
 */
const analyzer = (text) => {
    const ret = document.createElement("dl");

    const origHead = document.createElement("dt");
    origHead.innerHTML = "Original Input:";
    const origData = document.createElement("dd");
    origData.innerHTML = text;
    ret.appendChild(origHead);
    ret.appendChild(origData);

    // g flag -> global search (all matches), i flag -> ignore case
    const letters = /[a-z]/gi;
    const nonLetters = /[^a-z]/gi; // negate the above
    const vowels = /[aeiou]/gi;
    const consonants = /[bcdfghjklmnpqrstvwxyz]/gi; 

    const lettersHead = document.createElement("dt");
    lettersHead.innerHTML = "Total Number of Letters:";
    const lettersData = document.createElement("dd");
    const separatedLetters = [...text.matchAll(letters)]; // unpack the iterator with ...
    lettersData.innerHTML = separatedLetters.length.toString();
    ret.appendChild(lettersHead); 
    ret.appendChild(lettersData);

    const nonHead = document.createElement("dt");
    nonHead.innerHTML = "Total Number of Non-Letters:";
    const nonData = document.createElement("dd");
    const separatedNonletters = [...text.matchAll(nonLetters)];
    nonData.innerHTML = separatedNonletters.length.toString();
    ret.appendChild(nonHead); 
    ret.appendChild(nonData);

    const vowelHead = document.createElement("dt");
    vowelHead.innerHTML = "Total Number of Vowels:";
    const vowelData = document.createElement("dd");
    const separatedVowels = [...text.matchAll(vowels)];
    vowelData.innerHTML = separatedVowels.length.toString();
    ret.appendChild(vowelHead); 
    ret.appendChild(vowelData);

    const consHead = document.createElement("dt");
    consHead.innerHTML = "Total Number of Consonants:";
    const consData = document.createElement("dd");
    const separatedConsonants = [...text.matchAll(consonants)];
    consData.innerHTML = separatedConsonants.length.toString();
    ret.appendChild(consHead); 
    ret.appendChild(consData);


    const allWords = text.replace(nonLetters, " ").split(" ").filter((str) => str.length !== 0).map((str) => str.toLowerCase() ); 
    // remove all non-letters and replace with spaces, then split and convert to lowercase to get an array of all words!


    const wordHead = document.createElement("dt");
    wordHead.innerHTML = "Total Number of Words:";
    const wordData = document.createElement("dd");
    wordData.innerHTML = allWords.length.toString();
    ret.appendChild(wordHead); 
    ret.appendChild(wordData);

    const uniHead = document.createElement("dt");
    uniHead.innerHTML = "Total Number of Unique Words:";
    const uniData = document.createElement("dd");
    const uniqueWords = allWords.filter((str, ind) => !allWords.slice(ind + 1).includes(str)); // if array[ind + 1:] includes the current element, filter it out (counts only one instance)
    uniData.innerHTML = uniqueWords.length.toString();
    ret.appendChild(uniHead); 
    ret.appendChild(uniData);

    const longHead = document.createElement("dt");
    longHead.innerHTML = "Total Number of Long Words:";
    const longData = document.createElement("dd");
    const longWords = allWords.filter((str) => str.length >= 6); // count only words of length 6 or greater
    longData.innerHTML = longWords.length.toString();
    ret.appendChild(longHead); 
    ret.appendChild(longData);

    const shortHead = document.createElement("dt");
    shortHead.innerHTML = "Total Number of Short Words:";
    const shortData = document.createElement("dd");
    const shortWords = allWords.filter((str) => str.length <= 3); // count only words of length 3 or less
    shortData.innerHTML = shortWords.length.toString();
    ret.appendChild(shortHead); 
    ret.appendChild(shortData);


    return ret; // return the dl element to be added to the results
};


form.addEventListener("submit", (event) => {
    event.preventDefault();
    let textToAnalyze = textArea.value;

    if (error.textContent !== undefined && error.textContent !== null && error.textContent.length !== 0) { // clear the error on each submit
        error.textContent = ""; 
    }

    if (textToAnalyze === undefined || textToAnalyze === null || typeof textToAnalyze !== "string") {
        error.textContent = "Invalid input! Try again.";
    }
    else {
        textToAnalyze = textToAnalyze.trim();
        if (textToAnalyze.length === 0) {
            error.textContent = "Invalid input! Try again.";
        }
        else {
            results.append(analyzer(textToAnalyze)); // append the returned dl element to the children of the results div
        }
    }

    textArea.value = ""; // reset the input on each submit
});
