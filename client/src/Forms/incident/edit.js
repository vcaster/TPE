import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, getIndiv, clearForm, updateIncident, getIncidentId, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../../components/utils/retrive'

const MySwal = withReactContent(Swal)

class EditIncident extends Component {
   

    state = {
        loading: true,
        formError: false,
        formSuccess:false,
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
                element: 'input',
                value: this.props.user.userData._id,
                config:{
                    style: {display:'none'},
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Staff Name',                  
                },
                validation:{
                    required: false
                },
                valid: true,
                touched: true,
                validationMessage:'',
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

            address: {
                element: 'select',
                value: '',
                config:{
                    label: 'Address',
                    name: 'address_input',
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

            location: {
                element: 'input',
                value: '',
                config:{
                    label: 'Location of Incident',
                    name: 'loc_input',
                    type: 'text',
                    placeholder: 'Location of Incident',                          
                    className: 'form-control'           
                },
                validation:{
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage:'',
                showlabel: true
            },

            before: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Before Incident (Briefly explain what happened prior to incident)',
                    name: 'before_input',
                    type: 'text',
                    placeholder: 'Before Incident',
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

            during: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'During Incident (Behavioural or Medical. Explain the actual incident objectively and briefly. Do not form your opinion here)',
                    name: 'during_input',
                    type: 'text',
                    placeholder: 'During Incident',
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

            after: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'After Incident (Use behavioural program intervention, medical intervention, or behaviour protocol for the individual.)',
                    name: 'after_input',
                    type: 'text',
                    placeholder: 'After Incident',
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

            staffsignimg: {
                element: 'input',
                value: '',
                config:{
                    style: {display:'none'},
                    name: 'meetingnotes_input',
                    type: 'text',
                    placeholder: 'Meeting Notes',            
                },
                validation:{
                    required: true
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            coordinator: {
                element: 'select',
                value: '',
                config: {
                    label: 'Is the incident reported to the program coordinator?',
                    name: 'coordinat_input',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'No', value: 'No'}
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

            nurse: {
                element: 'select',
                value: '',
                config: {
                    label: 'Is the incident reported to Delegating Nurse?',
                    name: 'nurse_input',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'No', value: 'No'}
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

            action: {
                element: 'input',
                value: '',
                config: {
                    label: 'F/U Action by coordinator (All behaviour incidents should be reported within one hour of the incident. if medical, they should be reported immediately.))',
                    name: 'action_input',
                    type: 'text',
                    placeholder: 'F/U Action by coordinator',
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

            injuryqa: {
                element: 'select',
                value: '',
                config: {
                    label: 'Was the individual physically injured?',
                    name: 'nue_input',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'No', value: 'No'}
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

            injury: {
                element: 'select',
                value: '',
                config: {
                    label: 'Type of injury',
                    name: 'injury_input',
                    options: [
                        {key: 'Scratch',value: 'Scratch'},
                        {key: 'Bruise', value: 'Bruise'},
                        {key: 'Bite', value: 'Bite'},
                        {key: 'Other', value: 'Other'},
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

            iother: {
                element: 'input',
                value: '',
                config: {
                    label: 'If other injury type here',
                    name: 'action_input',
                    type: 'text',
                    placeholder: 'If other injury type here',
                    className: 'form-control'
                },
                validation: {

                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            body: {
                element: 'select',
                value: '',
                config: {
                    label: 'Body Parts Injured',
                    name: 'body_input',
                    options: [
                        {key: 'Head/Face',value: 'Head/Face'},
                        {key: 'Neck/Chest', value: 'Neck/Chest'},
                        {key: 'Hands/Arm', value: 'Hands/Arm'},
                        {key: 'Back/Buttocks', value: 'Back/Buttocks'},
                        {key: 'Feet/Legs', value: 'Feet/Legs'},
                        {key: 'Mouth/Teeth', value: 'Mouth/Teeth'},
                        {key: 'Abdomen', value: 'Abdomen'},
                        {key: 'Genitals', value: 'Genitals'},
                        {key: 'Other', value: 'Other'},
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

            bother: {
                element: 'input',
                value: '',
                config: {
                    label: 'If other body parts injured',
                    name: 'bother_input',
                    type: 'text',
                    placeholder: 'If other body parts injured',
                    className: 'form-control'
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            notified: {
                element: 'select',
                value: '',
                config: {
                    label: 'Was the nurse notified?',
                    name: 'not_input',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'No', value: 'No'}
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

            follow: {
                element: 'input',
                value: '',
                config: {
                    label: 'If yes, what F/U action was recommended?',
                    name: 'action_input',
                    type: 'text',
                    placeholder: 'If yes, what F/U action was recommended?',
                    className: 'form-control'
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            hospital: {
                element: 'select',
                value: '',
                config: {
                    label: 'Was the Individual taken to the hospital?',
                    name: 'hos_input',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'No', value: 'No'}
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

            hospitaly: {
                element: 'input',
                value: '',
                config: {
                    label: 'If yes, When?',
                    name: 'hosy',
                    type: 'text',
                    placeholder: 'If yes, When?',
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
            treatment: {
                element: 'select',
                value: '',
                config: {
                    label: 'Was Medical treatment indicated? If Yes Send all paper work to the office.',
                    name: 'ntreat_input',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'No', value: 'No'}
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

        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Edited Incident Report successfully, You will be redirected shortly.'
              })
        }
        
    }

    updateFields = (newFormData) => {
        this.setState({
            formdata: newFormData
        })
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'dailyprognote');
        let formIsValid = isFormValid(this.state.formdata,'dailyprognote')

        if(formIsValid){
            // console.log(dataToSubmit);
            this.props.dispatch(updateIncident(dataToSubmit)).then(response =>{
                this.props.dispatch(adLog(this.props.user.userData._id,"Edited Incident Report",dataToSubmit,"/incident_view/"+dataToSubmit._id,'edit')).then(response =>{
                if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/incident')
                    },3000)
                    console.log(response.payload);
                }
            });
        });
        } else {
            this.setState({
                formError: true
            })
        }
      
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const formdata = this.state.formdata;
        // console.log(id)
        this.props.dispatch(getIncidentId(id)).then(response=>{
            // if(!this.props.form.Dailyprognoteid){
                //console.log(id+"product found ")
            //     this.props.history.push('/')
            // }
            console.log(this.props.form.form);
            const newFormdata  = populateFields(this.state.formdata,this.props.form.form, 'incident');
            this.setState({
            formdata: newFormdata,
            loading:false
                })
        });

        this.props.dispatch(getAddr()).then(response => {
            // console.log(newFormData);
            // this.updateFields(newFormData)
            if(this.props.user.userData.isAdmin){
                const newFormData = populateOptionFields(formdata, this.props.form.address, 'address');
                // this.updateFields(newFormData)
            }
            else{
                const newFormData = populateOptionFields(formdata, this.props.user.userData.address, 'address');
                // this.updateFields(newFormData)
            }
        }); 
        
        this.props.dispatch(getIndiv()).then(response => {
            if(this.props.user.userData.isAdmin){
                const newFormData = populateOptionFields(formdata, this.props.form.individual, 'individual');
                this.updateFields(newFormData)
            }
            else{
                const newFormData = populateOptionFields(formdata, this.props.user.userData.individual, 'individual');
                this.updateFields(newFormData)
            }
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
    const title = "Standard Incident Report";
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
                                id={'individual'}
                                formdata={this.state.formdata.individual}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'address'}
                                formdata={this.state.formdata.address}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'location'}
                                formdata={this.state.formdata.location}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField          
                                id={'before'}
                                formdata={this.state.formdata.before}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'during'}
                                formdata={this.state.formdata.during}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'after'}
                                formdata={this.state.formdata.after}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'coordinator'}
                                formdata={this.state.formdata.coordinator}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'nurse'}
                                formdata={this.state.formdata.nurse}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'action'}
                                formdata={this.state.formdata.action}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'injuryqa'}
                                formdata={this.state.formdata.injuryqa}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'injury'}
                                formdata={this.state.formdata.injury}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'iother'}
                                formdata={this.state.formdata.iother}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField  
                                id={'body'}
                                formdata={this.state.formdata.body}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'bother'}
                                formdata={this.state.formdata.bother}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'notified'}
                                formdata={this.state.formdata.notified}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'follow'}
                                formdata={this.state.formdata.follow}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField  
                                id={'hospital'}
                                formdata={this.state.formdata.hospital}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'hospitaly'}
                                formdata={this.state.formdata.hospitaly}
                                change={(element) => this.updateForm(element)}
                            />

                            
                            <FormField
                                id={'treatment'}
                                formdata={this.state.formdata.treatment}
                                change={(element) => this.updateForm(element)}
                            />
                        { this.state.formError ?
                        <span style={{ color: 'red'}}id="exampleInputEmail1-error">
                        Check your data
                        </span>
                        :null}

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

export default connect(mapStateToProps)(EditIncident);