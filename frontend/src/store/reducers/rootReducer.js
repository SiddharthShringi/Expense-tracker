import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userCategoryReducer from './userCategoryReducer';
import userDashboardReducer from './userDashboardReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    fetchCategory: userCategoryReducer,
    userData: userDashboardReducer
})

export default rootReducer