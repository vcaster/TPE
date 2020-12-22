import axios from 'axios';
import {
    REGISTER_USER,
    LOGIN_USER,
    AUTH_USER,
    LOGOUT_USER,

    ADD_LOG,

    GET_ADDR,

    GET_INDIV_TO_FORM,
    GET_INDIV_ID,
    ADD_INDIV,
    UPDATE_INDIV,
    GET_INDIV,

    GET_USER_TO_FORM,
    GET_USER_ID,
    UPDATE_USER,
    GET_USRS,

    ADD_ADDR_ASSOC,
    ADD_INDIV_ASSOC,
    REMOVE_ADDR_ASS,
    REMOVE_INDIV_ASS,

    REMOVE_USER,

    CLEAR_FORM
} from './types';

import { USER_SERVER } from '../components/utils/misc';

export function getAddr(){

    const request = axios.get(`${USER_SERVER}/addresses`)
                    .then(response => response.data);

    return {
        type: GET_ADDR,
        payload: request
    }
}

export function adLog(name,action,data,link,extra,id=null){
    const dataToSubmit = {
        name,
        action,
        data,
        link,
        id,
        extra
    }
    const request = axios.post(`${USER_SERVER}/log`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_LOG,
        payload:request
    }
}


export function getIndiv(){

    const request = axios.get(`${USER_SERVER}/individuals`)
                    .then(response => response.data);

    return {
        type: GET_INDIV,
        payload: request
    }
}

export function adIndiv(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/individual`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_INDIV,
        payload:request
    }
}


export function getIndivToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${USER_SERVER}/individuals_to_form`, data)
    .then(response => {
    console.log(response.data.articles)
    console.log(previousState)
        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            size: response.data.size,
            articles :newState
        }
    });


    return {
        type: GET_INDIV_TO_FORM,
        payload: request
    }
}

export function getIndivId(id){
    const request = axios.get(`${USER_SERVER}/individual_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });
        
        return {
            type: GET_INDIV_ID,
            payload:request
        }

}


export function updateIndiv(dataToSubmit){
    console.log(dataToSubmit)
    const request = axios.post(`${USER_SERVER}/individual_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_INDIV,
        payload: request
    }
}

export function updateIndivEnc(dataToSubmit){
    console.log(dataToSubmit)
    const request = axios.post(`${USER_SERVER}/individual_update_enc`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_INDIV,
        payload: request
    }
}


export function getUserToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${USER_SERVER}/users_to_form`, data)
    .then(response => {
    console.log(response.data.articles)
    console.log(previousState)
        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            size: response.data.size,
            articles :newState
        }
    });


    return {
        type: GET_USER_TO_FORM,
        payload: request
    }
}

export function getUserId(id){
    const request = axios.get(`${USER_SERVER}/user_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_USER_ID,
            payload:request
        }

}


export function updateUser(dataToSubmit){
    console.log(dataToSubmit)
    const request = axios.post(`${USER_SERVER}/user_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_USER,
        payload: request
    }
}

export function getUsrs(){

    const request = axios.get(`${USER_SERVER}/users`)
                    .then(response => response.data);

    return {
        type: GET_USRS,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
                .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){

    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }

}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);
    return {

        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);
    return {

        type: LOGOUT_USER,
        payload: request
    }
}

export function removeUser(_id){

    const request = axios.get(`${USER_SERVER}/remove?formId=${_id}`)
    .then(response => response.data)

    return {
        type: REMOVE_USER,
        payload: request
    }
}

export function adAddrAss(dataToSubmit){
    const request = axios.get(`${USER_SERVER}/addToAddr?UsrsId=${dataToSubmit.name}&AddrId=${dataToSubmit.address}&name=${dataToSubmit.addrname}`)
    .then(response => response.data);

    return {
        type: ADD_ADDR_ASSOC,
        payload:request
    }
}

export function adIndivAss(dataToSubmit){
    const request = axios.get(`${USER_SERVER}/addToIndiv?UsrsId=${dataToSubmit.name}&IndivId=${dataToSubmit.individual}&name=${dataToSubmit.indivname}&lastname=${dataToSubmit.indivlastname}`)
    .then(response => response.data);

    return {
        type: ADD_INDIV_ASSOC,
        payload:request
    }
}

export function removeAddrAss (uid,aid){

    const request = axios.get(`${USER_SERVER}/removeAddr?UsrsId=${uid}&AddrId=${aid}`)
                    .then(response => response.data);

    return {
        type: REMOVE_ADDR_ASS,
        payload: request
    }

}

export function removeIndivAss (uid,iid){

    const request = axios.get(`${USER_SERVER}/removeIndiv?UsrsId=${uid}&IndivId=${iid}`)
                    .then(response => response.data);

    return {
        type: REMOVE_INDIV_ASS,
        payload: request
    }

}

export function clearForm(){
    return {
        type: CLEAR_FORM,
        payload: ''
    }
}