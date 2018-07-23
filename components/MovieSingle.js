import { Fragment } from 'react'
import Img from 'react-image'
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
        <div className='hero-body padding--top0'>
          <div className='container has-text-centered'>
            <h1 className='title'>{movie.title}</h1>
            <div className='columns'>
              <div className='column'>
                <Img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className='image image-center'
                  unloader={
                    <img
                      src='https://i.pinimg.com/favicons/a4f459086724e56f18d3771b0bb2a184d22c3260a8f43d7d924a6722.png?95a08673b219455ac7272f1ce4a6b552'
                      className='image image-center height90'
                    />
                  }
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
