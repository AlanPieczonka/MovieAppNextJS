import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import style from '../styles/style.scss';
import Header from '../components/Header';
import API_KEY from '../api_key';

const Movie = ({ movie: { title, release_date, poster_path, runtime, vote_average, overview, genres } }) => (
    <div className="main">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Header />
        <div className="container">
            <div className="columns">
                <div className="column text-center">
                    <h1 className="title is-1">{title}</h1>
                </div>
                <div className="column">
                <h1 className="title is-1">NOT STYLED YET</h1>
                <div>{release_date}</div>
                <div>{runtime}</div>
                <div>{vote_average}</div>
                <div>{overview}</div>
                <div>{genres.map(genre => <p>{genre.name}</p>)}</div>
                </div>
            </div>
        </div>
                <div className="column">
                <figure className="image is-4by5">
                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="Poster of the movie"/>
                </figure>
                </div>
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
