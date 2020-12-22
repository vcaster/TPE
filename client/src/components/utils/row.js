import React, { Component } from 'react';
import MyButton from './button';
import moment from 'moment'
import axios from 'axios';
import { saveAs } from 'file-saver';
import {FORM_SERVER} from '../../components/utils/misc'
import parse from "html-react-parser"
class Row extends Component {

    createPdfd = (data,name) => {
        const date = new Date(data.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds=date.getSeconds()
        const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
        axios.post(`${FORM_SERVER}/${name}_download`, data)
        setTimeout(()=>{
        axios.get(`${FORM_SERVER}/${name}_read?formId=${data._id}`).then(
        axios.get(`${FORM_SERVER}/${name}_fetch?createdAt=${data.createdAt}&name=${data.individual.name+data.individual.lastname}`, { responseType: 'blob'})
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, full+data.individual.name+data.individual.lastname+'_'+name+'.pdf')
            })
         );
        }, 3000)
    }
    createPdfs = (data,name) => {
        const date = new Date(data.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds=date.getSeconds()
        const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
        axios.post(`${FORM_SERVER}/${name}_download`, data)
        setTimeout(()=>{
        axios.get(`${FORM_SERVER}/${name}_read?formId=${data._id}`).then(
            axios.get(`${FORM_SERVER}/${name}_fetch?createdAt=${data.createdAt}&name=${data.address.name}`, { responseType: 'blob'})
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, full+data.address.name+'_'+name+'_checklist.pdf')
            })
         );
        }, 3000)
    }

   renderRow = (full) => (
       // a ? b : (c ? d : e)
        this.props.formname === 'Daily_Prog_Note' ? 
        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/daily_progress_note_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                :null
            }
            {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/daily_progress_note_view/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
            :
            <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/daily_progress_note_view/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
            }

                {this.props.isSadmin ?
                <React.Fragment>
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/daily_progress_note_delete/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                 <button  
                    className={"btn btn-block bg-gradient-green"}
                    type="button"
                    onClick={()=>this.createPdfd(this.props, "daily_progress_note")}>
                        Download
                </button>
                    </React.Fragment>
                    :null
                }   
                </div>
                     
            </td>
            <td> {this.props.read === true ?  <span className="left badge badge-primary">Checked</span> :  <span className="left badge badge-danger">Unchecked</span>} {this.props.individual.name} {this.props.individual.lastname}</td>
            <td>Daily Progress Note</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  : 

        (this.props.formname === 'Safety_Inspec' ? 

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/safety_inspection_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                :null
            }
            {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/safety_inspection_view/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                :
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/safety_inspection_view/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                }

                {this.props.isSadmin ?
                <React.Fragment>
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/safety_inspection_delete/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                        
                    <button  
                        className={"btn btn-block bg-gradient-green"}
                        type="button"
                        onClick={()=>this.createPdfs(this.props, "safety_inspection")}>
                            Download
                    </button>
                    </React.Fragment>
                :null 
                }    
                </div>
                     
            </td>
            <td>{this.props.read === true ?  <span className="left badge badge-primary">Checked</span> :  <span className="left badge badge-danger">Unchecked</span>} {this.props.individual}</td>
            <td>{this.props.address.name}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :

        (this.props.formname === 'House_Meeting' ? 
                
        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/house_meeting_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null }
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/house_meeting_view/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                    :
                    <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/house_meeting_view/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        /> 
                }
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/house_meeting_delete/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                :null }
                    
                </div>
                     
            </td>
            <td>{this.props.read === true ?  <span className="left badge badge-primary">Checked</span> :  <span className="left badge badge-danger">Unchecked</span>} {this.props.individual}</td>
            <td>{this.props.address.name}</td>
            <td>{full}</td>
            <td>{this.props.staff}</td>
        </tr>  :

        (this.props.formname === 'Fire_Safety' ? 

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/fire_safety_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                :null }
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/fire_safety_view/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                        :
                <MyButton
                type="default-group"
                altClass="btn btn-block bg-gradient-primary"
                title="View"
                linkTo={`/fire_safety_view/${this.props._id}`}

                // addStyles={{
                //     margin: "10px 0 0 0"
                // }}
                />
                }
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/fire_safety_delete/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                    : null }
                </div>
                     
            </td>
            <td>{this.props.read === true ?  <span className="left badge badge-primary">Checked</span> :  <span className="left badge badge-danger">Unchecked</span>} {this.props.individual}</td>
            <td>{this.props.address.name}</td>
            <td>{full}</td>
            <td>{this.props.staff}</td>

        </tr>  :

        (this.props.formname === 'Days_Prog' ?

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/days_prog_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                :null}
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/days_prog_view/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                        :
                        <MyButton
                        type="default-group"
                        altClass="btn btn-block bg-gradient-primary"
                        title="View"
                        linkTo={`/days_prog_view/${this.props._id}`}

                        // addStyles={{
                        //     margin: "10px 0 0 0"
                        // }}
                    />   
                }
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/days_prog_delete/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                    : null }
                </div>
                     
            </td>
            <td>{this.props.read === true ?  <span className="left badge badge-primary">Checked</span> :  <span className="left badge badge-danger">Unchecked</span>} {this.props.individual.name} {this.props.individual.lastname}</td>
            <td>{this.props.address.name}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :

        (this.props.formname === 'Activity_Log' ?

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/activity_log_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
            :null 
            }
                {/* <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/activity_log_view/${this.props.address._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        /> */}
            {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/activity_log_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                :null
            }   
                </div>
                    
            </td>
            <td> {this.props.individual.name} {this.props.individual.lastname}</td>
            <td>{this.props.address.name}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :


        (this.props.formname === 'staff_desc_a' ?

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/staff_desc_a_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null }
                {/* <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/activity_log_view/${this.props.address._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        /> */}
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/staff_desc_a_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                : null }
                </div>
                    
            </td>
            <td> {this.props.address.name}</td>
            <td>{this.props.staffratio}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :

        (this.props.formname === 'staff_desc_b' ?

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/staff_desc_b_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null }
                {/* <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/activity_log_view/${this.props.address._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        /> */}
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/staff_desc_b_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                : null }   
                </div>
                    
            </td>
            <td> {this.props.address.name}</td>
            <td>{this.props.staffratio}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :


    (this.props.formname === 'Change_shift' ?

    <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/change_shift_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null }
                {/* <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/activity_log_view/${this.props.address._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        /> */}
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/change_shift_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                : null }    
                </div>
                    
            </td>
            <td> {this.props.address.name}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :

        (this.props.formname === 'fund_sheet' ?

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/fund_sheet_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null }
                {/* <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/activity_log_view/${this.props.address._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        /> */}
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/fund_sheet_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                : null }   
                </div>
                    
            </td>
            <td>{this.props.individual.name} {this.props.individual.lastname}</td>
            <td>{this.props.address.name}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :

        (this.props.formname === 'behave_sheet' ?

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/behave_sheet_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null }
                {/* <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/behave_sheet_view/${this.props.address._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        /> */}
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/behave_sheet_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                :null }   
                </div>
                    
            </td>
            <td>{this.props.individual.name} {this.props.individual.lastname}</td>
            <td>{this.props.setting}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :

        (this.props.formname === 'training' ?

        <tr>
            <td><div className="btn-group">
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/training_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/training_view/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/training_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                    
                </div>
                    
            </td>
            <td>{this.props.read === true ?  <span className="left badge badge-primary">Checked</span> :  <span className="left badge badge-danger">Unchecked</span>} {this.props.individual.name} {this.props.individual.lastname}</td>
            <td>{this.props.training}</td>
            <td>{this.props.address}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :

(this.props.formname === 'attend' ?

<tr>
    <td><div className="btn-group">
    {this.props.isSadmin ?
        <MyButton
            type="default-group"
            altClass="btn btn-block bg-gradient-primary"
            title="Edit"
            linkTo={`/attendance_edit/${this.props._id}`}

            // addStyles={{
            //     margin: "10px 0 0 0"
            // }}
        />
        : null }
        {/* <MyButton
                    type="default-group"
                    // altClass="btn btn-block bg-gradient-primary"
                    title="View"
                    linkTo={`/behave_sheet_view/${this.props.address._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                /> */}
        {this.props.isSadmin ?
        <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-danger"
                    title="Delete"
                    linkTo={`/attendance_delete/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
        : null }   
        </div>
            
    </td>
    <td>{this.props.individual.name} {this.props.individual.lastname}</td>
    <td>{this.props.input}</td>
    <td>{full}</td>
    <td>{this.props.name.name} {this.props.name.lastname}</td>
</tr>  :

(this.props.formname === 'overnight' ?

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/overnight_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
            : null }
                {/* <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/behave_sheet_view/${this.props.address._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        /> */}
                {this.props.isSadmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/overnight_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                : null }   
                </div>
                    
            </td>
            <td>{this.props.individual.name} {this.props.individual.lastname}</td>
            <td>{this.props.input}</td>
            <td>{full}</td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
        </tr>  :

(this.props.formname === 'bowel' ?

<tr>
    <td><div className="btn-group">
    {this.props.isSadmin ?
        <MyButton
            type="default-group"
            altClass="btn btn-block bg-gradient-primary"
            title="Edit"
            linkTo={`/bowel_edit/${this.props._id}`}

            // addStyles={{
            //     margin: "10px 0 0 0"
            // }}
        />
    : null }
        {/* <MyButton
                    type="default-group"
                    // altClass="btn btn-block bg-gradient-primary"
                    title="View"
                    linkTo={`/behave_sheet_view/${this.props.address._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                /> */}
    {this.props.isSadmin ?
        <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-danger"
                    title="Delete"
                    linkTo={`/bowel_delete/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
    : null }       
        </div>
            
    </td>
    <td>{this.props.individual.name} {this.props.individual.lastname}</td>
    <td>{this.props.amount} | {this.props.consist} | {this.props.shift}</td>
    <td>{full}</td>
    <td>{this.props.name.name} {this.props.name.lastname}</td>
</tr>  :

        (this.props.formname === 'activity_log_view' ?
        <tr>
            <td><textarea style={{ width: '100%', height: 35, float: 'left' }} defaultValue={new Date(this.props.createdAt)} /></td>
            <td><td className="meta-head3">Activity</td>
                <textarea style={{ width: '100%', height: 35, float: 'left' }} defaultValue={new String(this.props.activity)} />
            <td className="meta-head3">Location And Time</td>
                <textarea style={{ width: '100%', height: 35, float: 'left' }} defaultValue={new String(this.props.location +" "+ this.props.time)} />
            </td>
            <td><textarea style={{ width: '100%', height: 35, float: 'left' }} defaultValue={new String(this.props.stafIntals)}/></td>
            <td><td className="meta-head3">Completed?</td>
                <textarea style={{ width: '100%', height: 35, float: 'left' }} defaultValue={new String(this.props.completed)} />
                <td className="meta-head3">Comment</td>
                <textarea style={{ width: '100%', height: 35, float: 'left' }} defaultValue={new String(this.props.comment)} /></td>
        </tr>  :

        (this.props.formname === 'staff_desc_a_view' ?
        <tr>
            <td>{full}</td>       
            <td style={{height:'44px'}}>{new String(this.props.dressed)}</td>          
            <td>{new String(this.props.checkindiv)}</td>           
            <td style={{height:'44px'}}>{new String(this.props.bedcheck)}</td>      
            <td style={{height:'44px'}}>{new String(this.props.stove)}</td>       
            <td style={{height:'44px'}}>{new String(this.props.cabinet)}</td>    
            <td style={{height:'60px'}}>{new String(this.props.iron)}</td>         
            <td style={{height:'44px'}}>{new String(this.props.room)}</td>         
            <td>{new String(this.props.trash)}</td>            
            <td style={{height:'44px'}}>{new String(this.props.bathroom)}</td>    
            <td style={{height:'44px'}}>{new String(this.props.food)}</td>           
            <td>{new String(this.props.container)}</td>      
            <td>{new String(this.props.mop)}</td>           
            <td style={{height:'44px'}}>{new String(this.props.breakfast)}</td>          
            <td style={{height:'44px'}}>{new String(this.props.laundary)}</td>      
            <td style={{height:'44px'}}>{new String(this.props.drill)}</td>     
            <td>{new String(this.props.issues)}</td>           
            <td style={{height:'60px'}}>{new String(this.props.mar)}</td>         
            <td>{new String(this.props.signs)}</td>     
            <td style={{height:'44px'}}>{new String(this.props.agency)}</td>      
            <td style={{height:'44px'}}>{new String(this.props.duties)}</td>     
            <td>{new String(this.props.name.name)+"."+ new String(this.props.name.lastname).substring(0, 1)}</td>            
            <td><img style={{height: 30, width:70}} src={new String(this.props.staffsignimg)} alt="signature"/></td>
        </tr>
 :

        (this.props.formname === 'staff_desc_b_view' ?
            <tr>
                <td>{full}</td>
                <td>{new String(this.props.checklist)}</td>
                <td style={{height:'60px'}}>{new String(this.props.water)}</td>
                <td style={{height:'44px'}}>{new String(this.props.dinner)}</td>
                <td style={{height:'44px'}}>{new String(this.props.review)}</td>
                <td style={{height:'44px'}}>{new String(this.props.snack)}</td>
                <td>{new String(this.props.bp)}</td>
                <td style={{height:'44px'}}>{new String(this.props.activities)}</td>
                <td style={{height:'44px'}}>{new String(this.props.note)}</td>
                <td style={{height:'44px'}}>{new String(this.props.activlogs)}</td>
                <td style={{height:'44px'}}>{new String(this.props.notesdaily)}</td>
                <td style={{height:'44px'}}>{new String(this.props.unit)}</td>
                <td style={{height:'60px'}}>{new String(this.props.trash)}</td>
                <td style={{height:'44px'}}>{new String(this.props.bathroom)}</td>
                <td>{new String(this.props.mop)}</td>
                <td style={{height:'44px'}}>{new String(this.props.lunch)}</td>
                <td style={{height:'44px'}}>{new String(this.props.laundary)}</td>
                <td style={{height:'44px'}}>{new String(this.props.drill)}</td>
                <td>{new String(this.props.issues)}</td>
                <td>{new String(this.props.signs)}</td>
                <td style={{height:'44px'}}>{new String(this.props.agency)}</td>
                <td style={{height:'44px'}}>{new String(this.props.iron)}</td>
                <td style={{height:'60px'}}>{new String(this.props.duties)}</td>
                <td >{new String(this.props.name.name) + "." + new String(this.props.name.lastname).substring(0, 1)}</td>
                <td><img style={{ height: 30, width: 60 }} src={new String(this.props.staffsignimg)} alt="signature" /></td>
            </tr>
 :

        (this.props.formname === 'change_shift_view' ?
        <tr>
                <td>{full}</td>
                <td>{new String(this.props.shift)}</td>
                <td style={{height:'44px'}}>{new String(this.props.allacc)}</td>
                <td>-</td>
                <td>{new String(this.props.cabinet)}</td>
                <td>{new String(this.props.pmof)}</td>
                <td style={{height:'44px'}}>{new String(this.props.mar)}</td>
                <td >{new String(this.props.pills)}</td>
                <td style={{height:'44px'}}>{new String(this.props.error)}</td>
                <td >{new String(this.props.lock)}</td>
                <td style={{height:'44px'}}>{new String(this.props.count)}</td>
                <td style={{height:'44px'}}>{new String(this.props.prn)}</td>
                <td style={{height:'44px'}}>{new String(this.props.firstaid)}</td>
                <td style={{height:'44px'}}>{new String(this.props.keys)}</td>
                <td>-</td>
                <td>{new String(this.props.goal)}</td>
                <td style={{height:'44px'}}>{new String(this.props.intake)}</td>
                <td>{new String(this.props.log)}</td>
                <td style={{height:'44px'}}>{new String(this.props.food)}</td>
                <td style={{height:'44px'}}>{new String(this.props.linen)}</td>
                <td style={{height:'44px'}}>{new String(this.props.cleaning)}</td>
                <td>-</td>
                <td >{new String(this.props.alu)}</td>
                <td >{new String(this.props.neat)}</td>
                <td >{new String(this.props.rooms)}</td>
                <td >{new String(this.props.complete)}</td>
                <td style={{height:'44px'}}>{new String(this.props.above)}</td>
                <td style={{height:'44px'}}>{new String(this.props.chores)}</td>
                <td style={{height:'44px'}}>{new String(this.props.repairs)}</td>
                <td style={{height:'44px'}}>{new String(this.props.incident)}</td>
                <td>-</td>
                <td>{new String(this.props.damaged)}</td>
                <td >{new String(this.props.mileage)}</td>
                <td style={{height:'44px'}}>{new String(this.props.parked)}</td>
                <td >{new String(this.props.name.name).substring(0, 4)+"."+ new String(this.props.name.lastname).substring(0, 1)}</td>
                <td><img style={{ height: 30, width: 60 }} src={new String(this.props.staffsignimg)} alt="signature" /></td>
            </tr>
             :

        (this.props.formname === 'behave_sheet_view' ?
        <tr>
        <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={full} /></td>
        <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.timeb)} /></td>
        <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.timee)} /></td>
        <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.snacking)} /></td>
        <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.destruct)} /></td>
        <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.vocal)} /></td>
        <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.sib)} /></td>
        <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.elopment)} /></td>
        <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.rating)} /></td>
        </tr> :

        (this.props.formname === 'fund_sheet_view' ?
        <tr>
            <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={full} /></td><td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.amountr)} /></td>
            <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.amounts)} /></td>
            <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.ogstaff)} /></td>
            <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.icstaff)} /></td>
            <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.dailyb)} /></td>
            <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.check)} /></td>
            <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.receipt)} /></td>
            <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.comment)} /></td>
            <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={new String(this.props.clark)} /></td>
        </tr>  :
        (this.props.formname === 'attend_view' ?
        <div className="column col-sm-1" style={{borderStyle: 'groove'}}>
            <p>{full}</p>
            <hr />
            <p>{new String(this.props.input)}</p>
            <hr />		 
        </div>  :

        (this.props.formname === 'over_view' ?
        <div className="column col-sm-1" style={{borderStyle: 'groove'}}>	
            <p>{full}</p>
            <hr/>
            <p>{new String(this.props.time)}</p>
		  	<hr/>
		  	<p>{new String(this.props.input)}</p>
		    <hr/>		 
        </div>  :

        (this.props.formname === 'bowel_view' ?
        <div className="column col-sm-1" style={{ borderStyle: 'groove' }}>
            <p>{full}</p>
            <hr />
            <p>{new String(this.props.shift)}</p>
            <hr />
            <p>{new String(this.props.amount)}</p>
            <hr />
            <p>{new String(this.props.consist)}</p>
            <hr />
            <p>{new String(this.props.name.name).substring(0, 4)+"."+ new String(this.props.name.lastname).substring(0, 1)}</p>
        </div> :

        (this.props.formname === 'Statment' ? 
                        
        <tr>
            <td><div className="btn-group">
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/statement_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/statement_view/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/statement_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                    
                </div>
                    
            </td>
            <td>{this.props.read === true ?  <span className="left badge badge-primary">Checked</span> :  <span className="left badge badge-danger">Unchecked</span>} {this.props.name.name} {this.props.name.lastname}</td>
            <td>{full}</td>
        </tr>  :

        (this.props.formname === 'Incident' ? 
                        
            <tr>
                <td><div className="btn-group">
                    <MyButton
                        type="default-group"
                        altClass="btn btn-block bg-gradient-primary"
                        title="Edit"
                        linkTo={`/incident_edit/${this.props._id}`}

                        // addStyles={{
                        //     margin: "10px 0 0 0"
                        // }}
                    />
                    <MyButton
                                type="default-group"
                                // altClass="btn btn-block bg-gradient-primary"
                                title="View"
                                linkTo={`/incident_view/${this.props._id}`}
    
                                // addStyles={{
                                //     margin: "10px 0 0 0"
                                // }}
                            />
                    <MyButton
                                type="default-group"
                                altClass="btn btn-block bg-gradient-danger"
                                title="Delete"
                                linkTo={`/incident_delete/${this.props._id}`}
    
                                // addStyles={{
                                //     margin: "10px 0 0 0"
                                // }}
                            />
                        
                    </div>
                        
                </td>
                <td>{this.props.read === true ?  <span className="left badge badge-primary">Checked</span> :  <span className="left badge badge-danger">Unchecked</span>} {this.props.individual.name} {this.props.individual.lastname}</td>
                <td>{this.props.address.name}</td>
                <td>{full}</td>
                <td>{this.props.name.name} {this.props.name.lastname}</td>
            </tr>  :


        (this.props.formname === 'Users' ?

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/edit_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null}  
                {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    // altClass="btn btn-block bg-gradient-primary"
                    title="View"
                    linkTo={`/view_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null}  
                {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-warning"
                    title="Suspend"
                    linkTo={`/suspend_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null}   
                {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-danger"
                    title="Terminate"
                    linkTo={`/terminate_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null} 

                {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-purple"
                    title="Associated"
                    linkTo={`/associate_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null}     

                {this.props.deleted === '1' || this.props.deleted === '2' ?
                    <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-success"
                    title="Resume"
                    linkTo={`/resume_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                :null}

                </div>
                    
            </td>
            <td> {this.props.email} </td>
            <td> {this.props.lastname} {this.props.name}</td>
            <td>{this.props.deleted === '0' ?  <span className="left badge badge-primary">Working</span> : (this.props.deleted === '1' ? <span className="left badge badge-warning">Suspended</span> : (this.props.deleted === '2' ?  <span className="left badge badge-danger">Terminated</span> :  (this.props.deleted === '1' || this.props.deleted === '2' ?  <span className="left badge badge-danger">Terminated</span> : null))) }</td>
            <td> <img src={this.props.photo} alt="staff" className="img-circle elevation-2" height="50px"/> </td>
        </tr>  :

        (this.props.formname === 'UsersExp' ?

        <tr>
            <td><div className="btn-group">
            {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/edit_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null}  
                {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    // altClass="btn btn-block bg-gradient-primary"
                    title="View"
                    linkTo={`/view_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null}  
                {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-warning"
                    title="Suspend"
                    linkTo={`/suspend_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null}   
                {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-danger"
                    title="Terminate"
                    linkTo={`/terminate_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null} 

                {this.props.isSadmin ?
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-purple"
                    title="Associated"
                    linkTo={`/associate_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                : null}     

                {this.props.deleted === '1' || this.props.deleted === '2' ?
                    <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-success"
                    title="Resume"
                    linkTo={`/resume_user/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                :null}

                </div>
                    
            </td>
            <td> {this.props.lastname} {this.props.name}</td>
            <td> {new Date(this.props.drivlic) < new Date() ? <span class=" badge badge-danger">{this.props.drivlic}</span> : <span class=" badge badge-success">{this.props.drivlic}</span>}  {this.props.drivlic == "" ? <span class="badge badge-danger">None</span> : null}</td>            
            <td> {new Date(this.props.eligib) < new Date() ? <span class=" badge badge-danger">{this.props.eligib}</span> : <span class=" badge badge-success">{this.props.eligib}</span>}  {this.props.eligib == "" ? <span class="badge badge-danger">None</span> : null}</td>            
            <td>{this.props.social == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.social} </span>}</td>
            <td> {new Date(this.props.cmt) < new Date() ? <span class=" badge badge-danger">{this.props.cmt}</span> : <span class=" badge badge-success">{this.props.cmt}</span>}  {this.props.cmt == "" ? <span class="badge badge-danger">None</span> : null}</td>            
            <td> {new Date(this.props.firstaid).setFullYear(new Date(this.props.firstaid).getFullYear() + 2) < new Date() ? <span class=" badge badge-danger">{moment(this.props.firstaid).add(2, 'years').format('MM/DD/YYYY')}</span> : <span class=" badge badge-success">{moment(this.props.firstaid).add(2, 'years').format('MM/DD/YYYY')}</span>}  {this.props.firstaid == "" ? <span class="badge badge-danger">None</span> : null}</td>            
            <td> {new Date(this.props.cpr).setFullYear(new Date(this.props.cpr).getFullYear() + 2) < new Date() ? <span class=" badge badge-danger">{moment(this.props.cpr).add(2, 'years').format('MM/DD/YYYY')}</span> : <span class=" badge badge-success">{moment(this.props.cpr).add(2, 'years').format('MM/DD/YYYY')}</span>}  {this.props.cpr == "" ? <span class="badge badge-danger">None</span> : null}</td>            
            <td> {new Date(this.props.mandt).setFullYear(new Date(this.props.mandt).getFullYear() + 1) < new Date() ? <span class=" badge badge-danger">{moment(this.props.mandt).add(1, 'years').format('MM/DD/YYYY')}</span> : <span class=" badge badge-success">{moment(this.props.mandt).add(1, 'years').format('MM/DD/YYYY')}</span>}  {this.props.mandt == "" ? <span class="badge badge-danger">None</span> : null}</td>            
            <td> {new Date(this.props.patogen).setFullYear(new Date(this.props.patogen).getFullYear() + 1) < new Date() ? <span class=" badge badge-danger">{moment(this.props.patogen).add(1, 'years').format('MM/DD/YYYY')}</span> : <span class=" badge badge-success">{moment(this.props.patogen).add(1, 'years').format('MM/DD/YYYY')}</span>}  {this.props.patogen == "" ? <span class="badge badge-danger">None</span> : null}</td>            
            <td> {this.props.lastname} {this.props.name}</td>
            <td> {this.props.comminte == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.comminte}</span>}</td>
            <td> {this.props.idoop == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.comminte}</span>}</td>
            <td> {this.props.chara == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.chara}</span>}</td>
            <td> {this.props.funda == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.funda}</span>}</td>
            <td> {this.props.commdis == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.commdis}</span>}</td>
            <td> {this.props.support == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.support}</span>}</td>
            <td> {this.props.commskill == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.commskill}</span>}</td>
            <td> {this.props.aging == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.aging}</span>}</td>
            <td> {this.props.incident == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.incident}</span>}</td>
            <td> {this.props.seizure == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.seizure}</span>}</td>
            <td> {this.props.autism == "" ? <span class="badge badge-danger">None</span> : <span class="badge badge-success">{this.props.autism}</span>}</td>

        </tr>  :
        
        (this.props.formname === 'Individuals' ?

        <tr>
            <td><div className="btn-group">
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/individual_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/individual_view/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/individual_delete/${this.props._id}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                    
                </div>
                     
            </td>
            <td>{this.props.lastname} {this.props.name}</td>
            <td>{this.props.address.name}</td>
            <td> <img src={this.props.photo} alt="staff " className="img-circle elevation-2" height="50px"/> </td>
        </tr>  : 

        (this.props.formname === 'TimeSheet' ?

        <tr>
            <td><div className="btn-group">
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/time_sheet_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                {this.props.isAdmin ?
                <MyButton
                            type="default-group"
                            // altClass="btn btn-block bg-gradient-primary"
                            title="View"
                            linkTo={`/time_sheet_view/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />:null}
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-success"
                            title="Submit"
                            linkTo={`/time_sheet_submit/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                    />
                {this.props.isAdmin ?
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/time_sheet_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                :null}

                    
                </div>
                {this.props.submitted === true ?  <span className="left badge badge-primary">submitted</span> :  <span className="left badge badge-danger">Not submitted</span>}
            </td>
            <td>{this.props.name.name} {this.props.name.lastname}</td>
            <td>{this.props.totalhrs}</td>
            <td>{this.props.address.name}</td>
        </tr>  :

        (this.props.formname === 'Address' ?

        <tr>
            <td><div className="btn-group">
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/address_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/address_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                    
                </div>
                    
            </td>
            <td>{this.props.name}</td>
            <td>{this.props.address}</td>
        </tr>  : 

        (this.props.formname === 'Message' ?

        <tr>
            <td><div className="btn-group">
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Edit"
                    linkTo={`/message_edit/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />
                <MyButton
                            type="default-group"
                            altClass="btn btn-block bg-gradient-danger"
                            title="Delete"
                            linkTo={`/message_delete/${this.props._id}`}

                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                    
                </div>
                    
            </td>
            <td>{this.props.title}</td>
        </tr>  :
        (this.props.formname === 'MessageBoard' ?
        <div className="card card-widget">
        <div className="card-header">
            <div className="user-block">
            <img className="img-circle" alt="User" src={this.props.name.photo} />
            <span className="username"><a href="#">{this.props.name.name} {this.props.name.lastname}</a></span>
            <span className="description">Shared publicly - {full}</span>
            </div>
            {/* /.user-block */}
            <div className="card-tools">
            <button title="Mark as read" className="btn btn-tool" type="button" data-toggle="tooltip">
                <i className="far fa-circle" /></button>
            <button className="btn btn-tool" type="button" data-card-widget="collapse"><i className="fas fa-minus" />
            </button>
            <button className="btn btn-tool" type="button" data-card-widget="remove"><i className="fas fa-times" />
            </button>
            </div>
            {/* /.card-tools */}
        </div>
        {/* /.card-header */}
        <div className="card-body">
            {this.props.photo ? 
            <img className="img-fluid pad" alt="pictorial" src={this.props.photo} />
            :null}
            {/* post text */}
            <h3>{this.props.title}</h3>
            <br/>
            
            {parse(this.props.message)}
            
            
            {/* /.attachment-block */}
            {/* Social sharing buttons */}
            {this.props.link ? 
            <a target="_blank" rel="noopener noreferrer" href={this.props.link}> Link</a>
            :null}
        </div>
        
        </div> :

        (this.props.formname === 'timeline' ? 
        <div>
        {this.props.extra === "delete" ?
        <i className="fas fa-trash-alt bg-red" />
        :
        this.props.extra === "add" ?
        <i className="fas fa-plus bg-blue" /> 
        :   
        this.props.extra === "edit" ?
        <i className="fas fa-edit bg-yellow" />      
        : 
        this.props.extra === "resume" ?
        <i className="fas fa-check-double bg-green" />      
        :
        this.props.extra === "submit" ?
        <i className="fas fa-file-invoice-dollar" />      
        :
        this.props.extra === "suspend" ?
        <i className="fas fa-allergies bg-yellow" />      
        :
        this.props.extra === "view" ?
        <i className="fas fa-eye bg-blue" />      
        :
        this.props.extra === "terminate" ?
        <i className="fas fa-user-times bg-red" />      
        :
        this.props.extra === "login" ?
        <i className="fas fa-sign-in-alt bg-green" />      
        :
        this.props.extra === "logout" ?
        <i className="fas fa-sign-out-alt bg-red" />      
        :
        <i className="fas fa-circle bg-blue" />}
        <div className="timeline-item">
            <span className="time"><i className="fas fa-clock" /> {full}</span>
            <h3 className="timeline-header"><a href="#">{this.props.name.name} {this.props.name.lastname}</a> {this.props.action}</h3>
            <div classname="timeline-body" style={{display: 'none'}}>
            {JSON.stringify(this.props.data)}
                </div>
            {this.props.isAdmin ? 
            <div className="timeline-footer">
                <a href={this.props.link} className="btn btn-primary btn-sm">View</a>
            </div>
            :null}
        </div>
        </div>:

        (this.props.formname === 'Chat' ?

        <tr>
            <td><div className="btn-group">
                <MyButton
                    type="default-group"
                    altClass="btn btn-block bg-gradient-primary"
                    title="Chat"
                    linkTo={`/chat/${this.props._id}`}

                    // addStyles={{
                    //     margin: "10px 0 0 0"
                    // }}
                />          

                </div>
                    
            </td>
            <td> {this.props.lastname} {this.props.name}</td>
            <td> <img src={this.props.photo} alt="staff" className="img-circle elevation-2" height="50px"/> </td>
        </tr>  :

        (this.props.formname === 'tracking' ?
            
        <tr>
            {/* <td><textarea style={{width: '100%', height: 45, float: 'left'}} defaultValue={full} /></td> */}
            <td style={{border: "1px gray solid", padding: "4px", width: "20%"}}>{new String(this.props.type)}</td>
            <td style={{border: "1px gray solid", padding: "4px", width: "35%"}}>{"Every "+new String(this.props.freq)} </td>
            <td style={{border: "1px gray solid", padding: "4px", width: "20%"}}>{moment(this.props.dated).format('L')}</td>
            <td style={{border: "1px gray solid", padding: "4px", width: "20%"}}>{new String(this.props.freq)}</td>
            <td style={{border: "1px gray solid", padding: "4px", width: "20%"}}>{moment(this.props.daten).format('L')}</td>
        </tr> :

        (this.props.formname === 'test' ? 
        
        <tr></tr> : 

        (this.props.formname === '' ? 
        
        this.props.name = null : null 
        
        ))))))))))))))))))))))))))))))))))))))

    render() {
        const date = new Date(this.props.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds=date.getSeconds()
        if (this.props.formname === 'staff_desc_a_view' || this.props.formname === 'staff_desc_b_view' || this.props.formname === 'change_shift_view'){
            const full = month+"-"+day
            return (
                this.renderRow(full)
            );
        }
        else if(this.props.formname === 'behave_sheet_view' || this.props.formname === 'fund_sheet_view' || this.props.formname === 'activity_log_view'){
            const full = month+"-"+day+"-"+year
            return (
                this.renderRow(full)
            );
        } 
        else if(this.props.formname === 'attend_view' || this.props.formname === 'over_view' || this.props.formname === 'bowel_view'){
            const full = day
            return (
                this.renderRow(full)
            );
        }
        else if(this.props.formname === 'MessageBoard'){
            const full = moment(this.props.createdAt).fromNow()
            return (
                this.renderRow(full)
            );
        }
        else{
            const full = moment(this.props.createdAt).format('MM/DD/YYYY hh:mm A')
            return (
                this.renderRow(full)
            );
        }
    }
}

export default Row;