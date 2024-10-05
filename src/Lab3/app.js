/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/

import * as authors from "./authors.js";
import * as books from "./books.js";

console.log(await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c")); 
// Returns:
// {
// id: '1871e6d7-551f-41cb-9a07-08240b86c95c',
// first_name: 'Derward',
// last_name: 'Ticic',
// date_of_birth: '6/3/1932',
// HometownCity: 'Garden Grove',
// HometownState: 'CA',
// books: ['4efdb199-5a0f-4410-bded-ce07990c6aa4']
// }

try {
    await authors.getAuthorById(-1); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await authors.getAuthorById(1001); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await authors.getAuthorById(); // Throws Error
} catch (e) {
    console.log(e);
}
try {
    await authors.getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Author not found Error
} catch (e) {
    console.log(e);
}





console.log(await authors.searchAuthorsByAge(40)); 
// Returns: ["Mayer Staddart", "Madelaine Armatage", "Adorne Byrant"...] //Only the first three are shown
try {
    await authors.searchAuthorsByAge(5000); // Throws Error since there are no results
} catch (e) {
    console.log(e);
}
try {
    await authors.searchAuthorsByAge(" "); // Throws Error
} catch (e) {
    console.log(e);
}
try {
    await authors.searchAuthorsByAge("abc"); // Throws Error
} catch (e) {
    console.log(e);
}
try {
    await authors.searchAuthorsByAge(); // Throws Error
} catch (e) {
    console.log(e);
}





console.log(await authors.getBooksByState("NJ"));
// Returns ["Summertime","Crime and Punishment"] // there are others, but this an example of just a few NJ books
try {
    await authors.getBooksByState(123); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await authors.getBooksByState(" "); // Throws Error
} catch (e) {
    console.log(e);
}
try {
    await authors.getBooksByState("Patrick"); // Throws Error because there is no state Patrick in authors.json
} catch (e) {
    console.log(e);
}
try {
    await authors.getBooksByState(); // Throws Error
} catch (e) {
    console.log(e);
}



console.log(await authors.searchAuthorsByHometown("New York City", "NY"));
// Returns ["Maurice McKinless","Mayer Stadart"] // there are others, but this an example of just a few authors

try {
    await authors.searchAuthorsByHometown(123, 456); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await authors.searchAuthorsByHometown("", ""); // Throws Error
} catch (e) {
    console.log(e);
}
try {
    await authors.searchAuthorsByHometown("Patrick", "Hill"); // Throws Error because there is no state hill or town patrick in authors.json
} catch (e) {
    console.log(e);
}
try {
    await authors.searchAuthorsByHometown(); // Throws Error
} catch (e) {
    console.log(e);
}








console.log(await books.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e")); 
// Returns: 
// {   
//   id: '99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e',   
//   title: 'No habrá paz para los malvados',   
//   genres: ['Art', 'Travel'],   
//   publicationDate: '5/7/2018',   
//   publisher: 'Avamm',   
//   summary:   'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',   
//   isbn: '520476104-7',   
//   language: 'Finnish',   
//   pageCount: 693,   
//   price: 25.66,   
//   format: ['E-Book', 'Hardcover', 'Paperback'],   
//   authorId: 'f645d28a-670a-457a-b55f-a32876b8511d' 
// }

try {
    await books.getBookById(-1); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await books.getBookById(1001); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await books.getBookById();// Throws Error
} catch (e) {
    console.log(e);
}
try {
    await books.getBookById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws book not found Error
} catch (e) {
    console.log(e);
}




console.log(await books.booksByPageCount(300, 500)); 
// Returns: ["fe64fc98-95ff-4d47-bac8-93c755b85c95", "04e55bc9-0c7a-47a6-a403-52eabf25c6ef"] //there are more, these are just a few examples
try {
    await books.booksByPageCount(-1, 100); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await books.booksByPageCount("ABC", "3"); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await books.booksByPageCount(); // Throws Error
} catch (e) {
    console.log(e);
}








console.log(await books.sameYear(2000)); // check canvas to see the output lol
try {
    await books.sameYear(-1); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await books.sameYear(1001); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await books.sameYear();// Throws Error
} catch (e) {
    console.log(e);
}
try {
    await books.sameYear(false)// throws error 
} catch (e) {
    console.log(e);
}
try {
    await books.sameYear('foo bar');// Throws Error
} catch (e) {
    console.log(e);
}





console.log(await books.minMaxPrice()); // ezclap








console.log(await books.searchBooksByPublisher("Skilith")); // Returns ["519c733a-6a5d-451f-927d-0e860b5d1e3d", "254a77b0-f055-4dc1-b9fa-3b23d811c8be"]
try {
    await books.searchBooksByPublisher("A fake publisher"); // Throws Error 
} catch (e) {
    console.log(e);
}
try {
    await books.searchBooksByPublisher();// Throws Error
} catch (e) {
    console.log(e);
}
try {
    await books.searchBooksByPublisher(false)// throws error 
} catch (e) {
    console.log(e);
}
try {
    await books.searchBooksByPublisher('foo bar');// Throws Error
} catch (e) {
    console.log(e);
}

