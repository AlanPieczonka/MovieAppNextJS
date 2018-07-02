import Link from 'next/link';
import PropTypes from 'prop-types';
import chunk from '../utils/chunk';
import getGenres from '../utils/getGenres';

class MoviesList extends React.Component {
	static propTypes = {
		movies: PropTypes.array.isRequired,
		genres: PropTypes.array.isRequired
	};
	render() {
		const { movies, genres } = this.props;
		const moviesList = chunk(movies, 4).map((section, i) => {
			return (
				<div className="columns" key={i}>
					{section.map(({ title, poster_path, id, genre_ids }) => (
						<div className="column movie-cell" key={id}>
							<Link prefetch as={`movie/${id}`} href={{ pathname: '/movie', query: { id } }}>
								<img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`Link to ${title}`} />
							</Link>
							<div className="bold">{title}</div>
							<div>{getGenres(genres, genre_ids).map((genre, i) => <p key={i}>{genre}</p>)}</div>
						</div>
					))}
				</div>
			);
		});
		return (
			<div className="main">
				<div className="container padding--top100">{moviesList}</div>
			</div>
		);
	}
}

export default MoviesList;
