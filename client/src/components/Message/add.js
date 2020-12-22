import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CKEditor from "@ckeditor/ckeditor5-react"
// import parse from "html-react-parser"
import { update,  generateData,populateSign, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { clearForm, adMessage, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './App.css'
const MySwal = withReactContent(Swal)

class AddMessage extends Component {
   
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

            title: {
                element: 'input',
                value: '',
                config:{
                    label: 'Title',
                    type: 'text',
                    name: 'title',
                    placeholder: 'Title of Message',
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

            message: {
                element: 'textareaL',
                value: '',
                config:{
                    label: 'Message',
                    type: 'text',
                    name: 'message',
                    placeholder: 'Message Body',
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

            link: {
                element: 'input',
                value: '',
                config:{
                    label: 'Link (optional)',
                    type: 'text',
                    name: 'link',
                    placeholder: 'Link',
                    className: 'form-control'
                },
                validation:{

                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            
        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Added Message successfully, You will be redirected shortly.'
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
        let dataToSubmit = generateData(this.state.formdata,'null');
        let formIsValid = isFormValid(this.state.formdata,'null')
        console.log(dataToSubmit);
        if(formIsValid){
            console.log(dataToSubmit);
            this.props.dispatch(adMessage(dataToSubmit)).then(response =>{
                this.props.dispatch(adLog(this.props.user.userData._id,"Added a Message",dataToSubmit,"/messages/message",'add')).then(response =>{
                if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/messages/message')
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
    const title = "Message";
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
                                id={'title'}
                                formdata={this.state.formdata.title}
                                change={(element) => this.updateForm(element)}
                            />
                            {/* <FormField
                                id={'message'}
                                formdata={this.state.formdata.message}
                                change={(element) => this.updateForm(element)}
                            /> */}
                            <div className="editor">
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.formdata.message.value}
                                onChange={(event, editor) => {
                                    const data = editor.getData()
                                    // console.log(data)
                                    // setText(data)
                                    this.state.formdata.message.value = data
                                }}
                            />
                            </div>
                            <FormField
                                id={'link'}
                                formdata={this.state.formdata.link}
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

export default connect(mapStateToProps)(AddMessage);