import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth'

import Reject from './components/utils/reject'

// import Home from './components/Home';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/register';

import UserDashboard from './components/User'
import UserProfile from './components/User/user_profile'

import Dailyprogressnote from './Forms/dailyprognote'
import AddDailyprogressnote from './Forms/dailyprognote/add'
import EditDailyprogressnote from './Forms/dailyprognote/edit'
import DeleteDailyprogressnote from './Forms/dailyprognote/delete'
import ViewDailyprogressnote from './Forms/dailyprognote/view'

import TimeSheet from './Forms/timesheet'
import TimeSheetUser from './Forms/timesheet/user'
import AddTimeSheet from './Forms/timesheet/add'
import EditTimeSheet from './Forms/timesheet/edit'
import SubmitTimeSheet from './Forms/timesheet/submit'
import DeleteTimeSheet from './Forms/timesheet/delete'
import ViewTimeSheet from './Forms/timesheet/view'

import Timeline from './Forms/timeline'
import TimelineUser from './Forms/timeline/user'

import Individual from './Individuals'
import AddIndividual from './Individuals/add'
import EditIndividual from './Individuals/edit'
import DeleteIndividual from './Individuals/delete'
import ViewIndividual from './Individuals/view'

import Message from './components/Message'
import AddMessage from './components/Message/add'
import EditMessage from './components/Message/edit'
import DeleteMessage from './components/Message/delete'

import Users from './Users/users'
import UsersExp from './Users/usersexp'
import AddAddr  from './Users/addAddr'
import AddIndiv  from './Users/addIndiv'
import Assoc  from './Users/assoc'
import AddUser from './Users/add'
import EditUser from './Users/edit'
import TerminateUser from './Users/terminate'
import ResumeUser from './Users/resume'
import SuspendUser from './Users/suspend'
import ViewUser from './Users/view'
import ResetPass from './components/User/reset_pass'

import Address from './Forms/address'
import AddAddress from './Forms/address/add'
import EditAddress from './Forms/address/edit'
import DeleteAddress from './Forms/address/delete'

import SafetyInspec from './Forms/safetyinspec'
import AddSafetyInspec from './Forms/safetyinspec/add'
import EditSafetyInspec from './Forms/safetyinspec/edit'
import DeleteSafetyInspec from './Forms/safetyinspec/delete'
import ViewSafetyInspec from './Forms/safetyinspec/view'

import HouseMeeting from './Forms/housemeeting'
import AddHouseMeeting from './Forms/housemeeting/add'
import EditHouseMeeting from './Forms/housemeeting/edit'
import DeleteHouseMeeting from './Forms/housemeeting/delete'
import ViewHouseMeeting from './Forms/housemeeting/view'

import FireSafety from './Forms/firesafety'
import AddFireSafety from './Forms/firesafety/add'
import EditFireSafety from './Forms/firesafety/edit'
import DeleteFireSafety from './Forms/firesafety/delete'
import ViewFireSafety from './Forms/firesafety/view'

import DaysProg from './Forms/daysprog'
import AddDaysProg from './Forms/daysprog/add'
import EditDaysProg from './Forms/daysprog/edit'
import DeleteDaysProg from './Forms/daysprog/delete'
import ViewDaysProg from './Forms/daysprog/view'

import ActvityLog from './Forms/activitylog'
import AddActvityLog from './Forms/activitylog/add'
import EditActvityLog from './Forms/activitylog/edit'
import DeleteActvityLog from './Forms/activitylog/delete'
import ViewActvityLog from './Forms/activitylog/view'

import StaffDescA from './Forms/staffjoba'
import AddStaffDescA from './Forms/staffjoba/add'
import EditStaffDescA from './Forms/staffjoba/edit'
import DeleteStaffDescA from './Forms/staffjoba/delete'
import ViewStaffDescA from './Forms/staffjoba/view'

import StaffDescB from './Forms/staffjobb'
import AddStaffDescB from './Forms/staffjobb/add'
import EditStaffDescB from './Forms/staffjobb/edit'
import DeleteStaffDescB from './Forms/staffjobb/delete'
import ViewStaffDescB from './Forms/staffjobb/view'

import ChangeShift from './Forms/changeshift'
import AddChangeShift from './Forms/changeshift/add'
import EditChangeShift from './Forms/changeshift/edit'
import DeleteChangeShift from './Forms/changeshift/delete'
import ViewChangeShift from './Forms/changeshift/view'

import FundSheet from './Forms/fundssheet'
import AddFundSheet from './Forms/fundssheet/add'
import EditFundSheet from './Forms/fundssheet/edit'
import DeleteFundSheet from './Forms/fundssheet/delete'
import ViewFundSheet from './Forms/fundssheet/view'

import BehaveSheet from './Forms/behavesheet'
import AddBehaveSheet from './Forms/behavesheet/add'
import EditBehaveSheet from './Forms/behavesheet/edit'
import DeleteBehaveSheet from './Forms/behavesheet/delete'
import ViewBehaveSheet from './Forms/behavesheet/view'

import Training from './Forms/training'
import AddTraining from './Forms/training/add'
import EditTraining from './Forms/training/edit'
import DeleteTraining from './Forms/training/delete'
import ViewTraining from './Forms/training/view'

import Attend from './Forms/attend'
import AddAttend from './Forms/attend/add'
import EditAttend from './Forms/attend/edit'
import DeleteAttend from './Forms/attend/delete'
import ViewAttend from './Forms/attend/view'

import Overnight from './Forms/overnight'
import AddOvernight from './Forms/overnight/add'
import EditOvernight from './Forms/overnight/edit'
import DeleteOvernight from './Forms/overnight/delete'
import ViewOvernight from './Forms/overnight/view'

import Bowel from './Forms/bowel'
import AddBowel from './Forms/bowel/add'
import EditBowel from './Forms/bowel/edit'
import DeleteBowel from './Forms/bowel/delete'
import ViewBowel from './Forms/bowel/view'

import Incident from './Forms/incident'
import AddIncident from './Forms/incident/add'
import EditIncident from './Forms/incident/edit'
import DeleteIncident from './Forms/incident/delete'
import ViewIncident from './Forms/incident/view'

import Statement from './Forms/statement'
import AddStatement from './Forms/statement/add'
import EditStatement from './Forms/statement/edit'
import DeleteStatement from './Forms/statement/delete'
import ViewStatement from './Forms/statement/view'

import Appointment from './Forms/appointment'
import AddAppointment from './Forms/appointment/add'
import EditAppointment from './Forms/appointment/edit'
import ViewAppointment from './Forms/appointment/view'
import ExViewAppointment from './Forms/appointment/ex_view'

import Tracking from './Forms/appointment/tracking'


import ChatPage from './components/ChatPage/ChatPage';
import Chat from './components/ChatPage';



const Routes = () => {
  return (
    <div>
      <Layout>
        <Switch>
          {/* Supervisor true,true,true,false,false
              QA true,true,false,true,false
              Accountant true,true,false,false,true
              Super true,true,true,true,true
              staff true

          */}
        <Route path="/chat/:id" exact component={Auth(ChatPage,true,true,true,true,true)}/>
        <Route path="/chat" exact component={Auth(Chat,true,true,true,true,true)}/>

        <Route path="/forms/tracking" exact component={Auth(Tracking,true,true,true,true,true)}/>

        <Route path="/forms/appointment_view" exact component={Auth(ViewAppointment,true)}/>
        <Route path="/appointment_ex_view/:id" exact component={Auth(ExViewAppointment,true)}/> 
        {/* <Route path="/overnight_delete/:id" exact component={Auth(DeleteOvernight,true,true,true,true,true)}/> */}
        <Route path="/appointment_edit/:id" exact component={Auth(EditAppointment,true,true,true,true,true)}/> 
        <Route path="/forms/appointment" exact component={Auth(Appointment,true,true,true,false,false)}/>
        <Route path="/forms/appointment_add" exact component={Auth(AddAppointment,true,true,true,true,true)}/>

        <Route path="/statement_view/:id" exact component={Auth(ViewStatement,true,true,false,true,false)}/>
        <Route path="/statement_delete/:id" exact component={Auth(DeleteStatement,true,true,false,true,false)}/>
        <Route path="/statement_edit/:id" exact component={Auth(EditStatement,true,true,false,true,false)}/>
        <Route path="/forms/statement" exact component={Auth(Statement,true,true,false,true,false)}/>
        <Route path="/forms/statement_add" exact component={Auth(AddStatement,true)}/>

        <Route path="/incident_view/:id" exact component={Auth(ViewIncident,true,true,false,true,false)}/>
        <Route path="/incident_delete/:id" exact component={Auth(DeleteIncident,true,true,false,true,false)}/>
        <Route path="/incident_edit/:id" exact component={Auth(EditIncident,true,true,false,true,false)}/>
        <Route path="/forms/incident" exact component={Auth(Incident,true,true,false,true,false)}/>
        <Route path="/forms/incident_add" exact component={Auth(AddIncident,true)}/>

        <Route path="/forms/bowel_view" exact component={Auth(ViewBowel,true,true,true,false,false)}/>
        <Route path="/bowel_delete/:id" exact component={Auth(DeleteBowel,true,true,true,true,true)}/>
        <Route path="/bowel_edit/:id" exact component={Auth(EditBowel,true,true,true,true,true)}/>
        <Route path="/forms/bowel" exact component={Auth(Bowel,true,true,true,false,false)}/>
        <Route path="/forms/bowel_add" exact component={Auth(AddBowel,true)}/>

        <Route path="/forms/overnight_view" exact component={Auth(ViewOvernight,true,true,true,false,false)}/>
        <Route path="/overnight_delete/:id" exact component={Auth(DeleteOvernight,true,true,true,true,true)}/>
        <Route path="/overnight_edit/:id" exact component={Auth(EditOvernight,true,true,true,true,true)}/>
        <Route path="/forms/overnight" exact component={Auth(Overnight,true,true,true,false,false)}/>
        <Route path="/forms/overnight_add" exact component={Auth(AddOvernight,true)}/>
        
        <Route path="/forms/attendance_view" exact component={Auth(ViewAttend,true,true,true,false,false)}/>
        <Route path="/attendance_delete/:id" exact component={Auth(DeleteAttend,true,true,true,true,true)}/>
        <Route path="/attendance_edit/:id" exact component={Auth(EditAttend,true,true,true,true,true)}/>
        <Route path="/forms/attendance" exact component={Auth(Attend,true,true,true,false,false)}/>
        <Route path="/forms/attendance_add" exact component={Auth(AddAttend,true)}/>

        <Route path="/training_view/:id" exact component={Auth(ViewTraining,true,true,true,true,true)}/>
        <Route path="/training_delete/:id" exact component={Auth(DeleteTraining,true,true,true,true,true)}/>
        <Route path="/training_edit/:id" exact component={Auth(EditTraining,true,true,true,true,true)}/>
        <Route path="/forms/training" exact component={Auth(Training,true,true,true,true,true)}/>
        <Route path="/forms/training_add" exact component={Auth(AddTraining,true,true,true,true)}/>

        <Route path="/forms/fund_sheet_view" exact component={Auth(ViewFundSheet,true,true,true,false,false)}/>
        <Route path="/fund_sheet_delete/:id" exact component={Auth(DeleteFundSheet,true,true,true,true,true)}/>
        <Route path="/fund_sheet_edit/:id" exact component={Auth(EditFundSheet,true,true,true,true,true)}/>
        <Route path="/forms/fund_sheet" exact component={Auth(FundSheet,true,true,true,false,false)}/>
        <Route path="/forms/fund_sheet_add" exact component={Auth(AddFundSheet,true)}/>

        <Route path="/forms/behave_sheet_view" exact component={Auth(ViewBehaveSheet,true,true,true,false,false)}/>
        <Route path="/behave_sheet_delete/:id" exact component={Auth(DeleteBehaveSheet,true,true,true,true,true)}/>
        <Route path="/behave_sheet_edit/:id" exact component={Auth(EditBehaveSheet,true,true,true,true,true)}/>
        <Route path="/forms/behave_sheet" exact component={Auth(BehaveSheet,true,true,true,false,false)}/>
        <Route path="/forms/behave_sheet_add" exact component={Auth(AddBehaveSheet,true)}/>

        <Route path="/forms/change_shift_view" exact component={Auth(ViewChangeShift,true,true,true,false,false)}/>
        <Route path="/change_shift_delete/:id" exact component={Auth(DeleteChangeShift,true,true,true,true,true)}/>
        <Route path="/change_shift_edit/:id" exact component={Auth(EditChangeShift,true,true,true,true,true)}/>
        <Route path="/forms/change_shift" exact component={Auth(ChangeShift,true,true,true,false,false)}/>
        <Route path="/forms/change_shift_add" exact component={Auth(AddChangeShift,true)}/>

        <Route path="/forms/staff_desc_b_view" exact component={Auth(ViewStaffDescB,true,true,true,false,false)}/>
        <Route path="/staff_desc_b_delete/:id" exact component={Auth(DeleteStaffDescB,true,true,true,true,true)}/>
        <Route path="/staff_desc_b_edit/:id" exact component={Auth(EditStaffDescB,true,true,true,true,true)}/>
        <Route path="/forms/staff_desc_b" exact component={Auth(StaffDescB,true,true,true,false,false)}/>
        <Route path="/forms/staff_desc_b_add" exact component={Auth(AddStaffDescB,true)}/>

        <Route path="/forms/staff_desc_a_view" exact component={Auth(ViewStaffDescA,true,true,true,false,false)}/>
        <Route path="/staff_desc_a_delete/:id" exact component={Auth(DeleteStaffDescA,true,true,true,true,true)}/>
        <Route path="/staff_desc_a_edit/:id" exact component={Auth(EditStaffDescA,true,true,true,true,true)}/>
        <Route path="/forms/staff_desc_a" exact component={Auth(StaffDescA,true,true,true,false,false)}/>
        <Route path="/forms/staff_desc_a_add" exact component={Auth(AddStaffDescA,true)}/>

        <Route path="/forms/activity_log_view" exact component={Auth(ViewActvityLog,true,true,true,false,false)}/>
        <Route path="/activity_log_delete/:id" exact component={Auth(DeleteActvityLog,true,true,true,true,true)}/>
        <Route path="/activity_log_edit/:id" exact component={Auth(EditActvityLog,true,true,true,true,true)}/>
        <Route path="/forms/activity_log" exact component={Auth(ActvityLog,true,true,true,false,false)}/>
        <Route path="/forms/activity_log_add" exact component={Auth(AddActvityLog,true)}/>

        <Route path="/days_prog_view/:id" exact component={Auth(ViewDaysProg,true,true,true,false,false)}/>
        <Route path="/days_prog_delete/:id" exact component={Auth(DeleteDaysProg,true,true,true,true,true)}/>
        <Route path="/days_prog_edit/:id" exact component={Auth(EditDaysProg,true,true,true,true,true)}/>
        <Route path="/forms/days_prog" exact component={Auth(DaysProg,true,true,true,false,false)}/>
        <Route path="/forms/days_prog_add" exact component={Auth(AddDaysProg,true)}/>

        <Route path="/fire_safety_view/:id" exact component={Auth(ViewFireSafety,true,true,true,false,false)}/>
        <Route path="/fire_safety_delete/:id" exact component={Auth(DeleteFireSafety,true,true,true,true,true)}/>
        <Route path="/fire_safety_edit/:id" exact component={Auth(EditFireSafety,true,true,true,true,true)}/>
        <Route path="/forms/fire_safety" exact component={Auth(FireSafety,true,true,true,false,false)}/>
        <Route path="/forms/fire_safety_add" exact component={Auth(AddFireSafety,true)}/>

        <Route path="/house_meeting_view/:id" exact component={Auth(ViewHouseMeeting,true,true,true,false,false)}/>
        <Route path="/house_meeting_delete/:id" exact component={Auth(DeleteHouseMeeting,true,true,true,true,true)}/>
        <Route path="/house_meeting_edit/:id" exact component={Auth(EditHouseMeeting,true,true,true,true,true)}/>
        <Route path="/forms/house_meeting" exact component={Auth(HouseMeeting,true,true,true,false,false)}/>
        <Route path="/forms/house_meeting_add" exact component={Auth(AddHouseMeeting,true)}/>

        <Route path="/safety_inspection_view/:id" exact component={Auth(ViewSafetyInspec,true,true,true,false,false)}/>
        <Route path="/safety_inspection_delete/:id" exact component={Auth(DeleteSafetyInspec,true,true,true,true,true)}/>
        <Route path="/safety_inspection_edit/:id" exact component={Auth(EditSafetyInspec,true,true,true,true,true)}/>
        <Route path="/forms/safety_inspection" exact component={Auth(SafetyInspec,true,true,true,false,false)}/>
        <Route path="/forms/safety_inspection_add" exact component={Auth(AddSafetyInspec,true)}/>

        <Route path="/daily_progress_note_view/:id" exact component={Auth(ViewDailyprogressnote,true,true,true,false,false)}/>
        <Route path="/daily_progress_note_delete/:id" exact component={Auth(DeleteDailyprogressnote,true,true,true,true,true)}/>
        <Route path="/daily_progress_note_edit/:id" exact component={Auth(EditDailyprogressnote,true,true,true,true,true)}/>
        <Route path="/forms/daily_progress_note" exact component={Auth(Dailyprogressnote,true,true,true,false,false)}/>
        <Route path="/forms/daily_progress_note_add" exact component={Auth(AddDailyprogressnote,true)}/>

        <Route path="/time_sheet_view/:id" exact component={Auth(ViewTimeSheet,true,true)}/>
        <Route path="/time_sheet_delete/:id" exact component={Auth(DeleteTimeSheet,true,true,false,false,true)}/>
        <Route path="/time_sheet_submit/:id" exact component={Auth(SubmitTimeSheet,true)}/>
        <Route path="/time_sheet_edit/:id" exact component={Auth(EditTimeSheet,true)}/>
        <Route path="/forms/time_sheet" exact component={Auth(TimeSheet,true,true,false,false,true)}/>
        <Route path="/forms/time_sheet_user" exact component={Auth(TimeSheetUser,true)}/>
        <Route path="/forms/time_sheet_add" exact component={Auth(AddTimeSheet,true)}/>

        <Route path="/forms/timeline" exact component={Auth(Timeline,true,true)}/>
        <Route path="/forms/timeline_user" exact component={Auth(TimelineUser,true)}/>

        <Route path="/individual_view/:id" exact component={Auth(ViewIndividual,true,true,true,true,true)}/>
        <Route path="/individual_delete/:id" exact component={Auth(DeleteIndividual,true,true,true,true,true)}/>
        <Route path="/individual_edit/:id" exact component={Auth(EditIndividual,true,true,true,true,true)}/>
        <Route path="/individuals/individual" exact component={Auth(Individual,true,true,true,true,true)}/>
        <Route path="/individuals/individual_add" exact component={Auth(AddIndividual,true,true,true,true,true)}/>

        <Route path="/message_delete/:id" exact component={Auth(DeleteMessage,true,true,false,false,true)}/>
        <Route path="/message_edit/:id" exact component={Auth(EditMessage,true,true,false,false,true)}/>
        <Route path="/messages/message" exact component={Auth(Message,true,true,false,false,true)}/>
        <Route path="/messages/message_add" exact component={Auth(AddMessage,true,true,false,false,true)}/>

        <Route path="/address_delete/:id" exact component={Auth(DeleteAddress,true,true,true,true,true)}/>
        <Route path="/address_edit/:id" exact component={Auth(EditAddress,true,true,true,true,true)}/>
        <Route path="/forms/address" exact component={Auth(Address,true,true,true,true,true)}/>
        <Route path="/forms/address_add" exact component={Auth(AddAddress,true,true,true,true,true)}/>

        <Route path="/view_user/:id" exact component={Auth(ViewUser,true)}/>
        <Route path="/resume_user/:id" exact component={Auth(ResumeUser,true,true,true,true,true)}/>
        <Route path="/terminate_user/:id" exact component={Auth(TerminateUser,true,true,true,true,true)}/>
        <Route path="/suspend_user/:id" exact component={Auth(SuspendUser,true,true,true,true,true)}/>
        <Route path="/edit_user/:id" exact component={Auth(EditUser,true,true,true,true,true)}/>
        <Route path="/user/users" exact component={Auth(Users,true,true,true,true,true)}/>
        <Route path="/user/usersexp" exact component={Auth(UsersExp,true,true,true,true,true)}/>
        <Route path="/user/address_assoc_add" exact component={Auth(AddAddr,true,true,true,true,true)}/>
        <Route path="/user/individual_assoc_add" exact component={Auth(AddIndiv,true,true,true,true,true)}/>
        <Route path="/associate_user/:id" exact component={Auth(Assoc,true,true,true,true,true)}/>
        <Route path="/user/reset_password" exact component={Auth(ResetPass,true)}/>
        <Route path="/user/add_user" exact component={Auth(AddUser,true,true,true,true,true)}/>

        <Route path="/access_denied" exact component={Auth(Reject,true)}/>
        
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
        <Route path="/user/profile" exact component={Auth(UserProfile,true)}/>

        <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
        <Route path="/user/register" exact component={Auth(Register,true,true)}/>
        <Route path="/" exact component={Auth(RegisterLogin,null)}/>
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;