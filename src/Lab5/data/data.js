/*Here, you can export the data functions
to get the comapnies, people, getCompanyByID, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import axios from "axios";
import {validateId} from "../helpers.js";

const getCompanies = async () => {
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json");

    if (data === undefined || data === null) {
        throw "Error: could not retrieve company data.";
    }

    return data;
};

const getPeople = async () => {
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json");

    if (data === undefined || data === null) {
        throw "Error: could not retrieve people data.";
    }

    return data;
};

const getCompanyById = async (id) => {
    id = validateId(id);

    const companyData = await getCompanies();
    let result = companyData.find((elem) => elem["id"] === id); // find the company with given id (returns undefined if not found)
    if (result === undefined) throw "Company not found!";
    return result;
};

const getPersonById = async (id) => {
    id = validateId(id);

    const personData = await getPeople();
    let result = personData.find((elem) => elem["id"] === id); // find the person with given id (returns undefined if not found)
    if (result === undefined) throw "Person not found!";
    return result;
};


export {getCompanies, getPeople, getCompanyById, getPersonById};
