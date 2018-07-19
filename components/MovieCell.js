import Link from 'next/link'
import getGenres from '../utils/getGenres'

class MovieCell extends React.Component {
  render () {
    const { movie, genres } = this.props
    return (
      <div className='column movie-cell' key={movie.id}>
        <Link
          prefetch
          as={`movie/${movie.id}`}
          href={{ pathname: '/movie', query: { id: movie.id } }}
        >
          <a className='link white'>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`Link to ${movie.title}`}
              className='image-list'
            />
            <h1 className='bold white'>{movie.title}</h1>
          </a>
        </Link>
        <ul>
          {getGenres(genres, movie.genre_ids).map((genre, i) => (
            <li key={i}>{genre}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default MovieCell
