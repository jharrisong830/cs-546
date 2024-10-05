// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const returnValidString = (str) => {
    // throws an error if a string parameter is not defined or is not a string, otherwise, returns a trimmed version of the string
    if (str === undefined || typeof str !== 'string') {
        throw "Error: invalid string.";
    }
    return str.trim();
};

const checkIfEmpty = (str) => {
    // throws an error if a strings length is 0 (empty string), otherwise, nothing will happen!
    if (str.length === 0) throw "Error: empty string.";
};


const months30 = [9, 4, 6, 11];
const months31 = [1, 3, 5, 7, 8, 10, 12];

const valiDate = (dateStr) => {
    // assumes dateStr is a valid, defined, trimmed, non-empty string, will throw if the string is in an invalid date format
    let dateSplit = dateStr.split("/");
    if (dateSplit.length !== 3) throw "Error: invalid date format (expected mm/dd/yyyy)";
    let [month, day, year] = dateSplit;
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);
    if (year > 2024 || year < 1000) throw "Error: you time traveled too far (invalid year)";
    if (month < 1 || month > 12) throw "Error: month doesn't exist";
    if (day < 1) throw "Error: can't have day < 1";
    else if (month === 2 && day > 28) throw "Error: can't have more than 28 days in month 2 (Feb.)";
    else if (months30.includes(month) && day > 30) throw "Error: can't have more than 30 days in the given month";
    else if (months31.includes(month) && day > 31) throw "Error: can't have more than 31 days in the given month";
    
    let today = new Date();
    let givenDate = new Date(year, month - 1, day); // check if date is in the future
    if ((today.getTime() - givenDate.getTime()) < 0) throw "Error: date is in the future";
    // if we've reached this point, our date is valid!
};


export {returnValidString, checkIfEmpty, valiDate};