import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import pageReducer from './pageReducer';
import searchReducer from './searchReducer';
 const rootReducer=combineReducers({
 	categoryReducer:categoryReducer,
 	pageReducer:pageReducer,
 	searchReducer:searchReducer
 })
 export default rootReducer;