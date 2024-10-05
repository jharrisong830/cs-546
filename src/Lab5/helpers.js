//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

/**
 * checks that id exists and is a non-empty string after trimming
 * @param {string} id
 * @returns {string} trimmed and validated id
 * @throws if id is undefined, not a string, or is empty after trimming
 */
const validateId = (id) => {
    if (id === undefined || typeof id !== 'string') {
        throw "Error: id must be a string.";
    }
    id = id.trim();
    if (id.length === 0) throw "Error: id must not be an empty string.";
    return id; // returns trimmed and validated id
};


export {validateId};
