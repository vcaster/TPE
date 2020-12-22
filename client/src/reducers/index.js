import { combineReducers } from 'redux'

import user from './user_reducer';
import form from "./form_reducer"


const rootReducer = combineReducers({
    user,
    form
})

export default rootReducer;