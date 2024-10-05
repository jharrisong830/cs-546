/*

Create a product of your choice.
Log the newly created product. (Just that product, not all products)
Create another product of your choice.
Query all products, and log them all
Create the 3rd product of your choice.
Log the newly created 3rd product. (Just that product, not all product)
Rename the first product
Log the first product with the updated name. 
Remove the second product you created.
Query all products, and log them all
Try to create a product with bad input parameters to make sure it throws errors.
Try to remove a product that does not exist to make sure it throws errors.
Try to rename a product that does not exist to make sure it throws errors.
Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
Try getting a product by ID that does not exist to make sure it throws errors.

*/


import * as products from "./data/products.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";


const db = await dbConnection();
await db.dropDatabase(); // drop any data previously stored in the database

let newProd;
let newNewProd;

// 1. create new product
try {
    newProd = await products.create("Sex 2", "The sequel to sex.", "2", 420.69, "Me", "http://www.stevens.com", ["sex", "two"], ["fun", "science", "motion"], "02/01/2021", false);
    // 2. log the newly created/returned product
    console.log(newProd);
} catch (e) {
    console.log(e);
}


// 3. create another new product
try {
    newNewProd = await products.create("Lab4Solution", "Selling my solutions on the dark web ;)", "JGsolutionsL4", 100, "John Graham Inc.", "http://www.johng.com", ["solutions", "lab"], ["javascript", "webprogramming"], "02/01/2024", false);
    // 4. get/log all products
    let allProds1 = await products.getAll();
    console.log(allProds1);
} catch (e) {
    console.log(e);
}

// 5. create 3rd new product
try {
    let newNewNew = await products.create("MongoDB 2", "The long-awaited database 'SQL' (lol)", "MongoDB2.0", 1.99, "MongoDB LLC.", "http://www.mongodb.com", ["mongo", "document"], ["database", "webprogramming"], "12/31/2015", true);
    // 6. log the 3rd product
    console.log(newNewNew);
} catch (e) {
    console.log(e);
}

// 7. rename first product
try {
    let renamed = await products.rename(newProd["_id"], "Sex: Remastered Edition");
    // 8. log the renamed product
    console.log(renamed);
} catch (e) {
    console.log(e);
}

// 9. remove the second product
try {
    let removedString = await products.remove(newNewProd["_id"]);
} catch (e) {
    console.log(e);
}

// 10. get and log all products
try {
    let allProds2 = await products.getAll();
    console.log(allProds2);
} catch (e) {
    console.log(e);
}

// 11. try to create invalid product
try {
    await products.create("Name", "Description", "modelNumber", 0.00, "Me", "http://www.example.com", ["hi"], ["hi"], "01/01/1970", true); // should throw error due to price not being > 0
} catch (e) {
    console.log(e); // should print error message
}

// 12. try to remove a product that doesn't exist
try {
    await products.remove("lmao25"); // id doesn't exist (i hope)
} catch (e) {
    console.log(e); // should print error message
}

// 13. try to rename a product that doesn't exist
try {
    await products.rename("lol420", "new name idc"); // id doesn't exist (i hope)
} catch (e) {
    console.log(e); // should print error message
}

// 14. try to rename a product with an invalid name
try {
    await products.rename(newProd["_id"], "         "); // try to rename object 1, but name with empty spaces will throw an error
} catch (e) {
    console.log(e); // should print error message
}

// 15. try to get a product by id that doesn't exist
try {
    await products.get("haha69"); // id doesn't exist (i hope)
} catch (e) {
    console.log(e); // should print error message
}








// extra input validation stuff
try {
    await products.create("     ", "Description", "modelNumber", 40, "Me", "http://www.example.com", ["hi"], ["hi"], "01/01/1970", true); // should throw due to empty string (i handle them all the same so i'm not going to test every field for this)
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40, "Me", "http://www.ex.com", ["hi"], ["hi"], "01/01/1970", true); // too short of a web address (inside should be 5 or more chars)
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40, "Me", "http://example.com", ["hi"], ["hi"], "01/01/1970", true); // website missing www.
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40, "Me", "http://www.example", ["hi"], ["hi"], "01/01/1970", true); // website missing .com
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40, "Me", "http://www.example.com", ["hi", 69], ["hi"], "01/01/1970", true); // invalid elem in array
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40, "Me", "http://www.example.com", ["hi"], [], "01/01/1970", true); // invalid empty array
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40, "Me", "http://www.example.com", ["hi"], ["hi"], "13/01/1970", true); // invalid date
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40, "Me", "http://www.example.com", ["hi"], ["hi"], "01/32/1970", true); // invalid date
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40, "Me", "http://www.example.com", ["hi"], ["hi"], "12/31/2024", true); // invalid date
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40.0000001, "Me", "http://www.example.com", ["hi"], ["hi"], "1/1/1970", true); // date is parsed fine, but price has more than 2 decimal digits
} catch (e) {
    console.log(e); // should print error message
}

try {
    await products.create("Name", "Description", "modelNumber", 40, "Me", "http://www.example.com", ["hi"], ["hi"], "01/01/1970", "false"); // discont. is not bool
} catch (e) {
    console.log(e); // should print error message
}


await closeConnection();
