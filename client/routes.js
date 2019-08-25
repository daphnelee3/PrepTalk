import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, LandingPage} from './components'
import {me} from './store'
import FaceRecording from './components/faceRecording'
import MyAccount from './components/MyAccount'
import faceAnalysis from './components/faceAnalysis'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route path="/login" component={Login} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              path="/faceRecording"
              render={() => <FaceRecording {...this.props} />}
            />
            <Route path="/myAccount" component={MyAccount} />
            <Route path="/faceAnalysis" component={faceAnalysis} />
            <Route path="/" component={LandingPage} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route path="/" component={LandingPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
