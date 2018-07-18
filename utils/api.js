import fetch from 'isomorphic-unfetch'

async function getAllMovies () {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.API_KEY
    }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
  )
  const { results } = await res.json()

  return results
}

async function getSingleMovie (id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      process.env.API_KEY
    }&language=en-US`
  )
  const movie = await res.json()

  return movie
}

async function searchMovie (query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.API_KEY
    }&language=en-US&query=${query}&page=1&include_adult=false`
  )
  const { results } = await res.json()

  return results
}

async function getAllGenres () {
  const genresList = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${
      process.env.API_KEY
    }&language=en-US`
  )
  const { genres } = await genresList.json()

  return genres
}

export { getAllMovies, getSingleMovie, searchMovie, getAllGenres }
