import React, { Fragment } from 'react'
import { initializeStore } from '../store'
import { getAllMovies, getAllGenres } from '../utils/api'
import Favicon from 'react-favicon'

const isServer = typeof window === 'undefined'
const __NEXT_MOBX_STORE__ = '__NEXT_MOBX_STORE__'

function getOrCreateStore (initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_MOBX_STORE__]) {
    window[__NEXT_MOBX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_MOBX_STORE__]
}

export default App => {
  return class AppWithMobx extends React.Component {
    static async getInitialProps (appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const movies = await getAllMovies()
      const genres = await getAllGenres()
      const mobxStore = getOrCreateStore({ movies, genres })

      // Provide the store to getInitialProps of pages
      appContext.ctx.mobxStore = mobxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext)
      }

      return {
        ...appProps,
        initialMobxState: mobxStore
      }
    }

    constructor (props) {
      super(props)
      this.mobxStore = getOrCreateStore(props.initialMobxState)
    }

    render () {
      return (
        <Fragment>
          <Favicon url='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOPSURBVGhD7ZpbyE1ZHMC/YVymXHIdyaVRMg9ug5lSygMPE7mGUNIUZRoeJKaUXJoSDzO5NDU8KCKkyLUGISGFGZqp0RiUeDBhZlzGnd9vd5a2w/mcffb3Od+u/atfX2uds9bZ/72ue+2vJicnp2Ia4TjcitfwccHLuAGH4rtojl/hPryJL/A+/o7fYz+sVz7Dc+gPB5/g86K8/dgF38ZwvILx73sj4ulnuBFbYp0zAu+hP/QnzsLuaAs1wU9xIf6Nfuc69sY4M/Ep+vlZnIadUJrhAFyJd9Hv/IalbkhF9Eeb3srXYFMsRRs8gH7XrtcBxRthEN7tBfgBlqIrnkHrOI0fYWr8Qe+ela41owxsocNoGbtIK7SFTM/FcmiNjhnLLDIjLWPRyi5hbS1RjF3iAdoCq9E6jmASvkDH37/Ywow0bEYv4psolYx1aNngl5iUQ2jZiVEqBWGG+SRKJSO0pv6PDuikzEPLOy2n4iHavB9GqWQ4XYdA/jKjAsaj5bdHqRTYP62okrv5OYZAnMEqYRJa3kkjFc7lVtQ3SiXDdSIE4sLpTJSUxWj576JUClw3rGhplErGTrTso8JfA0uCU/+vaNlhZqQhdI/b2M6MMhmEji2n4DloHRcxyRTuTGU5u6U7iNRsQyt0kSvnQjqi2xjLLMPG+Esh7caytlU90BO9eZaZbEZd8DFeRSs9jt2wFLagi6ffPYUh8D74H5q/A9tjKUZi2LNtMaOucP9kH72DVm6f985OwIE4GKfjbgw7Yadbu1ePmI6RMF7+QcffaHSzOAS/xqPo53oCe6Flk3TJN2iLPjOEiqupC6q764rYhFZiX3U3Wi2ducIziw91ibH5LewYqTY+/3gtdunEWFAbAk4AXsveKPV23HE7ZvW1CSkrgfjwFp5/gj/iK0JmQ6BUIE5IF9DPbqGHIJkLxL2bj8Lmn0eDmlpIN/hAXJAdA647Jwt5f2A4G8hMIMW6FYqftGQmELcuB/FnXIF2pziZCaS26VfyQN4XeSCSB1IP5IFIQwzEA3UPJcZgZywmM4HE9TXFEoyTmUBuoMenezC8NPoWA5kcI3Yvg1EPMSSzg302mu8bNU/uVxXSmQtEwoukuK8F4tsmM8s5Gaxv7Dpey64o9SajcD06fnQGviI8Qv6ATnnVcgoeQ6+lksP0qDmL34FXU49ti58/ysb/QliOP1XZ+ejRbU5O9ampeQm+bNPR9DYBowAAAABJRU5ErkJggg==' />
          <App {...this.props} mobxStore={this.mobxStore} />
        </Fragment>
      )
    }
  }
}
