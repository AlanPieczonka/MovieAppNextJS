import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import style from '../styles/style.scss';
import Header from '../components/Header';
import MoviesList from '../components/MovieList';
import { getAllMovies, getAllGenres } from '../services/api';
import appStore from '../store';


@observer
class Index extends React.Component {
	static async getInitialProps() {
		const movies = await getAllMovies();
		const genres = await getAllGenres();
		// const movies = appStore.movies;

		return {
			movies,
			genres
		};
	}

	static propTypes = {
		movies: PropTypes.array.isRequired,
		genres: PropTypes.array.isRequired
	};

	render() {
		const { movies, genres } = this.props;
		return (
			<div>
				<style dangerouslySetInnerHTML={{ __html: style }} />
				<Header store={appStore} />
				<MoviesList status={appStore.status} requestState={appStore.requestState} movies={appStore.movies} genres={genres} />
			</div>
		);
	}
}

export default Index;
