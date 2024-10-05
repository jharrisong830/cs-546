import { returnValidString, checkIfEmpty, validateReviewParams, todayString, validateRating, recalculateRatings, checkObjectId } from "../helpers.js";
import { products } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import productData from "./products.js";


const createReview = async (
  productId,
  title,
  reviewerName,
  review,
  rating
) => {
    productId = checkObjectId(productId); // validate id
    await productData.get(productId); // make sure it exists

    let newReview = validateReviewParams(title, reviewerName, review, rating); // create a new review object and validate all of the fields

    const productCollection = await products();
    await productCollection.updateOne({_id: new ObjectId(productId)}, {$push: {reviews: newReview}}); // push the new review to the product's review arrow

    await recalculateRatings(productId); // call helper to update the average rating

    return newReview; // return the newly added review!!
};

const getAllReviews = async (productId) => {
    let currProduct = await productData.get(productId); // get the product (handles all validation)
    return currProduct["reviews"]; // return only the reviews (empty array if no reviews)
};

const getReview = async (reviewId) => {
    reviewId = checkObjectId(reviewId); // check for valid id

    const productCollection = await products();
    let reviewToReturn = await productCollection.findOne({'reviews._id': new ObjectId(reviewId)}, {projection: {_id: 0, 'reviews.$': 1}}); // search for id in the review subdocument
    if (reviewToReturn === null || reviewToReturn["reviews"].length !== 1) throw "Error: no such review with given ID"; // throw if not found
    return reviewToReturn["reviews"][0]; // return the review!
};

const updateReview = async (reviewId, updateObject) => {
    reviewId = checkObjectId(reviewId); // validate id
    await getReview(reviewId); // check that the review exists

    Object.keys(updateObject).forEach((field) => { // validation!!!
        if (field === "title" || field === "reviewerName" || field === "review") { // for any of the string fields...
            updateObject[field] = returnValidString(updateObject[field]); // trim and validate
            checkIfEmpty(updateObject[field]);
        }
        else if (field === "rating") {
            validateRating(updateObject[field]); // check for a proper rating
        }
        else {
            throw "Error: invalid field supplied in request body.";
        }
    });

    updateObject["reviewDate"] = todayString(); // set the date of update as current date


    let allKeys = Object.keys(updateObject); // update all fields to be in the form of 'reviews.$.<field>' for easier updating
    for (let i = 0; i < allKeys.length; i++) {
        updateObject[`reviews.$.${allKeys[i]}`] = updateObject[allKeys[i]];
        delete updateObject[allKeys[i]];
    }

    const productCollection = await products();
    await productCollection.updateOne( // making note for later bc i was confused by this lol
        {'reviews._id': new ObjectId(reviewId)}, // finds the review subdocument with matching id
        {$set: updateObject}); // updates found review object in the array ('reviews.$' is that element, set above)

    let currProduct = await productCollection.findOne({'reviews._id': new ObjectId(reviewId)}); // get the product where this review id is found in the reviews list
    if (Object.keys(updateObject).includes('reviews.$.rating')) { // update average rating if needed
        await recalculateRatings(currProduct['_id'].toString());
    }
    return await productData.get(currProduct['_id'].toString()); // return the updated product
};

const removeReview = async (reviewId) => {
    reviewId = checkObjectId(reviewId);
    await getReview(reviewId); // check that review exists

    const productCollection = await products();
    let currProduct = await productCollection.findOne({'reviews._id': new ObjectId(reviewId)}); // get the product where the review id is found in the reviews list
    await productCollection.updateOne(
        {_id: currProduct['_id']}, // from the current product...
        {$pull: {reviews: {_id: new ObjectId(reviewId)}}}); // remove the review with reviewId from the products reviews array

    await recalculateRatings(currProduct['_id'].toString()); // update the ratings
    return await productData.get(currProduct['_id'].toString()); // return the updated product
};


export default {createReview, getAllReviews, getReview, updateReview, removeReview};