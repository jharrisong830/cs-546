import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";

import configRoutes from "./routes/index.js";

const app = express();

app.use('/public', express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use(session({
    name: 'AuthenticationState',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: false
}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// middleware funcs

app.use("/", (req, res, next) => { // #1: log timestamp and route and apply redirections
    console.log(
        `[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${!req.session.user ? "Non-Authenticated" : "Authenticated"} User)`
    );

    if (req.originalUrl === "/") { // no need to redirect for any other route
        if (!req.session.user && req.originalUrl !== "/login") return res.redirect("/login"); // go to login page if no one is logged in
        return res.redirect(`/${req.session.user.role}`); // else, go to the right page!
    }
    next();
});


app.use("/login", (req, res, next) => { // #2: when getting the login page, redirect to user/admin if a user is already logged in (otherwise, do nothing)
    if (req.session.user) return res.redirect(`/${req.session.user.role}`);
    next();
});


app.use("/register", (req, res, next) => { // #3: when getting the register page, redirect to user/admin if a user is already logged in (otherwise, do nothing)
    if (req.session.user) return res.redirect(`/${req.session.user.role}`);
    next();
});


app.use("/user", (req, res, next) => { // #4: check if logged in, otherwise, go to login page
    if (!req.session.user) return res.redirect("/login"); // go to login page if no one is logged in
    next(); // otherwise, fall through
});


app.use("/admin", (req, res, next) => { // #5: check if logged in and if the user has permissions to view the admin page
    if (!req.session.user) return res.redirect("/login");
    if (req.session.user.role !== "admin") {
        return res.status(403).render("error", { title: "Error", errmsg: "You don't have permission to view this page!", themePreference: req.session.user.themePreference }); // go to error page
    }
    next();
});


app.use("/logout", (req, res, next) => { // #6: redirect to login if no user is logged in
    if (!req.session.user) return res.redirect("/login");
    next(); // otherwise, fall through
});



configRoutes(app);

app.listen(3000, () => {
    console.log("Server running! http://localhost:3000");
});

