import { validateProductParams, checkObjectId } from "../helpers.js";
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

  let newProduct = validateProductParams( // create new product with fully validated params
    productName, productDescription, 
    modelNumber, price, manufacturer, 
    manufacturerWebsite, keywords, categories, 
    dateReleased, discontinued);

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
  let productList = await productCollection.find({})
    .project({_id: 1, productName: 1}) // projection to only extract id and name
    .toArray(); // get all database entries, and convert to an array of objects
  if (!productList) throw "Error: could not get all of the products from the database";
  productList = productList.map((prod) => { // convert each products _id field to be a string
    prod["_id"] = prod["_id"].toString();
    return prod;
  });
  return productList;
};


const get = async (id) => {
  id = checkObjectId(id); // validate id

  const productCollection = await products();
  let productToReturn = await productCollection.findOne({"_id": new ObjectId(id)}); // search for id in the database
  if (productToReturn === null) throw "Error: no such product with given ID"; // throw if not found
  productToReturn["_id"] = productToReturn["_id"].toString(); // convert id to string (for user to see)
  return productToReturn; // return the product!
};


const remove = async (id) => {
  id = checkObjectId(id);

  const productCollection = await products();
  const deleteInfo = await productCollection.findOneAndDelete({"_id": new ObjectId(id)});

  if (!deleteInfo) throw "Error: could not delete this product, does not exist.";
  return `${deleteInfo["productName"]} has been successfully deleted!`;
};


const update = async (
    productId,
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
    productId = checkObjectId(productId); // validate productId string
    await get(productId); // check if product exists

    validateProductParams( // create new product with fully validated params (this handles all error checking for the params)
        productName, productDescription, 
        modelNumber, price, manufacturer, 
        manufacturerWebsite, keywords, categories, 
        dateReleased, discontinued);

    // ^^ the return values aren't used bc mongo will handle the updating, those functions just handle the param validation lol
    
    

    const productCollection = await products();
    await productCollection.updateOne({_id: new ObjectId(productId)}, {$set: { // update all fields!
        productName: productName,
        productDescription: productDescription,
        modelNumber: modelNumber,
        price: price,
        manufacturer: manufacturer,
        manufacturerWebsite: manufacturerWebsite,
        keywords: keywords,
        categories: categories,
        dateReleased: dateReleased,
        discontinued: discontinued
    }});

    return await get(productId); // return the newly updated product!
};


export default { create, getAll, get, remove, update };
