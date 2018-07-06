import Link from 'next/link';
import PropTypes from 'prop-types';

// todo: add propTypes
class MovieSingle extends React.Component {
	static propTypes = {
		movie: PropTypes.shape({
			title: PropTypes.string.isRequired,
			release_date: PropTypes.string.isRequired,
			runtime: PropTypes.number.isRequired,
			vote_average: PropTypes.number.isRequired,
			overview: PropTypes.string.isRequired,
			genres: PropTypes.array.isRequired,
			poster_path: PropTypes.string.isRequired
		})
	};
	render() {
		const { title, release_date, runtime, vote_average, overview, genres, poster_path } = this.props.movie;
		return (
			<React.Fragment>
				<div className="hero-body">
					<div className="container has-text-centered">
						<h1 className="title">{title}</h1>
						<div className="columns">
							<div className="column">
								<img
									src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
									className="image image-center"
								/>
							</div>
							<div className="column">
								<section>
									<p className="title is-3">Runtime</p>
									<p className="subtitle is-5">{runtime}</p>
								</section>
								<section>
									<p className="title is-3">Release date</p>
									<p className="subtitle is-5">{release_date}</p>
								</section>
								<section>
									<p className="title is-3">Average vote</p>
									<p className="subtitle is-5">{vote_average}</p>
								<progress className="progress is-info" value={vote_average} max="10">
									{vote_average}
								</progress>
								</section>
								<section>
								<p className="title is-3">Genres</p>
								<p className="subtitle is-5">
									{genres.map((genre) => (
										<React.Fragment key={genre.id}>{genre.name} </React.Fragment>
									))}
								</p>
								</section>
								<p>{overview}</p>
								<div className="text-center">
									<Link href="/">
										<button className="button margin--top25">Go back to the main page</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default MovieSingle;
