import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

class Navbar extends React.Component {
  render() {
    const {handleClick, isLoggedIn, isAdmin, User} = this.props // will use isAdmin and User for displaying
    return (
      <div>
        <h1>Plantagram</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/plants">Plants</Link>
              <Link to="/cart">Cart</Link>
              <div className="animation start-home" />
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/plants">Plants</Link>
              <Link to="/cart">Cart</Link>
              <div className="animation start-home" />
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log('this is state', state)
  return {
    isLoggedIn: !!state.user.id,
    user: state.user // Mariia this is a change
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
