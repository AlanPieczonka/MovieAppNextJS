import { observable, computed, action, autorun } from 'mobx';
import { getAllMovies, searchMovie } from './services/api';

class SearchStore {
	@observable searchTerm = '';

	@action
	setSearchTerm = (searchTerm) => {
		this.searchTerm = searchTerm;
	};
}

// another store only for API??
// - requestStatus
// fetching all of the stuff

class Store {
	@observable searchStore;
	@observable requestStatus = 'done';
	@observable movies = [];
	@observable initialMovies = null;

	constructor(searchStore) {
		this.searchStore = searchStore;
		this.fetchInitialMovies();
		autorun(
			() => {
				if (this.searchStore.searchTerm.length > 5) {
					this.requestStatus = 'pending';
					this.fetchSpecificMovies(this.searchStore.searchTerm);
				} else if (this.searchStore.searchTerm.length < 5 && this.initialMovies !== null) {
					this.movies = this.initialMovies;
				}
			},
			{ delay: 1000 },
		);
	}

	@computed
	get searchTermFromMainStore() {
		return this.searchStore.searchTerm;
	}

	@action
	fetchInitialMovies() {
		this.requestStatus = 'pending';
		getAllMovies().then(
			action('fetchInitialMoviesSuccess', (movies) => {
				this.initialMovies = movies;
				this.movies = this.initialMovies;
				this.requestStatus = 'done';
			}),
			action('fetchAllMoviesEror', (error) => {
				this.requestStatus = 'error';
			})
		);
	}

	@action
	fetchAllMovies() {
		console.log('fetchAllMovies started');
		this.requestStatus = 'pending';
		getAllMovies().then(
			action('fetchAllMoviesSucess', (movies) => {
				this.movies = movies;
				this.requestStatus = 'done';
			}),
			action('fetchAllMoviesError', (error) => {
				this.requestStatus = 'error';
			})
		);
	}

	@action
	fetchSpecificMovies(query) {
		console.log('starting to search specific movies with query: ', query);
		this.requestStatus = 'pending';
		searchMovie(query).then(
			action('fetchSingleMovieSuccess', (movies) => {
				this.movies = movies;
				this.requestStatus = 'done';
			}),
			action('fetchSingleMovieError', (error) => {
				this.requestStatus = 'error';
			})
		);
	}
}

const searchStore = new SearchStore();
const appStore = new Store(searchStore);

export { appStore, searchStore };
