import axios from 'axios'

// action types
const UPDATE_ITEMS = 'UPDATE_ITEMS'
const CLEAR_ITEMS = 'CLEAR_ITEMS'

// action creators
const updateItems = items => ({
  type: UPDATE_ITEMS,
  items
})
export const clearItems = () => ({
  type: CLEAR_ITEMS
})

// thunks
export const getItems = orderId => {
  return async dispatch => {
    try {
      const plants = await axios.get(`/api/ordersummary/${orderId}/plants`)
      dispatch(updateItems(plants.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const postAddItem = (event, orderId, plantId) => {
  return async dispatch => {
    try {
      const {quantityOrdered} = event.target
      const plants = await axios.post(
        `/api/ordersummary/${orderId}/add/${plantId}`,
        {
          quantityOrdered: quantityOrdered.value
        }
      )
      dispatch(updateItems(plants.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteRemoveItem = (orderId, plantId) => {
  return async dispatch => {
    try {
      const plants = await axios.delete(
        `/api/ordersummary/${orderId}/remove/${plantId}`
      )
      dispatch(updateItems(plants.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const putEditItem = (event, orderId, plantId) => {
  return async dispatch => {
    try {
      const {updateQuantity} = event.target
      const plants = await axios.put(
        `/api/ordersummary/${orderId}/edit/${plantId}`,
        {
          plantQuantity: updateQuantity.value
        }
      )
      dispatch(updateItems(plants.data))
    } catch (error) {
      console.error(error)
    }
  }
}

// initial state
const orderSummary = []

// reducer
export default (state = orderSummary, action) => {
  switch (action.type) {
    case UPDATE_ITEMS:
      return action.items
    case CLEAR_ITEMS:
      return []
    default:
      return state
  }
}
