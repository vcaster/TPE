import React, { Component } from 'react';
import axios from 'axios';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { clearForm, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class ResetPass extends Component {
   

    state = {
        formError: false,
        formErrorMessage: '',
        formSuccess:false,
        formdata:{

            _id: {
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

            oldpass: {
                element: 'input',
                value: '',
                config:{
                    label: 'Old Password',
                    name: 'OldPassword',
                    type: 'password',
                    placeholder: 'Old Password',
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

            password: {
                element: 'input',
                value: '',
                config:{
                    label: 'Password',
                    name: 'Password',
                    type: 'password',
                    placeholder: 'Password',
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

            confirmPassword: {
                element: 'input',
                value: '',
                config:{
                    label: 'Confirm Password',
                    name: 'Confirm',
                    type: 'password',
                    placeholder: 'Confirm Password',
                    className: 'form-control'
                },
                validation:{
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            // resetp: {
            //     element: 'input',
            //     value: '1',
            //     config:{
            //         style: {display:'none'},
            //         name: 'name_input',
            //         type: 'text',
            //         placeholder: 'Staff Name',                  
            //     },
            //     validation:{
            //         required: false
            //     },
            //     valid: true,
            //     touched: true,
            //     validationMessage:'',
            //     showlabel: true
            // },

        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Successfully Changed password, You will be redirected shortly.'
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

        let dataToSubmit = generateData(this.state.formdata, 'reset_pass');
        let formIsValid = isFormValid(this.state.formdata, 'reset_pass')

        if (formIsValid) {
            axios.post('/api/users/reset_password',
            {
                ...dataToSubmit
            }
        ).then(response => {
            if(!response.data.success){
                this.setState({
                    formError: true,
                    formErrorMessage: response.data.message
                })
            } else {
                this.props.dispatch(adLog(this.props.user.userData._id,"Changed Password",null,"/user/users",'edit')).then(response =>{});
                this.setState({formError:false, formSuccess: true});
                setTimeout(()=>{
                    this.props.history.push('/user/users')
                }, 3000)
            }
        })

        } else {
            this.setState({
                formError: true
            })
        }
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
    const title = "Change Password";
    return (
        <UserLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1>{title}</h1>
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
                        <p className="login-box-msg">{title}</p>
                        <form onSubmit={(event)=>this.submitForm(event)}>

                            

                            <FormField
                                id={'oldpass'}
                                formdata={this.state.formdata.oldpass}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'password'}
                                formdata={this.state.formdata.password}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'confirmPassword'}
                                formdata={this.state.formdata.confirmPassword}
                                change={(element) => this.updateForm(element)}
                            />
                           
                        { this.state.formError ?
                        <span style={{ color: 'red'}}id="exampleInputEmail1-error">
                        {this.state.formErrorMessage}
                        </span>
                        :null}

                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                               
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-block bg-gradient-primary" type="button" onClick={(event)=> this.submitForm(event)}>
                                    {title}
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

export default connect(mapStateToProps)(ResetPass);