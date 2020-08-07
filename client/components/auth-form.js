import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      {displayName === 'Login' ? (
        <div>
          <h3>Log In</h3>
          New user? <Link to="/signup">Sign Up</Link>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" required />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" required />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <a href="/auth/google">{displayName} with Google</a>
        </div>
      ) : (
        <div>
          <h3>Sign up</h3>
          <p>
            Returning user? <Link to="/login">Login</Link>
          </p>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input name="firstName" type="text" required />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input name="lastName" type="text" required />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input name="email" type="email" required />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input name="password" type="password" required />
            </div>
            <div>
              <button className="button" type="submit">
                {displayName}
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <div>
            <a href="/auth/google">{`${displayName} with Google`}</a>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const method = evt.target.name
      console.log(method)
      if (method === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, method, firstName, lastName))
      } else {
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, method))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
