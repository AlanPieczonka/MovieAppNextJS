import { observer } from 'mobx-react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import chunk from '../utils/chunk';
import getGenres from '../utils/getGenres';

// not really required for now
@observer
class MoviesList extends React.Component {
	static propTypes = {
		movies: PropTypes.array.isRequired,
		genres: PropTypes.array.isRequired,
		requestStatus: PropTypes.string.isRequired
	};
	render() {
		const { movies, genres, requestStatus } = this.props;
		let moviesList;
		if (movies.length === 0 && requestStatus === 'done') {
			moviesList = <h1 className="text-center height100">Unfortunately, we cannot find this movie!</h1>;
		} else {
			moviesList = chunk(movies).map((section, i) => {
				return (
					<div className="columns columns--padding" key={i}>
						{section.map(({ title, poster_path, id, genre_ids }) => (
							<div className="column movie-cell" key={id}>
								<Link prefetch as={`movie/${id}`} href={{ pathname: '/movie', query: { id } }}>
									<img
										src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
										alt={`Link to ${title}`}
									/>
								</Link>
								<h1 className="bold">{title}</h1>
								<ul>{getGenres(genres, genre_ids).map((genre, i) => <li key={i}>{genre}</li>)}</ul>
							</div>
						))}
					</div>
				);
			});
		}
		return (
			<div className="main">
				{requestStatus === 'pending' && <h1 className="text-center">Loading...</h1>}
				<div className="container padding--top25">{moviesList}</div>
			</div>
		);
	}
}

export default MoviesList;
