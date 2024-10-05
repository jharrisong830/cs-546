//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import {returnValidString, getBooks, isNumber} from "./helpers.js";


const getBookById = async (id) => {
    id = returnValidString(id); // check that id exists, is a string, and then trim it
    if (id.length === 0) { // check for empty string after trimming 
        throw "Error: id is an empty string.";
    }

    const bookData = await getBooks(); // get the book data
    let filteredByID = bookData.filter((bookObj) => bookObj["id"] === id); // filter the results by the given id string
    if (filteredByID.length === 0) { // throw error if no matching ids are found
        throw "Error: book not found."
    }
    return filteredByID[0]; // assuming ids are unique???
};

const booksByPageCount = async (min, max) => {
    isNumber(min); // check for valid numbers (throws otherwise)
    isNumber(max);
    if (max % 1 !== 0 || min % 1 !== 0) { // check that both are integers
        throw "Error: min and max must be integers.";
    }
    if (max <= 0 || min < 0) { // check that min is positive and that max is greater than 0
        throw "Error: max must be greater than 0, and min must be positive.";
    }
    if ((max - min) <= 0) { // check that max is greater than min
        throw "Error: max must be greater than min.";
    }

    const bookData = await getBooks();
    let filteredByPageCount = bookData.filter((bookObj) => bookObj["pageCount"] >= min && bookObj["pageCount"] <= max); // only return books where pageCount is within the min and max (inclusive)
    filteredByPageCount = filteredByPageCount.map((bookObj) => bookObj["id"]);
    return filteredByPageCount;
};

const sameYear = async (year) => {
    isNumber(year); // check valid number
    if (year % 1 !== 0) { // check that year is an integer
        throw "Error: year must be a whole number.";
    }
    if (year < 1900 || year > 2024) { // check that year is in the assumed valid year range
        throw "Error: invalid year (must be in range [1900, 2024] inclusive).";
    }

    const bookData = await getBooks();
    let filteredByPublicationYear = bookData.filter((bookObj) => {
        let [month, day, checkYear] = bookObj["publicationDate"].split("/"); // extract pub date components
        let pubYear = parseInt(checkYear); // get the year
        return pubYear === year; // return true if book is published in the target year
    });
    return filteredByPublicationYear;
};

const minMaxPrice = async () => {
    const bookData = await getBooks();
    let minPrice = bookData.reduce((prev, curr) => Math.min(prev, curr["price"]), Number.MAX_VALUE); // find the min price
    let maxPrice = bookData.reduce((prev, curr) => Math.max(prev, curr["price"]), Number.MIN_VALUE); // find the max price
    let minIds = bookData.filter((bookObj) => bookObj["price"] === minPrice).map((bookObj) => bookObj["id"]); // get ids that match the min/max price
    let maxIds = bookData.filter((bookObj) => bookObj["price"] === maxPrice).map((bookObj) => bookObj["id"]);
    return {"cheapest": minIds, "mostExpensive": maxIds};
};

const searchBooksByPublisher = async (publisher) => {
    publisher = returnValidString(publisher); // check and trim!
    const bookData = await getBooks();
    let filteredByPublishers = bookData.filter((bookObj) => bookObj["publisher"] === publisher).map((bookObj) => bookObj["id"]); // get all of the book ids that match the publisher
    if (filteredByPublishers.length === 0) { // throw error if the publisher is not found in the dataset
        throw "Error: no such publisher exists.";
    }
    return filteredByPublishers;
};



export {getBookById, booksByPageCount, sameYear, minMaxPrice, searchBooksByPublisher};