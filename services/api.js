import fetch from 'isomorphic-unfetch';
import API_KEY from '../api_key';

export const getAllMovies = async () => {
	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
	);
	const { results } = await res.json();

	return results;
};

export const getSingleMovie = async (id) => {
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
	const movie = await res.json();

	return movie;
};

export const getAllGenres = async () => {
	const genresList = await fetch(
		'https://api.themoviedb.org/3/genre/movie/list?api_key=25e0de523619bc43f6c36fe4fc6d97ed&language=en-US'
	);
	const { genres } = await genresList.json();

	return genres;
};
