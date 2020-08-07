import React from 'react'
import {connect} from 'react-redux'
import {setPlant} from '../../store/plants'
import {updatePlant, fetchPlant} from '../../store/singlePlant'
import {Redirect} from 'react-router-dom'

export class AddPlant extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.plantId
    if (id !== 'addplant') {
      this.props.getPlant(id)
      const plant = this.props.plant
      this.setState({
        name: plant.name,
        price: plant.price,
        description: plant.description,
        imageUrl: plant.imageUrl,
        stock: plant.stock,
        livingCondition: plant.livingCondition,
        season: plant.season,
        redirectToPlants: false
      })
    } else {
      this.setState({
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
        stock: 0,
        livingCondition: 'indoor',
        season: 'This plant is happy all year long',
        redirectToPlants: false
      })
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    let price = this.state.price
    let stock = this.state.stock
    this.setState({
      price: parseInt(price, 10),
      stock: parseInt(stock, 10)
    })
    console.log('addplant,form', this.state)
    if (this.props.plant.name) {
      this.props.updatePlant(this.state, this.props.plant.id)
    } else {
      this.props.setPlant(this.state)
    }
    this.setState({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      stock: 0,
      livingCondition: 'indoor',
      season: 'This plant is happy all year long',
      redirectToPlants: true
    })
  }
  render() {
    const redirectToPlants = this.state.redirectToPlants
    if (redirectToPlants === true) {
      return <Redirect to="/plants" />
    }
    return this.state ? (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Plant Name:</label>
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Plant Name:"
          required
        />
        <label htmlFor="price">Plant Price:</label>
        <input
          name="price"
          type="number"
          value={this.state.price}
          onChange={this.handleChange}
          placeholder="Plant Price"
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          value={this.state.description}
          placeholder="Description"
          onChange={this.handleChange}
        />
        <label htmlFor="stock">Plant Stock:</label>
        <input
          name="stock"
          type="number"
          value={this.state.stock}
          onChange={this.handleChange}
          placeholder="Plant Stock"
          required
        />
        <label htmlFor="imageUrl">Plant Image URL:</label>
        <input
          name="imageUrl"
          type="text"
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder="Plant Image URL:"
          required
        />
        <label>
          Pick the living condition:
          <select
            value={this.state.livingCondition}
            onChange={this.handleChange}
            name="livingCondition"
          >
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="shade">Shade</option>
            <option value="sun">Sun</option>x
            <option value="low light">Low light</option>
            <option value="Just Add Water">Just Add Water</option>
          </select>
        </label>
        <label>
          Pick the Season:
          <select
            value={this.state.season}
            onChange={this.handleChange}
            name="season"
          >
            <option value="This plant is happy all year long">
              This plant is happy all year long
            </option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>x
            <option value="Fall">Fall</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    ) : null
  }
}
const mapState = state => {
  return {
    plant: state.singlePlant //get plant from redux store
  }
}
const mapDispatch = dispatch => {
  return {
    setPlant: plant => dispatch(setPlant(plant)),
    updatePlant: (plant, id) => dispatch(updatePlant(plant, id)),
    getPlant: id => dispatch(fetchPlant(id))
  }
}

export default connect(mapState, mapDispatch)(AddPlant)
