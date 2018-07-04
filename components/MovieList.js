import Link from 'next/link';
import PropTypes from 'prop-types';
import chunk from '../utils/chunk';
import getGenres from '../utils/getGenres';
import { observer } from 'mobx-react';

@observer // not really required for now
class MoviesList extends React.Component {
	static propTypes = {
		movies: PropTypes.array.isRequired,
		genres: PropTypes.array.isRequired
	};
	render() {
		const { movies, genres, requestState, status } = this.props;
		const moviesList = chunk(movies, 4).map((section, i) => {
			return (
				<div className="columns columns--padding" key={i}>
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
				<h1 className="text-center">Request state: {requestState}</h1>
				<h2 className="text-center">{status}</h2>
				<div className="container padding--top100">{moviesList}</div>
			</div>
		);
	}
}

export default MoviesList;
