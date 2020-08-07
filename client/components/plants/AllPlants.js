import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {
  fetchPlants,
  filterByCondition,
  filterBySeason,
  deletePlant
} from '../../store/plants'

/**
 * Plants COMPONENT
 */

export class Plants extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getPlants()
  }
  getPrice = priceInPennies => {
    let dollars = priceInPennies / 100
    dollars = dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    return dollars
  }
  handleChange = event => {
    // this.setState({[event.target.name]: event.target.value})
    const filterName = event.target.name
    const filterValue = event.target.value
    if (filterName === 'season') {
      this.props.getPlants()
      this.props.filterBySeason(filterValue)
    } else {
      this.props.getPlants()
      this.props.filterByCondition(filterValue)
    }
    console.log(
      'filterName',
      filterName,
      'filterValue',
      filterValue,
      this.props.plants
    )
  }

  render() {
    const {plants, isAdmin, isLoggedIn} = this.props

    return (
      <div className="plants-list">
        <div>
          {isAdmin && isLoggedIn && <Link to="/addplant">Add plant</Link>}
          <label>
            Condition:
            <select onChange={this.handleChange} name="livingCondition">
              <option value="none" disabled hidden>
                Select a Condition
              </option>
              <option value="All Conditions">All Conditions</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              <option value="shade">Shade</option>
              <option value="sun">Sun</option>x
              <option value="low light">Low light</option>
              <option value="Just Add Water">Just Add Water</option>
            </select>
          </label>
          <label>
            Season:
            <select onChange={this.handleChange} name="season">
              <option value="none" disabled hidden>
                Select a Season
              </option>
              <option value="All Seasons">All Seasons</option>
              <option value="This plant is happy all year long">
                This plant is happy all year long
              </option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>x
              <option value="Fall">Fall</option>
            </select>
          </label>
        </div>
        {plants.map(plant => (
          <div key={plant.id}>
            <Link to={`/plants/${plant.id}`}>
              <div>
                <h1>{plant.name}</h1>
                <img src={plant.imageUrl} height="175" width="175" />
              </div>
            </Link>
            {isAdmin &&
              isLoggedIn && (
                <Link to="/plants">
                  <button
                    type="button"
                    onClick={() => this.props.removePlant(plant.id)}
                  >
                    Remove Plant
                  </button>
                </Link>
              )}
          </div>
        ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    plants: state.plants, //get from redux store
    isAdmin: state.user.isAdmin,
    isLoggedIn: !!state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    getPlants: () => dispatch(fetchPlants()),
    filterByCondition: condition => dispatch(filterByCondition(condition)),
    filterBySeason: season => dispatch(filterBySeason(season)),
    removePlant: id => dispatch(deletePlant(id))
  }
}

export default connect(mapState, mapDispatch)(Plants)

/**
 * PROP TYPES
 */
Plants.propTypes = {
  plants: PropTypes.array,
  isAdmin: PropTypes.bool,
  isLoggedIn: PropTypes.bool
}
