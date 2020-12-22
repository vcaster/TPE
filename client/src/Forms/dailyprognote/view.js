import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import axios from 'axios';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import { readDailyProgNote, getDailyProgNoteId, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {FORM_SERVER,COMPANY_INFO} from '../../components/utils/misc'

import Retrive from '../../components/utils/retrive'
import logo from '../../components/utils/logo.png'
import moment from 'moment'
const MySwal = withReactContent(Swal)

class EditDailyprognote extends Component {

    state = {
        loading: true
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Edited Daily Progress Note successfully, You will be redirected shortly.'
              })
        }
        
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
        axios.get(`${FORM_SERVER}/daily_progress_note_fetch?createdAt=${data.createdAt}&name=${data.individual.name+data.individual.lastname}`, { responseType: 'blob'})
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, full+data.individual.name+data.individual.lastname+'_'+'Daily_Progress_Note.pdf')
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
        // const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
        axios.post(`${FORM_SERVER}/daily_progress_note_download`, data);
    }

    componentDidMount() {
        document.getElementsByTagName("footer")[0].style.display = "none";

        const id = this.props.match.params.id;
        this.props.dispatch(getDailyProgNoteId(id)).then(response=>{
            
            if(this.props.form.form){
                this.props.dispatch(adLog(this.props.user.userData._id,"Viewed Daily Progess Note",null,"/daily_progress_note_view/"+id,'view')).then(response =>{});
                this.setState({
                loading: false
                    })
            this.downloadIntoServer(this.props.form.form)
            this.props.dispatch(readDailyProgNote(this.props.form.form._id));
            };
        });

    }
    componentWillUnmount(){
        document.getElementsByTagName("footer")[0].style.display = "";
    }



    render(){
    const title = "Daily Progress Note";
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
                                <li className="breadcrumb-item"><a>Home</a></li>
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
                            <div classname="invoice p-3 mb-3">
                                <div classname="row">
                                <div className="col-12">
                                        <div>
                                            <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t\t#page-wrap { width: 800px; margin: 0 auto; }\n\ntextarea { border: 0; font: 14px Georgia, Serif; overflow: hidden; resize: none; }\ntable { border-collapse: collapse; }\ntable td, table th { border: 1px solid black; padding: 5px; }\n\n#header { height: 15px; width: 100%; margin: 20px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 20px 0; }\n#header2 { height: 15px; width: 100%; margin: 20px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 9px; padding: 20px 0px; }\n\n#address { width: 250px; height: 150px; float: left; }\n#customer { overflow: hidden; }\n\n#logo { text-align: right; float: right; position: relative; margin-top: 25px; border: 1px solid #fff; max-width: 540px; max-height: 100px; overflow: hidden; }\n#logo:hover, #logo.edit { border: 1px solid #000; margin-top: 0px; max-height: 125px; }\n#logoctr { display: none; }\n#logo:hover #logoctr, #logo.edit #logoctr { display: block; text-align: right; line-height: 25px; background: #eee; padding: 0 5px; }\n#logohelp { text-align: left; display: none; font-style: italic; padding: 10px 5px;}\n#logohelp input { margin-bottom: 5px; }\n.edit #logohelp { display: block; }\n.edit #save-logo, .edit #cancel-logo { display: inline; }\n.edit #image, #save-logo, #cancel-logo, .edit #change-logo, .edit #delete-logo { display: none; }\n#customer-title { font-size: 20px; font-weight: bold; float: left; }\n\n#meta { margin-top: 1px; width: 48%; float: right; }\n#meta td { text-align: right;  }\n#meta td.meta-head { text-align: left; background: #eee; }\n#meta td textarea { width: 100%; height: 20px; text-align: right; }\n\n#meta2 { margin-top: 1px; width: 48%; float: left; }\n#meta2 td { text-align: right;  }\n#meta2 td.meta-head2 { text-align: left; background: #eee; }\n#meta2 td textarea { width: 100%; height: 20px; text-align: right; }\n\n#items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }\n#items th { background: #eee; }\n#items textarea { width: 80px; height: 50px; }\n#items tr.item-row td { border: 0; vertical-align: top; }\n#items td.description { width: 300px; }\n#items td.item-name { width: 175px; }\n#items td.description textarea, #items td.item-name textarea { width: 100%; }\n#items td.total-line { border-right: 0; text-align: right; }\n#items td.total-value { border-left: 0; padding: 10px; }\n#items td.total-value textarea { height: 20px; background: none; }\n#items td.balance { background: #eee; }\n#items td.blank { border: 0; }\n\n#terms { text-align: center; margin: 20px 0 0 0; }\n#terms h5 { text-transform: uppercase; font: 13px Helvetica, Sans-Serif; letter-spacing: 10px; border-bottom: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }\n#terms textarea { width: 100%; text-align: center;}\n\ntextarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }\n\t" }} />
                                            <div id="page-wrap">
                                                <img src={logo} alt="logo" style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "50%", height:"60%"}}/>
                                                <textarea style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "100%", textAlign: "center", padding: "20px 0"}} defaultValue={COMPANY_INFO}/>
                                                <textarea id="header2" defaultValue={"DAILY PROGRESS NOTE"} />
                                                <div id="identity">
                                                </div>
                                                <div style={{ clear: 'both' }} />
                                                <div id="customer">
                                                    <table id="meta">
                                                        <tbody><tr>
                                                            <td className="meta-head">Staff Name</td>
                                                            <td><textarea defaultValue={this.props.form.form.name.name+ " " + this.props.form.form.name.lastname} /></td>
                                                        </tr>
                                                            <tr>
                                                                <td className="meta-head">Individual</td>
                                                                <td><textarea id="date" defaultValue={this.props.form.form.individual.name + " "+ this.props.form.form.individual.lastname} /></td>
                                                            </tr>
                                                        </tbody></table>
                                                    <table id="meta2">
                                                        <tbody><tr>
                                                            <td className="meta-head2">Date</td>
                                                            <td><textarea defaultValue={moment(this.props.form.form.createdAt).format('LL')}/> </td>
                                                        </tr>
                                                            <tr>
                                                                <td className="meta-head2">Shift</td>
                                                                <td><textarea id="date" defaultValue={this.props.form.form.shift} /></td>
                                                            </tr>
                                                        </tbody></table>
                                                </div>
                                                <table id="items">
                                                    <tbody><tr>
                                                        <th colSpan={5}>COMMUNITY INTERGRATION ACTIVITES</th>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.commactiv} /></td>
                                                        </tr>
                                                    </tbody></table>
                                                <table id="items">
                                                    <tbody><tr>
                                                        <th colSpan={5}>GOALS/SUPPLEMENTAL PROCEDURES</th>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <th className="meta-head">Goal 1</th>
                                                            <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.goal1} /></td>
                                                        </tr>
                                                        <tr className="item-row">
                                                            <th className="meta-head">Goal 2</th>
                                                            <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.goal2} /></td>
                                                        </tr>
                                                    </tbody></table>
                                                <table id="items">
                                                    <tbody><tr>
                                                        <th colSpan={5}>SP1: Attend medical apiontment</th>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.sp1} /></td>
                                                        </tr>
                                                    </tbody></table>
                                                <table id="items">
                                                    <tbody><tr>
                                                        <th colSpan={5}>BEHAVIOUR GOALS/NEW AND CHALLENGING GOALS</th>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.behavgoals} /></td>
                                                        </tr>
                                                    </tbody></table>
                                                <table id="items">
                                                    <tbody><tr>
                                                        <th colSpan={5}>NURSING COMMENTS</th>
                                                    </tr>
                                                        <tr className="item-row">
                                                            <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={this.props.form.form.nursingcomm} /></td>
                                                        </tr>
                                                    </tbody></table>
                                            </div>
                                        </div>
                          
                                        <div className="row no-print">
                                <div className="col-4">
                                    <div className="icheck-primary">
                               
                                    </div>
                                </div>
                                <div id="prnt" style={{marginTop: 20, marginBottom: 20}} className="col-2">
                                    <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.print()}>
                                    Print
                                </button>
                                
                                </div>
                                <div id="prnt" style={{marginTop: 20, marginBottom: 20}} className="col-2">
                                <button className="btn btn-block bg-gradient-success" type="button" onClick={()=> this.createPdf(this.props.form.form)}>
                                    Download
                                </button>
                                </div>
                                <div className="col-4">
                                    <div className="icheck-primary">
                               
                                    </div>
                                </div>

                                
                                {/* /.col */}
                            </div>                          
                                </div>
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

export default connect(mapStateToProps)(EditDailyprognote);