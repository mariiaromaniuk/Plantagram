import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Allplants,
  SinglePlant,
  Cart,
  CheckoutPage,
  AddPlant,
  AllUsers,
  OrderHistory
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* plants page listing all plants */}
        <Route exact path="/plants" component={Allplants} />

        {/* change component to refer to single plant view */}
        <Route path="/plants/:plantId" component={SinglePlant} />

        {/* cart page */}
        <Route exact path="/cart" component={Cart} />

        {/* checkout page */}
        <Route path="/cart/checkout" component={CheckoutPage} />

        <Route exact path="/addplant" component={AddPlant} />

        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/users" component={AllUsers} />
            <Route path="/addplant" component={AddPlant} />
          </Switch>
        )}

        {/* order history */}
        <Route path="/orders" component={OrderHistory} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/addplant" component={AddPlant} />
            <Route path="/updateplant/:plantId" component={AddPlant} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
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
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    users: state.users
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
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
}
