import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import axios from 'axios';
import { saveAs } from 'file-saver';
// import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { readFireSafety, getFireSafetyId, adLog } from '../../actions/form_actions';
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import CircularProgress from '@material-ui/core/CircularProgress'
import {FORM_SERVER,COMPANY_INFO} from '../../components/utils/misc'
import styles from './styles.module.css'

import Retrive from '../../components/utils/retrive'
import logo from '../../components/utils/logo.png'
import moment from 'moment'
// const MySwal = withReactContent(Swal)

class ViewFireSafety extends Component {

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
        const date = new Date(data.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds=date.getSeconds()
        const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
        axios.get(`${FORM_SERVER}/fire_safety_fetch?createdAt=${data.createdAt}&name=${data.address.name}`, { responseType: 'blob'})
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, full+data.address.name+'_fire_safety.pdf')
            })
    }
    downloadIntoServer = (data) => {
        const date = new Date(data.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds=date.getSeconds()
        const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
        axios.post(`${FORM_SERVER}/fire_safety_download`, data);
    }

    componentDidMount() {
        document.getElementsByTagName("footer")[0].style.display = "none";

        const id = this.props.match.params.id;
        this.props.dispatch(getFireSafetyId(id)).then(response=>{
            
            if(this.props.form.form){
                this.props.dispatch(adLog(this.props.user.userData._id,"Viewed Fire Safety",null,"/fire_safety_view/"+id,'view')).then(response =>{});
                this.setState({
                loading: false
                    })
            this.downloadIntoServer(this.props.form.form)
            this.props.dispatch(readFireSafety(this.props.form.form._id));
            };
        });

    }
    componentWillUnmount(){
        document.getElementsByTagName("footer")[0].style.display = "";
    }



    render(){
    const title = "Fire Safety";
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
                                            <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t\t#page-wrap { width: 800px; margin: 0 auto; }\n\ntextarea { border: 0; font: 14px Georgia, Serif; overflow: hidden; resize: none; }\ntable { border-collapse: collapse; }\ntable td, table th { border: 1px solid black; padding: 5px; }\n\n#header { height: 15px; width: 100%; margin: 20px 0 10px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 20px 0 10px 0; }\n#header2 { height: 15px; width: 100%; margin: 10px 0 20px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 9px; padding: 10px 0 20px 0; }\n\n#address { width: 250px; height: 150px; float: left; }\n#customer { overflow: hidden; }\n\n#logo { text-align: right; float: right; position: relative; margin-top: 25px; border: 1px solid #fff; max-width: 540px; max-height: 100px; overflow: hidden; }\n#logo:hover, #logo.edit { border: 1px solid #000; margin-top: 0px; max-height: 125px; }\n#logoctr { display: none; }\n#logo:hover #logoctr, #logo.edit #logoctr { display: block; text-align: right; line-height: 25px; background: #eee; padding: 0 5px; }\n#logohelp { text-align: left; display: none; font-style: italic; padding: 10px 5px;}\n#logohelp input { margin-bottom: 5px; }\n.edit #logohelp { display: block; }\n.edit #save-logo, .edit #cancel-logo { display: inline; }\n.edit #image, #save-logo, #cancel-logo, .edit #change-logo, .edit #delete-logo { display: none; }\n#customer-title { font-size: 20px; font-weight: bold; float: left; }\n\n#meta { margin-top: 1px; width: 48%; float: right; }\n#meta td { text-align: right;  }\n#meta td.meta-head { text-align: left; background: #eee; }\n#meta td textarea { width: 100%; height: 20px; text-align: right; }\n\n#meta2 { margin-top: 1px; width: 48%; float: left; }\n#meta2 td { text-align: right;  }\n#meta2 td.meta-head2 { text-align: left; background: #eee; }\n#meta2 td textarea { width: 100%; height: 20px; text-align: right; }\n\n#meta3 { margin-top: 1px; width: 100%; float: left; }\n#meta3 td { text-align: right;  }\n#meta3 td.meta-head3 { text-align: left; background: #eee; font-size: 10px;}\n#meta3 td textarea { width: 100%; height: 25px; text-align: left; }\n\n#items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }\n#items th { background: #eee; }\n#items textarea { height: 15px; }\n#meta3 textarea.tx {  }\n#items tr.item-row td {vertical-align: top; }\n#items td.description { width: 20px; }\n#items td.item-name { font-size: 12px; width: 250px; }\n#items td.description textarea, #items td.item-name textarea { width: 100%; }\n#items td.total-line { border-right: 0; text-align: right; }\n#items td.total-value { border-left: 0; padding: 10px; }\n#items td.total-value textarea { height: 20px; background: none; }\n#items td.balance { background: #eee; }\n#items td.blank { border: 0; }\n\n#terms { text-align: center; margin: 20px 0 0 0; }\n#terms h5 { text-transform: uppercase; font: 13px Helvetica, Sans-Serif; letter-spacing: 10px; border-bottom: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }\n#terms textarea { width: 100%; text-align: center;}\n\ntextarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }\n\t" }} />
                                            <div id="page-wrap">
                                            <img src={logo} alt="logo" style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "50%", height:"60%"}}/>
                                            <textarea style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "100%", textAlign: "center", padding: "20px 0"}} defaultValue={COMPANY_INFO}/>
                                            <textarea id="header2" defaultValue={"FIRE SAFETY"} />
                                                <div id="identity">
                                                </div>
                                                <div style={{ clear: 'both' }} />
                                                <table id="meta3">
                                                    <tbody><tr>
                                                        <td  className="meta-head3">ADDRESS</td>
                                                        <td colSpan={3} className="meta-head3">DATE</td>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.address.address} /></td>
                                                            <td><textarea style={{ width: '100%' }} defaultValue={moment(this.props.form.form.createdAt).format("LL")} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <td className="meta-head3">PARTICIPATING STAFF</td>
                                                        <td className="meta-head3">PARTICIPATING INDIVIDUALS</td>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.staff} /></td>
                                                            <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.individual} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <td colSpan={2} className="meta-head3">HYPOTHETICAL LOCATION OF FIRE</td>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.locfire} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <td className="meta-head3">EXIT DOOR USED</td>
                                                        <td className="meta-head3">LOCATION OF RALLY POINT WHILE OUTSIDE</td>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.exitdoor} /></td>
                                                            <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.rallypoint} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <td colSpan={2} className="meta-head3">COMMENT</td>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.comment} /></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table id="items">
                                                    <tbody><tr>
                                                        <th style={{ textAlign: 'left' }} colSpan={5}>SAFETY CHECKS</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <th colSpan={5}>KITCHEN</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr className="item-row">
                                                            <td className="item-name">Kitchen stove burners - all 4 are working?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.stove} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <th colSpan={5}>FLASH LIGHT</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr className="item-row">
                                                            <td className="item-name">Flash light is in the top drawer of file cabinet or on top of fridge?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.light} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <th colSpan={5}>FIRE EXTINGUISHERS</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr className="item-row">
                                                            <td className="item-name">First Floor?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.firstfloorf} /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td className="item-name">Second Floor?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.secondfloorf} /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td className="item-name">Basement?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.basementf} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <th colSpan={5}>SMOKE ALARMS</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr className="item-row">
                                                            <td className="item-name">First Floor?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.firstfloors} /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td className="item-name">Second Floor?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.secondfloors} /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td className="item-name">Basement?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.basements} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <th colSpan={5}>FIRST AID</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr className="item-row">
                                                            <td className="item-name">First Aid Kit - in the file cabinet?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.firstaid} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <th colSpan={5}>FIRE EXTINGUISHER TAG</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr className="item-row">
                                                            <td className="item-name">Fire extinguisher tag/initial dated?</td>
                                                            <td className="description"><textarea defaultValue={this.props.form.form.tag} /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <th colSpan={5}>COMMENTS</th>
                                                    </tr>
                                                        <tr>
                                                            <td colSpan={2}><textarea style={{ width: '100%', height: 40 }} defaultValue={this.props.form.form.comment} /></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table id="meta3">
                                                    <tbody><tr>
                                                        <td className="meta-head3">NAME OF STAFF COMPLETING THE AUDIT</td>
                                                        <td colSpan={3} className="meta-head3">SUPERVISOR'S SIGNATURE</td>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.staffreport.name} /></td>
                                                            <td><img className={styles.sigImage} src={this.props.form.form.supervisorsignimg} alt="supervisors signature"/></td>
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

            <script src="../../plugins/sweetalert2/sweetalert2.min.js"></script>                           
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

export default connect(mapStateToProps)(ViewFireSafety);