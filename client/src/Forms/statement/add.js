import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData,populateSign, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { clearForm, adStatement, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'

const MySwal = withReactContent(Swal)

class AddStatement extends Component {
   
    state = {
        trimmedDataURL1: null,
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

            input: {
                element: 'textareaL',
                value: '',
                config: {
                    label: 'Statement',
                    name: 'after_input',
                    type: 'text',
                    placeholder: 'Employee Statement',
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
            }
        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Added Employee Statement successfully, You will be redirected shortly.'
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
        this.trim();
        let dataToSubmit = generateData(this.state.formdata,'null');
        let formIsValid = isFormValid(this.state.formdata,'null')

        if(formIsValid){
            console.log(dataToSubmit);
            this.props.dispatch(adStatement(dataToSubmit)).then(response =>{
                this.props.dispatch(adLog(this.props.user.userData._id,"Added Employee Statement",dataToSubmit,"/forms/statement",'add')).then(response =>{
                    if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true 
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/statement')
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

    sigPad1 = {}
    clear1 = () => {
        this.sigPad1.clear()
    }
    trim = () => {

        const sign1 = this.sigPad1.getTrimmedCanvas().toDataURL('image/png');
        

        const formdata1 = this.state.formdata;
        const newFormData1 = populateSign(formdata1, sign1, 'staffsignimg')
        this.updateFields(newFormData1)
                    
        // this.setState({
        //     trimmedDataURL1: this.sigPad1.getTrimmedCanvas()
        //         .toDataURL('image/png'),
        //     trimmedDataURL2: this.sigPad2.getTrimmedCanvas()
        //         .toDataURL('image/png'),
        //     trimmedDataURL3: this.sigPad3.getTrimmedCanvas()
        //     .toDataURL('image/png'),
        //     trimmedDataURL4: this.sigPad4.getTrimmedCanvas()
        //     .toDataURL('image/png'),
        //     trimmedDataURL5: this.sigPad5.getTrimmedCanvas()
        //     .toDataURL('image/png'),
        //     trimmedDataURL6: this.sigPad6.getTrimmedCanvas()
        //     .toDataURL('image/png')
        // })
        // // console.log(this.sigPad)

    }



    render(){
    const title = "Employee Statement";
    // let {trimmedDataURL1,trimmedDataURL2,trimmedDataURL3,trimmedDataURL4,trimmedDataURL5,trimmedDataURL6} = this.state
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
                                id={'input'}
                                formdata={this.state.formdata.input}
                                change={(element) => this.updateForm(element)}
                            />

                            
                            <div className="row">
                                <div className="col-8">
                                <div className="form-group">
                                <label>Staff signature</label>
                                <SignaturePad canvasProps={{className: styles.sigPad}}
                                ref={(ref) => { this.sigPad1 = ref }} />
                                </div>
                                </div>
                                <div className="col-4">
                                <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.clear1()}>
                                    Clear
                                </button>
                                </div>
                            </div>
                                                       
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

export default connect(mapStateToProps)(AddStatement);