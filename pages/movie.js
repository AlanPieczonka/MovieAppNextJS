import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import style from '../styles/style.scss';
import Header from '../components/Header';
import API_KEY from '../api_key';

class Movie extends React.Component {
	static async getInitialProps({ query }) {
		const { id } = query;
		const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
		const movie = await res.json();

		return { movie };
	}

	static propTypes = {
		movie: PropTypes.object.isRequired
	};

	render() {
		return (
			<div className="main">
				<style dangerouslySetInnerHTML={{ __html: style }} />
				<Header />
				<MovieSingle movie={this.props.movie} />
			</div>
		);
	}
}

export default Movie;
