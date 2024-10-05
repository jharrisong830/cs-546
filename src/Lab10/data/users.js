import { users } from "../config/mongoCollections.js";
import vld from "../helpers.js";
import bcrypt from "bcrypt";

const saltRounds = 16;


export const registerUser = async (
    firstName,
    lastName,
    username,
    password,
    favoriteQuote,
    themePreference,
    role
) => {
    const newUser = await vld.validateUserParams(firstName, lastName, username, password, favoriteQuote, themePreference, role);
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    let duplicateCheck = await vld.findByUsername(newUser.username);
    if (duplicateCheck !== null) { // throw error if the username is already in use
        throw `registerUser: username '${newUser.username}' already exists!`;
    }

    const userCol = await users();
    const insertInfo = await userCol.insertOne(newUser);

    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "registerUser: unable to add new user to the database";
    }

    return { signupCompleted: true }; // return this if completed
};

export const loginUser = async (username, password) => {
    // start with validation, regex for determining if certain characters are present
    const numbers = /\d/g;
    const whitespace = /\s/g;
    const uppercase = /[A-Z]/g;
    const lowercase = /[a-z]/g;
    const special = /[^\dA-Za-z\s]/g; // anything thats not numbers, letters, or whitespace

    username = vld.returnValidString(username);
    vld.checkEmptyString(username);
    username = username.toLowerCase(); // case-insensitive
    if (username.length < 5 || username.length > 10) {
        throw `validateUserParams: length of username must be in [5, 10] (got ${username.length})`;
    }
    if (username.match(numbers) !== null) {
        throw `validateUserParams: username '${username}' includes numbers, which is invalid.`;
    }

    password = vld.returnValidString(password);
    vld.checkEmptyString(password);
    if (password.match(whitespace) !== null) {
        throw "loginUser: password cannot contain whitespace";
    }
    if (password.length < 8) {
        throw "loginUser: password must be at least 8 characters";
    }

    if (password.match(uppercase) === null) { // any of these returning null -> condition not met
        throw "loginUser: password must have at least one uppercase character";
    }
    if (password.match(lowercase) === null) {
        throw "loginUser: password must have at least one lowercase character";
    }
    if (password.match(numbers) === null) {
        throw "loginUser: password must have at least one numeric character";
    }
    if (password.match(special) === null) {
        throw "loginUser: password must have at least one special character";
    }

    // validation done!

    const userId = await vld.findByUsername(username); // try to find by username first (returns null if username does not exist)
    if (userId === null) throw "Either the username or password is invalid";

    const userCol = await users();
    const usr = await userCol.findOne({ _id: userId });

    if (!usr) throw "Either the username or password is invalid";

    const passwordSuccess = await bcrypt.compare(password, usr.password); // compare given password to the hash (usr.password)
    if (!passwordSuccess) throw "Either the username or password is invalid";

    // at this point, passwords match, so we'll return the user's info
    return {
        firstName: usr.firstName,
        lastName: usr.lastName,
        favoriteQuote: usr.favoriteQuote,
        themePreference: usr.themePreference,
        role: usr.role
    };
};
