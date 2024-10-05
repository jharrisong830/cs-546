import { Router } from "express";
import productData from "../data/products.js";

import { checkObjectId, validateProductParams } from "../helpers.js";


const router = Router();

router
    .route('/')
    .get(async (req, res) => {
        try {
            const allProducts = await productData.getAll();
            return res.json(allProducts);
        } catch (e) { // server error, send 500 response
            return res.status(500).json({error: e});
        }
    })
    .post(async (req, res) => {
        const newProductData = req.body;
        if (!newProductData || Object.keys(newProductData).length === 0) { // respond with 400 if no data is supplied
            return res.status(400).json({error: "Error: Empty POST request body."});
        }
        else if (Object.keys(newProductData).length > 10) { // respond with 400 if an extra field is provided (body should have only have 10 properties)
            return res.status(400).json({error: "Error: extra fields provided."});
        }
        try {
            validateProductParams( // check all of the product params using helper (no need to use the returned object)
                newProductData.productName,
                newProductData.productDescription,
                newProductData.modelNumber,
                newProductData.price,
                newProductData.manufacturer,
                newProductData.manufacturerWebsite,
                newProductData.keywords,
                newProductData.categories,
                newProductData.dateReleased,
                newProductData.discontinued);
        } catch (e) { // respond with 400 if there are any issues with the data
            return res.status(400).json({error: e});
        }
        try { // time to actually insert!
            const {
                productName,
                productDescription,
                modelNumber,
                price,
                manufacturer,
                manufacturerWebsite,
                keywords,
                categories,
                dateReleased,
                discontinued} = newProductData;
            const added = await productData.create(productName, productDescription, modelNumber, price, manufacturer, manufacturerWebsite, keywords, categories, dateReleased, discontinued);
            return res.json(added); // return the new product!
        } catch (e) {
            return res.status(400).json({error: e});
        }
    });

router
    .route('/:productId')
    .get(async (req, res) => {
        try {
            req.params.productId = checkObjectId(req.params.productId); // validate product id
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const currProduct = await productData.get(req.params.productId); // try to get the product with given id, and return it
            return res.json(currProduct);
        } catch (e) { // respond with 404 if the product isn't found
            return res.status(404).json({error: e});
        }
    })
    .delete(async (req, res) => {
        try {
            req.params.productId = checkObjectId(req.params.productId); // validate product id
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            await productData.remove(req.params.productId);
            return res.json({_id: req.params.productId, deleted: true}); // return a successful deletion response
        } catch (e) {
            return res.status(404).json({error: e}); // respond 404 if object could not be updated (object does not exist)
        }
    })
    .put(async (req, res) => {
        const updateProductData = req.body;
        if (!updateProductData || Object.keys(updateProductData).length === 0) { // respond with 400 if no data is supplied
            return res.status(400).json({error: "Error: Empty PUT request body."});
        }
        else if (Object.keys(updateProductData).length > 10) { // respond with 400 if an extra field is provided (body should have only have 10 properties)
            return res.status(400).json({error: "Error: extra fields provided."});
        }
        try {
            validateProductParams( // check all of the product params using helper (no need to use the returned object)
                updateProductData.productName,
                updateProductData.productDescription,
                updateProductData.modelNumber,
                updateProductData.price,
                updateProductData.manufacturer,
                updateProductData.manufacturerWebsite,
                updateProductData.keywords,
                updateProductData.categories,
                updateProductData.dateReleased,
                updateProductData.discontinued);
        } catch (e) { // respond with 400 if there are any issues with the data
            return res.status(400).json({error: e});
        }

        try {
            req.params.productId = checkObjectId(req.params.productId); // validate product id from url
        } catch (e) {
            return res.status(400).json({error: e});
        }

        try { // time to actually update!
            const {
                productName,
                productDescription,
                modelNumber,
                price,
                manufacturer,
                manufacturerWebsite,
                keywords,
                categories,
                dateReleased,
                discontinued} = updateProductData;
            const updated = await productData.update(req.params.productId, productName, productDescription, modelNumber, price, manufacturer, manufacturerWebsite, keywords, categories, dateReleased, discontinued);
            return res.json(updated); // return the new product!
        } catch (e) { 
            return res.status(404).json({error: e}); // respond 404 if object could not be updated (object does not exist)
        }
    });



export default router;
