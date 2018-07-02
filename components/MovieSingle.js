// todo: add propTypes
class MovieSingle extends React.Component {
	render() {
		return (
			<React.Fragment>
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
							<div>{genres.map((genre) => <p key={genre.name}>{genre.name}</p>)}</div>
						</div>
					</div>
				</div>
				<div className="column">
					<figure className="image is-4by5">
						<img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="Poster of the movie" />
					</figure>
				</div>
			</React.Fragment>
		);
	}
}

export default MovieSingle;
