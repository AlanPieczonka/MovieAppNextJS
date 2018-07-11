import { observer, inject } from 'mobx-react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import getGenres from '../utils/getGenres'
import _ from 'lodash/array'

@inject('appStore')
@observer
class MoviesList extends React.Component {
  static propTypes = {
    appStore: PropTypes.shape({
      movies: PropTypes.array.isRequired,
      requestStatus: PropTypes.string.isRequired
    }),
    genres: PropTypes.array.isRequired
  }

  render () {
    const { appStore: { movies, requestStatus }, genres } = this.props
    let moviesList
    if (movies.length === 0 && requestStatus === 'done') {
      moviesList = (
        <h1 className='text-center height100'>
          Unfortunately, we cannot find this movie!
        </h1>
      )
    } else {
      moviesList = _.chunk(movies, 4).map((section, i) => {
        return (
          <div className='columns columns--padding' key={i}>
            {section.map(({ title, poster_path, id, genre_ids }) => (
              <div className='column movie-cell' key={id}>
                <Link
                  prefetch
                  as={`movie/${id}`}
                  href={{ pathname: '/movie', query: { id } }}
                >
                  <a className='link white'>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                      alt={`Link to ${title}`}
                    />
                    <h1 className='bold white'>{title}</h1>
                  </a>
                </Link>
                <ul>
                  {getGenres(genres, genre_ids).map((genre, i) => (
                    <li key={i}>{genre}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      })
    }
    return (
      <div className='main'>
        {requestStatus === 'pending' ? (
          <h1 className='text-center height100'>Loading...</h1>
        ) : (
          <div className='container padding--top25'>{moviesList}</div>
        )}
      </div>
    )
  }
}

export default MoviesList
