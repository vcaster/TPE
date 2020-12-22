import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import MyButton from '../utils/button';
import {adLog} from '../../actions/form_actions'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';

class Login extends Component {


    state = {
        formError: false,
        formErrorMessage: '',
        formSuccess:'',
        formdata:{
            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Username',
                    className: 'form-control'
                },
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Password',
                    className: 'form-control'
                },
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }
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
        
        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login')         
            console.log(dataToSubmit)
        //     if(formIsValid){
        //     this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
        //         if(response.payload.loginSuccess){
        //             const id = response.payload.id
        //             this.props.history.push("/view_user/"+id)
        //             this.props.dispatch(adLog(id,"Logged in",null,"/user/users",'login')).then(response =>{
        //             });
        //         }else{
        //             this.setState({
        //                 formError: true,
        //                 formErrorMessage: response.payload.message
        //             })
        //         }
        //     });
        //     }
        //   else{
        //       alert("Browser Not Surpported")
        //   }
          
    }

    submitFormSuper = (event) => {
        event.preventDefault();
        
        let dataToSubmit = {email: "Admin@admin.com", password: "Helloworld"};
        // let formIsValid = isFormValid(this.state.formdata,'login')         
            console.log(dataToSubmit)
            if(true){
            this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                if(response.payload.loginSuccess){
                    const id = response.payload.id
                    this.props.history.push("/view_user/"+id)
                    this.props.dispatch(adLog(id,"Logged in",null,"/user/users",'login')).then(response =>{
                    });
                }else{
                    this.setState({
                        formError: true,
                        formErrorMessage: response.payload.message
                    })
                }
            });
            }
          else{
              alert("Browser Not Surpported")
          }
          
    }

    submitFormQa = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login')         
            console.log(dataToSubmit)
            if(formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                if(response.payload.loginSuccess){
                    const id = response.payload.id
                    this.props.history.push("/view_user/"+id)
                    this.props.dispatch(adLog(id,"Logged in",null,"/user/users",'login')).then(response =>{
                    });
                }else{
                    this.setState({
                        formError: true,
                        formErrorMessage: response.payload.message
                    })
                }
            });
            }
          else{
              alert("Browser Not Surpported")
          }
          
    }

    submitFormAcct = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login')         
            console.log(dataToSubmit)
            if(formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                if(response.payload.loginSuccess){
                    const id = response.payload.id
                    this.props.history.push("/view_user/"+id)
                    this.props.dispatch(adLog(id,"Logged in",null,"/user/users",'login')).then(response =>{
                    });
                }else{
                    this.setState({
                        formError: true,
                        formErrorMessage: response.payload.message
                    })
                }
            });
            }
          else{
              alert("Browser Not Surpported")
          }
          
    }
    submitFormStaff = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login')         
            console.log(dataToSubmit)
            if(formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                if(response.payload.loginSuccess){
                    const id = response.payload.id
                    this.props.history.push("/view_user/"+id)
                    this.props.dispatch(adLog(id,"Logged in",null,"/user/users",'login')).then(response =>{
                    });
                }else{
                    this.setState({
                        formError: true,
                        formErrorMessage: response.payload.message
                    })
                }
            });
            }
          else{
              alert("Browser Not Surpported")
          }
          
    }

    submitFormVisor = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login')         
            console.log(dataToSubmit)
            if(formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                if(response.payload.loginSuccess){
                    const id = response.payload.id
                    this.props.history.push("/view_user/"+id)
                    this.props.dispatch(adLog(id,"Logged in",null,"/user/users",'login')).then(response =>{
                    });
                }else{
                    this.setState({
                        formError: true,
                        formErrorMessage: response.payload.message
                    })
                }
            });
            }
          else{
              alert("Browser Not Surpported")
          }
          
    }


    render() {
        return (
            <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Select an account type to start your session</p>
                        <form onSubmit={(event)=>this.submitForm(event)}>
                        
                        {/* <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'password'}
                            formdata={this.state.formdata.password}
                            change={(element) => this.updateForm(element)}
                        /> */}
                        
                        {/* { this.state.formError ?
                        <span style={{ color: 'red'}}id="exampleInputEmail1-error">
                        {this.state.formErrorMessage}
                        </span>
                        :null} */}
                        



                            {/* <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-2">
                                <div className="icheck-primary">
                                </div>
                                </div>
                                <div className="col-8">
                                <div class="btn-group-vertical" style={{display: "block"}}>
                                    <button type="button" class="btn btn-danger" onClick={(event)=> this.submitFormSuper(event)}>Super Admin</button>
                                    <button type="button" class="btn btn-warning" onClick={(event)=> this.submitFormVisor(event)}>Supervisor</button>
                                    <button type="button" class="btn btn-primary" onClick={(event)=> this.submitFormQa(event)}>Quality Assurance</button>
                                    <button type="button" class="btn btn-info" onClick={(event)=> this.submitFormAcct(event)}>Accountant</button>
                                    <button type="button" class="btn btn-default" onClick={(event)=> this.submitFormStaff(event)}>Staff</button>
                                </div>
                                <strong className="login-box-msg">This enviroment is a demonstation of the actual product</strong>
                                </div>
                                <div className="col-2">
                                <div className="icheck-primary">
                                </div>
                                </div>
                                

                                
                                {/* /.col */}
                            </div>
                        </form>
                        
                    </div>
                    {/* /.login-card-body */}
                </div>
        );
    }
}

export default connect()(withRouter(Login));