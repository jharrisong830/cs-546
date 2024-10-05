import express from "express";
import configRoutes from "./routes/index.js";


const app = express();
app.use(express.json()); // for http bodies

configRoutes(app);

app.listen(3000, () => {
    console.log("Server running! http://localhost:3000");
});
