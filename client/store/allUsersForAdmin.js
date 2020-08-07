import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    const users = getUsers(res.data)
    dispatch(users)
  } catch (error) {
    console.error(error)
  }
}

/**
 * INITIAL STATE
 */
const AllUsers = []

/**
 * REDUCER
 */
export default function(state = AllUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
