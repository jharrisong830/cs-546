import { Router } from "express";
import reviewData from "../data/reviews.js";
import productData from "../data/products.js";

import { checkObjectId, returnValidString, checkIfEmpty, validateReviewParams, validateRating } from "../helpers.js";


const router = Router();

router
    .route('/:productId')
    .get(async (req, res) => {
        try {
            req.params.productId = checkObjectId(req.params.productId); // validate product id
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const allReviews = await reviewData.getAllReviews(req.params.productId); // get all reviews for this product
            if (allReviews.length === 0) { // if no reviews, then respond with 404
                return res.status(404).json({error: "No reviews found for this product."});
            }
            return res.json(allReviews);
        } catch (e) { // product not found, respond with 404
            return res.status(404).json({error: e});
        }
    })
    .post(async (req, res) => {
        const newReviewData = req.body;
        if (!newReviewData || Object.keys(newReviewData).length === 0) { // respond with 400 if no data is supplied
            return res.status(400).json({error: "Error: Empty POST request body."});
        }
        else if (Object.keys(newReviewData).length > 4) { // respond with 400 if an extra field is provided (body should have only have 4 properties)
            return res.status(400).json({error: "Error: extra fields provided."});
        }
        try {
            validateReviewParams( // check all of the review params using helper (no need to use the returned object)
                newReviewData.title,
                newReviewData.reviewerName,
                newReviewData.review,
                newReviewData.rating);
        } catch (e) { // respond with 400 if there are any issues with the data
            return res.status(400).json({error: e});
        }
        try { // time to actually insert!
            const {
                title,
                reviewerName,
                review,
                rating} = newReviewData;
            await reviewData.createReview(req.params.productId, title, reviewerName, review, rating); // add the review
            const productReviewed = await productData.get(req.params.productId); // get the product that was just reviewed
            return res.json(productReviewed); // return the updated product!
        } catch (e) { // 404 if review cannot be added (bc product does not exist)
            return res.status(404).json({error: e});
        }
    });

router
    .route('/review/:reviewId')
    .get(async (req, res) => {
        try {
            req.params.reviewId = checkObjectId(req.params.reviewId); // validate review id
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const currReview = await reviewData.getReview(req.params.reviewId); // try to get the review with given id, and return it
            return res.json(currReview);
        } catch (e) { // respond with 404 if the review isn't found
            return res.status(404).json({error: e});
        }
    })
    .patch(async (req, res) => {
        try {
            req.params.reviewId = checkObjectId(req.params.reviewId); // validate review id
        } catch (e) {
            return res.status(400).json({error: e});
        }

        const updateReviewData = req.body;
        if (!updateReviewData || Object.keys(updateReviewData).length === 0) { // respond with 400 if no data is supplied
            return res.status(400).json({error: "Error: Empty POST request body."});
        }
        else if (Object.keys(updateReviewData).length > 4) { // respond with 400 if an extra field is provided (body should have only have 4 properties)
            return res.status(400).json({error: "Error: extra fields provided."});
        }
        try { // validation time!
            Object.keys(updateReviewData).forEach((field) => {
                if (field === "title" || field === "reviewerName" || field === "review") { // for any of the string fields...
                    updateReviewData[field] = returnValidString(updateReviewData[field]); // trim and validate
                    checkIfEmpty(updateReviewData[field]);
                }
                else if (field === "rating") {
                    validateRating(updateReviewData[field]); // check for a proper rating
                }
                else { // improper field
                    throw "Error: invalid field supplied in request body.";
                }
            });
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const currProduct = await reviewData.updateReview(req.params.reviewId, req.body); // pass in the review id and validated body to use in the update
            return res.json(currProduct); // return the newly reviewed product!
        } catch (e) { // error means review not found, respond with 404
            return res.status(404).json({error: e});
        }
    })
    .delete(async (req, res) => {
        try {
            req.params.reviewId = checkObjectId(req.params.reviewId); // validate review id
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const currProduct = await reviewData.removeReview(req.params.reviewId); // try to remove the review
            return res.json(currProduct); // return the product without the review
        } catch (e) { // respond with 404 (review not found)
            return res.status(404).json({error: e});
        }
    });



export default router;
