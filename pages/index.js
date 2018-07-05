import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import style from '../styles/style.scss';
import Header from '../components/Header';
import MoviesList from '../components/MovieList';
import { getAllGenres } from '../services/api';
import { searchStore, appStore } from '../store';

@observer
class Index extends React.Component {
	static async getInitialProps() {
		return {
			genres: await getAllGenres(),
		};
	}

	static propTypes = {
		genres: PropTypes.array.isRequired
	};

	render() {
		const { genres } = this.props;
		return (
			<div>
				<style dangerouslySetInnerHTML={{ __html: style }} />
				<Header searchStore={searchStore} />
				<MoviesList requestStatus={appStore.requestStatus} movies={appStore.movies} genres={genres} />
			</div>
		);
	}
}

export default Index;
