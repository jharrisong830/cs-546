// TODO: Export and implement the following functions in ES6 format

import { returnValidString, checkIfEmpty, valiDate } from "../helpers.js";
import { products } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const create = async (
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {
  productName = returnValidString(productName); // start of basic string validation (defined & emptiness)
  checkIfEmpty(productName);

  productDescription = returnValidString(productDescription);
  checkIfEmpty(productDescription);

  modelNumber = returnValidString(modelNumber);
  checkIfEmpty(modelNumber);

  manufacturer = returnValidString(manufacturer);
  checkIfEmpty(manufacturer);

  manufacturerWebsite = returnValidString(manufacturerWebsite);
  checkIfEmpty(manufacturerWebsite);
  if (!(manufacturerWebsite.startsWith("http://www.") && manufacturerWebsite.endsWith(".com"))) {
    throw "Error: website must be in form of http://www.<address>.com";
  }
  if (manufacturerWebsite.slice(11, -4).length < 5) {
    throw "Error: website address must have at least 5 characters";
  }

  dateReleased = returnValidString(dateReleased);
  checkIfEmpty(dateReleased);
  valiDate(dateReleased); // validate the date (like the function name??? lol), will throw if invalid

  if (price === undefined || typeof price !== 'number') throw "Error: price must be a number";
  if (price <= 0) throw "Error: price must be > 0"; // price validation (> 0 and only 2 digits after the decimal)
  let priceStrSplit = price.toString().split('.');
  if (priceStrSplit.length > 1 && priceStrSplit[1].length > 2) throw "Error: price must have at most 2 decimal digits";

  if (keywords === undefined || !Array.isArray(keywords)) throw "Error: keywords must be an array of strings";
  if (keywords.length < 1) throw "Error: empty keyword array";
  keywords = keywords.map((str) => returnValidString(str)); // transform all keywords to be valid strings...
  keywords.map((str) => checkIfEmpty(str)); // ...and check that none are empty after being trimmed

  if (categories === undefined || !Array.isArray(categories)) throw "Error: categories must be an array of strings";
  if (categories.length < 1) throw "Error: empty categories array";
  categories = categories.map((str) => returnValidString(str)); // transform all categories to be valid strings...
  categories.map((str) => checkIfEmpty(str)); // ...and check that none are empty after being trimmed

  if (discontinued === undefined || typeof discontinued !== 'boolean') throw "Error: discontinued must be a boolean";


  // error checking done!

  let newProduct = {
    "productName": productName,
    "productDescription": productDescription,
    "modelNumber": modelNumber,
    "price": price,
    "manufacturer": manufacturer,
    "manufacturerWebsite": manufacturerWebsite,
    "keywords": keywords,
    "categories": categories,
    "dateReleased": dateReleased,
    "discontinued": discontinued
  };

  const productCollection = await products(); // get the mongo collection
  const insertInfo = await productCollection.insertOne(newProduct); // insert the new product
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Error: could not add product to database.";
  }

  let addedProduct = await get(insertInfo.insertedId.toString()); // get and return the newly added object
  return addedProduct;
};

const getAll = async () => {
  const productCollection = await products();
  let productList = await productCollection.find({}).toArray(); // get all database entries, and convert to an array of objects
  if (!productList) throw "Error: could not get all of the products from the database";
  productList = productList.map((prod) => { // convert each products _id field to be a string
    prod["_id"] = prod["_id"].toString();
    return prod;
  });
  return productList;
};

const get = async (id) => {
  id = returnValidString(id); // throws if invalid string
  checkIfEmpty(id); // make sure the supplied/trimmed id isn't empty
  if (!ObjectId.isValid(id)) throw "Error: invalid object ID supplied";

  const productCollection = await products();
  let productToReturn = await productCollection.findOne({"_id": new ObjectId(id)}); // search for id in the database
  if (productToReturn === null) throw "Error: no such product with given ID"; // throw if not found
  productToReturn["_id"] = productToReturn["_id"].toString(); // convert id to string (for user to see)
  return productToReturn; // return the product!
};

const remove = async (id) => {
  id = returnValidString(id);
  checkIfEmpty(id);
  if (!ObjectId.isValid(id)) throw "Error: invalid object ID supplied";

  const productCollection = await products();
  const deleteInfo = await productCollection.findOneAndDelete({"_id": new ObjectId(id)});

  if (!deleteInfo) throw "Error: could not delete this product";
  return `${deleteInfo["productName"]} has been successfully deleted!`;
};

const rename = async (id, newProductName) => {
  id = returnValidString(id);
  checkIfEmpty(id);
  if (!ObjectId.isValid(id)) throw "Error: invalid object ID supplied";

  newProductName = returnValidString(newProductName); // validate the new product name
  checkIfEmpty(newProductName);

  let currProd = await get(id); // get the product to check if name is already the same, reuse this later when updating
  if (currProd["productName"] === newProductName) throw "Error: product name is already the same as new product name";

  delete currProd["_id"]; // remove id from the gotten product (don't feel like declaring another object)
  currProd["productName"] = newProductName; // update the name!
  const productCollection = await products();

  const updateInfo = await productCollection.findOneAndUpdate(
    {"_id": new ObjectId(id)},
    {"$set": currProd},
    {"returnDocument": "after"}
  );
  
  if (!updateInfo) throw "Error: couldn't update the product name";
  updateInfo["_id"] = updateInfo["_id"].toString();
  return updateInfo;
};



export {create, getAll, get, remove, rename};