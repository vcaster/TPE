import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData,populateSign, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, getIndiv, clearForm, adDaysProg, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'

const MySwal = withReactContent(Swal)

class AddDaysProg extends Component {
   
    state = {
        trimmedDataURL4: null,
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

            meetingdate: {
                element: 'input',
                value: '',
                config:{
                    name: 'meetingdate_input',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',
                    label: 'IP Meeting Date',
                    className: 'form-control'
                },
                validation:{
                    required: true,
                    date: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            period: {
                element: 'input',
                value: '',
                config:{
                    name: 'period_input',
                    type: 'text',
                    placeholder: 'MONTH (Name) - YEAR (YYYY)',
                    label: 'Period Covered: 30 days',
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

            longterm: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'longterm_input',
                    placeholder: 'Long Term Goals',
                    label: 'Long Term Goals',
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

            outcome: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'outcome_input',
                    placeholder: 'Desired Outcome',
                    label: 'Desired Outcome',
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

            interventions: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'interventions_input',
                    placeholder: 'Progress towards Goal(Including both consumer\'s effort and staff interventions.)',
                    label: 'Progress towards goal',
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

            reinforcement: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'reinforcement_input',
                    placeholder: 'Reinforcement',
                    label: 'Reinforcement',
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

            collect: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'collect_input',
                    placeholder: 'Date Collectiion',
                    label: 'Date Collectiion',
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

            summarys: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'summarys_input',
                    placeholder: 'Summary of Service provided',
                    label: 'Summary of Service provided',
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

            summaryc: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'summaryc_input',
                    placeholder: 'Summary of Consumer\'s community functioning',
                    label: 'Summary of Consumer\'s community functioning',
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


            behaviour: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'behaviour_input',
                    placeholder: 'Significant changes',
                    label: 'Significant changes in Behaviour, Status Enviroment of life situation',
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

            reports: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'reports_input',
                    placeholder: 'Incident Reports',
                    label: 'Incident Reports',
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

            medication: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'medication_input',
                    placeholder: 'Medications',
                    label: 'Medications',
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

            revision: {
                element: 'textarea',
                value: '',
                config:{
                    name: 'revision_input',
                    placeholder: 'Recommendation IP Revisions',
                    label: 'Recommendation IP Revisions',
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

            staffposition: {
                element: 'input',
                value: '',
                config:{
                    name: 'staffposition_input',
                    type: 'text',
                    placeholder: 'Staff Position (e.g Residential Counselor',
                    label: 'Staff Position',
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

            director: {
                element: 'input',
                value: '',
                config:{
                    name: 'director_input',
                    type: 'text',
                    placeholder: 'QA Director\'s Initial',
                    label: 'QA Director\'s Initial',
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

        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Added 30 Days Progress note successfully, You will be redirected shortly.'
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
            this.props.dispatch(adDaysProg(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Added 30 Days Progress Note",dataToSubmit,"/forms/days_prog",'add')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/days_prog')
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

    sigPad4 = {}

    clear4 = () => {
        this.sigPad4.clear()
    }
    trim = () => {

      
        const sign4 = this.sigPad4.getTrimmedCanvas().toDataURL('image/png');
        
        
        const formdata4 = this.state.formdata;
        const newFormData4 = populateSign(formdata4, sign4, 'staffsignimg')
        this.updateFields(newFormData4)
        

    }



    render(){
    const title = "30 Days Progress Note";
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
                                id={'address'}
                                formdata={this.state.formdata.address}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'meetingdate'}
                                formdata={this.state.formdata.meetingdate}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'period'}
                                formdata={this.state.formdata.period}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'longterm'}
                                formdata={this.state.formdata.longterm}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'outcome'}
                                formdata={this.state.formdata.outcome}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'interventions'}
                                formdata={this.state.formdata.interventions}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'reinforcement'}
                                formdata={this.state.formdata.reinforcement}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'collect'}
                                formdata={this.state.formdata.collect}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'summarys'}
                                formdata={this.state.formdata.summarys}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'summaryc'}
                                formdata={this.state.formdata.summaryc}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'behaviour'}
                                formdata={this.state.formdata.behaviour}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'reports'}
                                formdata={this.state.formdata.reports}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'medication'}
                                formdata={this.state.formdata.medication}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'revision'}
                                formdata={this.state.formdata.revision}
                                change={(element) => this.updateForm(element)}
                            />
                            
                            <div className="row">
                                <div className="col-8">
                                <div className="form-group">
                                <label>Staff signature</label>
                                <SignaturePad canvasProps={{className: styles.sigPad}}
                            ref={(ref) => { this.sigPad4 = ref }} />
                                </div>
                                </div>
                                <div className="col-4">
                                <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.clear4()}>
                                    Clear
                                </button>
                                </div>
                            </div>

                            <FormField
                                id={'staffposition'}
                                formdata={this.state.formdata.staffposition}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'director'}
                                formdata={this.state.formdata.director}
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

export default connect(mapStateToProps)(AddDaysProg);