import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserNav} from './user-nav'
import {updateUserThunk} from '../store/user'
import {getOrder} from '../store/orders'
import axios from 'axios'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      id: '',
      imgUrl: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      firstName: `${this.props.firstName}`,
      lastName: `${this.props.lastName}`,
      email: `${this.props.email}`,
      id: `${this.props.id}`,
      imgUrl: `${this.props.imgUrl}`
    })
    this.handleLogin()
  }
  async handleLogin() {
    const ls = window.localStorage
    const guestCart = JSON.parse(ls.getItem('currentOrder'))

    if (guestCart) {
      const updateCart = {
        cartId: guestCart.id,
        id: this.props.id,
        email: this.props.email,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        isAdmin: this.props.isAdmin
      }
      await this.props.updateUser(this.props.id, updateCart)
      await axios.put(`/api/users/${this.props.id}/set/${guestCart.id}`)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    const userId = this.props.id
    event.preventDefault()
    this.props.updateUser(userId, this.state)
  }

  render() {
    const {firstName, imgUrl, isAdmin} = this.props // add googleId, email
    // console.log('user props', this.props)
    return (
      <div>
        <div>
          <div>
            <h3>Welcome Back {firstName}!</h3>
            <img src={imgUrl} height="175" width="175" />
            <UserNav isAdmin={isAdmin} />
            <div>
              <div>
                {/* {imgUrl ? (
                  <img src={imgUrl} />
                ) : (
                  <img src="../../public/images/defaultUser.jpg" />
                )} */}
              </div>
              <div>
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          onChange={this.handleChange}
                          value={this.state.firstName}
                          className="validate"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="lastName"
                          onChange={this.handleChange}
                          value={this.state.lastName}
                          className="validate"
                        />
                      </div>
                    </div>
                    <button type="submit" name="action">
                      Update Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    imgUrl: state.user.imgUrl,
    googleId: state.user.googleId,
    id: state.user.id,
    isAdmin: state.user.isAdmin,
    cartId: state.user.cartId,
    order: state.order
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: (id, update) => dispatch(updateUserThunk(id, update)),
  getOrder: orderId => dispatch(getOrder(orderId))
})

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
