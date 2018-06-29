import fetch from 'isomorphic-unfetch';
import style from '../styles/style.scss';
import Header from '../components/Header';
import Main from '../components/Main';
import API_KEY from '../api_key';

const Index = ({ movies, genres }) => (
	<div>
		<style dangerouslySetInnerHTML={{ __html: style }} />
		<Header />
		<Main movies={movies} genres={genres} />
	</div>
);

Index.getInitialProps = async () => {
	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
	);
	const { results } = await res.json();

	const genresList = await fetch(
		'https://api.themoviedb.org/3/genre/movie/list?api_key=25e0de523619bc43f6c36fe4fc6d97ed&language=en-US'
	);
	const { genres } = await genresList.json();

	return {
		movies: results,
		genres
	};
};

export default Index;
