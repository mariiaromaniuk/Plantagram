import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers} from '../../store/allUsersForAdmin'

export class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props
    return (
      <div>
        {/* <Link to="/"></Link> */}
        {users.map(user => (
          <Link to={`/users/${user.id}`} key={user.id}>
            <div>
              <img src={user.imgUrl} height="175" width="175" />
              <p>
                {user.firstName} {user.lastName}{' '}
              </p>
              <p>{user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    users: state.users //get from redux store
  }
}
const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(Users)

/**
 * PROP TYPES
 */
Users.propTypes = {
  users: PropTypes.array
}
