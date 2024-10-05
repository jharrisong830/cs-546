import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import products from '../data/products.js';
import reviews from '../data/reviews.js';
import { ObjectId } from "mongodb";

const db = await dbConnection();
await db.dropDatabase();

const sex2 = await products.create("Sex 2", "The sequel to Sex", "sex2", 420.69, "God", "http://www.omgsex2.com", ["sex", "two"], ["fun", "science"], "08/30/2003", false);
const iphone = await products.create("iPhone 20", "Twenty. Twenty. Four.", "iphone2024", 1099.99, "Tim Apple", "http://www.apple.com", ["iphone", "20"], ["tech", "apple", "phome"], "01/01/2024", true);
const javascript = await products.create("JavaScript", "Shittier Than Java.", "js20.0", 0.01, "JS Foundation", "http://www.javascript.com", ["js", "terrible"], ["language", "programming", "web"], "01/02/2003", false);

const iphoneReview = await reviews.createReview(iphone["_id"].toString(), "Poopy.", "Linux Bro", "Not open source, not interested!!!", 1.5);
const iphoneReview2 = await reviews.createReview(iphone["_id"].toString(), "Amazing", "Apple Stan", "Great camera, I love iMessage!", 4.5);

const jsReview = await reviews.createReview(javascript["_id"].toString(), "Worst. Language. EVER.", "John G.", "I hate it. There should be types and tuples and so many more features! Promise? How about promise you'll get some bitches lmao lolzzz", 1);

console.log(await products.getAll());

console.log('Done seeding database');

await closeConnection();