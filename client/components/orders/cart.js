import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {default as Item} from './item'
import {getItems} from '../../store/orderSummary'
import {Link} from 'react-router-dom'

export const Cart = props => {
  const {orderSummary} = props
  const order = JSON.parse(localStorage.getItem('currentOrder'))

  useEffect(() => {
    if (order) props.getItems(order.id)
  }, [])

  return (
    <div className="cart-page">
      <div>
        <Link to="/cart/checkout">Go to Checkout</Link>
      </div>
      <div className="order-summary">
        <h1>My Cart</h1>
        {orderSummary.map(plant => (
          <Item key={plant.id} plant={plant} order={order} />
        ))}
        <h1>
          Total Cost: ${orderSummary.reduce((sum, curPlant) => {
            return sum + curPlant.plant_order.plantSubtotal
          }, 0) / 100}
        </h1>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    orderSummary: state.orderSummary,
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: orderId => dispatch(getItems(orderId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
