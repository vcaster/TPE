import {
    COUNT_INDIV,
    COUNT_USER,
    COUNT_ADDR,

    GET_INDIV,
    GET_USRS,

    GET_ADDR,
    GET_ADDR_ID,
    GET_ADDR_TO_FORM,
    ADD_ADDR,

    ADD_DAILY_PROG_NOTE,
    GET_DAILY_PROG_NOTE,
    GET_DAILY_PROG_NOTE_TO_FORM,
    GET_DAILY_PROG_NOTE_ID,

    GET_SAFETY_INSPEC,
    GET_SAFETY_INSPEC_ID,
    GET_SAFETY_INSPEC_TO_FORM,
    ADD_SAFETY_INSPEC,

    GET_TIME_SHEET_TO_FORM,
    GET_TIME_SHEET_TO_FORM_ID,
    GET_TIME_SHEET_ID,
    ADD_TIME_SHEET,

    GET_HOUSE_MEETING,
    GET_HOUSE_MEETING_TO_FORM,
    GET_HOUSE_MEETING_ID,
    ADD_HOUSE_MEETING,

    GET_FIRE_SAFETY,
    GET_FIRE_SAFETY_TO_FORM,
    GET_FIRE_SAFETY_ID,
    ADD_FIRE_SAFETY,

    GET_DAYS_PROG,
    GET_DAYS_PROG_TO_FORM,
    GET_DAYS_PROG_ID,
    ADD_DAYS_PROG,

    GET_ACTIVITY_LOG_TO_FORM,
    GET_ACTIVITY_LOG_TO_VIEW,
    GET_ACTIVITY_LOG_ID,
    ADD_ACTIVITY_LOG,

    GET_STAFF_DESC_A_TO_FORM,
    GET_STAFF_DESC_A_TO_VIEW,
    GET_STAFF_DESC_A_ID,
    ADD_STAFF_DESC_A,

    GET_STAFF_DESC_B_TO_FORM,
    GET_STAFF_DESC_B_TO_VIEW,
    GET_STAFF_DESC_B_ID,
    ADD_STAFF_DESC_B,

    GET_CHANGE_SHIFT_TO_FORM,
    GET_CHANGE_SHIFT_TO_VIEW,
    GET_CHANGE_SHIFT_ID,
    ADD_CHANGE_SHIFT,

    GET_FUND_SHEET_TO_FORM,
    GET_FUND_SHEET_TO_VIEW,
    GET_FUND_SHEET_ID,
    ADD_FUND_SHEET,

    GET_BEHAVE_SHEET_TO_FORM,
    GET_BEHAVE_SHEET_TO_VIEW,
    GET_BEHAVE_SHEET_ID,
    ADD_BEHAVE_SHEET,

    GET_TRAINING_TO_FORM,
    GET_TRAINING_ID,
    ADD_TRAINING,

    GET_ATTEND_TO_FORM,
    GET_ATTEND_TO_VIEW,
    GET_ATTEND_ID,
    ADD_ATTEND,

    GET_OVER_TO_FORM,
    GET_OVER_TO_VIEW,
    GET_OVER_ID,
    ADD_OVER,

    GET_BOWEL_TO_FORM,
    GET_BOWEL_TO_VIEW,
    GET_BOWEL_ID,
    ADD_BOWEL,

    GET_STATEMENT_TO_FORM,
    GET_STATEMENT_ID,
    ADD_STATEMENT,

    GET_INCIDENT_TO_FORM,
    GET_INCIDENT_ID,
    ADD_INCIDENT,

    GET_APPOINT_TO_FORM,
    GET_APPOINT_TO_VIEW,
    GET_TRACKING,
    GET_APPOINT_ID,
    ADD_APPOINT,


    GET_CHATS,
    AFTER_POST_MESSAGE,

    GET_CHATLOG,

    CLEAR_FORM

} from '../actions/types';

export default function(state={}, action){
    switch(action.type){

        //----------
        //Appointment
        //----------
        case ADD_APPOINT:
            return { ...state, form: action.payload }
        case GET_APPOINT_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_APPOINT_TO_VIEW:
             return {
                ...state,
                ratio: action.payload.ratio,
                date: action.payload.date,
                addr: action.payload.addr,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_TRACKING:
            return {
                ...state,
                indiv: action.payload.indiv,
                addr: action.payload.addr,
                articles: action.payload.articles,
                // articles2: action.payload.articles2,
                Size: action.payload.size,
            }
        case GET_APPOINT_ID:
            return { ...state, form: action.payload }
            


        //----------
        //Socket IO Chats
        //----------
        case GET_CHATS:
            return {...state, chats: action.payload }
        case AFTER_POST_MESSAGE:
                return {...state, chats: state.chats.concat(action.payload) }

        case GET_CHATLOG:
            return {...state, chatlog: action.payload }
        //----------
        //Count
        //----------
        case COUNT_INDIV:
            return { ...state, countIndiv: action.payload }
        case COUNT_USER:
            return { ...state, countUser: action.payload }
        case COUNT_ADDR:
            return { ...state, countAddr: action.payload }

        //----------
        //individual
        //----------
        case GET_INDIV:
            return { ...state, individual: action.payload }
        //----------
        //Address
        //----------
        case GET_ADDR:
            return { ...state, address: action.payload }
        case ADD_ADDR:
            return { ...state, form: action.payload }
        case GET_ADDR_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_ADDR_ID:
            return { ...state, form: action.payload }
        //----------
        //user
        //----------
        case GET_USRS:
            return { ...state, users: action.payload }
        //----------
        //Time Sheet
        //----------
        case ADD_TIME_SHEET:
            return { ...state, form: action.payload }
        case GET_TIME_SHEET_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_TIME_SHEET_TO_FORM_ID:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_TIME_SHEET_ID:
            return { ...state, form: action.payload }
        //----------
        //Daily progress note
        //----------
        case ADD_DAILY_PROG_NOTE:
            return { ...state, form: action.payload }
        case GET_DAILY_PROG_NOTE:
            return { ...state, Dailyprognote: action.payload }
        case GET_DAILY_PROG_NOTE_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_DAILY_PROG_NOTE_ID:
            return { ...state, form: action.payload }
        //----------
        //Safety Inspection
        //----------
        case ADD_SAFETY_INSPEC:
            return { ...state, form: action.payload }
        case GET_SAFETY_INSPEC:
            return { ...state, SafetyInspec: action.payload }
        case GET_SAFETY_INSPEC_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_SAFETY_INSPEC_ID:
            return { ...state, form: action.payload }
        //----------
        //House meeting
        //----------
        case ADD_HOUSE_MEETING:
            return { ...state, form: action.payload }
        case GET_HOUSE_MEETING:
            return { ...state, HouseMeeting: action.payload }
        case GET_HOUSE_MEETING_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_HOUSE_MEETING_ID:
            return { ...state, form: action.payload }
        //----------
        //Fire Safety
        //----------
        case ADD_FIRE_SAFETY:
            return { ...state, form: action.payload }
        case GET_FIRE_SAFETY:
            return { ...state, HouseMeeting: action.payload }
        case GET_FIRE_SAFETY_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_FIRE_SAFETY_ID:
            return { ...state, form: action.payload }
        //----------
        //30 days progress note
        //----------
        case ADD_DAYS_PROG:
            return { ...state, form: action.payload }
        case GET_DAYS_PROG:
            return { ...state, HouseMeeting: action.payload }
        case GET_DAYS_PROG_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_DAYS_PROG_ID:
            return { ...state, form: action.payload }
        //----------
        //Actvity log
        //----------
        case ADD_ACTIVITY_LOG:
            return { ...state, form: action.payload }
        case GET_ACTIVITY_LOG_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_ACTIVITY_LOG_TO_VIEW:
            return {
                ...state,
                name: action.payload.name,
                addr: action.payload.addr,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_ACTIVITY_LOG_ID:
            return { ...state, form: action.payload }

        //----------
        //Staff description A
        //----------
        case ADD_STAFF_DESC_A:
            return { ...state, form: action.payload }
        case GET_STAFF_DESC_A_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_STAFF_DESC_A_TO_VIEW:
            return {
                ...state,
                ratio: action.payload.ratio,
                date: action.payload.date,
                addr: action.payload.addr,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_STAFF_DESC_A_ID:
            return { ...state, form: action.payload }

        //----------
        //Staff description B
        //----------
        case ADD_STAFF_DESC_B:
            return { ...state, form: action.payload }
        case GET_STAFF_DESC_B_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_STAFF_DESC_B_TO_VIEW:
             return {
                ...state,
                ratio: action.payload.ratio,
                date: action.payload.date,
                addr: action.payload.addr,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_STAFF_DESC_B_ID:
            return { ...state, form: action.payload }
            
        //----------
        //CHANGE SHIFT
        //----------
        case ADD_CHANGE_SHIFT:
            return { ...state, form: action.payload }
        case GET_CHANGE_SHIFT_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_CHANGE_SHIFT_TO_VIEW:
            return {
                ...state,
                date: action.payload.date,
                addr: action.payload.addr,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_CHANGE_SHIFT_ID:
            return { ...state, form: action.payload }
            
        //----------
        //FUND SHEET
        //----------
        case ADD_FUND_SHEET:
            return { ...state, form: action.payload }
        case GET_FUND_SHEET_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_FUND_SHEET_TO_VIEW:
            return {
                ...state,
                indiv: action.payload.indiv,
                staff: action.payload.staff,
                date: action.payload.date,
                addr: action.payload.addr,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_FUND_SHEET_ID:
            return { ...state, form: action.payload }

        //----------
        //BEHAVE SHEET
        //----------
        case ADD_BEHAVE_SHEET:
            return { ...state, form: action.payload }
        case GET_BEHAVE_SHEET_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_BEHAVE_SHEET_TO_VIEW:
            return {
                ...state,
                date: action.payload.date,
                setting: action.payload.setting,
                indiv: action.payload.name,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_BEHAVE_SHEET_ID:
            return { ...state, form: action.payload }

        
        //----------
        //TRAINING
        //----------
        case ADD_TRAINING:
            return { ...state, form: action.payload }
        case GET_TRAINING_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_TRAINING_ID:
            return { ...state, form: action.payload }


        //----------
        //Individual Attendance Residential
        //----------
        case ADD_ATTEND:
            return { ...state, form: action.payload }
        case GET_ATTEND_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_ATTEND_TO_VIEW:
            return {
                ...state,
                indiv: action.payload.indiv,
                date: action.payload.date,
                addr: action.payload.addr,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_ATTEND_ID:
            return { ...state, form: action.payload }

        //----------
        //Overnight Log
        //----------
        case ADD_OVER:
            return { ...state, form: action.payload }
        case GET_OVER_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_OVER_TO_VIEW:
            return {
                ...state,
                indiv: action.payload.indiv,
                date: action.payload.date,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_OVER_ID:
            return { ...state, form: action.payload }

        //----------
        //BOwel Movement Chart
        //----------
        case ADD_BOWEL:
            return { ...state, form: action.payload }
        case GET_BOWEL_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_BOWEL_TO_VIEW:
            return {
                ...state,
                indiv: action.payload.indiv,
                date: action.payload.date,
                articles: action.payload.articles,
                Size: action.payload.size,
            }
        case GET_BOWEL_ID:
            return { ...state, form: action.payload }


        //----------
        //STATMENT
        //----------
        case ADD_STATEMENT:
            return { ...state, form: action.payload }
        case GET_STATEMENT_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_STATEMENT_ID:
            return { ...state, form: action.payload }

//----------
        //INCIDENT
        //----------
        case ADD_INCIDENT:
            return { ...state, form: action.payload }
        case GET_INCIDENT_TO_FORM:
            return {
                ...state,
                articles: action.payload.articles,
                Size: action.payload.size
            }
        case GET_INCIDENT_ID:
            return { ...state, form: action.payload }


        //----------
        //clear
        //----------
        case CLEAR_FORM:
            return { ...state, form: action.payload }

            default:
            return state; 
    }
}