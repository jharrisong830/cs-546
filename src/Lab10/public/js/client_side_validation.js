const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("signin-form");
const error = document.getElementById("error");



if (error.hidden && error.innerHTML.length > 0) { // if the page is re-rendered and has error content already, then un-hide it
    error.hidden = false;
}



if (signupForm) {
    signupForm.addEventListener("submit", (event) => { // validation for submitting signup data
        let errors = [];

        if (!error.hidden) { // clear error contents and set to hidden
            error.innerHTML = "";
            error.hidden = true;
        }

        // regex for determining if certain characters are present
        const numbers = /\d/g;
        const whitespace = /\s/g;
        const uppercase = /[A-Z]/g;
        const lowercase = /[a-z]/g;
        const special = /[^\dA-Za-z\s]/g; // anything thats not numbers, letters, or whitespace


        let firstName = document.getElementById("firstName").value;
        if (firstName === undefined || firstName === null || typeof firstName !== "string") {
            errors.push("Missing or invalid first name");
        }
        else {
            firstName = firstName.trim();
            if (firstName.length === 0) {
                errors.push("First name cannot be empty");
            }
            else if (firstName.length < 2 || firstName.length > 25) {
                errors.push(`length of first name must be in [2, 25] (got ${firstName.length})`);
            }

            if (firstName.match(numbers) !== null) {
                errors.push(`first name '${firstName}' includes numbers, which is invalid.`);
            }
        }


        let lastName = document.getElementById("lastName").value;
        if (lastName === undefined || lastName === null || typeof lastName !== "string") {
            errors.push("Missing or invalid last name");
        }
        else {
            lastName = lastName.trim();
            if (lastName.length === 0) {
                errors.push("Last name cannot be empty");
            }
            else if (lastName.length < 2 || lastName.length > 25) {
                errors.push(`length of last name must be in [2, 25] (got ${lastName.length})`);
            }

            if (lastName.match(numbers) !== null) {
                errors.push(`last name '${lastName}' includes numbers, which is invalid.`);
            }
        }


        let username = document.getElementById("username").value;
        if (username === undefined || username === null || typeof username !== "string") {
            errors.push("Missing or invalid Username");
        }
        else {
            username = username.trim();
            if (username.length === 0) {
                errors.push("Username cannot be empty");
            }
            else if (username.length < 5 || username.length > 10) {
                errors.push(`length of username must be in [5, 10] (got ${username.length})`);
            }

            if (username.match(numbers) !== null) {
                errors.push(`username '${username}' includes numbers, which is invalid.`);
            }
        }


        let password = document.getElementById("password").value;
        if (password === undefined || password === null || typeof password !== "string") {
            errors.push("Missing or invalid password");
        }
        else {
            password = password.trim();
            if (password.length === 0) {
                errors.push("password cannot be empty");
            }
            else if (password.length < 8) {
                errors.push("password must have at least 8 characters");
            }

            if (password.match(whitespace) !== null) {
                errors.push("password cannot contain whitespace");
            }

            if (password.match(uppercase) === null) { // any of these returning null -> condition not met
                errors.push("password must have at least one uppercase character");
            }
            if (password.match(lowercase) === null) {
                errors.push("password must have at least one lowercase character");
            }
            if (password.match(numbers) === null) {
                errors.push("password must have at least one numeric character");
            }
            if (password.match(special) === null) {
                errors.push("password must have at least one special character");
            }
        }


        let confirmPassword = document.getElementById("confirmPassword").value;
        if (confirmPassword === undefined || confirmPassword === null || typeof confirmPassword !== "string") {
            errors.push("Missing or invalid password confirmation");
        }
        else {
            confirmPassword = confirmPassword.trim();
            if (password !== confirmPassword) { // check if passwords are matching
                errors.push("Passwords do not match");
            }
        }


        let favoriteQuote = document.getElementById("favoriteQuote").value;
        if (favoriteQuote === undefined || favoriteQuote === null || typeof favoriteQuote !== "string") {
            errors.push("Missing or invalid favorite quote");
        }
        else {
            favoriteQuote = favoriteQuote.trim();
            if (favoriteQuote.length === 0) {
                errors.push("favorite quote cannot be empty")
            }
            else if (favoriteQuote.length < 20 || favoriteQuote.length > 255) {
                errors.push(`length of favorite quote must be in [20, 255] (got ${favoriteQuote.length})`);
            }
            if (favoriteQuote.match(numbers) !== null) {
                errors.push(`favorite quote '${favoriteQuote}' includes numbers, which is invalid.`);
            }
        }



        let themePreference = document.getElementById("themePreference").value;
        if (themePreference === undefined || themePreference === null || typeof themePreference !== "string") {
            errors.push("Missing or invalid theme preference");
        }
        else {
            themePreference = themePreference.trim();
            themePreference = themePreference.toLowerCase();
            if (themePreference !== "light" && themePreference !== "dark") {
                errors.push(`theme preference must be in [light | dark] (got ${themePreference})`);
            }
        }


        let role = document.getElementById("role").value;
        if (role === undefined || role === null || typeof role !== "string") {
            errors.push("Missing or invalid role");
        }
        else {
            role = role.trim();
            role = role.toLowerCase();
            if (role !== "admin" && role !== "user") {
                errors.push(`role must be in [admin | user] (got ${role})`);
            }
        }


        // phew! now we either do nothing and let the submission continue or stop submission if there are errors

        if (errors.length !== 0) { // if there are errors...
            event.preventDefault(); // don't let the form do a POST to /register

            let errorList = "<ul>"; // start an unordered list
            errors.forEach((err) => {
                errorList += `<li>${err}</li>`; // accumulate errors
            });
            errorList += "</ul>";

            error.innerHTML = errorList;
            error.hidden = false; // unhide error div
        }
    });
}




if (loginForm) {
    loginForm.addEventListener("submit", (event) => { // validation for submitting sign in data
        let errors = "";

        if (!error.hidden) { // clear error contents and set to hidden
            error.innerHTML = "";
            error.hidden = true;
        }

        // regex for determining if certain characters are present
        const numbers = /\d/g;
        const whitespace = /\s/g;
        const uppercase = /[A-Z]/g;
        const lowercase = /[a-z]/g;
        const special = /[^\dA-Za-z\s]/g; // anything thats not numbers, letters, or whitespace


        let username = document.getElementById("username").value;
        if (username === undefined || username === null || typeof username !== "string") {
            errors = "";
        }
        else {
            username = username.trim();
            if (username.length === 0) {
                errors = "Invalid username or password.";
            }
            else if (username.length < 5 || username.length > 10) {
                errors = "Invalid username or password.";
            }

            if (username.match(numbers) !== null) {
                errors = "Invalid username or password.";
            }
        }


        let password = document.getElementById("password").value;
        if (password === undefined || password === null || typeof password !== "string") {
            errors = "Invalid username or password.";
        }
        else {
            password = password.trim();
            if (password.length === 0) {
                errors = "Invalid username or password.";
            }
            else if (password.length < 8) {
                errors = "Invalid username or password.";
            }

            if (password.match(whitespace) !== null) {
                errors = "Invalid username or password.";
            }

            if (password.match(uppercase) === null) { // any of these returning null -> condition not met
                errors = "Invalid username or password.";
            }
            if (password.match(lowercase) === null) {
                errors = "Invalid username or password.";
            }
            if (password.match(numbers) === null) {
                errors = "Invalid username or password.";
            }
            if (password.match(special) === null) {
                errors = "Invalid username or password.";
            }
        }


        // phew! now we either do nothing and let the submission continue or stop submission if there are errors

        if (errors.length !== 0) { // if there are errors...
            event.preventDefault(); // don't let the form do a POST to /register

            error.innerHTML = `<ul><li>${errors}</li></ul>`;
            error.hidden = false; // unhide error div
        }
    });
}

