//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getPeople() function in the /data/data.js file to return the list of people.  You can also import your getPersonById(id) function and call it in the :/id route.

import express from "express";
import * as data from "../data/data.js";
import { validateId } from "../helpers.js";

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const allCompanies = await data.getPeople(); // get and return all people
            return res.json(allCompanies);
        } catch (e) {
            return res.status(500).send(e); // server error -> 500
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            req.params.id = validateId(req.params.id); // validate id, returns 400 error if not valid
        } catch (e) {
            return res.status(400).json({"error": e}); // invalid input -> 400
        }
        try {
            const company = await data.getPersonById(req.params.id); // get the persom of the id
            return res.json(company);
        } catch (e) {
            return res.status(404).json({"error": e}); // resource (id) not found -> 404
        }
    });

    
export default router;
