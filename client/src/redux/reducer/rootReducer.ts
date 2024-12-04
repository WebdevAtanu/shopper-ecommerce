import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import pageReducer from './pageReducer';
import searchReducer from './searchReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
 const rootReducer=combineReducers({
 	categoryReducer:categoryReducer,
 	pageReducer:pageReducer,
 	searchReducer:searchReducer,
 	loginReducer:loginReducer,
 	userReducer:userReducer,
 	adminReducer:adminReducer
 })
 export default rootReducer;