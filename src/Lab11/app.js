import express from "express";
const app = express();
import configRoutes from "./routes/index.js";

const staticDir = express.static("public");

app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(3000, () => {
    console.log("Server running! http://localhost:3000");
});
