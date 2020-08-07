import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PLANT = 'GET_PLANT'
const UPDATE_PLANTS = 'UPDATE_PLANTS'
const REMOVE_PLANTS = 'REMOVE_PLANTS'

/**
 * ACTION CREATORS
 */
const getPlant = plant => ({
  type: GET_PLANT,
  plant
})

/**
 * THUNK CREATORS
 */
export const fetchPlant = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/plants/${id}`)
      const plant = getPlant(res.data)
      dispatch(plant)
    } catch (error) {
      console.error(error)
    }
  }
}

export const updatePlant = (project, id) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/plants/${id}`, project)
      const newPlant = getPlant(res.data)
      dispatch(newPlant)
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANT:
      return action.plant
    default:
      return state
  }
}
