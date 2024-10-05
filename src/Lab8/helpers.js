

/**
 * checks that the given argument is a string, and returns a trimmed version, throws otherwise
 * @param {string} str  string to be validated 
 * 
 * @returns {string}    trimmed version of str
 * @throws              if str is undefined or not of type 'string'
 */
const returnValidString = (str) => {
    if (str === undefined || typeof str !== 'string') {
        throw "invalid paramater (not a string)";
    }
    return str.trim();
};


/**
 * throws an error if a strings length is 0 (empty string), otherwise, nothing will happen!
 * @param {string} str  string to be checked
 * 
 * @throws              if str is empty
 */
const checkIfEmpty = (str) => {
    if (str.length === 0) throw "empty string";
};



const exportedMethods = {
    returnValidString,
    checkIfEmpty
};

export default exportedMethods;