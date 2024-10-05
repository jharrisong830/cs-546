import { Router } from "express";
import helpers from "../helpers.js";
import { searchMoviesByName, searchMovieById } from "../data/movies.js";

const router = Router();


router.route('/').get(async (req, res) => {
    try {
        return res.render("home", {title: "Movie Finder"}); // render homepage with title 
    } catch (e) {
        return res.status(500).render("error", {title: "Oops...", errclass: "error", errmsg: `Server error: ${e}`});
    }
});

router.route('/searchmovies').post(async (req, res) => {
    if (req.body === null || req.body === undefined) { // check that request body exists
        return res.status(400).render("error", {title: "Oops...", errclass: "error", errmsg: "Missing input body."});
    }

    try { // validate the search terms
        req.body.searchMoviesByName = helpers.returnValidString(req.body.searchMoviesByName);
        helpers.checkIfEmpty(req.body.searchMoviesByName);
    } catch (e) { // render the error page if there is an error
        return res.status(400).render("error", {title: "Oops...", errclass: "error", errmsg: `Bad input: ${e}`});
    }

    try {
        let results = await searchMoviesByName(req.body.searchMoviesByName); // get and render search results
        return res.render("movieSearchResults", {title: "Movies Found", searchMoviesByName: req.body.searchMoviesByName, results: results});
    } catch (e) {
        return res.status(404).render("error", {title: "Oops...", errclass: "not-found", errmsg: e});
    }
});

router.route('/movie/:id').get(async (req, res) => {
    try { // validate the id
        req.params.id = helpers.returnValidString(req.params.id);
        helpers.checkIfEmpty(req.params.id);
    } catch (e) {
        return res.status(400).render("error", {title: "Oops...", errclass: "error", errmsg: `Bad input: ${e}`});
    }

    try { // get and render the requested movie
        let results = await searchMovieById(req.params.id);
        return res.render("movieById", {title: results.Title, results: results});
    } catch (e) {
        return res.status(404).render("error", {title: "Oops...", errclass: "not-found", errmsg: e});
    }
});


export default router;
