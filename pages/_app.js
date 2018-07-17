import App, { Container } from 'next/app'
import React from 'react'
import withMobx from '../hocs/withMobx'
import { Provider } from 'mobx-react'

class MyApp extends App {
  render () {
    const { Component, pageProps, mobxStore } = this.props
    return (
      <Container>
        <Provider store={mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withMobx(MyApp)
