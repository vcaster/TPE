import React, { Component } from 'react';
import UserLayout from '../hoc/user'
import FormField from '../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../components/utils/Form/formActions';
import MyButton from '../components/utils/button';
import { connect } from 'react-redux';
import { getIndivId, adLog } from '../actions/user_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../components/utils/retrive'
import CryptoJS from 'crypto-js';

class ViewUser extends Component {
   
    state = {
        loading: true,
        ssn: '0'
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        const formdata = this.state.formdata;
        // console.log(id)
        this.props.dispatch(getIndivId(id)).then(response=>{
            this.props.dispatch(adLog(this.props.user.userData._id,"Viewed Individual",null,"/individual_view/"+id,'view')).then(response =>{});
            console.log(this.props.user.form);
            // var bytes  = CryptoJS.AES.decrypt(this.props.user.form.ssn, 'CRD5513VINYLOLANGDA');
            // console.log(bytes)
            // var ssnp = bytes.toString(CryptoJS.enc.Utf8);
            // const ssn = JSON.parse(ssnp);
            this.setState({
                loading: false,
                // ssn: ssnp
            })
        });

    }

    generateSsn = () => {
        var bytes  = CryptoJS.AES.decrypt(this.props.user.form.ssn, 'CRD5513VINYLOLANGDA');
        var ssn = bytes.toString(CryptoJS.enc.Utf8);
        this.setState({
            loading: false,
            ssn: ssn
        })
    }

    

    render(){
    const title = "Inidividual";
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
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Address</b> <a className="float-right">{this.props.user.form.address.address}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Telephone</b> <a className="float-right">{this.props.user.form.telephone}</a>
                                        </li>
                                        <li className="list-group-item">
                                        <b>Sex</b> <a className="float-right">{this.props.user.form.sex}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Date of Birth</b> <a className="float-right">{this.props.user.form.dob}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Social Security</b> <a className="float-right">{this.state.ssn}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Date of Admission</b> <a className="float-right">{this.props.user.form.doa}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Medicaid</b> <a className="float-right">{this.props.user.form.medicaid}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Medicare</b> <a className="float-right">{this.props.user.form.medicare}</a>
                                        </li>
                                    </ul>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {/* About Me Box */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="far fa-file-alt mr-1" />Physicians</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    {this.props.user.form.pcp ? <strong><i className="fas fa-book mr-1" /> PCP (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.pcp ? <p className="text-muted">
                                    {this.props.user.form.pcp}
                                    </p>: null}
                                    {this.props.user.form.pcp ? <hr />: null}

                                    {this.props.user.form.dental ? <strong><i className="fas fa-book mr-1" /> Dental (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.dental ? <p className="text-muted">
                                    {this.props.user.form.dental}
                                    </p>: null}
                                    {this.props.user.form.dental ? <hr />: null}

                                    {this.props.user.form.vision ? <strong><i className="fas fa-book mr-1" /> Vision (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.vision ? <p className="text-muted">
                                    {this.props.user.form.vision}
                                    </p>: null}
                                    {this.props.user.form.vision ? <hr />: null}

                                    {this.props.user.form.hearing ? <strong><i className="fas fa-book mr-1" /> Hearing (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.hearing ? <p className="text-muted">
                                    {this.props.user.form.hearing}
                                    </p>: null}
                                    {this.props.user.form.hearing ? <hr />: null}

                                    {this.props.user.form.ent ? <strong><i className="fas fa-book mr-1" /> ENT (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.ent ? <p className="text-muted">
                                    {this.props.user.form.ent}
                                    </p>: null}
                                    {this.props.user.form.ent ? <hr />: null}

                                    {this.props.user.form.cardiologist ? <strong><i className="fas fa-book mr-1" /> Cardiologist (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.cardiologist ? <p className="text-muted">
                                    {this.props.user.form.cardiologist}
                                    </p>: null}
                                    {this.props.user.form.cardiologist ? <hr />: null}

                                    {this.props.user.form.psychiatrist ? <strong><i className="fas fa-book mr-1" /> Psychiatrist (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.psychiatrist ? <p className="text-muted">
                                    {this.props.user.form.psychiatrist}
                                    </p>: null}
                                    {this.props.user.form.psychiatrist ? <hr />: null}

                                    {this.props.user.form.therapist ? <strong><i className="fas fa-book mr-1" /> Therapist (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.therapist ? <p className="text-muted">
                                    {this.props.user.form.therapist}
                                    </p>: null}
                                    {this.props.user.form.therapist ? <hr />: null}

                                    {this.props.user.form.neorology ? <strong><i className="fas fa-book mr-1" /> Neorology (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.neorology ? <p className="text-muted">
                                    {this.props.user.form.neorology}
                                    </p>: null}
                                    {this.props.user.form.neorology ? <hr />: null}

                                    {this.props.user.form.gynecology ? <strong><i className="fas fa-book mr-1" /> Gynecology (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.gynecology ? <p className="text-muted">
                                    {this.props.user.form.gynecology}
                                    </p>: null}
                                    {this.props.user.form.gynecology ? <hr />: null}

                                    {this.props.user.form.urology ? <strong><i className="fas fa-book mr-1" /> Urology (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.urology ? <p className="text-muted">
                                    {this.props.user.form.urology}
                                    </p>: null}
                                    {this.props.user.form.urology ? <hr />: null}

                                    {this.props.user.form.groupsessions ? <strong><i className="fas fa-book mr-1" /> Group Sessions (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.groupsessions ? <p className="text-muted">
                                    {this.props.user.form.groupsessions}
                                    </p>: null}
                                    {this.props.user.form.groupsessions ? <hr />: null}

                                    {this.props.user.form.extra1 ? <strong><i className="fas fa-book mr-1" /> PCP (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.extra1 ? <p className="text-muted">
                                    {this.props.user.form.extra1}
                                    </p>: null}
                                    {this.props.user.form.extra1 ? <hr />: null}

                                    {this.props.user.form.extra2 ? <strong><i className="fas fa-book mr-1" /> PCP (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.extra2 ? <p className="text-muted">
                                    {this.props.user.form.extra2}
                                    </p>: null}
                                    {this.props.user.form.extra2 ? <hr />: null}

                                    {this.props.user.form.extra3 ? <strong><i className="fas fa-book mr-1" /> PCP (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.extra3 ? <p className="text-muted">
                                    {this.props.user.form.extra3}
                                    </p>: null}
                                    {this.props.user.form.extra3 ? <hr />: null}

                                    {this.props.user.form.extra4 ? <strong><i className="fas fa-book mr-1" /> PCP (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.extra4 ? <p className="text-muted">
                                    {this.props.user.form.extra4}
                                    </p>: null}
                                    {this.props.user.form.extra4 ? <hr />: null}

                                    {this.props.user.form.extra5 ? <strong><i className="fas fa-book mr-1" /> PCP (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.extra5 ? <p className="text-muted">
                                    {this.props.user.form.extra5}
                                    </p>: null}
                                    {this.props.user.form.extra5 ? <hr />: null}

                                    {this.props.user.form.extra6 ? <strong><i className="fas fa-book mr-1" /> PCP (Address, Telephone, Fax)</strong>: null}
                                    {this.props.user.form.extra6 ? <p className="text-muted">
                                    {this.props.user.form.extra6}
                                    </p>: null}
                                    {this.props.user.form.extra6 ? <hr />: null}
                                                                        
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {/* /.card */}

                        </div>

                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-md-6">
                            {/* About Me Box */}
                            <div className="card card-primary collapsed-card">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="far fa-file-alt mr-1" />Contact</h3>
                                    <div className="card-tools">
                                    <button title="Collapse" class="btn btn-tool" type="button" data-toggle="tooltip" data-card-widget="collapse">
                                    <i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <strong><i className="fas fa-book mr-1" /> LEGAL MEDICAL GUARDIAN (Name - Relationship - Address - Telephone</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.lmgname} - {this.props.user.form.lmgrelationship} - {this.props.user.form.lmgaddress} - {this.props.user.form.lmgtelephone}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> EMERGENCY CONTACT (Name - Telephone - Position - Company)</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.emgcontact} - {this.props.user.form.emgtelephone} - {this.props.user.form.emgposition} - {this.props.user.form.emgcompany}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Family Contact (Name - Relationship - Address - Telephone</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.fcname} - {this.props.user.form.fcrelationship} - {this.props.user.form.fcaddress} - {this.props.user.form.fctelephone}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Service Coordinator (Name - Address - Telephone - Fax) </strong>
                                    <p className="text-muted">
                                    {this.props.user.form.scname} - {this.props.user.form.scaddress} - {this.props.user.form.sctelephone} - {this.props.user.form.scfax}
                                    </p>
                                    <hr />
                                    <strong><i className="fas fa-book mr-1" /> Vocational Program (Name - Address - Telephone - Fax)</strong>
                                    <p className="text-muted">
                                    {this.props.user.form.vcprogram} - {this.props.user.form.vcaddress} - {this.props.user.form.vctelephone} - {this.props.user.form.vcfax}
                                    </p>                                                        
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div className="card card-primary card-outline collapsed-card">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="far fa-file-alt mr-1" />Medical Information</h3>
                                    <div className="card-tools">
                                    <button title="Collapse" class="btn btn-tool" type="button" data-toggle="tooltip" data-card-widget="collapse">
                                    <i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                                <div className="card-body box-profile">                                    
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Marital Status</b> <a className="float-right">{this.props.user.form.martialstatus}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Height</b> <a className="float-right">{this.props.user.form.height}</a>
                                        </li>
                                        <li className="list-group-item">
                                        <b>Weight</b> <a className="float-right">{this.props.user.form.weight}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Race</b> <a className="float-right">{this.props.user.form.race}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Haircolor</b> <a className="float-right">{this.props.user.form.haircolor}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Eye Color</b> <a className="float-right">{this.props.user.form.eyecolor}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Verbal</b> <a className="float-right">{this.props.user.form.verbal}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Adaptive Devices</b> <a className="float-right">{this.props.user.form.adaptivedevices}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Religion</b> <a className="float-right">{this.props.user.form.religion}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Diet</b> <a className="float-right">{this.props.user.form.diet}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Allergy</b> <a className="float-right">{this.props.user.form.allergy}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Medical Diagnosis</b> <a className="float-right">{this.props.user.form.medicaldiagnosis}</a>
                                        </li>
                                    </ul>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
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

export default connect(mapStateToProps)(ViewUser);