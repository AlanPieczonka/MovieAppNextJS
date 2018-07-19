import { Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash/array'
import MovieCell from './MovieCell'

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
    const { movies, genres } = this.props.store
    let moviesList
    if (movies.length > 0) {
      moviesList = _.chunk(movies, 4).map((section, i) => {
        return (
          <div className='columns columns--padding' key={i}>
            {section.map(movie => (
              <Fragment key={movie.id}>
                <MovieCell movie={movie} genres={genres} />
              </Fragment>
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
        <h1 className='text-center padding--top25'>
          <a href='https://icons8.com' className='bold white'>
            Icon pack by Icons8
          </a>
        </h1>
      </div>
    )
  }
}

export default MoviesList
