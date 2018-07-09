import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import MovieSingle from '../components/MovieSingle';
import { getSingleMovie } from '../services/api';

import '../styles/style.scss';

@observer
class Movie extends React.Component {
	static async getInitialProps({ query: { id } }) {
		const movie = await getSingleMovie(id);
		return { movie };
	}

	static propTypes = {
		movie: PropTypes.object.isRequired
	};

	render() {
		return (
			<div className="main">
				<MovieSingle movie={this.props.movie} />
			</div>
		);
	}
}

export default Movie;
