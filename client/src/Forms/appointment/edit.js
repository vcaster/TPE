import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import {  clearForm, updateAppoint, getAppointId, adLog, sendSms } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../../components/utils/retrive'
import { getIndiv, getUsrs } from '../../actions/user_actions';

const MySwal = withReactContent(Swal)

class EditAppoint extends Component {
   

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
            name: {
                element: 'select',
                value: '',
                config:{
                    label: 'Staff Name',
                    name: 'name_input',
                    options: [],
                    className: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            phone: {
                element: 'select',
                value: '',
                config: {
                    label: 'Phone Number',
                    name: 'nput',
                    options: [],
                    className: 'form-control'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            individual: {
                element: 'select',
                value: '',
                config: {
                    label: 'Individual\'s Name',
                    name: 'individual_input',
                    options: [],
                    className: 'form-control'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            dated: {
                element: 'date',
                value: '',
                id: 'timepicker',            
                target: '#timepicker',
                config:{
                    label: 'Date of Appointment (Required For SMS)',
                    name: 'dati',
                    type: 'text',
                    className: 'form-control'            
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            daten: {
                element: 'date',
                value: '',
                id: 'timepicker1',            
                target: '#timepicker1',
                config:{
                    label: 'Estimated Date of Next Appointment',
                    name: 'datiq',
                    type: 'text',
                    className: 'form-control'            
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
                    className: 'form-control'            
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            freq: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frequency',
                    name: 'freq',
                    options: [
                        {key: 'YES',value: 'YES'},
                        {key: 'PRN',value: 'PRN'},
                        {key: '7 days',value: '7 days'},
                        {key: '14 days',value: '14 days'},
                        {key: '30 days',value: '30 days'},
                        {key: '45 days',value: '45 days'},
                        {key: '2 months',value: '2 months'},
                        {key: '3 months',value: '3 months'},
                        {key: '4 months',value: '4 months'},
                        {key: '5 months',value: '5 months'},
                        {key: '6 months',value: '6 months'},
                        {key: '7 months',value: '7 months'},
                        {key: '8 months',value: '8 months'},
                        {key: '1 year',value: '1 year'},
                        {key: '2 years',value: '2 years'},
                        {key: '3 years',value: '3 years'},
                    ],
                    className: 'form-control'
                },
                validation: {
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
                    className: 'form-control'
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
                    className: 'form-control'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            deleted: {
                element: 'select',
                value: '',
                config: {
                    label: 'Delete?',
                    name: 'it_input',
                    options: [
                        {key: '0', value: 'No'},
                        {key: '1',value: 'Yes'},
                    ],
                    className: 'form-control'
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
                    className: 'form-control'            
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
                    className: 'form-control'            
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            send: {
                element: 'select',
                value: '',
                config: {
                    label: 'Send SMS?',
                    name: 'it_input',
                    options: [
                        {key: '0', value: 'No'},
                        {key: '1',value: 'Yes'},
                    ],
                    className: 'form-control'
                },
                validation: {
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
                    name: 'type',
                    type: 'text',
                    placeholder: 'Comment',      
                    className: 'form-control'            
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

        let dataToSubmit = generateData(this.state.formdata, 'null');
        let formIsValid = isFormValid(this.state.formdata, 'null')

        if (formIsValid) {
            // console.log(dataToSubmit);
            this.props.dispatch(sendSms(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    this.props.dispatch(adLog(this.props.user.userData._id, "Modified Appointment", dataToSubmit, "/forms/appointment_view", 'edit')).then(response => { });
                    this.props.dispatch(updateAppoint(dataToSubmit)).then(response => {
                        console.log(response.payload)
                        if (response.payload.success) {
                            this.setState({
                                formError: false,
                                formSuccess: true
                            });
                            this.props.dispatch(clearForm());
                            setTimeout(() => {
                                this.props.history.push('/forms/appointment_view')
                            }, 3000)
                            console.log(response.payload);
                        } else {
                            this.setState({
                                formErrorMessage: response.payload.message,
                                formError: true,
                                formSuccess: false
                            });

                        }
                    })


                }
            });
        } else {
            this.setState({
                formErrorMessage: "Check your data!",
                formError: true,
            })
        }

    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const formdata = this.state.formdata;
        // console.log(id)
        this.props.dispatch(getIndiv()).then(response => {
            // console.log(newFormData);
            // this.updateFields(newFormData)
            if(this.props.user.userData.isAdmin){
                const newFormData = populateOptionFields(formdata, this.props.form.individual, 'individual');
                // this.updateFields(newFormData)
            }
            else{
                const newFormData = populateOptionFields(formdata, this.props.user.userData.individual, 'individual');
                // this.updateFields(newFormData)
            }
        });
        this.props.dispatch(getUsrs()).then(response => {
            // console.log(newFormData);
            // this.updateFields(newFormData)
            if(this.props.user.userData.isAdmin){
                const newFormData = populateOptionFields(formdata, this.props.form.users, 'name');
                // this.updateFields(newFormData)
                const newFormData1 = populateOptionFields(formdata, this.props.form.users, 'phone');
                // console.log(newFormData);
                // this.updateFields(newFormData1)
            }
        });
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
                        <h1>Edit {title}</h1>
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
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'phone'}
                                formdata={this.state.formdata.phone}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'staff'}
                                formdata={this.state.formdata.staff}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'individual'}
                                formdata={this.state.formdata.individual}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'title'}
                                formdata={this.state.formdata.title}
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
                                id={'daten'}
                                formdata={this.state.formdata.daten}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'freq'}
                                formdata={this.state.formdata.freq}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'doc'}
                                formdata={this.state.formdata.doc}
                                change={(element) => this.updateForm(element)}
                            /> 
                            <FormField
                                id={'comment'}
                                formdata={this.state.formdata.comment}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'color'}
                                formdata={this.state.formdata.color}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'deleted'}
                                formdata={this.state.formdata.deleted}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'send'}
                                formdata={this.state.formdata.send}
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
                                    Edit {title}
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

export default connect(mapStateToProps)(EditAppoint);