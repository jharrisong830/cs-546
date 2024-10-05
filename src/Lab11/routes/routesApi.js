import { Router } from "express";
import path from "path";

const router = Router();

router.route("/").get(async (req, res) => {
    return res.sendFile(path.resolve("static/webpage.html"));
});

export default router;
