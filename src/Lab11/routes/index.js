import mainRoute from "./routesApi.js";

const constructorMethod = (app) => {
    app.use("/", mainRoute);

    app.use("*", (req, res) => {
        res.status(404).json({error: "route not found"}); // ignore all other endpoints
    });
};


export default constructorMethod;
