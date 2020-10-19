import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export class UserNav extends Component {
  render() {
    console.log('admin', this.props.isAdmin)
    return (
      <div>
        <div>
          <span>Account Settings</span>
          <div>
            <ul>
              {/* <li>
                {/* <Link to="/user">Edit Profile</Link> */}
              {/* </li> */}
              <li>
                <Link to="/orders">Order History</Link>
              </li>
              <li>
                <Link to="/cart">View Cart</Link>
              </li>
            </ul>
          </div>
          {this.props.isAdmin ? (
            <div>
              <span>Admin</span>
              <ul>
                <li>
                  <Link to="/users">View All Users</Link>
                </li>
                <li>
                  <Link to="/addplant">Add New Inventory</Link>
                </li>
                <li>
                  <Link to="/plants">Edit Plants</Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        <div>
          <Link to="/plants">Start Shopping</Link>
        </div>
      </div>
    )
  }
}
