//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getComapnies() function in the /data/data.js file 3 to return the list of comapnies and call it in the /companies route.  You can also import your getComapny(id) function and call it in the :/id route.

import express from "express";
import * as data from "../data/data.js";
import { validateId } from "../helpers.js";

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const allCompanies = await data.getCompanies(); // get and return all companies
            return res.json(allCompanies);
        } catch (e) {
            return res.status(500).send(e); // server error -> 500
        }
    });
// Implement GET Request Method and send a JSON response See lecture code!

router.route('/:id')
    .get(async (req, res) => {
        try {
            req.params.id = validateId(req.params.id); // validate id, returns 400 error if not valid
        } catch (e) {
            return res.status(400).json({"error": e}); // invalid input -> 400
        }
        try {
            const company = await data.getCompanyById(req.params.id); // get the company of the id
            return res.json(company);
        } catch (e) {
            return res.status(404).json({"error": e}); // resource (id) not found -> 404
        }
    });
//Implement GET Request Method and send a JSON response See lecture code!

export default router;
