//An index file that returns a function that attaches all your routes to your app
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/routes/index.js

import companyRoutes from "./companies.js";
import peopleRoutes from "./people.js";

const constructorMethod = (app) => {
    app.use("/people", peopleRoutes);
    app.use("/companies", companyRoutes);

    app.use("*", (req, res) => {
        return res.status(404).json({"error": "Route not found"}); // sends 404 error for any other routes
    });
};

export default constructorMethod;