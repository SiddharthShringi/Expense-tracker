import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userCategoryReducer from './userCategoryReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    fetchCategory: userCategoryReducer
})

export default rootReducer