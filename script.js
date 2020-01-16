const apiKey = "8e4e8b5";

const input = document.querySelector("input")
const searchButton = document.querySelector("#search-button")
const searchResults = document.querySelector("#search-results")

const modal = document.querySelector("#modal")
const modalContent = document.querySelector("#modal-content")

const exit = document.querySelector("#exit")
const screen = document.querySelector("#screen")

const favorites = (localStorage.length > 0 ? JSON.parse(localStorage.getItem("favorites")) : [])

const favoritesPage = window.location.pathname.includes("favorites")

    if (favoritesPage) {
        favorites.forEach(function (movie) {
        searchResults.innerHTML += 
         `<div id=${movie.id} class="movie">
         <img src=${movie.poster} />
         <h3>${movie.title}</h3>
         <small>${movie.year}</small>
        </div>`
        })
    }


searchButton.addEventListener("click", async function () {
  searchResults.innerHTML = ""
    
  const search = input.value
  const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`)
  const movies = response.data.Search
 
  movies.forEach(function (movie) {
    searchResults.innerHTML += 
    `<div id=${movie.imdbID} class="movie">
    <img src=${movie.Poster} />
    <h3>${movie.Title}</h3>
    <small>${movie.Year}</small>
    </div>`
  })
})

document.addEventListener ("click", async function (e) {
    const element = e.target.parentElement

    if (element.className === "movie") {
        modal.style.display = "block"
        screen.style.display = "block"
        const movieId = element.id
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
        const movie = response.data 
        modalContent.innerHTML =
        `<h3>${movie.Title} - ${movie.Year}</h3>
        <p>Directed by: ${movie.Director}</p>
        <p>Starring: ${movie.Actors}</p>
        <p><i>${movie.Plot}</i></p>
        <button id=${movie.imdbID} class="favorite">Add Favorite</button>`

    } else if (e.target.className === "favorite") {
        const movieId = e.target.id
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
        const movie = response.data
        favorites.push({
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster,
            year: movie.Year
        })
        localStorage.setItem("favorites", JSON.stringify(favorites))
        alert(`${movie.Title} was added to your favorites`)
    }
})

exit.addEventListener("click", function () {
    modal.style.display = "none"
    screen.style.display = "none"
})

screen.addEventListener("click", function () {
    modal.style.display = "none"
    screen.style.display = "none"
})

// 1. call for movie details
// 2. innerHTML to fill in details
// 3. click event on 'x'
// 4. click event outside box
// 5. grey screen appears 