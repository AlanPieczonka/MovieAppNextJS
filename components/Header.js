import { observer } from 'mobx-react';
import { searchMovie } from '../services/api';

@observer
class Header extends React.Component {
	handleChange = ({ target: { value } }) => {
		let { store } = this.props;

		store.updateSearchTerm(value);
		if (value.length > 5) {
			store.requestState = 'pending';
			searchMovie(value).then((movies) => {
				store.movies = movies;
				store.requestState = 'done';
			});
		} else if (value.length === 0) {
			store.fetchAllMovies();
		}
	};
	render() {
		return (
			<div className="header">
				<div className="container padding--top25">
					<div className="field is-horizontal">
						<div className="field-body">
							<div className="field">
								<div className="control has-icons-left has-icons-right">
									<h1>{this.props.store.searchTermEmpty}</h1>
									<input
										className="input is-large header"
										type="search"
										placeholder="Search movies"
										value={this.props.store.searchTerm}
										onChange={this.handleChange}
									/>
									<span className="icon is-medium is-left">
										<i className="fas fa-envelope" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
