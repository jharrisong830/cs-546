import { ObjectId } from "mongodb";
import { products } from "./config/mongoCollections.js";

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


/**
 * validates a given id string
 * @param {string} id 
 * 
 * @returns trimmed and validated id string
 * @throws if id is not a valid ObjectId
 */
const checkObjectId = (id) => {
    id = returnValidString(id);
    checkIfEmpty(id);
    if (!ObjectId.isValid(id)) throw "Error: invalid object ID supplied";
    return id;
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


/**
 * given all of the parameters of a product, validates them, and returns a basic product object 
 * @param {string} productName 
 * @param {string} productDescription 
 * @param {string} modelNumber 
 * @param {number} price 
 * @param {string} manufacturer 
 * @param {string} manufacturerWebsite 
 * @param {string[]} keywords 
 * @param {string[]} categories 
 * @param {string} dateReleased 
 * @param {boolean} discontinued 
 * 
 * @returns fully validated product object (NOTE: more processing needs to be done in terms of generating and setting an id, etc.)
 * @throws if any of the params are undefined or invalid
 */
const validateProductParams = (
    productName,
    productDescription,
    modelNumber,
    price,
    manufacturer,
    manufacturerWebsite,
    keywords,
    categories,
    dateReleased,
    discontinued
) => {
    productName = returnValidString(productName); // start of basic string validation (defined & emptiness)
    checkIfEmpty(productName);

    productDescription = returnValidString(productDescription);
    checkIfEmpty(productDescription);

    modelNumber = returnValidString(modelNumber);
    checkIfEmpty(modelNumber);

    manufacturer = returnValidString(manufacturer);
    checkIfEmpty(manufacturer);

    manufacturerWebsite = returnValidString(manufacturerWebsite);
    checkIfEmpty(manufacturerWebsite);
    if (!(manufacturerWebsite.startsWith("http://www.") && manufacturerWebsite.endsWith(".com"))) {
        throw "Error: website must be in form of http://www.<address>.com";
    }
    if (manufacturerWebsite.slice(11, -4).length < 5) {
        throw "Error: website address must have at least 5 characters";
    }

    dateReleased = returnValidString(dateReleased);
    checkIfEmpty(dateReleased);
    valiDate(dateReleased); // validate the date (like the function name??? lol), will throw if invalid

    if (price === undefined || typeof price !== 'number') throw "Error: price must be a number";
    if (price <= 0) throw "Error: price must be > 0"; // price validation (> 0 and only 2 digits after the decimal)
    let priceStrSplit = price.toString().split('.');
    if (priceStrSplit.length > 1 && priceStrSplit[1].length > 2) throw "Error: price must have at most 2 decimal digits";

    if (keywords === undefined || !Array.isArray(keywords)) throw "Error: keywords must be an array of strings";
    if (keywords.length < 1) throw "Error: empty keyword array";
    keywords = keywords.map((str) => returnValidString(str)); // transform all keywords to be valid strings...
    keywords.map((str) => checkIfEmpty(str)); // ...and check that none are empty after being trimmed

    if (categories === undefined || !Array.isArray(categories)) throw "Error: categories must be an array of strings";
    if (categories.length < 1) throw "Error: empty categories array";
    categories = categories.map((str) => returnValidString(str)); // transform all categories to be valid strings...
    categories.map((str) => checkIfEmpty(str)); // ...and check that none are empty after being trimmed

    if (discontinued === undefined || typeof discontinued !== 'boolean') throw "Error: discontinued must be a boolean";


    // error checking done!

    let newProduct = {
        "productName": productName,
        "productDescription": productDescription,
        "modelNumber": modelNumber,
        "price": price,
        "manufacturer": manufacturer,
        "manufacturerWebsite": manufacturerWebsite,
        "keywords": keywords,
        "categories": categories,
        "dateReleased": dateReleased,
        "discontinued": discontinued,
        "reviews": [], // set reviews to empty and avg. rating to 0
        "averageRating": 0
    };

    return newProduct;
};


/**
 * returns a basic string representation of today's date
 * @returns today's date in the form of 'mm/dd/yyyy'
 */
const todayString = () => {
    let today = new Date(); // setting up the date string

    let month = today.getMonth().toString();
    if (month.length === 1) month = '0' + month; // add 0 to the front if month is 1 digit

    let day = today.getDate().toString();
    if (day.length === 1) day = '0' + day;

    let year = today.getFullYear().toString();

    return `${month}/${day}/${year}`; // return string of 'mm/dd/yyyy'
};


/**
 * validates the given rating to make sure it is in the proper format
 * @param {number} rating 
 * 
 * @throws if rating is not a number, not in range 1-5, or has more than one decimal digit
 */
const validateRating = (rating) => {
    if (rating === undefined || typeof rating !== 'number' || rating === NaN) {
        throw "Error: must provide a number for rating (range 1-5, only one decimal place).";
    }
    if (rating < 1 || rating > 5) throw "Error: rating must be in range of 1-5.";
    let ratingStr = rating.toString().split('.'); // split by decimal place, to check that there is at most one decimal place
    if (ratingStr.length > 1 && ratingStr[1].length > 1) throw "Error: rating can have at most one digit in the tenths place.";
};


/**
 * given all of the parameters of a review, returns a basic review object, and generates a new object id
 * @param {string} title 
 * @param {string} reviewerName 
 * @param {string} review 
 * @param {number} rating 
 * 
 * @returns fully validated review object
 * @throws if any of the params are undefined or invalid
 */
const validateReviewParams = (
    title,
    reviewerName,
    review,
    rating
  ) => {
    title = returnValidString(title); // string error checking starts here
    checkIfEmpty(title);

    reviewerName = returnValidString(reviewerName);
    checkIfEmpty(reviewerName);

    review = returnValidString(review);
    checkIfEmpty(review);

    validateRating(rating); // validate the rating

    // error checking done!


    let newReview = { // return a fully validated review object, with the current date
        _id: new ObjectId(), // generate a new id for the object
        title: title,
        reviewDate: todayString(), // set review date as today's date
        reviewerName: reviewerName,
        review: review,
        rating: rating
    };

    return newReview;
};


/**
 * given a product id, updates the average rating value based on the currently published reviews
 * @param {string} id 
 * 
 * @throws if id is not valid, or if the product does not exist
 */
const recalculateRatings = async (id) => {
    id = checkObjectId(id);

    const productCollection = await products();
    let currProduct = await productCollection.findOne({_id: new ObjectId(id)}, {projection: {_id: 0, 'reviews.rating': 1}}); // we only want the ratings
    if (currProduct === null) throw "Error: no such product with given id.";

    let ratings = currProduct["reviews"].map((doc) => doc["rating"]); // extract from object, so we have a list of ratings (numbers) only 
    
    let avgRating = ratings.reduce((acc, curr) => acc + curr) / ratings.length; // calculate average rating (fixed, no longer rounds)
    await productCollection.updateOne({_id: new ObjectId(id)}, {$set: {averageRating: avgRating}}); // update!!
};


export {returnValidString, checkIfEmpty, valiDate, validateProductParams, validateReviewParams, todayString, validateRating, recalculateRatings, checkObjectId};
