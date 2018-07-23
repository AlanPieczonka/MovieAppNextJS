import Img from 'react-image'
import Link from 'next/link'
import getGenres from '../utils/getGenres'
import { RingLoader } from 'react-spinners'

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
            <Img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className='image-list'
              loader={
                <div className='flex-center'>
                  <RingLoader color={'#123abc'} />
                </div>
              }
              unloader={
                <img
                  src='https://i.pinimg.com/favicons/a4f459086724e56f18d3771b0bb2a184d22c3260a8f43d7d924a6722.png?95a08673b219455ac7272f1ce4a6b552'
                  className='image-list'
                />
              }
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
