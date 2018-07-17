import { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

class MovieSingle extends React.Component {
  static propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      runtime: PropTypes.number.isRequired,
      vote_average: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      genres: PropTypes.array.isRequired,
      poster_path: PropTypes.string.isRequired
    })
  }
  render () {
    const { movie } = this.props
    return (
      <Fragment>
        <div className='hero-body padding--top0 height100'>
          <div className='container has-text-centered'>
            <h1 className='title'>{movie.title}</h1>
            <div className='columns'>
              <div className='column'>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className='image image-center'
                />
              </div>
              <div className='column'>
                <section>
                  <p className='title is-3'>Runtime</p>
                  <p className='subtitle is-5'>{movie.runtime}m</p>
                </section>
                <section>
                  <p className='title is-3'>Release date</p>
                  <p className='subtitle is-5'>{movie.release_date}</p>
                </section>
                <section>
                  <p className='title is-3'>Average vote</p>
                  <p className='subtitle is-5' style={{ marginBottom: 5 }}>
                    {movie.vote_average}
                  </p>
                  <progress
                    className='progress is-info'
                    value={movie.vote_average}
                    max='10'
                  >
                    {movie.vote_average}
                  </progress>
                </section>
                <section style={{ marginBottom: 5 }}>
                  <p className='title is-3'>Genres</p>
                  <p className='subtitle is-5'>
                    {movie.genres.map(genre => (
                      <Fragment key={genre.id}>{genre.name}&nbsp;</Fragment>
                    ))}
                  </p>
                </section>
                <article>{movie.overview}</article>
                <div className='text-center'>
                  <Link href='/'>
                    <button className='button margin--top25'>
                      Go back to the main page
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MovieSingle
