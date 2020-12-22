import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import {  clearForm, getAppointId, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../../components/utils/retrive'

const MySwal = withReactContent(Swal)

class ExViewAppoint extends Component {
   

    state = {
        loading: true,
        formError: false,
        formSuccess:false,
        formErrorMessage: "",
        formdata:{
            _id: {
                element: '_id',
                value: '',
                config:{
                    style: {display:'none'},
                    name: '_id_input',
                    type: 'text',
                    placeholder: '_id Name',                  
                },
                validation:{
                    required: false
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            dated: {
                element: 'input',
                value: '',
                id: 'timepicker',            
                target: '#timepicker',
                config:{
                    label: 'Date of Appointment',
                    name: 'dati',
                    type: 'text',
                    className: 'form-control', disabled: true            
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },


            doc: {
                element: 'input',
                value: '',
                config:{
                    label: 'Doctor/Institution',
                    name: 'doc',
                    type: 'text',
                    placeholder: 'Doctor/Institution',      
                    className: 'form-control', disabled: true            
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },


            type: {
                element: 'select',
                value: '',
                config:{
                    label: 'Type of appointment',
                    name: 'type',
                    options: [
                        {key: 'Psychiatry',value: 'Psychiatry'},
                        {key: 'Therapy',value: 'Therapy'},
                        {key: 'Pcp Follow Up',value: 'Pcp Follow Up'},
                        {key: 'Medication Review',value: 'Medication Review'},
                        {key: 'Annual Physical',value: 'Annual Physical'},
                        {key: 'Lab',value: 'Lab'},
                        {key: 'ENT',value: 'ENT'},
                        {key: 'Flu Shot', value: 'Flu Shot'},
                        {key: 'Neurology',value: 'Neurology'},
                        {key: 'Dental',value: 'Dental'},
                        {key: 'Vision',value: 'Vision'},
                        {key: 'Audiology',value: 'Audiology'},
                        {key: 'Nutrition',value: 'Nutrition'},
                        {key: 'Nursing Review',value: 'Nursing Review'},
                        {key: 'TD Screen',value: 'TD Screen'},
                        {key: 'Endocrinology',value: 'Endocrinology'},
                        {key: 'Cardiology',value: 'Cardiology'},
                        {key: 'Dermatology',value: 'Dermatology'},
                        {key: 'Gyn',value: 'Gyn'},
                        {key: 'Depo Shot',value: 'Depo Shot'},
                        {key: 'Orthopedic',value: 'Orthopedic'},
                        {key: 'Podiatry',value: 'Podiatry'},
                        {key: 'Urology',value: 'Urology'},
                        {key: 'Invega Shot',value: 'Invega Shot'},
                        {key: 'Trucilly Shot',value: 'Trucilly Shot'},
                        {key: 'Glasses',value: 'Glases'},
                        {key: 'ER/Hospitalization',value: 'ER/Hospitalization'},
                        {key: 'Colonoscopy',value: 'Colonoscopy'},
                        {key: 'Oral Surgery',value: 'Oral Surgery'},
                        {key: 'Hearing Aid',value: 'Hearing Aid'},
                        {key: 'Mammogram',value: 'Mammogram'},
                        {key: 'Substance Abuse Treatment',value: 'Substance Abuse Treatment'},
                        {key: 'GI',value: 'GI'},
                        {key: 'Otolaryngology',value: 'Otolaryngology'},
                        {key: 'Wound Clinic',value: 'Wound Clinic'},
                        {key: 'MRI & EEG',value: 'MRI & EEG'},

                        
                    ],
                    className: 'form-control', disabled: true
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            color: {
                element: 'select',
                value: '',
                config: {
                    label: 'Status',
                    name: 'exit_input',
                    options: [
                        {key: 'green',value: 'Confirmed'},
                        {key: 'blue',value: 'Received'},
                        {key: '#FFCE00', value: 'In Appointment'},
                        {key: 'red',value: 'Missed'}
                    ],
                    className: 'form-control', disabled: true
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

           
            title: {
                element: 'input',
                value: '',
                config:{
                    label: 'Name of Individual',
                    name: 'type',
                    type: 'text',
                    placeholder: 'Name of Individual with initials (e.g Reed.M)',      
                    className: 'form-control', disabled: true            
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            staff: {
                element: 'input',
                value: '',
                config:{
                    label: 'Name of Staff with initials',
                    name: 'type',
                    type: 'text',
                    placeholder: 'Name of staff with initials (e.g Reed.M)',      
                    className: 'form-control', disabled: true            
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },


            comment: {
                element: 'input',
                value: '',
                config:{
                    label: 'Comment',
                    name: 'comment',
                    type: 'text',
                    placeholder: 'Comment',      
                    className: 'form-control', disabled: true            
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },


        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Edited Appointment successfully, You will be redirected shortly.'
              })
        }
        
    }
    danger = (message) => {
        if (this.state.formError){
            MySwal.fire({
                icon: 'danger',
                title: message
              })
        }
        
    }

    updateFields = (newFormData) => {
        this.setState({
            formdata: newFormData
        })
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'null');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        this.props.dispatch(clearForm());
            this.props.history.push('/forms/appointment_view')

    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const formdata = this.state.formdata;
        
        this.props.dispatch(getAppointId(id)).then(response=>{
            // if(!this.props.form.Dailyprognoteid){
                //console.log(id+"product found ")
            //     this.props.history.push('/')
            // }
            console.log(this.props.form.form);
            const newFormdata  = populateFields(this.state.formdata,this.props.form.form, 'appoint');
            this.setState({
            formdata: newFormdata,
            loading: false           
                })
        });

    }

    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formdata,'forms')
        this.setState({
            formdata: newFormData,
            formSuccess: true
        });
        setTimeout(()=>{
            this.setState({
                formSuccess: false
            },()=> {
                this.props.dispatch(clearForm())
            })
        }, 3000)
    }



    render(){
    const title = "Appointment";
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
                        <div className="card">
                        <div className="card-body register-card-body">
                        <p className="login-box-msg">Edit {title}</p>
                        <form onSubmit={(event)=>this.submitForm(event)}>
                            
                            <FormField
                                id={'title'}
                                formdata={this.state.formdata.title}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'staff'}
                                formdata={this.state.formdata.staff}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'type'}
                                formdata={this.state.formdata.type}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'dated'}
                                formdata={this.state.formdata.dated}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'doc'}
                                formdata={this.state.formdata.doc}
                                change={(element) => this.updateForm(element)}
                            /> 
                            <FormField
                                id={'color'}
                                formdata={this.state.formdata.color}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'comment'}
                                formdata={this.state.formdata.comment}
                                change={(element) => this.updateForm(element)}
                            />

                        { this.state.formError ?
                        <span style={{ color: 'red'}}id="exampleInputEmail1-error">
                        Check your data
                        </span>
                        :null}
                         {this.state.formError ? this.danger(this.state.formErrorMessage) : null}

                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                               
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-block bg-gradient-primary" type="button" onClick={(event)=> this.submitForm(event)}>
                                   Go Back
                                </button>
                                </div>
                                

                                
                                {/* /.col */}
                            </div>
                        </form>
                        
                    </div>
                    {/* /.login-card-body */}
                    {this.state.formSuccess ? this.success() : null}
                </div>
                        {/* /.card */}
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

export default connect(mapStateToProps)(ExViewAppoint);