// Necessary variables
const inputText = document.querySelector(".inputbox")
const searchButton = document.querySelector(".searchbtn")
const outputSection = document.querySelector(".output")
const indivicontainer = document.querySelector(".indivicontainer")
const closeButton = document.querySelector(".closebtn")
const aboutButton = document.querySelector(".about")
const plotButton = document.querySelector(".plot")
const castButton = document.querySelector(".cast")
const awardsButton = document.querySelector(".awards")
const ratingsButton = document.querySelector(".ratings")

//individetails vaiables
const aboutDetails = document.querySelector("#about")
const plotDetails = document.querySelector("#plot")
const castDetails = document.querySelector("#cast")
const awardsDetails = document.querySelector("#awards")
const ratingsDetails = document.querySelector("#ratings")

//Global array
let arrayForWatchlist = []

//======================================================================

// calling the api fetching function
searchButton.addEventListener("click", () => {
    getData()
})

// getting clicked movie's id
outputSection.addEventListener("click", (e) => {
    clickedResult = e.target.closest(".results")

    if(clickedResult == null)
        return
    else{
        getAllData(clickedResult.querySelector("h3").innerText) // calling the funtion where it is passing movie id as a argument
    }
})

// individetails button's functions
closeButton.addEventListener("click", () => {
    indivicontainer.style.display = "none"
})
aboutButton.addEventListener("click", ()=>{
    aboutDetails.scrollIntoView({behavior: "smooth"})
})

plotButton.addEventListener("click", ()=> {
    plotDetails.scrollIntoView({behavior: "smooth"})
})

castButton.addEventListener("click", ()=> {
    castDetails.scrollIntoView({behavior: "smooth"})
})

awardsButton.addEventListener("click", ()=> {
    awardsDetails.scrollIntoView({behavior: "smooth"})
})

ratingsButton.addEventListener("click", ()=> {
    ratingsDetails.scrollIntoView({behavior: "smooth"})
})
// individetails button's functions

//======================================================================

// fetching indiviual details of a movie
async function getAllData(data) {
    const movieId = data

    const url = `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=2b572063`

    try{
        const response = await fetch(url)
        const responseData = await response.json()
        // console.log(responseData);
        displayIndiviResult(responseData)
    }catch (error){
        console.error("🚨 Fetch Error:", error);
    }
}

//======================================================================

// Api fetching function
async function getData(){
    let movieName = inputText.value.trim()     //taking the input value

    const url = `https://www.omdbapi.com/?s=${movieName}&apikey=2b572063`    //api url

    // fetching api
    try{
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data);
        displayResult(data)
    }catch (error){
        console.error("🚨 Fetch Error:", error);
    }
}

//======================================================================

function displayIndiviResult(data){
    indivicontainer.style.display = "block"

    // making about to be appeare first at the top
    document.querySelector(".individetails").scrollTop = 0;

    aboutDetails.innerHTML = ""
    plotDetails.innerHTML = ""
    castDetails.innerHTML = ""
    awardsDetails.innerHTML = ""
    ratingsDetails.innerHTML = ""

    // add button
    const addButton = document.createElement("button")
    addButton.className = "addbtn"
    addButton.innerText = "+"

    addButton.addEventListener("click", () => {
        const movieData = {
            imdbID: data.imdbID,
            Title: data.Title,
            Poster: data.Poster,
            Year: data.Year
        }
        let arrayForWatchlist = JSON.parse(localStorage.getItem("myWatchList")) || [];

        // 3. Prevent duplicates (Optional but highly recommended)
        const isDuplicate = arrayForWatchlist.some(savedMovie => {
            if(savedMovie.imdbID === movieData.imdbID)
                return true
            else
                return false
        });

        if (!isDuplicate) {
            // 4. Push the new movie into the fetched array
            arrayForWatchlist.push(movieData);

            // 5. Save the updated array back to localStorage
            localStorage.setItem("myWatchList", JSON.stringify(arrayForWatchlist));
            
            alert(`${movieData.Title} is added to your Watchlist!`);
        } else {
            alert(`${movieData.Title} is already in your Watchlist!`);
        }
    })
    // add button
    


    // About section
    const aboutHeader = document.createElement("h1")
    aboutHeader.innerText = "About"

    // 2. Create the Flex Wrapper (The Row)
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "about-content";

    const moviePoster = document.createElement("img")
    moviePoster.src = data.Poster

    // 4. Create the Info Container (Right Side)
    const infoBox = document.createElement("div");
    infoBox.className = "about-info";

    const Title = document.createElement("p")
    Title.className = "indivititle"
    Title.innerText = `Title: ${data.Title}`

    const Year = document.createElement("p")
    Year.className = "indiviyear"
    Year.innerText = `Released on: ${data.Released}`

    const Language = document.createElement("p")
    Language.className = "indivilanguage"
    Language.innerText = `Language: ${data.Language}`

    const Genre = document.createElement("p")
    Genre.className = "indivigenre"
    Genre.innerText = `Genre: ${data.Genre}`

    const Country = document.createElement("p")
    Country.className = "indivicountry"
    Country.innerText = `Country: ${data.Country}`

    const Rated = document.createElement("p")
    Rated.className = "indivirated"
    Rated.innerText = `Rated: ${data.Rated}`

    const Runtime = document.createElement("p")
    Runtime.className = "indiviruntime"
    Runtime.innerText = `Runtime: ${data.Runtime}`
    //About section

    // plot section
    const plotHeader = document.createElement("h1")
    plotHeader.innerText = "Plot"

    const Plot = document.createElement("p")
    Plot.className = "indiviplot"
    Plot.innerText = `${data.Plot}`
    // plot section

    // cast section
    const castHeader = document.createElement("h1")
    castHeader.innerText = "Cast and crew"

    const Actors = document.createElement("p")
    Actors.className = "indiviactors"
    Actors.innerText = `Actors: ${data.Actors}`

    const Director = document.createElement("p")
    Director.className = "individirector"
    Director.innerText = `Director: ${data.Director}`

    const Writer = document.createElement("p")
    Writer.className = "indiviwriter"
    Writer.innerText = `Writer: ${data.Writer}`
    // cast section

    // awards section
    const awardsHeader = document.createElement("h1")
    awardsHeader.innerText = "Awards and box-office"

    const Awards = document.createElement("p")
    Awards.className = "indiviawards"
    Awards.innerText = `Awards and nominations: ${data.Awards}`

    const boxOffice = document.createElement("p")
    boxOffice.className = "indiviboxoffice"
    boxOffice.innerText = `Box-Office: ${data.BoxOffice}`
    // awards section

    // ratings section
    const ratingsHeader = document.createElement("h1")
    ratingsHeader.innerText = "Ratings"

    const Ratings = data.Ratings

    const internetMovieDatabase = document.createElement("p")
    internetMovieDatabase.className = "indivirating"
    internetMovieDatabase.innerText = "Internet Movie Database: N/A" // Default fallback

    const rottenTomatoes = document.createElement("p")
    rottenTomatoes.className = "indivirating"
    rottenTomatoes.innerText = "Rotten Tomatoes: N/A" // Default fallback

    const metacritic = document.createElement("p")
    metacritic.className = "indivirating"
    metacritic.innerText = "Metacritic: N/A" // Default fallback

    Ratings.forEach(rating=>{
        if(rating.Source == "Internet Movie Database")
            internetMovieDatabase.innerText = `${rating.Source}: ${rating.Value}`
        else if(rating.Source == "Rotten Tomatoes")
            rottenTomatoes.innerText = `${rating.Source}: ${rating.Value}`
        else
            metacritic.innerText = `${rating.Source}: ${rating.Value}`
    })
    // ratings section

    // adding all created detail's variable
    indivicontainer.append(addButton)
    infoBox.append(Title, Year, Language, Genre, Country, Rated, Runtime); // Add more here (Genre, Language, etc.)
    contentWrapper.append(moviePoster, infoBox); // Poster on left, Text on right
    
    aboutDetails.append(aboutHeader, contentWrapper); // Header on top, Row below

    plotDetails.append(plotHeader, Plot)

    castDetails.append(castHeader, Actors, Director, Writer)

    awardsDetails.append(awardsHeader, Awards, boxOffice)

    ratingsDetails.append(ratingsHeader, internetMovieDatabase, rottenTomatoes, metacritic)
    // adding all created detail's variable
}

//======================================================================

function displayResult(data){
    // 1. Clear the screen of previous searches!
    outputSection.innerHTML = "";
    
    if(data.Response === "True"){
        const movieArray = data.Search      // storing the fetched object array into a variable

        movieArray.forEach(movie => {       // traversing array elements and accessing every elements
            const resultDiv = document.createElement("div")     // creating div to store each array elements
            resultDiv.className = "results"

            const poster = document.createElement("img")        // creating img to store each array elements poster
            poster.src = movie.Poster

            const Title = document.createElement("p")           // creating p tag to display name and year
            Title.innerText = `${movie.Title} (${movie.Year})`

            const movieId = document.createElement("h3")        // fetching movie id 
            movieId.innerText = `${movie.imdbID}`

            resultDiv.append(poster, Title, movieId)        // attaching all created elements
            outputSection.appendChild(resultDiv)
        });
    }
}