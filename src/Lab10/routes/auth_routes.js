import { Router } from "express";
import vld from "../helpers.js";
import { registerUser, loginUser } from "../data/users.js";

const router = Router();

router.route("/").get(async (req, res) => {
    //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
    return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
    .route("/register")
    .get(async (req, res) => {
        return res.render("register", { title: "Register" }); // pass default since not logged in
    })
    .post(async (req, res) => {
        if (req.body === null || req.body === undefined) { // check that request body exists
            return res.status(400).render("register", { title: "Register", errorHTML: "<ul><li>Request body does not exist</li></ul>" });
        }

        try { // validate params and create database entry
            const userParams = await vld.validateUserParams(
                req.body.firstName, 
                req.body.lastName, 
                req.body.username, 
                req.body.password, 
                req.body.favoriteQuote, 
                req.body.themePreference, 
                req.body.role
            );
            const result = await registerUser(
                userParams.firstName, 
                userParams.lastName, 
                userParams.username, 
                userParams.password, 
                userParams.favoriteQuote, 
                userParams.themePreference, 
                userParams.role
            );

            if (!Object.keys(result).includes("signupCompleted") || result.signupCompleted === false) { // internal server error if we get an unexpected return
                return res.status(500).render("register", {title: "Register", errorHTML: `<ul><li>Internal Server Error</li></ul>`});
            }

            // otherwise, we can redirect!
            return res.redirect("/login");
        } catch (e) {
            return res.status(400).render("register", {title: "Register", errorHTML: `<ul><li>${e}</li></ul>`});
        }
    });

router
    .route("/login")
    .get(async (req, res) => {
        return res.render("login", { title: "Login" }); // pass default since not logged in
    })
    .post(async (req, res) => {
        if (req.body === null || req.body === undefined) { // check that request body exists
            return res.status(400).render("login", { title: "Login", errorHTML: "<ul><li>Request body does not exist</li></ul>" });
        }

        try {
            const numbers = /\d/g;
            const whitespace = /\s/g;
            const uppercase = /[A-Z]/g;
            const lowercase = /[a-z]/g;
            const special = /[^\dA-Za-z\s]/g; // anything thats not numbers, letters, or whitespace

            req.body.username = vld.returnValidString(req.body.username);
            vld.checkEmptyString(req.body.username);
            req.body.username = req.body.username.toLowerCase(); // case-insensitive
            if (req.body.username.length < 5 || req.body.username.length > 10) {
                throw "Invalid username or password.";
            }
            if (req.body.username.match(numbers) !== null) {
                throw "Invalid username or password.";
            }

            req.body.password = vld.returnValidString(req.body.password);
            vld.checkEmptyString(req.body.password);
            if (req.body.password.match(whitespace) !== null) {
                throw "Invalid username or password.";
            }
            if (req.body.password.length < 8) {
                throw "Invalid username or password.";
            }

            if (req.body.password.match(uppercase) === null) { // any of these returning null -> condition not met
                throw "Invalid username or password.";
            }
            if (req.body.password.match(lowercase) === null) {
                throw "Invalid username or password.";
            }
            if (req.body.password.match(numbers) === null) {
                throw "Invalid username or password.";
            }
            if (req.body.password.match(special) === null) {
                throw "Invalid username or password.";
            }

            const usr = await loginUser(req.body.username, req.body.password);
            if (!usr) {
                throw "Invalid username or password.";
            }

            req.session.user = { // set current user in the session
                firstName: usr.firstName, 
                lastName: usr.lastName, 
                username: req.body.username, 
                favoriteQuote: usr.favoriteQuote, 
                themePreference: usr.themePreference, 
                role: usr.role
            };

            return res.redirect(`/${usr.role}`); // redirect based on their role
        } catch (e) {
            return res.status(400).render("login", {title: "Login", errorHTML: `<ul><li>${e}</li></ul>`});
        }
    });

router.route("/user").get(async (req, res) => {
    return res.render("user", { 
        title: "User", 
        firstName: req.session.user.firstName, 
        lastName: req.session.user.lastName, 
        currentTime: new Date().toUTCString(), 
        role: req.session.user.role, 
        favoriteQuote: req.session.user.favoriteQuote, 
        isAdmin: req.session.user.role === "admin",
        themePreference: req.session.user.themePreference
    });
});

router.route("/admin").get(async (req, res) => {
    return res.render("admin", {
        title: "Admin", 
        firstName: req.session.user.firstName, 
        lastName: req.session.user.lastName, 
        currentTime: new Date().toUTCString(), 
        favoriteQuote: req.session.user.favoriteQuote,
        themePreference: req.session.user.themePreference
    });
});

router.route("/logout").get(async (req, res) => {
    req.session.destroy(); // delete AuthenticationState
    return res.render("logout", { title: "Logged Out" });
});

export default router;
