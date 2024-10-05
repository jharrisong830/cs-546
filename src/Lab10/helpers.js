import { ObjectId } from "mongodb";
import { users } from "./config/mongoCollections.js";


/**
 * check that the given parameter exists and is a string
 *
 * @param {string} str  input string to be validated
 *
 * @returns {string} trimmed version of str
 * @throws when str is undefined, null, or not a string
 */
const returnValidString = (str) => {
    if (str === undefined || str === null) {
        // check that str exists
        throw "returnValidString: 'str' does not exist!";
    } else if (typeof str !== "string") {
        // check that str is of type string
        throw `returnValidString: 'str' is not a string! got ${str} (${typeof str})`;
    }
    return str.trim(); // return trimmed version of str (can be empty)
};

/**
 * checks if an already-validated string is empty, and throws if so
 *
 * @param {string} str   validated string
 *
 * @throws if str is empty
 */
const checkEmptyString = (str) => {
    if (str.length === 0) throw "checkEmptyString: 'str' is empty!";
};

/**
 * validates parameters supplied when creating a user
 *
 * @param {string} firstName        first name
 * @param {string} lastName         last name
 * @param {string} username         username (case insensitive, no duplicates)
 * @param {string} password         password
 * @param {string} favoriteQuote    quote
 * @param {string} themePreference  theme of either "light" or "dark" (case insensitive)
 * @param {string} role             user role (either admin or user)
 *
 * @returns {Object} object containing updated and validated paramaters
 * @throws on invalid input
 */
const validateUserParams = (
    firstName,
    lastName,
    username,
    password,
    favoriteQuote,
    themePreference,
    role
) => {
    // regex for determining if certain characters are present
    const numbers = /\d/g;
    const whitespace = /\s/g;
    const uppercase = /[A-Z]/g;
    const lowercase = /[a-z]/g;
    const special = /[^\dA-Za-z\s]/g; // anything thats not numbers, letters, or whitespace

    firstName = returnValidString(firstName);
    checkEmptyString(firstName);
    if (firstName.length < 2 || firstName.length > 25) {
        throw `validateUserParams: length of firstName must be in [2, 25] (got ${firstName.length})`;
    }
    if (firstName.match(numbers) !== null) { // match returns null on no matches, should not match any numbers
        throw `validateUserParams: firstName '${firstName}' includes numbers, which is invalid.`;
    }

    lastName = returnValidString(lastName);
    checkEmptyString(lastName);
    if (lastName.length < 2 || lastName.length > 25) {
        throw `validateUserParams: length of lastName must be in [2, 25] (got ${lastName.length})`;
    }
    if (lastName.match(numbers) !== null) {
        throw `validateUserParams: lastName '${lastName}' includes numbers, which is invalid.`;
    }

    username = returnValidString(username);
    checkEmptyString(username);
    username = username.toLowerCase(); // case-insensitive
    if (username.length < 5 || username.length > 10) {
        throw `validateUserParams: length of username must be in [5, 10] (got ${username.length})`;
    }
    if (username.match(numbers) !== null) {
        throw `validateUserParams: username '${username}' includes numbers, which is invalid.`;
    }

    password = returnValidString(password);
    checkEmptyString(password);
    if (password.match(whitespace) !== null) {
        throw "validateUserParams: password cannot contain whitespace";
    }
    if (password.length < 8) {
        throw "validateUserParams: password must be at least 8 characters";
    }

    if (password.match(uppercase) === null) { // any of these returning null -> condition not met
        throw "validateUserParams: password must have at least one uppercase character";
    }
    if (password.match(lowercase) === null) {
        throw "validateUserParams: password must have at least one lowercase character";
    }
    if (password.match(numbers) === null) {
        throw "validateUserParams: password must have at least one numeric character";
    }
    if (password.match(special) === null) {
        throw "validateUserParams: password must have at least one special character";
    }


    favoriteQuote = returnValidString(favoriteQuote);
    checkEmptyString(favoriteQuote);
    if (favoriteQuote.length < 20 || favoriteQuote.length > 255) {
        throw `validateUserParams: length of favoriteQuote must be in [20, 255] (got ${favoriteQuote.length})`;
    }
    if (favoriteQuote.match(numbers) !== null) {
        throw `validateUserParams: favoriteQuote '${favoriteQuote}' includes numbers, which is invalid.`;
    }


    themePreference = returnValidString(themePreference);
    checkEmptyString(themePreference);
    themePreference = themePreference.toLowerCase();
    if (themePreference !== "light" && themePreference !== "dark") {
        throw `validateUserParams: themePreference must be in [light | dark] (got ${themePreference})`;
    }

    role = returnValidString(role);
    checkEmptyString(role);
    role = role.toLowerCase();
    if (role !== "admin" && role !== "user") {
        throw `validateUserParams: role must be in [admin | user] (got ${role})`;
    }

    return { // return the fully validated user
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        favoriteQuote: favoriteQuote,
        themePreference: themePreference,
        role: role
    }; 
};

/**
 * checks that the given id is a valid object id, and returns it as an ObjectId
 * @param {string | ObjectId} id   to be validated
 *
 * @returns {ObjectId}  above id converted to ObjectId
 * @throws if id is not a valid ObjectId or string
 */
const checkObjectId = (id) => {
    if (id === undefined || id === null) {
        errorMessage(MOD_NAME, "checkObjectId", "'id' does not exist!");
    }
    if (typeof id === "object" && ObjectId.isValid(id)) {
        // if already given an ObjectId instance, return it!
        return id;
    }
    // otherwise, validate the string (or throw for invalid types)
    id = returnValidString(id);
    checkEmptyString(id);
    if (!ObjectId.isValid(id)) {
        errorMessage(
            MOD_NAME,
            "checkObjectId",
            `'${id}' is not a valid ObjectId`
        );
    }
    return new ObjectId(id); // return validated ObjectId instance
};




/**
 * returns the id of the user with a matching username
 *
 * @param {string} username to search for
 *
 * @returns {ObjectId | null} the _id and username of the matching user, null if no such user is found
 * @throws on invalid input or if there is an error querying the database
 */
const findByUsername = async (username) => {
    username = returnValidString(username);
    checkEmptyString(username);
    username = username.toLowerCase();

    // find matching username (this should either return 1 or none, no duplicate usernames)
    const userCol = await users();
    const matchingUsernames = await userCol.find(
        { username: username },
        { username: 1 }
    ); // return the _id and username of matching users

    const unames = await matchingUsernames.toArray();

    if ((await unames.length) === 0) return null;

    return unames[0]._id; // return the _id!
};


const exportedMethods = {
    validateUserParams,
    returnValidString,
    checkEmptyString,
    checkObjectId,
    findByUsername
};

export default exportedMethods;


