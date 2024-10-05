/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page. You can use a client-side fetch or axios request instead of AJAX)
*/

/**
 * binds an event listener to a given link. the new event will load content asynchronously 
 * @param {*} link  jquery <li> element with nested <a class="searchLink"> element, to which the new click event will be bound
 */
const bindClickEvent = (link) => {
    const searchTag = link.find(".searchLink"); // get reference for the <a> element
    searchTag.click((event) => {
        event.preventDefault();

        const imdbID = searchTag.attr("data-id"); // get the imdb id from the attributes
        const requestConfig = {
            method: "GET",
            url: `https://www.omdbapi.com/?apikey=KEY_GOES_HERE&i=${imdbID}`
        };

        $.ajax(requestConfig).then((response) => {
            if (response === undefined || response === null || Object.keys(response).includes("Error")) {
                $("#error").html(`Could not find movie with id '${imdbID}'`);
                $("#error").removeAttr("hidden");
            }
            else {
                let movieDetails = `
                <article>
                    <h1 class="header">${!response.Title ? "N/A" : response.Title}</h1>
                    
                    <img alt="${!response.Title ? "N/A" : response.title} Poster" src="${!response.Poster ? "/public/no_image.jpeg" : response.Poster}">
                    
                    <h2 class="header">Plot</h2>
                    <p>${!response.Plot ? "N/A" : response.Plot}</p>
                
                    <section id="data">
                        <h3 class="header">Info</h3>
                        <dl>
                            <dt>Year Released:</dt>
                            <dd>${!response.Year ? "N/A" : response.Year}</dd>
                      
                            <dt>Rated:</dt>
                            <dd>${!response.Rated ? "N/A" : response.Rated}</dd>
                      
                            <dt>Runtime:</dt>
                            <dd>${!response.Runtime ? "N/A" : response.Runtime}</dd>
                      
                            <dt>Genre(s):</dt>
                            <dd>${!response.Genre ? "N/A" : response.Genre}</dd>
                      
                            <dt>Box Office Earnings:</dt>
                            <dd>${!response.BoxOffice ? "N/A" : response.BoxOffice}</dd>
                      
                            <dt>DVD Release Date:</dt>
                            <dd>${!response.DVD ? "N/A" : response.DVD}</dd>
                        </dl>
                    </section>
                
                    <section>
                        <h4 class="header">Cast and Crew</h4>
                        <p><strong>Director:</strong> ${!response.Director ? "N/A" : response.Director}</p>
                        <p><strong>Writer:</strong> ${!response.Writer ? "N/A" : response.Writer}</p>
                        <p><strong>Cast:</strong> ${!response.Actors ? "N/A" : response.Actors}</p>
                    </section>
                  
                    <section>
                        <h4 class="header">Ratings</h4>
                        <table class="my_coolratings_table">
                            <tr>
                                <th>Source</th>
                                <th>Rating</th>
                            </tr>`;

                if (response.Ratings !== undefined && response.Ratings !== null) {
                    response.Ratings.forEach((rating) => {
                        movieDetails += `
                            <tr>
                                <td>${rating.Source}</td>
                                <td>${rating.Value}</td>
                            </tr>`;
                    });
                }

                movieDetails += `
                        </table>
                    </section>
                
                </article>`;
                $("#movieDetails").html(movieDetails); // set the html of the details
                $("#searchResults").attr("hidden", true); // hide the search results
                $("#movieDetails").removeAttr("hidden"); // unhide details and rootLink
                $("#rootLink").removeAttr("hidden");
            }
        });
    });
};



$("#searchMovieForm").submit((event) => {
    event.preventDefault();
    let error = "";
    $("#error").attr("hidden", true);

    const searchTerm = $("#movie_search_term").val().trim();
    if (!searchTerm || typeof searchTerm !== "string" || searchTerm.length === 0) {
        error = "Invalid or empty search term.";
    }

    if (error.length !== 0) {
        $("#error").html(error);
        $("#error").removeAttr("hidden");
    }
    else {
        $("movieDetails").attr("hidden", true); // set movie details to hidden if not already
        $("searchResults").html(""); // empty the search results list

        let requestConfig = {
            method: "GET",
            url: `http://www.omdbapi.com/?apikey=KEY_GOES_HERE&s=${searchTerm}`
        };

        $.ajax(requestConfig).then((response) => {
            if (response === undefined || response === null || !Object.keys(response).includes("Search")) { // error message if we can't get the data
                $("#error").html(`We're sorry, but no results were found for '${searchTerm}'.`); // set error message and do nothing
                $("#error").removeAttr("hidden");
            }
            else { // otherwise...
                let results = response.Search;

                requestConfig.url = `http://www.omdbapi.com/?apikey=KEY_GOES_HERE&s=${searchTerm}&page=2`; // try and get the second page
                $.ajax(requestConfig).then((responseAgain) => {
                    if (responseAgain !== undefined && responseAgain !== null && Object.keys(responseAgain).includes("Search")) { // only append if there is a second page (if not, do nothing)
                        results = results.concat(responseAgain.Search);
                    }

                    if (results.length === 0) {
                        $("#error").html(`No movies were found for term '${searchTerm}'`);
                        $("#error").removeAttr("hidden");
                    }
                    else {
                        const searchResultsList = $("#searchResults");
                        results.forEach((mov) => { 
                            const newItem = $(`<li><a href="javascript:void(0)" class="searchLink" data-id="${mov.imdbID}">${mov.Title}</a></li>`);
                            bindClickEvent(newItem);
                            searchResultsList.append(newItem);
                        });

                        searchResultsList.removeAttr("hidden"); // unhide the search results and rootLink
                        $("#rootLink").removeAttr("hidden");
                    }
                });
            }
        });
    }
});
