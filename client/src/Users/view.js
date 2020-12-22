import React, { Component } from 'react';
import UserLayout from '../hoc/user'
import FormField from '../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../components/utils/Form/formActions';
import MyButton from '../components/utils/button';
import { connect } from 'react-redux';
import moment from 'moment'
import { clearForm, updateUser, getUserId } from '../actions/user_actions';
import {adLog} from '../actions/form_actions'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../components/utils/retrive'
import Deny from '../components/utils/retrive'

class ViewUser extends Component {
   
    state = {
        loading: true,
        deny: false
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(adLog(this.props.user.userData._id,"Viewed User",null,"/view_user/"+id,'view')).then(response =>{});
        if(this.props.user.userData.isUser){
        if(id === this.props.user.userData._id ){
        const formdata = this.state.formdata;
        // console.log(id)
        this.props.dispatch(getUserId(id)).then(response=>{
            this.props.dispatch(adLog(this.props.user.userData._id,"Viewed User",null,"/view_user/"+id,'view')).then(response =>{});
            console.log(this.props.user.form);
            this.setState({
                loading: false
            })
        });
         }
         else{
            this.setState({
                deny: true
            })
         }
     }else if(this.props.user.userData.isAdmin){
        const formdata = this.state.formdata;
        // console.log(id)
        this.props.dispatch(getUserId(id)).then(response=>{
            this.props.dispatch(adLog(this.props.user.userData._id,"Viewed User",null,"/view_user/"+id,'view')).then(response =>{});
            console.log(this.props.user.form);
            this.setState({
                loading: false,
            })
        });
     }
    }

    

    render(){
    const title = "Staff";
    if (this.state.loading) {
        return (
        <Retrive/>
    );
    }
    else if(this.state.deny){
        return (
            <Deny/>
        );
    }
    return (
        <UserLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1>View {title} Profile</h1>
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
                        <div className="col-md-12">
                            {/* Profile Image */}
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">
                                    <div className="text-center">
                                        <img className="profile-user-img img-fluid img-circle" alt="User profile picture" src={this.props.user.form.photo} />
                                    </div>
                                    <h3 className="profile-username text-center">{this.props.user.form.lastname} {this.props.user.form.name}</h3>
                                    <p className="text-muted text-center">{this.props.user.form.role == '0' ? "Residential Councelor" : null}</p>
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Phone Number</b> <a className="float-right">{this.props.user.form.phone}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Date of hire</b> <a className="float-right">{this.props.user.form.hire}</a>
                                        </li>
                                        <li className="list-group-item">
                                        <b>Drivers License Expiration</b> <a className="float-right">{this.props.user.form.drivlic}  {new Date(this.props.user.form.drivlic) < new Date() ? <span class="float-right badge badge-danger">Expired</span> :null}</a> <a className="float-right">{this.props.user.form.drivlic == "" ? <span class="float-right badge badge-danger">None</span> : null}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Eligibility Status Expiration</b> <a className="float-right">{this.props.user.form.eligib}  {new Date(this.props.user.form.eligib) < new Date() ? <span class="float-right badge badge-danger">Expired</span> :null}</a> <a className="float-right">{this.props.user.form.eligib == "" ? <span class="float-right badge badge-danger">None</span> : null}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Social Security</b> <a className="float-right">{this.props.user.form.social == "" ? <span class="float-right badge badge-danger">None</span> : <span class="float-right badge badge-success">{this.props.user.form.social} </span>}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Warning</b> <a className="float-right">{this.props.user.form.warn == "" ? <span class="float-right badge badge-success">None</span> : <span class="float-right badge badge-danger">{this.props.user.form.warn}</span>}</a>
                                        </li>
                                    </ul>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {/* About Me Box */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="far fa-file-alt mr-1" />Certifications (Expiration Date)</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <strong><i className="fas fa-book mr-1" /> First Aid</strong>
                                    <p className="text-muted">
                                    { moment(this.props.user.form.firstaid).add(2, 'years').format('MM/DD/YYYY') } 
                                    { new Date(this.props.user.form.firstaid).setFullYear(new Date(this.props.user.form.firstaid).getFullYear() + 2) < new Date() ? <span class="float-right badge badge-danger">Expired</span> : null }
                                    {this.props.user.form.firstaid == "" ? <span class="float-right badge badge-danger">None</span> : ""}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> CPR</strong>
                                    <p className="text-muted">
                                    {moment(this.props.user.form.cpr).add(2, 'years').format('MM/DD/YYYY')} 
                                    { new Date(this.props.user.form.cpr).setFullYear(new Date(this.props.user.form.cpr).getFullYear() + 2) < new Date() ? <span class="float-right badge badge-danger">Expired</span> : null }
                                    {this.props.user.form.cpr == "" ? <span class="float-right badge badge-danger">None</span> : ""}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> CMT</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.cmt} 
                                    { new Date(this.props.user.form.cmt) < new Date() ? <span class="float-right badge badge-danger">Expired</span> : null }
                                    {this.props.user.form.cmt == "" ? <span class="float-right badge badge-danger">None</span> : ""}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> BPS/MANDT</strong>
                                    <p className="text-muted">
                                    {moment(this.props.user.form.mandt).add(1, 'years').format('MM/DD/YYYY')} 
                                    { new Date(this.props.user.form.mandt).setFullYear(new Date(this.props.user.form.mandt).getFullYear() + 1) < new Date() ? <span class="float-right badge badge-danger">Expired</span> : null }
                                    {this.props.user.form.mandt == "" ? <span class="float-right badge badge-danger">None</span> : ""}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Blood Borne Pathogen</strong>
                                    <p className="text-muted">
                                    {moment(this.props.user.form.patogen).add(1, 'years').format('MM/DD/YYYY')} 
                                    { new Date(this.props.user.form.patogen).setFullYear(new Date(this.props.user.form.patogen).getFullYear() + 1) < new Date() ? <span class="float-right badge badge-danger">Expired</span> : null }
                                    {this.props.user.form.patogen == "" ? <span class="float-right badge badge-danger">None</span> : ""}
                                    </p>
                                    <hr />
                                    <p className="mb-1">
                                    <a href="mailto:comapany@name.net"><strong>Send updated certifications</strong></a>   <a className="text-warning" target="_blank" href="https://www.cpr.io"><strong>First Aid, CPR, Bloodborne pathogen Website</strong></a>                    
                                    </p>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {/* /.card */}

                            {/* About Me Box */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="far fa-file-alt mr-1" />DDA Certifications</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <strong><i className="fas fa-book mr-1" /> Community Integration</strong>
                                    <p className="text-muted">
                                        {this.props.user.form.comminte == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.comminte}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> IDOOP</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.idoop == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.idoop}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Charateristics</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.chara == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.chara}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Fundamental Rights </strong>
                                    <p className="text-muted">
                                    {this.props.user.form.funda == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.funda}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Supporting Individual and Family</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.support == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.support}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Communication Skills</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.commskill == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.commskill}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Aging</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.aging == "" ? <span class="badge badge-warning">None</span> : <span>{this.props.user.form.aging}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Incident Reporting</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.incident == "" ? <span class="badge badge-warning">None</span> : <span>{this.props.user.form.incident}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Seizures</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.seizure == "" ? <span class="badge badge-warning">None</span> : <span>{this.props.user.form.seizure}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Autism</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.autism == "" ? <span class="badge badge-warning">None</span> : <span>{this.props.user.form.autism}</span>}
                                    </p>                                    
                                </div>
                                {/* /.card-body */}
                            </div>

                            {this.props.user.userData.isAdmin ?
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="fas fa-info-circle mr-1" />Additional Information</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <strong><i className="fas fa-book mr-1" /> Application</strong>
                                    <p className="text-muted">
                                        {this.props.user.form.app == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.app}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Driving Record</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.drivrec == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.drivrec}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Nursing Observation</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.obser == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.obser}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Extra Application</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.extra == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.extra}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Physical</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.phy == "" ? <span class="badge badge-danger">None</span> : <span>{this.props.user.form.phy}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> TB test</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.aging == "" ? <span class="badge badge-warning">None</span> : <span>{this.props.user.form.aging}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Education History</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.edu == "" ? <span class="badge badge-warning">None</span> : <span>{this.props.user.form.edu}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Emergency Information</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.emginfo == "" ? <span class="badge badge-warning">None</span> : <span>{this.props.user.form.emginfo}</span>}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Financial Information</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.fininfo == "" ? <span class="badge badge-warning">None</span> : <span>{this.props.user.form.fininfo}</span>}
                                    </p>  
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Employment Eligibility Form</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.empeligib == "" ? <span class="badge badge-warning">None</span> : <span>{this.props.user.form.empeligib}</span>}
                                    </p>                                                          
                                </div>
                                {/* /.card-body */}
                            </div>
                            :null}
                        </div>

                    </div>
                    {/* /.row */}
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

export default connect(mapStateToProps)(ViewUser);