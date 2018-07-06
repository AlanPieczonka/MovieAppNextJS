import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import style from '../styles/style.scss';
import MovieSingle from '../components/MovieSingle';
import { getSingleMovie } from '../services/api';

@observer
class Movie extends React.Component {
	static async getInitialProps({ query: { id } }) {
		return {
			movie: await getSingleMovie(id)
		};
	}

	static propTypes = {
		movie: PropTypes.object.isRequired
	};

	render() {
		return (
			<div className="main">
				<style dangerouslySetInnerHTML={{ __html: style }} />
				<MovieSingle movie={this.props.movie} />
			</div>
		);
	}
}

export default Movie;
