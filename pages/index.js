import { Fragment } from 'react'
import Header from '../components/Header'
import MoviesList from '../components/MovieList'

import '../styles/style.scss'

class Index extends React.Component {
  render () {
    return (
      <Fragment>
        <Header />
        <MoviesList />
      </Fragment>
    )
  }
}

export default Index
