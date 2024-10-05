import decoderRoutes from "./textdecoder.js";

const constructorMethod = (app) => {
    app.use("/", decoderRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "route not found"}); // ignore all other endpoints
    });
};


export default constructorMethod;
