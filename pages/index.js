import { observer, Provider } from 'mobx-react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MoviesList from '../components/MovieList';
import { getAllGenres } from '../services/api';
import { searchStore, appStore } from '../store';

import '../styles/style.scss';

@observer
class Index extends React.Component {
	static async getInitialProps() {
		const genres = await getAllGenres();
		return { genres };
	}

	static propTypes = {
		genres: PropTypes.array.isRequired
	};

	render() {
		const { genres } = this.props;
		return (
			<div>
				<Provider searchStore={searchStore}>
					<Header />
				</Provider>
				<Provider appStore={appStore}>
					<MoviesList genres={genres} />
				</Provider>
			</div>
		);
	}
}

export default Index;
