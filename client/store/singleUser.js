// import axios from 'axios'

// export const FETCH_SINGLE_USER = 'FETCH_SINGLE_USER'

// export const fetchedSingleUser = function(selectedUser) {
//   return {
//     type: FETCH_SINGLE_USER,
//     selectedUser
//   }
// }

// export const fetchSingleUserThunk = id => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/users/${id}`)
//     dispatch(fetchedSingleUser(data))
//   } catch (error) {
//     console.error(error)
//   }
// }
// const singleUserReducer = (state = [], action) => {
//   switch (action.type) {
//     case FETCH_SINGLE_USER:
//       return {...action.selectedUser}
//     default:
//       return state
//   }
// }

// export default singleUserReducer
