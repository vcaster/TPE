import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { readIncident, getIncidentId, adLog } from '../../actions/form_actions';
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import CircularProgress from '@material-ui/core/CircularProgress'
import {COMPANY_INFO} from '../../components/utils/misc'
import styles from './styles.module.css'

import Retrive from '../../components/utils/retrive'
import logo from '../../components/utils/logo.png'
import moment from 'moment'

// const MySwal = withReactContent(Swal)

class ViewIncident extends Component {

    state = {
        loading: true
    }

    
    print = () => {
        document.getElementById("prnt").style.display = "none";
        window.addEventListener("load", window.print());
        setTimeout(()=>{
            document.getElementById("prnt").style.display = "";
        },1)
        
    }

    createPdf = (data) => {
        alert("Click Print then choose desitination \'Save as PDF\' then save");

        // const date = new Date(data.createdAt);
        // const year = date.getFullYear();
        // const month = date.getMonth()+1
        // const day = date.getDate()
        // const hour = date.getHours()
        // const minutes = date.getMinutes()
        // const seconds=date.getSeconds()
        // const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
        // axios.get(`${FORM_SERVER}/house_meeting_fetch?createdAt=${data.createdAt}&name=${data.address.name}`, { responseType: 'blob'})
        //     .then((res) => {
        //         const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        //         saveAs(pdfBlob, full+data.address.name+'_'+'house_meeting.pdf')
        //     })
    }
    // downloadIntoServer = (data) => {
    //     const date = new Date(data.createdAt);
    //     const year = date.getFullYear();
    //     const month = date.getMonth()+1
    //     const day = date.getDate()
    //     const hour = date.getHours()
    //     const minutes = date.getMinutes()
    //     const seconds=date.getSeconds()
    //     const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    //     axios.post(`${FORM_SERVER}/house_meeting_download`, data);
    // }

    componentDidMount() {
        document.getElementsByTagName("footer")[0].style.display = "none";

        const id = this.props.match.params.id;
        this.props.dispatch(getIncidentId(id)).then(response=>{
            
            if(this.props.form.form){
                this.props.dispatch(adLog(this.props.user.userData._id,"Viewed Incident Report",null,"/incident/"+id,'view')).then(response =>{});
                this.setState({
                loading: false
                    })
            // this.downloadIntoServer(this.props.form.form)
            this.props.dispatch(readIncident(this.props.form.form._id));
            };
        });

    }
    componentWillUnmount(){
        document.getElementsByTagName("footer")[0].style.display = "";
    }



    render(){
    const title = "INCIDENT REPORT";
            if (this.state.loading) {
                return (
                <Retrive/>
            );
            }

    return (
        <UserLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1>View {title}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="invoice p-3 mb-3">
                                <div className="row">
                                <div className="col-12">
                                    <div>
                                        <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t\t#page-wrap { width: 800px; margin: 0 auto; }\n\ntextarea { border: 0; font: 14px Georgia, Serif; overflow: hidden; resize: none; }\ntable { border-collapse: collapse; }\ntable td, table th { border: 1px solid black; padding: 5px; }\n\n#header { height: 15px; width: 100%; margin: 20px 0 10px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 20px 0 10px 0; }\n#header2 { height: 15px; width: 100%; margin: 10px 0 20px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 9px; padding: 10px 0 20px 0; }\n\n#address { width: 250px; height: 150px; float: left; }\n#customer { overflow: hidden; }\n\n#logo { text-align: right; float: right; position: relative; margin-top: 25px; border: 1px solid #fff; max-width: 540px; max-height: 100px; overflow: hidden; }\n#logo:hover, #logo.edit { border: 1px solid #000; margin-top: 0px; max-height: 125px; }\n#logoctr { display: none; }\n#logo:hover #logoctr, #logo.edit #logoctr { display: block; text-align: right; line-height: 25px; background: #eee; padding: 0 5px; }\n#logohelp { text-align: left; display: none; font-style: italic; padding: 10px 5px;}\n#logohelp input { margin-bottom: 5px; }\n.edit #logohelp { display: block; }\n.edit #save-logo, .edit #cancel-logo { display: inline; }\n.edit #image, #save-logo, #cancel-logo, .edit #change-logo, .edit #delete-logo { display: none; }\n#customer-title { font-size: 20px; font-weight: bold; float: left; }\n\n#meta { margin-top: 1px; width: 48%; float: right; }\n#meta td { text-align: right;  }\n#meta td.meta-head { text-align: left; background: #eee; }\n#meta td textarea { width: 100%; height: 20px; text-align: right; }\n\n#meta2 { margin-top: 1px; width: 48%; float: left; }\n#meta2 td { text-align: right;  }\n#meta2 td.meta-head2 { text-align: left; background: #eee; }\n#meta2 td textarea { width: 100%; height: 20px; text-align: right; }\n\n#meta3 { margin-top: 1px; width: 100%; float: left; }\n#meta3 td { text-align: right;  }\n#meta3 td.meta-head3 { text-align: left; background: #eee; font-size: 10px;}\n#lgg { width: 100%; height: 160px; text-align: left; }\n#meta3 td textarea { width: 100%; text-align: left; }\n\n#items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }\n#items th { background: #eee; }\n#items textarea { height: 15px; }\n#meta3 textarea.tx {  }\n#items tr.item-row td {vertical-align: top; }\n#items td.description { width: 20px; }\n#items td.item-name { font-size: 12px; width: 250px; }\n#items td.description textarea, #items td.item-name textarea { width: 100%; }\n#items td.total-line { border-right: 0; text-align: right; }\n#items td.total-value { border-left: 0; padding: 10px; }\n#items td.total-value textarea { height: 20px; background: none; }\n#items td.balance { background: #eee; }\n#items td.blank { border: 0; }\n\n#terms { text-align: center; margin: 20px 0 0 0; }\n#terms h5 { text-transform: uppercase; font: 13px Helvetica, Sans-Serif; letter-spacing: 10px; border-bottom: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }\n#terms textarea { width: 100%; text-align: center;}\n\ntextarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }\n\tpre {\n            overflow-x: auto;\n            white-space: pre-wrap;\n            white-space: -moz-pre-wrap;\n            white-space: -pre-wrap;\n            white-space: -o-pre-wrap;\n            word-wrap: break-word;\n         }\n\t" }} />
                                        <div id="page-wrap">
                                        <img src={logo} alt="logo" style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "50%", height:"60%"}}/>
                                        <textarea style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "100%", textAlign: "center", padding: "20px 0"}} defaultValue={COMPANY_INFO}/>
                                            <textarea id="header2" defaultValue={"STANDARD INCIDENT REPORT FORM"} />
                                            <div id="identity">
                                            </div>
                                            <div style={{ clear: 'both' }} />
                                            <table id="meta3">
                                                <tbody><tr>
                                                    <td className="meta-head3">INIDIVIDUAL</td>
                                                    <td colSpan={2} className="meta-head3">UNIT</td>
                                                </tr>
                                                    <tr className="item-row">
                                                        <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.individual.name + ' ' + this.props.form.form.individual.lastname} /></td>
                                                        <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.address.address} /></td>
                                                    </tr>
                                                </tbody>
                                                <tbody><tr>
                                                    <td className="meta-head3">LOCATION OF INCIDENT </td>
                                                    <td colSpan={2} className="meta-head3">DATE AND TIME</td>
                                                </tr>
                                                    <tr className="item-row">
                                                        <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.location}/></td>
                                                        <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={moment(this.props.form.form.createdAt).format('LLLL')} /></td>
                                                    </tr>
                                                </tbody>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={3} className="meta-head3">BEFORE INCIDENT </td>
                                                    </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3} id="lgg"><textarea style={{ width: '100%' }} id="lgg" defaultValue={this.props.form.form.before} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} className="meta-head3">DURING INCIDENT</td>
                                                    </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3} id="lgg"><textarea style={{ width: '100%' }} id="lgg" defaultValue={this.props.form.form.during} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} className="meta-head3">AFTER INCIDENT</td>
                                                    </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3} id="lgg"><textarea style={{ width: '100%' }} id="lgg" defaultValue={this.props.form.form.after} /></td>
                                                    </tr>
                                                </tbody>
                                                <tbody><tr>
                                                    <td className="meta-head3">NAME OF EMPLOYEE WHO IS REPORTING THE INCIDENT</td>
                                                    <td colSpan={2} className="meta-head3">SIGNATURE</td>
                                                </tr>
                                                    <tr className="item-row">
                                                        <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.name.name + ' ' + this.props.form.form.name.lastname} /></td>
                                                        <td colSpan={2}><img className={styles.sigImage} src={this.props.form.form.staffsignimg} /></td>
                                                    </tr>
                                                </tbody>
                                                <tbody>
                                                    <tr>
                                                        <td className="meta-head3">SIGNATURE OF WITNESS 1</td>
                                                        <td className="meta-head3">SIGNATURE OF WITNESS 2</td>
                                                        <td className="meta-head3">SIGNATURE OF WITNESS 3</td>
                                                    </tr>
                                                    <tr className="item-row">
                                                        <td><img alt="signature" className={styles.sigImage} src={this.props.form.form.witsignimg} /></td>
                                                        <td><img alt="signature" className={styles.sigImage} src={this.props.form.form.wittsignimg} /></td>
                                                        <td><img alt="signature" className={styles.sigImage} src={this.props.form.form.witttsignimg} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="items">
                                                <tbody>
                                                    <tr className="item-row">
                                                        <td className="item-name">Is the incident reported to the program coordinator?</td>
                                                        <td className="description"><textarea defaultValue={this.props.form.form.coordinator} /></td>
                                                    </tr>
                                                </tbody>
                                                <tbody>
                                                    <tr className="item-row">
                                                        <td className="item-name">Is the incident reported to the Delegating Nurse?</td>
                                                        <td className="description"><textarea defaultValue={this.props.form.form.nurse} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="meta3">
                                                <tbody><tr>
                                                    <td colSpan={3} className="meta-head3">FOLLOW UP ACTION BY COORDINATOR:</td>
                                                </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.action} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="items">
                                                <tbody>
                                                    <tr className="item-row">
                                                        <td className="item-name">Was the individual physically injured?</td>
                                                        <td className="description"><textarea defaultValue={this.props.form.form.injuryqa} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="meta3">
                                                <tbody><tr>
                                                    <td colSpan={3} className="meta-head3">TYPE OF INJURY:</td>
                                                </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.injury} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} className="meta-head3">TYPE OF OTHER INJURY:</td>
                                                    </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.iother} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} className="meta-head3">BODY PARTS INJURED:</td>
                                                    </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.body} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} className="meta-head3">OTHER BODY PARTS INJURED:</td>
                                                    </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.bother} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="items">
                                                <tbody>
                                                    <tr className="item-row">
                                                        <td className="item-name">Was the Nurse Notified?</td>
                                                        <td className="description"><textarea defaultValue={this.props.form.form.notified} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="meta3">
                                                <tbody><tr>
                                                    <td colSpan={3} className="meta-head3">IF YES, WHAT FOLLOW UP ACTION WAS RECOMMENDED:</td>
                                                </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.follow} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="items">
                                                <tbody>
                                                    <tr className="item-row">
                                                        <td className="item-name">Was the Individual taken to the hospital?</td>
                                                        <td className="description"><textarea defaultValue={this.props.form.form.hospital} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="meta3">
                                                <tbody><tr>
                                                    <td colSpan={3} className="meta-head3">IF YES, WHEN?</td>
                                                </tr>
                                                    <tr className="item-row">
                                                        <td colSpan={3}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.hospitaly} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="items">
                                                <tbody>
                                                    <tr className="item-row">
                                                        <td className="item-name">WAS MEDICAL TREATMENT INDICATED?</td>
                                                        <td className="description"><textarea defaultValue={this.props.form.form.treatment} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="meta3">
                                                <tbody>
                                                    <tr>
                                                        <td className="meta-head3">REVIEWED BY:</td>
                                                        <td className="meta-head3">SIGNATURE</td>
                                                        <td className="meta-head3">DATE</td>
                                                    </tr>
                                                    <tr className="item-row">
                                                        <td className="meta-head3">PROGRAM COORDINATOR</td>
                                                        <td><img alt="signature" className={styles.sigImage} src={this.props.form.form.pcoordinator} /></td>
                                                        <td><textarea style={{ width: '100%' }} defaultValue={moment(this.props.form.form.createdAt).format("LLLL")} /></td>
                                                    </tr>
                                                    <tr className="item-row">
                                                        <td className="meta-head3">PROGRAM/QA DIRECTOR</td>
                                                        <td><img alt="signature" className={styles.sigImage} src={this.props.form.form.pdirector} /></td>
                                                        <td><textarea style={{ width: '100%' }} defaultValue={moment(this.props.form.form.createdAt).format("LLLL")} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                  
                                </div>
                                  
                             
                                </div>
                                <div className="row no-print">
                                <div className="col-2">
                                
                                </div>
                                <div id="prnt" style={{marginTop: 20, marginBottom: 20}} className="col-4">
                                    <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.print()}>
                                    Print
                                </button>
                                
                                </div>
                                <div id="prnt" style={{marginTop: 20, marginBottom: 20}} className="col-4">
                                <button className="btn btn-block bg-gradient-success" type="button" onClick={()=> this.createPdf(this.props.form.form)}>
                                    Download
                                </button>
                                </div>
                                <div className="col-2">
                                
                                </div>

                                
                                {/* /.col */}
                            </div>

                            </div>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>

            {/* <script src="../../plugins/sweetalert2/sweetalert2.min.js"></script>                            */}
        </UserLayout>
    );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user,
        form: state.form
    }
}

export default connect(mapStateToProps)(ViewIncident);