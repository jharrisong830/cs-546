import axios from "axios";


export const searchMoviesByName = async (title) => {
    // this function is called from the route, so title has already been validated
    const data1 = await axios.get(`http://www.omdbapi.com/?apikey=KEY_GOES_HERE&s=${title}`); // get the search results!
    if (data1.data === undefined || data1.data === null || !Object.keys(data1.data).includes("Search")) { // throw if we can't get the data
        throw `We're sorry, but no results were found for '${title}'.`;
    }

    const data2 = await axios.get(`http://www.omdbapi.com/?apikey=KEY_GOES_HERE&s=${title}&page=2`); // now for the next page!
    if (data2.data === undefined || data2.data === null || !Object.keys(data2.data).includes("Search")) {
        return data1.data.Search; // just return the previous results if we can't get anything from the second page
    }
    return data1.data.Search.concat(data2.data.Search); // return the combined results
};

export const searchMovieById = async (id) => {
    // this function is called from the route, so id has already been validated
    const {data} = await axios.get(`http://www.omdbapi.com/?apikey=KEY_GOES_HERE&i=${id}`); // get the requested movie!
    if (data === undefined || data === null || Object.keys(data).includes("Error")) { // throw if we can't get the data
        throw `We're sorry, but no results were found for '${id}'.`;
    }
    return data; // return the data!
};
