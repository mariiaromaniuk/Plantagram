import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PLANTS = 'GET_PLANTS'
const ADD_PLANTS = 'ADD_PLANTS'
const DELETE_PLANT = 'DELETE PLANT'
const SEASON_FILTER = 'SEASON_FILTER'
const CONDITION_FILTER = 'CONDITION_FILTER'

/**
 * ACTION CREATORS
 */
const getPlants = plants => ({
  type: GET_PLANTS,
  plants
})

const addPlant = plant => ({
  type: ADD_PLANTS,
  plant
})
const removePlant = plantId => ({
  type: DELETE_PLANT,
  plantId
})
export const filterBySeason = season => ({
  type: SEASON_FILTER,
  season
})
export const filterByCondition = condition => ({
  type: CONDITION_FILTER,
  condition
})

/**
 * THUNK CREATORS
 */
export const setPlant = plant => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/plants/', plant)
      const newPlant = addPlant(res.data)
      dispatch(newPlant)
    } catch (error) {
      console.log(error)
    }
  }
}
export const fetchPlants = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/plants')
      const plants = getPlants(res.data)
      dispatch(plants)
    } catch (error) {
      console.error(error)
    }
  }
}
export const deletePlant = plantId => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/plants/${plantId}`)
      const deletedPlant = removePlant(plantId)
      dispatch(deletedPlant)
    } catch (error) {
      console.log(error)
    }
  }
}
/**
 * INITIAL STATE
 */
const initialState = []

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTS:
      return action.plants
    case ADD_PLANTS:
      return [...state, action.plant]
    case DELETE_PLANT: {
      const newPlants = state.filter(plant => {
        if (plant.id === action.plantId) {
          return false
        } else {
          return true
        }
      })
      return newPlants
    }
    case SEASON_FILTER: {
      const newPlants = state.filter(plant => {
        if (plant.season === action.season) {
          return true
        } else {
          return false
        }
      })
      console.log('season filter', newPlants)
      return newPlants
    }
    case CONDITION_FILTER: {
      const newPlants = state.filter(plant => {
        if (plant.livingCondition === action.condition) {
          return true
        } else {
          return false
        }
      })
      return newPlants
    }
    default:
      return state
  }
}
