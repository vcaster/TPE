import {
    REGISTER_USER,
    LOGIN_USER,
    AUTH_USER,
    LOGOUT_USER,

    GET_LOG_TO_FORM,    
    GET_LOG_TO_FORM_ID,

    GET_USRS,

    GET_MSG_ID,
    GET_MSG_TO_FORM,


    GET_USER_TO_FORM,
    GET_USER_ID,

    GET_INDIV_TO_FORM,
    GET_INDIV_ID,
    GET_INDIV,

    REMOVE_ADDR_ASS,
    REMOVE_INDIV_ASS,

    CLEAR_FORM
} from '../actions/types';

export default function(state={}, action){
    switch(action.type){
        case GET_LOG_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_LOG_TO_FORM_ID:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_MSG_ID:
            return { ...state, form: action.payload }
        case GET_MSG_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
        }
        case GET_USER_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_USER_ID:
            return { ...state, form: action.payload }

        case GET_INDIV:
            return { ...state, individual: action.payload }
        case GET_INDIV_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
         //----------
        //user
        //----------
        case GET_USRS:
            return { ...state, users: action.payload }
        case GET_INDIV_ID:
            return { ...state, form: action.payload }
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
                return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state}

        case REMOVE_ADDR_ASS:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    address: action.payload.address
                }
            }
        case REMOVE_INDIV_ASS:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    individual: action.payload.individual
                }
            }

        case CLEAR_FORM:
            return { ...state, form: action.payload }
        default:
            return state; 
    }
}