import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData,populateSign, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getUsrs,getIndiv, clearForm, adTraining, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'


const MySwal = withReactContent(Swal)

class AddTraining extends Component {
   
    state = {
        trimmedDataURL5: null,
        trimmedDataURL6: null,
        formError: false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'select',
                value: '',
                config: {
                    label: 'Staff\'s Name',
                    name: 'name_input',
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

            address: {
                element: 'input',
                value: '',
                config:{
                    label: 'Address',
                    name: 'address',
                    type: 'text',
                    placeholder: 'Address',      
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

            training: {
                element: 'input',
                value: '',
                config:{
                    label: 'Training',
                    name: 'training',
                    type: 'text',
                    placeholder: 'Name of Training',      
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

            trainer: {
                element: 'input',
                value: '',
                config:{
                    label: 'Trainer',
                    name: 'trainer',
                    type: 'text',
                    placeholder: 'Trainer',      
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

            staffsignimg: {
                element: 'input',
                value: '',
                config:{
                    label: 'Staff Signature',
                    name: 'Initials_input',
                    type: 'text',
                    placeholder: 'Staff Initials',      
                    className: 'form-control'            
                },
                validation:{
                    required: true
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            trainersignimg: {
                element: 'input',
                value: '',
                config:{
                    label: 'Trainer Signature',
                    name: 'Initials_input',
                    type: 'text',
                    placeholder: 'Staff Initials',      
                    className: 'form-control'            
                },
                validation:{
                    required: true
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            comment: {
                element: 'input',
                value: '',
                config:{
                    label: 'Comment (Optional)',
                    name: 'comment_input',
                    type: 'text',
                    placeholder: 'Comment',      
                    className: 'form-control'            
                },
                validation:{
                    required: false
                },
                valid: true,
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
                title: 'Added Training successfully, You will be redirected shortly.'
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
        console.log(newFormdata)
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
        console.log(dataToSubmit);
        if(formIsValid){
            console.log(dataToSubmit);
            this.props.dispatch(adTraining(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Added Training",dataToSubmit,"/forms/training",'add')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/training')
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
            const newFormData = populateOptionFields(formdata, this.props.form.individual, 'individual');
            // console.log(newFormData);
            this.updateFields(newFormData)
        })  
        this.props.dispatch(getUsrs()).then(response => {
            const newFormData = populateOptionFields(formdata, this.props.form.users, 'name');
            // console.log(newFormData);
            this.updateFields(newFormData)
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

    sigPad5 = {}
    sigPad6 = {}
    
    clear5 = () => {
        this.sigPad5.clear()
    }
    clear6 = () => {
        this.sigPad6.clear()
    }
    trim = () => {

        const sign5 = this.sigPad5.getTrimmedCanvas().toDataURL('image/png');
        const sign6 = this.sigPad6.getTrimmedCanvas().toDataURL('image/png');
        

        const formdata5 = this.state.formdata;
        const newFormData5 = populateSign(formdata5, sign5, 'staffsignimg')
        this.updateFields(newFormData5)

        const formdata6 = this.state.formdata;
        const newFormData6 = populateSign(formdata6, sign6, 'trainersignimg')
        this.updateFields(newFormData6)
    }

    render(){
    const title = "Training";
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
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />

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
                                id={'training'}
                                formdata={this.state.formdata.training}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'trainer'}
                                formdata={this.state.formdata.trainer}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'comment'}
                                formdata={this.state.formdata.comment}
                                change={(element) => this.updateForm(element)}
                            />

                            <div className="row">
                                <div className="col-8">
                                <div className="form-group">
                                <label>Staff signature</label>
                                <SignaturePad canvasProps={{className: styles.sigPad}}
                            ref={(ref) => { this.sigPad5 = ref }} />
                                </div>
                                </div>
                                <div className="col-4">
                                <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.clear5()}>
                                    Clear
                                </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                <div className="form-group">
                                <label>Trainer's signature</label>
                                <SignaturePad canvasProps={{className: styles.sigPad}}
                            ref={(ref) => { this.sigPad6 = ref }} />
                                </div>
                                </div>
                                <div className="col-4">
                                <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.clear6()}>
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

export default connect(mapStateToProps)(AddTraining);