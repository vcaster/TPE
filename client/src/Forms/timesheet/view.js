import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import axios from 'axios';
import { saveAs } from 'file-saver';
// import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getTimeSheetId, readTimeSheet, adLog } from '../../actions/form_actions';
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import {FORM_SERVER,COMPANY_INFO} from '../../components/utils/misc'
// import styles from './styles.module.css'

import Retrive from '../../components/utils/retrive'
import logo from '../../components/utils/logo.png'

// const MySwal = withReactContent(Swal)

class ViewHouseMeeting extends Component {

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
        axios.get(`${FORM_SERVER}/time_sheet_fetch?createdAt=${data.createdAt}&name=${data.name.name+data.name.lastname}`, { responseType: 'blob'})
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, full+data.name.name+data.name.lastname+'_time_sheet.pdf')
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
        axios.post(`${FORM_SERVER}/time_sheet_download`, data);
    }

    componentDidMount() {
        document.getElementsByTagName("footer")[0].style.display = "none";

        const id = this.props.match.params.id;
        
        this.props.dispatch(getTimeSheetId(id)).then(response=>{
            
            if(this.props.form.form){
                this.props.dispatch(adLog(this.props.user.userData._id,"Viewed Time Sheet",null,"/time_sheet_view/"+id,'view')).then(response =>{});
                this.setState({
                loading: false
                    })
            this.downloadIntoServer(this.props.form.form)
            this.props.dispatch(readTimeSheet(this.props.form.form._id));
            };
        });

    }
    componentWillUnmount(){
        document.getElementsByTagName("footer")[0].style.display = "";
    }



    render(){
    const title = "Time Sheet";
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
                                            <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t\t#page-wrap { width: 800px; margin: 0 auto; }\n\ntextarea { border: 0; font: 14px Georgia, Serif; overflow: hidden; resize: none; }\ntable { border-collapse: collapse; }\ntable td, table th { border: 1px solid black; padding: 5px; }\n\n#header { height: 15px; width: 100%; margin: 20px 0 10px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 20px 0 10px 0; }\n#header2 { height: 15px; width: 100%; margin: 10px 0 20px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 9px; padding: 10px 0 20px 0; }\n\n#address { width: 250px; height: 150px; float: left; }\n#customer { overflow: hidden; }\n\n#logo { text-align: right; float: right; position: relative; margin-top: 25px; border: 1px solid #fff; max-width: 540px; max-height: 100px; overflow: hidden; }\n#logo:hover, #logo.edit { border: 1px solid #000; margin-top: 0px; max-height: 125px; }\n#logoctr { display: none; }\n#logo:hover #logoctr, #logo.edit #logoctr { display: block; text-align: right; line-height: 25px; background: #eee; padding: 0 5px; }\n#logohelp { text-align: left; display: none; font-style: italic; padding: 10px 5px;}\n#logohelp input { margin-bottom: 5px; }\n.edit #logohelp { display: block; }\n.edit #save-logo, .edit #cancel-logo { display: inline; }\n.edit #image, #save-logo, #cancel-logo, .edit #change-logo, .edit #delete-logo { display: none; }\n#customer-title { font-size: 20px; font-weight: bold; float: left; }\n\n#meta { margin-top: 1px; width: 48%; float: right; }\n#meta td { text-align: right;  }\n#meta td.meta-head { text-align: left; background: #eee; }\n#meta td textarea { width: 100%; height: 20px; text-align: left; }\n\n#meta2 { margin-top: 1px; width: 48%; float: left; }\n#meta2 td { text-align: right;  }\n#meta2 td.meta-head2 { text-align: left; background: #eee; }\n#meta2 td textarea { width: 100%; height: 20px; text-align: left; }\n\n#meta3 { margin-top: 1px; width: 100%; float: left; }\n#meta3 td { text-align: right;  }\n#meta3 td.meta-head3 { text-align: left; background: #eee; font-size: 13px;}\n#meta3 td textarea { width: 100%; height: 40px; text-align: left; }\n\n#items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }\n#items th { background: #eee; }\n#items textarea { height: 12px; }\n#meta3 textarea.tx {  }\n#items tr.item-row td {vertical-align: top; }\n#items td.description { width: 20px; }\n#items td.item-name { font-size: 12px; width: 300px; }\n#items td.description textarea, #items td.item-name textarea { width: 100%; }\n#items td.total-line { border-right: 0; text-align: right; }\n#items td.total-value { border-left: 0; padding: 10px; }\n#items td.total-value textarea { height: 20px; background: none; }\n#items td.balance { background: #eee; }\n#items td.blank { border: 0; }\n\n#terms { text-align: center; margin: 20px 0 0 0; }\n#terms h5 { text-transform: uppercase; font: 13px Helvetica, Sans-Serif; letter-spacing: 10px; border-bottom: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }\n#terms textarea { width: 100%; text-align: center;}\n\ntextarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }\n\t" }} />
                                            <div id="page-wrap">
                                                <img src={logo} alt="logo" style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "50%", height:"60%"}}/>
                                                <textarea style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "100%", textAlign: "center", padding: "20px 0"}} defaultValue={COMPANY_INFO}/>
                                                <textarea id="header2" defaultValue={"TIME SHEET"} />
                                                <div id="identity">
                                                </div>
                                                <div style={{ clear: 'both' }} />
                                                <table id="meta3" className="card-body table-responsive p-0">
                                                    <tbody><tr>
                                                        <td className="meta-head3">Date</td>
                                                        <td className="meta-head3">Day</td>
                                                        <td className="meta-head3">Time In</td>
                                                        <td className="meta-head3">Time Out</td>
                                                        <td className="meta-head3">Total Hours</td>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sun1d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Sunday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sun1di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sun1do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sun1dt} /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.mon1d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Monday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.mon1di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.mon1do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.mon1dt} /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.tue1d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Tuesday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.tue1di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.tue1do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.tue1dt}  /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.wed1d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Wednesday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.wed1di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.wed1do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.wed1dt}  /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.thu1d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Thursday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.thu1di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.thu1do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.thu1dt}  /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.fri1d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Friday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.fri1di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.fri1do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.fri1dt}  /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sat1d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Saturday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sat1di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sat1do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sat1dt}  /></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <textarea id="header2" defaultValue={""} />
                                                <table id="meta3" className="card-body table-responsive p-0">
                                                    <tbody><tr>
                                                        <td className="meta-head3">Date</td>
                                                        <td className="meta-head3">Day</td>
                                                        <td className="meta-head3">Time In</td>
                                                        <td className="meta-head3">Time Out</td>
                                                        <td className="meta-head3">Total Hours</td>
                                                    </tr>
                                                    <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sun2d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Sunday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sun2di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sun2do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sun2dt} /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.mon2d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Monday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.mon2di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.mon2do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.mon2dt} /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.tue2d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Tuesday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.tue2di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.tue2do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.tue2dt}  /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.wed2d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Wednesday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.wed2di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.wed2do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.wed2dt}  /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.thu2d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Thursday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.thu2di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.thu2do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.thu2dt}  /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.fri2d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Friday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.fri2di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.fri2do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.fri2dt}  /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sat2d} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={"Saturday"} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sat2di} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sat2do} /></td>
                                                            <td><textarea style={{ width: '100%', height: 20, float: 'left' }} defaultValue={this.props.form.form.sat2dt}  /></td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody><tr>
                                                        <td colSpan={2} className="meta-head3">Location</td>
                                                        <td colSpan={2} className="meta-head3">Supervisior</td>
                                                        <td className="meta-head3">Total Hours</td>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.address.address} /></td>
                                                            <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.supervisor} /></td>
                                                            <td><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.totalhrs} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2} className="meta-head3">Employee Name</td>
                                                            <td colSpan={3} className="meta-head3">Employee Signature</td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.name.name + ' ' + this.props.form.form.name.lastname} /></td>
                                                            <td colSpan={3}><img src={this.props.form.form.staffsignimg} alt=""/></td>
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

export default connect(mapStateToProps)(ViewHouseMeeting);