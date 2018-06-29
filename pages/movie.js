import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import style from '../styles/style.scss';
import Header from '../components/Header';
import API_KEY from '../api_key';

const Movie = ({ movie }) => (
    <div className="main">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Header />
        <h1>{movie.title}</h1>
    </div>
);

Movie.getInitialProps = async ({ query }) => {
	const { id } = query;
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
	const movie = await res.json();
	return { movie };
};

Movie.propTypes = {
    movie: PropTypes.object.isRequired,
}

export default Movie;
