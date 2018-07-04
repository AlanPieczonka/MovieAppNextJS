import { observable, computed, action } from 'mobx';
import { getAllMovies } from './services/api';

class Store {
	@observable searchTerm = '';
	@observable movies = [];
	@observable requestState = 'pending';

	constructor() {
		this.fetchAllMovies();
	}

	@action
	fetchAllMovies() {
		this.movies = [];
		this.requestState = 'pending';
		getAllMovies().then(
			action('fetchAllMoviesSucess', (movies) => {
				this.movies = movies;
				this.requestState = 'done';
			}),
			action('fetchAllMoviesError', (error) => {
				this.requestState = 'error';
			})
		);
	}

	@computed
	get status() {
		return this.searchTerm.length ? `Results for: ${this.searchTerm}` : 'Popular movies now';
	}

	@computed
	get searchTermEmpty() {
		return this.searchTerm.length ? 'searchTerm is not empty' : 'searchTerm is empty';
	}

	@action
	updateSearchTerm(searchTerm) {
		this.searchTerm = searchTerm;
	}
}

const appStore = new Store();

export default appStore;
