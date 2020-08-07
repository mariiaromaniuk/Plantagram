import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import plants from './plants'
import orderSummary from './orderSummary'
import singlePlant from './singlePlant'
import order from './orders'
import users from '../store/allUsersForAdmin'

const reducer = combineReducers({
  user,
  plants,
  singlePlant,
  orderSummary,
  order,
  users
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
