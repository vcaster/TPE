import axios from 'axios';
import {
    COUNT_INDIV,
    COUNT_USER,
    COUNT_ADDR,

    ADD_LOG,
    GET_LOG_TO_FORM,
    GET_LOG_TO_FORM_ID,

    GET_MSG_ID,
    GET_MSG_TO_FORM,
    ADD_MSG,
    UPDATE_MSG,

    GET_ADDR,
    GET_ADDR_ID,
    GET_ADDR_TO_FORM,
    ADD_ADDR,
    UPDATE_ADDR,

    GET_INDIV,    
    GET_USRS,

    GET_DAILY_PROG_NOTE,
    GET_DAILY_PROG_NOTE_TO_FORM,
    GET_DAILY_PROG_NOTE_ID,
    READ_DAILY_PROG_NOTE,
    ADD_DAILY_PROG_NOTE,
    UPDATE_DAILY_PROG_NOTE,

    GET_TIME_SHEET_TO_FORM,
    GET_TIME_SHEET_TO_FORM_ID,
    GET_TIME_SHEET_ID,
    READ_TIME_SHEET,
    ADD_TIME_SHEET,
    UPDATE_TIME_SHEET,

    GET_SAFETY_INSPEC,
    GET_SAFETY_INSPEC_TO_FORM,
    READ_SAFETY_INSPEC,
    GET_SAFETY_INSPEC_ID,
    ADD_SAFETY_INSPEC,
    UPDATE_SAFETY_INSPEC,

    GET_HOUSE_MEETING,
    GET_HOUSE_MEETING_TO_FORM,
    READ_HOUSE_MEETING,
    GET_HOUSE_MEETING_ID,
    ADD_HOUSE_MEETING,
    UPDATE_HOUSE_MEETING,

    GET_FIRE_SAFETY,
    GET_FIRE_SAFETY_TO_FORM,
    READ_FIRE_SAFETY,
    GET_FIRE_SAFETY_ID,
    ADD_FIRE_SAFETY,
    UPDATE_FIRE_SAFETY,

    GET_DAYS_PROG,
    GET_DAYS_PROG_TO_FORM,
    READ_DAYS_PROG,
    GET_DAYS_PROG_ID,
    ADD_DAYS_PROG,
    UPDATE_DAYS_PROG,

    GET_ACTIVITY_LOG_TO_FORM,
    GET_ACTIVITY_LOG_TO_VIEW,
    GET_ACTIVITY_LOG_ID,
    ADD_ACTIVITY_LOG,
    UPDATE_ACTIVITY_LOG,

    GET_STAFF_DESC_A_TO_FORM,
    GET_STAFF_DESC_A_TO_VIEW,
    GET_STAFF_DESC_A_ID,
    ADD_STAFF_DESC_A,
    UPDATE_STAFF_DESC_A,

    GET_STAFF_DESC_B_TO_FORM,
    GET_STAFF_DESC_B_TO_VIEW,
    GET_STAFF_DESC_B_ID,
    ADD_STAFF_DESC_B,
    UPDATE_STAFF_DESC_B,

    GET_CHANGE_SHIFT_TO_FORM,
    GET_CHANGE_SHIFT_TO_VIEW,
    GET_CHANGE_SHIFT_ID,
    ADD_CHANGE_SHIFT,
    UPDATE_CHANGE_SHIFT,

    GET_FUND_SHEET_TO_FORM,
    GET_FUND_SHEET_TO_VIEW,
    GET_FUND_SHEET_ID,
    ADD_FUND_SHEET,
    UPDATE_FUND_SHEET,

    GET_BEHAVE_SHEET_TO_FORM,
    GET_BEHAVE_SHEET_TO_VIEW,
    GET_BEHAVE_SHEET_ID,
    ADD_BEHAVE_SHEET,
    UPDATE_BEHAVE_SHEET,

    GET_TRAINING_TO_FORM,
    GET_TRAINING_ID,
    ADD_TRAINING,
    READ_TRAINING,
    UPDATE_TRAINING,

    GET_ATTEND_TO_FORM,
    GET_ATTEND_TO_VIEW,
    GET_ATTEND_ID,
    ADD_ATTEND,
    UPDATE_ATTEND,

    GET_OVER_TO_FORM,
    GET_OVER_TO_VIEW,
    GET_OVER_ID,
    ADD_OVER,
    UPDATE_OVER,

    GET_BOWEL_TO_FORM,
    GET_BOWEL_TO_VIEW,
    GET_BOWEL_ID,
    ADD_BOWEL,
    UPDATE_BOWEL,

    GET_STATEMENT_TO_FORM,
    GET_STATEMENT_ID,
    ADD_STATEMENT,
    READ_STATEMENT,
    UPDATE_STATEMENT,

    GET_INCIDENT_TO_FORM,
    GET_INCIDENT_ID,
    ADD_INCIDENT,
    READ_INCIDENT,
    UPDATE_INCIDENT,

    GET_APPOINT_TO_FORM,
    GET_APPOINT_TO_VIEW,
    GET_APPOINT_ID,
    GET_TRACKING,
    ADD_APPOINT,
    UPDATE_APPOINT,
    SEND_SMS,

    GET_CHATS,
    AFTER_POST_MESSAGE,

    GET_CHATLOG,

    CLEAR_FORM
} from './types';

import { USER_SERVER, FORM_SERVER } from '../components/utils/misc';

// Appointment

export function adAppoint(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/appointment`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_APPOINT,
        payload:request
    }
}

export function sendSms(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/sendsms`, dataToSubmit)
    .then(response => response.data);

    return {
        type: SEND_SMS,
        payload:request
    }
}

export function getAppointToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/appointment_to_form`, data)
    .then(response => {

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
        type: GET_APPOINT_TO_FORM,
        payload: request
    }
}

export function getAppointToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters

    }

    const request = axios.get(`${FORM_SERVER}/appointment_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        let art = []

        response.data.articles.map((row,i) => {
            console.log(row.dated)
        })
        console.log(art);

        return {
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_APPOINT_TO_VIEW,
        payload: request
    }
}

export function getTracking(filters , previousState = []){
    // const data = {
    //     filters
    // }

    const request = axios.get(`${FORM_SERVER}/getTracking?filters=${filters}`)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.final
        ];

        return {
            size: response.data.size,
            articles :response.data.final,
            // articles2 :response.data.articles2,
            indiv: response.data.indiv,
            addr: response.data.addr,
        }
    });


    return {
        type: GET_TRACKING,
        payload: request
    }
}

export function getAppointId(id){
    const request = axios.get(`${FORM_SERVER}/appointment_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_APPOINT_ID,
            payload:request
        }

}

export function updateAppoint(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/appointment_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_APPOINT,
        payload: request
    }
}



// Socket. IO chats


export function getChats(idr,ids){
    const request = axios.get(`${FORM_SERVER}/getChats?id=${idr},${ids}`)
        .then(response => response.data);
    
    return {
        type: GET_CHATS,
        payload: request
    }
}

export function getChatLog(id){
    const request = axios.get(`${FORM_SERVER}/getChatLog?id=${id}`)
        .then(response => response.data);
    
    return {
        type: GET_CHATLOG,
        payload: request
    }
}

export function afterPostMessage(data){

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}


// Counts

export function countIndividual(){

    const request = axios.post(`${USER_SERVER}/individual_count`)
                    .then(response => response.data);

    return {
        type: COUNT_INDIV,
        payload: request
}
}

export function countUser(){

    const request = axios.post(`${USER_SERVER}/user_count`)
                    .then(response => response.data);

    return {
        type: COUNT_USER,
        payload: request
}
}

export function countAddress(){

    const request = axios.post(`${USER_SERVER}/address_count`)
                    .then(response => response.data);

    return {
        type: COUNT_ADDR,
        payload: request
}
}

// Individuals

export function getIndiv(){

    const request = axios.get(`${USER_SERVER}/individuals`)
                    .then(response => response.data);

    return {
        type: GET_INDIV,
        payload: request
    }
}

// Addresses

export function getAddr(){

    const request = axios.get(`${USER_SERVER}/addresses`)
                    .then(response => response.data);

    return {
        type: GET_ADDR,
        payload: request
    }
}

export function adAddress(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/address`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_ADDR,
        payload:request
    }
}

export function getAddressToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${USER_SERVER}/address_to_form`, data)
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
        type: GET_ADDR_TO_FORM,
        payload: request
    }
}

export function getAddressId(id){
    const request = axios.get(`${USER_SERVER}/address_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_ADDR_ID,
            payload:request
        }

}

export function updateAddress(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/address_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_ADDR,
        payload: request
    }
}

// users
export function getUsrs(){

    const request = axios.get(`${USER_SERVER}/users`)
                    .then(response => response.data);

    return {
        type: GET_USRS,
        payload: request
    }
}

// Log

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

export function getLogToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${USER_SERVER}/logs_to_form`, data)
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
        type: GET_LOG_TO_FORM,
        payload: request
    }
}

export function getLogToFormId(skip,limit,id, previousState = []){
    const data = {
        limit,
        skip,
        id,
    }

    const request = axios.post(`${USER_SERVER}/logs_to_form_id`, data)
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
        type: GET_LOG_TO_FORM_ID,
        payload: request
    }
}

//Message

export function adMessage(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/message`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_MSG,
        payload:request
    }
}

export function getMessageToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${USER_SERVER}/messages_to_form`, data)
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
        type: GET_MSG_TO_FORM,
        payload: request
    }
}


export function getMessageId(id){
    const request = axios.get(`${USER_SERVER}/message_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_MSG_ID,
            payload:request
        }

}

export function updateMessage(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/message_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_MSG,
        payload: request
    }
}

// Time Sheet

export function adTimeSheet(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/time_sheet`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_TIME_SHEET,
        payload:request
    }
}

export function getTimeSheetForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/time_sheet_to_form`, data)
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
        type: GET_TIME_SHEET_TO_FORM,
        payload: request
    }
}

export function getTimeSheetFormId(skip,limit,id,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        id,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/time_sheet_to_form_id`, data)
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
        type: GET_TIME_SHEET_TO_FORM_ID,
        payload: request
    }
}


export function getTimeSheetId(id){
    const request = axios.get(`${FORM_SERVER}/time_sheet_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_TIME_SHEET_ID,
            payload:request
        }

}

export function updateTimeSheet(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/time_sheet_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_TIME_SHEET,
        payload: request
    }
}

export function readTimeSheet(_id){

    const request = axios.get(`${FORM_SERVER}/time_sheet_read?formId=${_id}`)
    .then(response => response.data)

    return {
        type: READ_TIME_SHEET,
        payload: request
    }
}

//Daily progress note

export function adDailyProgNote(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/daily_progress_note`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_DAILY_PROG_NOTE,
        payload:request
    }
}

export function getDailyProgNote(){

    const request = axios.get(`${FORM_SERVER}/daily_progress_notes`)
                    .then(response => response.data);

    return {
        type: GET_DAILY_PROG_NOTE,
        payload: request
    }
}

export function getDailyProgNoteToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/daily_prog_notes_to_form`, data)
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
        type: GET_DAILY_PROG_NOTE_TO_FORM,
        payload: request
    }
}

export function getDailyProgNoteId(id){
    const request = axios.get(`${FORM_SERVER}/daily_progress_notes_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_DAILY_PROG_NOTE_ID,
            payload:request
        }

}

export function readDailyProgNote(_id){

    const request = axios.get(`${FORM_SERVER}/daily_progress_note_read?formId=${_id}`)
    .then(response => response.data)

    return {
        type: READ_DAILY_PROG_NOTE,
        payload: request
    }
}

export function updateDailyProgNote(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/daily_progress_notes_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_DAILY_PROG_NOTE,
        payload: request
    }
}

//Saftey inspection 

export function adSafetyInspec(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/safety_inspection`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_SAFETY_INSPEC,
        payload:request
    }
}

export function getSafetyInspec(){

    const request = axios.get(`${FORM_SERVER}/safety_inspections`)
                    .then(response => response.data);

    return {
        type: GET_SAFETY_INSPEC,
        payload: request
}
}

export function getSafetyInspecToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/safety_inspection_to_form`, data)
    .then(response => {

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
        type: GET_SAFETY_INSPEC_TO_FORM,
        payload: request
    }
}

export function getSafetyInspecId(id){
    const request = axios.get(`${FORM_SERVER}/safety_inspection_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_SAFETY_INSPEC_ID,
            payload:request
        }

}

export function readSafetyInspec(_id){

    const request = axios.get(`${FORM_SERVER}/safety_inspection_read?formId=${_id}`)
    .then(response => response.data)

    return {
        type: READ_SAFETY_INSPEC,
        payload: request
    }
}

export function updateSafetyInspec(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/safety_inspection_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_SAFETY_INSPEC,
        payload: request
    }
}

// House Meeting

export function adHouseMeeting(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/house_meeting`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_HOUSE_MEETING,
        payload:request
    }
}

export function getHouseMeeting(){

    const request = axios.get(`${FORM_SERVER}/house_meetings`)
                    .then(response => response.data);

    return {
        type: GET_HOUSE_MEETING,
        payload: request
}
}

export function getHouseMeetingToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/house_meeting_to_form`, data)
    .then(response => {

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
        type: GET_HOUSE_MEETING_TO_FORM,
        payload: request
    }
}

export function getHouseMeetingId(id){
    const request = axios.get(`${FORM_SERVER}/house_meeting_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_HOUSE_MEETING_ID,
            payload:request
        }

}

export function readHouseMeeting(_id){

    const request = axios.get(`${FORM_SERVER}/house_meeting_read?formId=${_id}`)
    .then(response => response.data)

    return {
        type: READ_HOUSE_MEETING,
        payload: request
    }
}

export function updateHouseMeeting(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/house_meeting_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_HOUSE_MEETING,
        payload: request
    }
}

// Fire Safety

export function adFireSafety(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/fire_safety`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_FIRE_SAFETY,
        payload:request
    }
}

export function getFireSafety(){

    const request = axios.get(`${FORM_SERVER}/fire_safetys`)
                    .then(response => response.data);

    return {
        type: GET_FIRE_SAFETY,
        payload: request
}
}

export function getFireSafetyToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/fire_safety_to_form`, data)
    .then(response => {

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
        type: GET_FIRE_SAFETY_TO_FORM,
        payload: request
    }
}

export function getFireSafetyId(id){
    const request = axios.get(`${FORM_SERVER}/fire_safety_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_FIRE_SAFETY_ID,
            payload:request
        }

}

export function readFireSafety(_id){

    const request = axios.get(`${FORM_SERVER}/fire_safety_read?formId=${_id}`)
    .then(response => response.data)

    return {
        type: READ_FIRE_SAFETY,
        payload: request
    }
}

export function updateFireSafety(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/fire_safety_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_FIRE_SAFETY,
        payload: request
    }
}

// 30 Days Prog Note

export function adDaysProg(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/days_prog`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_DAYS_PROG,
        payload:request
    }
}

export function getDaysProg(){

    const request = axios.get(`${FORM_SERVER}/days_progs`)
                    .then(response => response.data);

    return {
        type: GET_DAYS_PROG,
        payload: request
}
}

export function getDaysProgToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/days_prog_to_form`, data)
    .then(response => {

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
        type: GET_DAYS_PROG_TO_FORM,
        payload: request
    }
}

export function getDaysProgId(id){
    const request = axios.get(`${FORM_SERVER}/days_prog_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_DAYS_PROG_ID,
            payload:request
        }

}

export function readDaysProg(_id){

    const request = axios.get(`${FORM_SERVER}/days_prog_read?formId=${_id}`)
    .then(response => response.data)

    return {
        type: READ_DAYS_PROG,
        payload: request
    }
}

export function updateDaysProg(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/days_prog_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_DAYS_PROG,
        payload: request
    }
}

// Activity Log

export function adActivityLog(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/activity_log`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_ACTIVITY_LOG,
        payload:request
    }
}

export function getActivityLogToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/activity_log_to_form`, data)
    .then(response => {

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
        type: GET_ACTIVITY_LOG_TO_FORM,
        payload: request
    }
}

export function getActivityLogToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/activity_log_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            name: response.data.name,
            addr: response.data.address,
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_ACTIVITY_LOG_TO_VIEW,
        payload: request
    }
}

export function getActivityLogId(id){
    const request = axios.get(`${FORM_SERVER}/activity_log_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_ACTIVITY_LOG_ID,
            payload:request
        }

}

export function updateActivityLog(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/activity_log_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_ACTIVITY_LOG,
        payload: request
    }
}

// Staff Description 11 am

export function adStaffDescA(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/staff_desc_11`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_STAFF_DESC_A,
        payload:request
    }
}

export function getStaffDecAToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/staff_desc_11_to_form`, data)
    .then(response => {

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
        type: GET_STAFF_DESC_A_TO_FORM,
        payload: request
    }
}

export function getStaffDescAToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/staff_desc_11_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            ratio: response.data.ratio,
            addr: response.data.address,
            date: response.data.date,
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_STAFF_DESC_A_TO_VIEW,
        payload: request
    }
}

export function getStaffDescAId(id){
    const request = axios.get(`${FORM_SERVER}/staff_desc_11_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_STAFF_DESC_A_ID,
            payload:request
        }

}

export function updateStaffDescA(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/staff_desc_11_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_STAFF_DESC_A,
        payload: request
    }
}

// Staff Description 3 pm

export function adStaffDescB(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/staff_desc_3`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_STAFF_DESC_B,
        payload:request
    }
}

export function getStaffDecBToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/staff_desc_3_to_form`, data)
    .then(response => {

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
        type: GET_STAFF_DESC_B_TO_FORM,
        payload: request
    }
}

export function getStaffDescBToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/staff_desc_3_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            ratio: response.data.ratio,
            addr: response.data.address,
            date: response.data.date,
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_STAFF_DESC_B_TO_VIEW,
        payload: request
    }
}

export function getStaffDescBId(id){
    const request = axios.get(`${FORM_SERVER}/staff_desc_3_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_STAFF_DESC_B_ID,
            payload:request
        }

}

export function updateStaffDescB(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/staff_desc_3_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_STAFF_DESC_B,
        payload: request
    }
}


// Change of shift

export function adChangeShift(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/change_shift`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_CHANGE_SHIFT,
        payload:request
    }
}

export function getChangeShiftToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/change_shift_to_form`, data)
    .then(response => {

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
        type: GET_CHANGE_SHIFT_TO_FORM,
        payload: request
    }
}

export function getChangeShiftToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/change_shift_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            addr: response.data.address,
            date: response.data.date,
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_CHANGE_SHIFT_TO_VIEW,
        payload: request
    }
}

export function getChangeShiftId(id){
    const request = axios.get(`${FORM_SERVER}/change_shift_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_CHANGE_SHIFT_ID,
            payload:request
        }

}

export function updateChangeShift(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/change_shift_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_CHANGE_SHIFT,
        payload: request
    }
}

// Funds Sheet

export function adFundsSheet(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/funds_sheet`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_FUND_SHEET,
        payload:request
    }
}

export function getFundsSheetToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/funds_sheet_to_form`, data)
    .then(response => {

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
        type: GET_FUND_SHEET_TO_FORM,
        payload: request
    }
}

export function getFundsSheetToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/funds_sheet_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            indiv: response.data.indiv,
            staff: response.data.staff,
            date: response.data.date,
            addr: response.data.address,
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_FUND_SHEET_TO_VIEW,
        payload: request
    }
}

export function getFundsSheetId(id){
    const request = axios.get(`${FORM_SERVER}/funds_sheet_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_FUND_SHEET_ID,
            payload:request
        }

}

export function updateFundsSheet(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/funds_sheet_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_FUND_SHEET,
        payload: request
    }
}

// Behaviour Data Sheet

export function adBehaveSheet(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/behave_sheet`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_BEHAVE_SHEET,
        payload:request
    }
}

export function getBehaveSheetToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/behave_sheet_to_form`, data)
    .then(response => {

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
        type: GET_BEHAVE_SHEET_TO_FORM,
        payload: request
    }
}

export function getBehaveSheetToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/behave_sheet_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            name: response.data.name,
            setting: response.data.setting,
            date: response.data.date,
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_BEHAVE_SHEET_TO_VIEW,
        payload: request
    }
}

export function getBehaveSheetId(id){
    const request = axios.get(`${FORM_SERVER}/behave_sheet_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_BEHAVE_SHEET_ID,
            payload:request
        }

}

export function updateBehaveSheet(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/behave_sheet_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_BEHAVE_SHEET,
        payload: request
    }
}

// Traning

export function adTraining(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/training`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_TRAINING,
        payload:request
    }
}

export function getTrainingToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/training_to_form`, data)
    .then(response => {

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
        type: GET_TRAINING_TO_FORM,
        payload: request
    }
}

export function getTrainingId(id){
    const request = axios.get(`${FORM_SERVER}/training_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_TRAINING_ID,
            payload:request
        }

}

export function readTraining(_id){

    const request = axios.get(`${FORM_SERVER}/training_read?formId=${_id}`)
    .then(response => response.data)

    return {
        type: READ_TRAINING,
        payload: request
    }
}

export function updateTraining(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/training_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_TRAINING,
        payload: request
    }
}


// Statement

export function adStatement(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/statement`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_STATEMENT,
        payload:request
    }
}

export function getStatementToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/statement_to_form`, data)
    .then(response => {

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
        type: GET_STATEMENT_TO_FORM,
        payload: request
    }
}

export function getStatementId(id){
    const request = axios.get(`${FORM_SERVER}/statement_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_STATEMENT_ID,
            payload:request
        }

}

export function readStatement(_id){

    const request = axios.get(`${FORM_SERVER}/statement_read?formId=${_id}`)
    .then(response => response.data)

    return {
        type: READ_STATEMENT,
        payload: request
    }
}

export function updateStatement(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/statement_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_STATEMENT,
        payload: request
    }
}

// Incident

export function adIncident(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/incident`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_INCIDENT,
        payload:request
    }
}

export function getIncidentToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/incident_to_form`, data)
    .then(response => {

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
        type: GET_INCIDENT_TO_FORM,
        payload: request
    }
}

export function getIncidentId(id){
    const request = axios.get(`${FORM_SERVER}/incident_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_INCIDENT_ID,
            payload:request
        }

}

export function readIncident(_id){

    const request = axios.get(`${FORM_SERVER}/incident_read?formId=${_id}`)
    .then(response => response.data)

    return {
        type: READ_INCIDENT,
        payload: request
    }
}

export function updateIncident(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/incident_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_INCIDENT,
        payload: request
    }
}
// Individual Attendance Residential

export function adAttendance(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/attendance`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_ATTEND,
        payload:request
    }
}

export function getAttendanceToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/attendance_to_form`, data)
    .then(response => {

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
        type: GET_ATTEND_TO_FORM,
        payload: request
    }
}

export function getAttendanceToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/attendance_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            indiv: response.data.indiv,
            date: response.data.date,
            addr: response.data.address,
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_ATTEND_TO_VIEW,
        payload: request
    }
}

export function getAttendanceId(id){
    const request = axios.get(`${FORM_SERVER}/attendance_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_ATTEND_ID,
            payload:request
        }

}

export function updateAttendance(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/attendance_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_ATTEND,
        payload: request
    }
}


// Overnight Log

export function adOver(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/overnight_sheet`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_OVER,
        payload:request
    }
}

export function getOverToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/overnight_to_form`, data)
    .then(response => {

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
        type: GET_OVER_TO_FORM,
        payload: request
    }
}

export function getOverToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/overnight_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            indiv: response.data.indiv,
            date: response.data.date,
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_OVER_TO_VIEW,
        payload: request
    }
}

export function getOverId(id){
    const request = axios.get(`${FORM_SERVER}/overnight_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_OVER_ID,
            payload:request
        }

}

export function updateOver(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/overnight_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_OVER,
        payload: request
    }
}


// Bowel Movement Chart

export function adBowel(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/bowel`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_BOWEL,
        payload:request
    }
}

export function getBowelToForm(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/bowel_to_form`, data)
    .then(response => {

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
        type: GET_BOWEL_TO_FORM,
        payload: request
    }
}

export function getBowelToView(skip,limit,filters = [], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${FORM_SERVER}/bowel_to_view`, data)
    .then(response => {

        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            indiv: response.data.indiv,
            date: response.data.date,
            size: response.data.size,
            articles :response.data.articles
        }
    });


    return {
        type: GET_BOWEL_TO_VIEW,
        payload: request
    }
}

export function getBowelId(id){
    const request = axios.get(`${FORM_SERVER}/bowel_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        });

        return {
            type: GET_BOWEL_ID,
            payload:request
        }

}

export function updateBowel(dataToSubmit){
    const request = axios.post(`${FORM_SERVER}/bowel_update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_BOWEL,
        payload: request
    }
}


export function clearForm(){
    return {
        type: CLEAR_FORM,
        payload: ''
    }
}
