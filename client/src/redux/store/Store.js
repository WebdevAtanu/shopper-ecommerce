import rootReducer from '../reducer/rootReducer'
import {createStore} from 'redux'
const Store=createStore(rootReducer)
export default Store