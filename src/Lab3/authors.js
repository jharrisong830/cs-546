//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

import {returnValidString, isNumber, getAuthors, states} from "./helpers.js";
import {getBookById} from "./books.js";

const getAuthorById = async (id) => {
    id = returnValidString(id); // check that id exists, is a string, and then trim it
    if (id.length === 0) { // check for empty string after trimming 
        throw "Error: id is an empty string.";
    }

    const authorData = await getAuthors(); // get the author data
    let filteredByID = authorData.filter((authObj) => authObj["id"] === id); // filter the results by the given id string
    if (filteredByID.length === 0) { // throw error if no matching ids are found
        throw "Error: author not found."
    }
    return filteredByID[0]; // assuming ids are unique???
};

const searchAuthorsByAge = async (age) => {
    isNumber(age); // check that age is valid
    if (age < 1 || age > 100 || age % 1 !== 0) { // check valid age values (1 -> 100, integer)
        throw "Error: invalid age (must be integer in [1, 100], inclusive).";
    }

    const authorData = await getAuthors(); // get the author data
    const yearInMs = 1000 * 60 * 60 * 24 * 365;
    let now = new Date();
    let filteredByAge = authorData.filter((authObj) => {
        let [month, day, year] = authObj["date_of_birth"].split("/"); // extract birthdate components
        let birthday = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // make date object from data (months are 0-indexed)
        let roundedAgeInYears = Math.floor((now.getTime() - birthday.getTime()) / yearInMs); // convert the difference from ms -> years
        return roundedAgeInYears >= age; // return true if the authors age >= the target age
    }).map((authObj) => `${authObj["first_name"]} ${authObj["last_name"]}`); // transform each obj to be 'firstName lastName'
    if (filteredByAge.length === 0) { // throw error if no authors are found
        throw "Error: no results found.";
    }
    return filteredByAge;
};

const getBooksByState = async (state) => {
    state = returnValidString(state).toUpperCase(); // check that state exists, is a string, and then trim it/convert to uppercase
    if (state.length !== 2 || !states.includes(state)) { // check that the state code is valid (2 chars & in the states array)
        throw "Error: invalid state provided";
    }

    const authorData = await getAuthors();
    let filteredByState = // list of all ids of books from a given state
        authorData.filter((authObj) => authObj["HometownState"] === state) // get authors from the matching state
                  .map((authObj) => authObj["books"]) // get the list of book ids from each of the filtered authors
                  .flat(); // merge all of the ids
    for (let i = 0; i < filteredByState.length; i++) {
        let bookObj = await getBookById(filteredByState[i]); // get the book object for each id
        filteredByState[i] = bookObj["title"]; // and extract the title
    }
    return filteredByState;
};

const searchAuthorsByHometown = async (town, state) => {
    town = returnValidString(town); // check for valid strings
    state = returnValidString(state);
    if (state.length !== 2 || !states.includes(state)) { // check that the state code is valid (2 chars & in the states array)
        throw "Error: invalid state provided";
    }

    const authorData = await getAuthors();
    let filteredByHometown = // list of all names of authors from a given state/town pair
        authorData.filter((authObj) => authObj["HometownState"] === state && authObj["HometownCity"] === town); // get authors from the matching state & town
    filteredByHometown.sort((obj1, obj2) => obj1["last_name"].localeCompare(obj2["last_name"])); // sorts by last name
    filteredByHometown = filteredByHometown.map((authObj) => `${authObj["first_name"]} ${authObj["last_name"]}`); // transform each obj to be 'firstName lastName'
    return filteredByHometown;
};

const getAuthorBooks = async (authorid) => {
    const authorObj = await getAuthorById(authorid); // this will get the author at this id, and do all of the error checking for us!!!
    let authorBooks = authorObj["books"]; // get the list of book ids
    for (let i = 0; i < authorBooks.length; i++) {
        let bookObj = await getBookById(authorBooks[i]); // get the book object for each id
        authorBooks[i] = bookObj["title"]; // and extract the title
    }
    return authorBooks;
};



export {getAuthorById, searchAuthorsByAge, getBooksByState, searchAuthorsByHometown, getAuthorBooks};
