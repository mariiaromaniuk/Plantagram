import axios from 'axios'
import {clearItems} from './orderSummary'

// action types
const UPDATE_ORDER = 'UPDATE_ORDER'
const SUBMIT_ORDER = 'SUBMIT_ORDER'

// action creators
const updateOrder = order => ({
  type: UPDATE_ORDER,
  order
})
export const submitOrder = () => ({
  type: SUBMIT_ORDER
})

// thunks
export const createOrder = () => {
  return async dispatch => {
    try {
      const order = await axios.post('/api/orders')
      dispatch(updateOrder(order.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getOrder = orderId => {
  return async dispatch => {
    try {
      const order = await axios.get(`/api/orders/${orderId}`)
      dispatch(updateOrder(order.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteOrder = event => {
  return async dispatch => {
    try {
      const orderId = event.target.value
      await axios.delete(`/api/orders/${orderId}`)
      dispatch(updateOrder({}))
    } catch (error) {
      console.error(error)
    }
  }
}

// submitting an order and turning it from a cart to an order
export const completeOrder = (event, orderId) => {
  return async dispatch => {
    try {
      const {
        email,
        shippingFirstName,
        shippingLastName,
        shippingAddress,
        shippingCity,
        shippingState,
        shippingZipCode,
        totalCost,
        billingFirstName,
        billingLastName,
        billingAddress,
        billingCity,
        billingState,
        billingZipCode
      } = event.target

      await axios.put(`/api/orders/${orderId}`, {
        email: email.value,
        isCart: false,
        totalCost: totalCost.value,
        shippingFirstName: shippingFirstName.value,
        shippingLastName: shippingLastName.value,
        shippingAddress: shippingAddress.value,
        shippingCity: shippingCity.value,
        shippingState: shippingState.value,
        shippingZipCode: shippingZipCode.value,
        billingFirstName: billingFirstName.value,
        billingLastName: billingLastName.value,
        billingAddress: billingAddress.value,
        billingCity: billingCity.value,
        billingState: billingState.value,
        billingZipCode: billingZipCode.value
      })

      dispatch(submitOrder())
      dispatch(clearItems())
    } catch (error) {
      console.error(error)
    }
  }
}

// initial state
const order = {}

// reducer
export default (state = order, action) => {
  switch (action.type) {
    case UPDATE_ORDER:
      return action.order
    case SUBMIT_ORDER:
      return {}
    default:
      return state
  }
}
