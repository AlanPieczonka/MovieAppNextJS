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
	get searchTermEmpty() {
		if (this.searchTerm.length) {
			return 'searchTerm is not empty';
		} else {
			return 'searchTerm is empty';
		}
	}

	@action
	updateSearchTerm(searchTerm) {
		this.searchTerm = searchTerm;
	}
}

const appStore = new Store();

export default appStore;
