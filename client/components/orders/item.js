import React from 'react'
import {connect} from 'react-redux'
import {deleteRemoveItem, putEditItem} from '../../store/orderSummary'

export class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      updateQuantity: '1'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.putEditItem(event, this.props.order.id, this.props.plant.id)
  }
  handleRemoveItem = () => {
    this.props.deleteRemoveItem(this.props.order.id, this.props.plant.id)
  }

  render() {
    const {plant} = this.props
    const {name, price, imageUrl, description, stock} = plant
    const {plantQuantity, plantSubtotal} = plant.plant_order

    return (
      <div className="item">
        <div className="item-details overlay">
          <div className="plant-details">
            <h2>{name}</h2>
            <img src={imageUrl} height="100" width="150" />
            <p>{description}</p>
            <h4>price: ${price / 100}</h4>
          </div>
          <div className="quantity-details">
            <h4>in Cart: {plantQuantity}</h4>
            <div className="button-input">
              <form onSubmit={this.handleSubmit}>
                <div className="button-input">
                  <input
                    name="updateQuantity"
                    type="number"
                    value={this.state.updateQuantity}
                    min="1"
                    max={stock}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="button-input">
                  <button disabled={!stock} type="submit">
                    Update Quantity
                  </button>
                </div>
              </form>
            </div>
            <h3>subtotal: ${plantSubtotal / 100}</h3>
            <div className="button-input">
              <button type="button" onClick={this.handleRemoveItem}>
                Remove from Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    deleteRemoveItem: (orderId, plantId) => {
      dispatch(deleteRemoveItem(orderId, plantId))
    },
    putEditItem: (event, orderId, plantId) => {
      dispatch(putEditItem(event, orderId, plantId))
    }
  }
}

export default connect(null, mapDispatch)(Item)
