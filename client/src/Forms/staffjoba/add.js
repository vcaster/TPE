import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData,populateSign, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, clearForm, adStaffDescA, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'


const MySwal = withReactContent(Swal)

class AddStaffDescA extends Component {
   
    state = {
        trimmedDataURL5: null,
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

            staffratio: {
                element: 'input',
                value: '',
                config:{
                    label: 'Staff Ratio',
                    name: 'staffratio',
                    type: 'text',
                    placeholder: 'Staff Ratio',      
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

            dressed: {
                element: 'select',
                value: '',
                config: {
                    label: 'Make sure the individual is dressed appropriately before leaving the unit',
                    name: 'dressed',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            checkindiv: {
                element: 'select',
                value: '',
                config: {
                    label: 'Check the individual every 15-30 mins',
                    name: 'checkindiv',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            bedcheck: {
                element: 'select',
                value: '',
                config: {
                    label: 'Incontinent Individuals bed check is 1am, 3am and 5am',
                    name: 'bedcheck_input',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
                    label: 'Clean and degrease oven/stove on Wednesday and Saturday',
                    name: 'stove',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            cabinet: {
                element: 'select',
                value: '',
                config: {
                    label: 'Clean arrange kitchen cabinets Monday and Friday',
                    name: 'cabinet',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            iron: {
                element: 'select',
                value: '',
                config: {
                    label: 'Iron and prepare individuals clothes for the day program and work before the end of shift',
                    name: 'cabinet',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            room: {
                element: 'select',
                value: '',
                config: {
                    label: 'Ensure individual room is clean at all times',
                    name: 'room',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            trash: {
                element: 'select',
                value: '',
                config: {
                    label: 'Take out all trash',
                    name: 'trash',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            bathroom: {
                element: 'select',
                value: '',
                config: {
                    label: 'Clean all bathroom before the end of shift',
                    name: 'bathroom',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            food: {
                element: 'select',
                value: '',
                config: {
                    label: 'Clean refrigerator and take out all 2 days old food',
                    name: 'food',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            container: {
                element: 'select',
                value: '',
                config: {
                    label: 'Label all open foods and container',
                    name: 'container',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            mop: {
                element: 'select',
                value: '',
                config: {
                    label: 'Mop and Vacuum all floors',
                    name: 'mop',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            breakfast: {
                element: 'select',
                value: '',
                config: {
                    label: 'Prepare breakfast and lunch for the individual',
                    name: 'completed_input',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            laundary: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wash and put away all laundry before the end of shift',
                    name: 'laundary',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            drill: {
                element: 'select',
                value: '',
                config: {
                    label: 'Conduct Fire drills (by the 5th of every month)',
                    name: 'drill',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            issues: {
                element: 'select',
                value: '',
                config: {
                    label: 'Report all maintenance issues',
                    name: 'completed_input',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            mar: {
                element: 'select',
                value: '',
                config: {
                    label: 'Check all paper work for completion (i.e IP MAR, Medications, Log progress report, change of shift, appiontments etc)',
                    name: 'mar',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            signs: {
                element: 'select',
                value: '',
                config: {
                    label: 'Conduct vital signs and weight',
                    name: 'signs',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
            
            agency: {
                element: 'select',
                value: '',
                config: {
                    label: 'Report all incidences according to agency protocols',
                    name: 'signs',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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

            duties: {
                element: 'select',
                value: '',
                config: {
                    label: 'And other duties that may assigned by supervisor',
                    name: 'duties',
                    options: [
                        {key: 'Yes',value: 'Yes'},
                        {key: 'N/A', value: 'N/A'},
                        {key: 'X', value: 'X'},
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
                    name: 'Comments',
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

            staffsignimg: {
                element: 'input',
                value: '',
                config:{
                    style: {display:'none'},
                    name: 'staffsignimg',
                    type: 'text',
                    placeholder: 'Staffsignimg',            
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
                title: 'Added Staff Job Description 11pm - 9am successfully, You will be redirected shortly.'
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
        // console.log(newFormdata)
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
            this.props.dispatch(adStaffDescA(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Added Job Description 11pm - 9am",dataToSubmit,"/forms/activity_log",'add')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/staff_desc_a')
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
        const newFormData5 = populateSign(formdata5, sign5, 'staffsignimg')
        this.updateFields(newFormData5)
    }

    

    render(){
    const title = "Job Description 11pm - 9am";
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
                                id={'address'}
                                formdata={this.state.formdata.address}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'staffratio'}
                                formdata={this.state.formdata.staffratio}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'dressed'}
                                formdata={this.state.formdata.dressed}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'checkindiv'}
                                formdata={this.state.formdata.checkindiv}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'bedcheck'}
                                formdata={this.state.formdata.bedcheck}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'stove'}
                                formdata={this.state.formdata.stove}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'cabinet'}
                                formdata={this.state.formdata.cabinet}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField  
                                id={'iron'}
                                formdata={this.state.formdata.iron}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'room'}
                                formdata={this.state.formdata.room}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'trash'}
                                formdata={this.state.formdata.trash}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'bathroom'}
                                formdata={this.state.formdata.bathroom}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'food'}
                                formdata={this.state.formdata.food}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'container'}
                                formdata={this.state.formdata.container}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'mop'}
                                formdata={this.state.formdata.mop}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'breakfast'}
                                formdata={this.state.formdata.breakfast}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'laundary'}
                                formdata={this.state.formdata.laundary}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'drill'}
                                formdata={this.state.formdata.drill}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'issues'}
                                formdata={this.state.formdata.issues}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'mar'}
                                formdata={this.state.formdata.mar}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'signs'}
                                formdata={this.state.formdata.signs}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'agency'}
                                formdata={this.state.formdata.agency}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'duties'}
                                formdata={this.state.formdata.duties}
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

export default connect(mapStateToProps)(AddStaffDescA);