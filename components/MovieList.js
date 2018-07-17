import { observer, inject } from 'mobx-react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import getGenres from '../utils/getGenres'
import _ from 'lodash/array'

@inject('store')
@observer
class MoviesList extends React.Component {
  static propTypes = {
    store: PropTypes.shape({
      movies: PropTypes.array.isRequired,
      genres: PropTypes.array.isRequired,
      requestStatus: PropTypes.string.isRequired
    })
  }
  render () {
    let moviesList
    if (this.props.store.movies.length > 0) {
      moviesList = _.chunk(this.props.store.movies, 4).map((section, i) => {
        return (
          <div className='columns columns--padding' key={i}>
            {section.map(movie => (
              <div className='column movie-cell' key={movie.id}>
                <Link
                  prefetch
                  as={`movie/${movie.id}`}
                  href={{ pathname: '/movie', query: { id: movie.id } }}
                >
                  <a className='link white'>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${
                        movie.poster_path
                      }`}
                      alt={`Link to ${movie.title}`}
                    />
                    <h1 className='bold white'>{movie.title}</h1>
                  </a>
                </Link>
                <ul>
                  {getGenres(this.props.store.genres, movie.genre_ids).map(
                    (genre, i) => <li key={i}>{genre}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )
      })
    } else {
      moviesList = <h1 className='text-center height100'>No movies found!!!</h1>
    }
    return (
      <div className='main'>
        {this.props.store.requestStatus === 'pending' ? (
          <h1 className='text-center height100'>Loading...</h1>
        ) : (
          <div className='container padding--top25'>{moviesList}</div>
        )}
        {this.props.store.requestStatus === 'error' && (
          <h1 className='text-center height100'>There has been an error</h1>
        )}
      </div>
    )
  }
}

export default MoviesList
