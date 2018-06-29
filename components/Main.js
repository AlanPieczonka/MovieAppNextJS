import PropTypes from 'prop-types';
import chunk from './../utils/chunk';

const Main = ({ movies }) => {
	const moviesList = chunk(movies, 4).map((section, i) => {
		return (
			<div className="columns" key={i}>
				{section.map(({ title, poster_path, id }) => (
					<div className="column" key={id}>
						<img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`Link to ${title}`} />
						<div>{title}</div>
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
};

Main.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default Main;
