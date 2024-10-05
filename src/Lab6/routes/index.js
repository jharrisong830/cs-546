import productRoutes from "./products.js";
import reviewRoutes from "./reviews.js";

const constructorMethod = (app) => {
    app.use("/products", productRoutes);
    app.use("/reviews", reviewRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Route not found"}); // ignore all other endpoints
    });
};

export default constructorMethod;
