import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getIndiv, clearForm, adDailyProgNote, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class AddDailyprognote extends Component {
   

    state = {
        formError: false,
        formSuccess:false,
        formdata:{

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
            commactiv: {
                element: 'input',
                value: '',
                config:{
                    label: 'Community Integration Activities',
                    name: 'community_integration_input',
                    type: 'text',
                    placeholder: 'Community Integration Activities',
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

            behavgoals: {
                element: 'input',
                value: '',
                config:{
                    label: 'Behaviour Integration and Challenging Goals',
                    name: 'behavgoals_input',
                    type: 'text',
                    placeholder: 'Behaviour Integration and Challenging Goals',      
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

            shift: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shift',
                    name: 'shift_input',
                    options: [
                        {key: '9am-11pm', value: '9am-11pm'},
                        {key: '9am-3pm',value: '9am-3pm'},
                        {key: '3pm-11pm',value: '3pm-11pm'},
                        {key: '11pm-9am', value: '11pm-9am'}
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
            goal1: {
                element: 'input',
                value: '',
                config:{
                    name: 'goal1_input',
                    type: 'text',
                    placeholder: 'Goal 1',
                    label: 'Goal 1',
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
            goal2: {
                element: 'input',
                value: '',
                config:{
                    name: 'goal2_input',
                    type: 'text',
                    placeholder: 'Goal 2',
                    label: 'Goal 2',
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

            sp1: {
                element: 'input',
                value: '',
                config:{
                    name: 'sp1_input',
                    type: 'text',
                    placeholder: 'SP1 :Attend Medical Appointment',
                    label: 'SP1: Attend Medical Appointment',
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

            nursingcomm: {
                element: 'input',
                value: '',
                config:{
                    name: 'nursingcomm_input',
                    type: 'text',
                    placeholder: 'Nursing Comments',
                    label: 'Nursing Comments',
                    className: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            }


        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Added Daily Progress Note successfully, You will be redirected shortly.'
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
            console.log(dataToSubmit);
            this.props.dispatch(adDailyProgNote(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Added Daily Progress Note",dataToSubmit,"/forms/daily_progress_note",'add')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/daily_progress_note')
                    },3000)
                    console.log(response.payload);
                }
            });
        } else {
            this.setState({
                formError: true
            })
        }
      
    }

    componentDidMount() {
        const formdata = this.state.formdata;
        this.props.dispatch(getIndiv()).then(response => {

        if(this.props.user.userData.isAdmin){
            const newFormData = populateOptionFields(formdata, this.props.form.individual, 'individual');
            this.updateFields(newFormData)
        }
        else{
            const newFormData = populateOptionFields(formdata, this.props.user.userData.individual, 'individual');
            this.updateFields(newFormData)
        }
        // console.log(newFormData);
        })
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
    const title = "Daily Progress Note";
    return (
        <UserLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1>Add {title}</h1>
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
                        <p className="login-box-msg">Add {title}</p>
                        <form onSubmit={(event)=>this.submitForm(event)}>

                            

                            <FormField
                                id={'individual'}
                                formdata={this.state.formdata.individual}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'commactiv'}
                                formdata={this.state.formdata.commactiv}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'shift'}
                                formdata={this.state.formdata.shift}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'goal1'}
                                formdata={this.state.formdata.goal1}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'goal2'}
                                formdata={this.state.formdata.goal2}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'sp1'}
                                formdata={this.state.formdata.sp1}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'behavgoals'}
                                formdata={this.state.formdata.behavgoals}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'nursingcomm'}
                                formdata={this.state.formdata.nursingcomm}
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
                                    Add {title}
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

export default connect(mapStateToProps)(AddDailyprognote);