import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {default as OrderForm} from './orderForm'
import {getItems} from '../../store/orderSummary'

export const CheckoutPage = props => {
  const {orderSummary, user} = props
  const order = JSON.parse(localStorage.getItem('currentOrder'))

  useEffect(() => {
    if (order) props.getItems(order.id)
  }, [])

  return (
    <div className="checkout-page">
      <div>
        <Link to="/plants">Continue Shopping</Link>
        <br />
        <Link to="/cart">Back to My Cart</Link>
      </div>
      <h1>Checkout Page</h1>
      <div>
        <OrderForm order={order} orderSummary={orderSummary} user={user} />
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    orderSummary: state.orderSummary,
    order: state.order,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: orderId => dispatch(getItems(orderId))
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
