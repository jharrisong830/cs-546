import movieRoutes from "./movies.js";
import path from "path";
import { static as staticDir } from "express";

const constructorMethod = (app) => {
    app.use("/", movieRoutes);

    app.use("*", (req, res) => {
        res.status(404).render("error", {title: "Oops...", errclass: "not-found", errmsg: `Route not found :(`}); // ignore all other endpoints
    });

    app.use("/public", staticDir("public")); 
};

export default constructorMethod;
