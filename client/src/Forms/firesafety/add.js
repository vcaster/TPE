import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData,populateSign, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, clearForm, adFireSafety, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'

const MySwal = withReactContent(Swal)

class AddFireSafety extends Component {
   
    state = {
        trimmedDataURL5: null,
        formSuccess:false,
        formdata:{
            staff: {
                element: 'input',
                value: '',
                config:{
                    label: 'Names of staff present (Fullname)',
                    name: 'staff_input',
                    type: 'text',
                    placeholder: 'Staff Name',                          
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

            individual: {
                element: 'input',
                value: '',
                config: {
                    label: 'Names of individual present (Fullname)',
                    name: 'individual_input',
                    type: 'text',
                    placeholder: 'Individual\'s Name',
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

            locfire: {
                element: 'input',
                value: '',
                config:{
                    label: 'Hypothetical Location of Fire',
                    name: 'locfire_input',
                    type: 'text',
                    placeholder: 'Hypothetical Location of Fire',      
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

            evactime: {
                element: 'input',
                value: '',
                config:{
                    label: 'Total Evacuation Time ',
                    name: 'evac_input',
                    type: 'text',
                    placeholder: 'X Minutes, XX Seconds',      
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

            exitdoor: {
                element: 'select',
                value: '',
                config: {
                    label: 'Exit door used',
                    name: 'exit_input',
                    options: [
                        {key: 'Front',value: 'Front'},
                        {key: 'Back', value: 'Back'}
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

            rallypoint: {
                element: 'select',
                value: '',
                config: {
                    label: 'Location of rally point while outside',
                    name: 'rally_input',
                    options: [
                        {key: 'Front',value: 'Front'},
                        {key: 'Back', value: 'Back'}
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

            stove: {
                element: 'select',
                value: '',
                config: {
                    label: 'Kitchen: Stove burners - all 4 are working.',
                    name: 'exit_input',
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


            light: {
                element: 'select',
                value: '',
                config: {
                    label: 'Flash light is in the top drawer of file cabinet or on top of fridge',
                    name: 'flash_input',
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

            firstfloorf: {
                element: 'select',
                value: '',
                config: {
                    label: 'Fire extinguishers: 1st Floor.',
                    name: 'ffloorf_input',
                    options: [
                        {key: 'Operational',value: 'Operational'},
                        {key: 'Defective', value: 'Defective'}
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
            secondfloorf: {
                element: 'select',
                value: '',
                config: {
                    label: 'Fire extinguishers: 2nd Floor.',
                    name: 'sfloorf_input',
                    options: [
                        {key: 'Operational',value: 'Operational'},
                        {key: 'Defective', value: 'Defective'}
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

            basementf: {
                element: 'select',
                value: '',
                config: {
                    label: 'Fire extinguishers: Basement.',
                    name: 'basment_input',
                    options: [
                        {key: 'Operational',value: 'Operational'},
                        {key: 'Defective', value: 'Defective'}
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

            firstfloors: {
                element: 'select',
                value: '',
                config: {
                    label: 'Smoke Alarms: 1st Floor.',
                    name: 'ffloors_input',
                    options: [
                        {key: 'Operational',value: 'Operational'},
                        {key: 'Defective', value: 'Defective'}
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

            secondfloors: {
                element: 'select',
                value: '',
                config: {
                    label: 'Smoke Alarms: 2nd Floor.',
                    name: 'sfloors_input',
                    options: [
                        {key: 'Operational',value: 'Operational'},
                        {key: 'Defective', value: 'Defective'}
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

            basements: {
                element: 'select',
                value: '',
                config: {
                    label: 'Smoke Alarms: Basement.',
                    name: 'exit_input',
                    options: [
                        {key: 'Operational',value: 'Operational'},
                        {key: 'Defective', value: 'Defective'}
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


            firstaid: {
                element: 'select',
                value: '',
                config: {
                    label: 'First Aid Kit - in the file cabinet.',
                    name: 'aid_input',
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


            tag: {
                element: 'select',
                value: '',
                config: {
                    label: 'Fire Extinguisher tag/intial dated.',
                    name: 'tag_input',
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

            comment: {
                element: 'input',
                value: '',
                config:{
                    label: 'Comments',
                    name: 'Comments-input',
                    type: 'text',
                    placeholder: 'Comments',      
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

            staffreport: {
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

            
            supervisorsignimg: {
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
        
        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Added Fire Safety successfully, You will be redirected shortly.'
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
            this.props.dispatch(adFireSafety(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Added Fire Safety",dataToSubmit,"/forms/fire_safety",'add')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/fire_safety')
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

        this.props.dispatch(getAddr()).then(response => {
            // console.log(newFormData);
            // this.updateFields(newFormData)
            if(this.props.user.userData.isAdmin){
                const newFormData = populateOptionFields(formdata, this.props.form.address, 'address');
                this.updateFields(newFormData)
            }
            else{
                const newFormData = populateOptionFields(formdata, this.props.user.userData.address, 'address');
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

    sigPad5 = {}
    
    clear5 = () => {
        this.sigPad5.clear()
    }
    trim = () => {

        const sign5 = this.sigPad5.getTrimmedCanvas().toDataURL('image/png');
        

        const formdata5 = this.state.formdata;
        const newFormData5 = populateSign(formdata5, sign5, 'supervisorsignimg')
        this.updateFields(newFormData5)
                    
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
    const title = "Fire Safety";
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
                                id={'individual'}
                                formdata={this.state.formdata.individual}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'staff'}
                                formdata={this.state.formdata.staff}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'address'}
                                formdata={this.state.formdata.address}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'locfire'}
                                formdata={this.state.formdata.locfire}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'evactime'}
                                formdata={this.state.formdata.evactime}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'exitdoor'}
                                formdata={this.state.formdata.exitdoor}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'rallypoint'}
                                formdata={this.state.formdata.rallypoint}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'stove'}
                                formdata={this.state.formdata.stove}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'light'}
                                formdata={this.state.formdata.light}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'firstfloorf'}
                                formdata={this.state.formdata.firstfloorf}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'secondfloorf'}
                                formdata={this.state.formdata.secondfloorf}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'basementf'}
                                formdata={this.state.formdata.basementf}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'firstfloors'}
                                formdata={this.state.formdata.firstfloors}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'secondfloors'}
                                formdata={this.state.formdata.secondfloors}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'basements'}
                                formdata={this.state.formdata.basements}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'firstaid'}
                                formdata={this.state.formdata.firstaid}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'tag'}
                                formdata={this.state.formdata.tag}
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
                                <label>Residential Supervisor signature</label>
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

export default connect(mapStateToProps)(AddFireSafety);