import { observable, computed, action, autorun } from 'mobx'
import { getAllMovies, searchMovie } from './utils/api'
import { Throttle } from 'lodash-decorators'

class Store {
  @observable movies = []
  @observable searchTerm = ''
  @observable requestStatus = ''

  constructor ({ movies, genres }) {
    this.initialMovies = movies
    this.movies = this.initialMovies
    this.genres = genres
    this.searchTerm = ''
    this.requestStatus = 'done'
  }

  @action
  setSearchTerm (term) {
    this.searchTerm = term
    this.searchTerm.length > 0
      ? this.searchMovies()
      : this.setMovies(this.initialMovies)
  }

  @Throttle(1500, { leading: false })
  @action
  async searchMovies () {
    this.requestStatus = 'pending'

    let movies
    try {
      movies = await searchMovie(this.searchTerm)
      this.setMovies(movies)
    } catch (err) {
      this.requestStatus = 'error'
    }
  }

  @action
  setMovies (movies) {
    this.movies = movies
    this.requestStatus = 'done'
  }
}

let store = null
export function initializeStore (isServer) {
  if (isServer) {
    return new Store(isServer)
  } else {
    if (store === null) {
      store = new Store(isServer)
    }
    return store
  }
}
