//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.

import axios from "axios";


const returnValidString = (str) => {
  // throws an error if a string parameter is not defined or is not a string, otherwise, returns a trimmed version of the string
  if (str === undefined || typeof str !== 'string') {
    throw "Error: invalid string.";
  }
  return str.trim();
};


const isNumber = (val) => {
  // throws an error if val is not of valid type 'number'
  if (val === undefined || typeof val !== 'number' || isNaN(val)) {
    throw 'Error: invalid number.';
  }
};


const getAuthors = async () => {
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json");
    
    if (data === undefined || data === null) { // throw if invalid data is received/doesn't exist
        throw "Error: undefined or null data returned.";
    }
    
    return data; // extracts the author data from the object returned by axios
};


const states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];


const getBooks = async () => {
  const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json");
  
  if (data === undefined || data === null) { // throw if invalid data is received/doesn't exist
      throw "Error: undefined or null data returned.";
  }
  
  return data; // extracts the book data from the object returned by axios
};



export {returnValidString, isNumber, getAuthors, getBooks, states};
