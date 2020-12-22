import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData,populateSign, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getIndiv, clearForm, adBehaveSheet, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

class AddBehaveSheet extends Component {
   
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
            
            setting: {
                element: 'select',
                value: '',
                config: {
                    label: 'Setting',
                    name: 'duties',
                    options: [
                        {key: 'Residential',value: 'Residential'},
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


            timeb: {
                element: 'input',
                value: '',
                config:{
                    label: 'Time Begin',
                    name: 'timeb',
                    type: 'text',
                    placeholder: 'HH:MM',      
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

            timee: {
                element: 'input',
                value: '',
                config:{
                    label: 'Time End',
                    name: 'timee',
                    type: 'text',
                    placeholder: 'HH:MM',      
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

            snacking: {
                element: 'input',
                value: '',
                config:{
                    label: 'Inappropriate Snacking',
                    name: 'snacking',
                    type: 'text',
                    placeholder: 'Inappropriate Snacking',      
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

            destruct: {
                element: 'input',
                value: '',
                config:{
                    label: 'Property Destruction',
                    name: 'destruct',
                    type: 'text',
                    placeholder: 'Property Destruction',      
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

            vocal: {
                element: 'input',
                value: '',
                config:{
                    label: 'Vocal Agitation',
                    name: 'vocal',
                    type: 'text',
                    placeholder: 'Vocal Agitation',      
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
            sib: {
                element: 'input',
                value: '',
                config:{
                    label: 'SIB',
                    name: 'sib',
                    type: 'text',
                    placeholder: 'SIB',      
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
            elopment: {
                element: 'input',
                value: '',
                config:{
                    label: 'Elopment',
                    name: 'elopment',
                    type: 'text',
                    placeholder: 'Elopment',      
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
            rating: {
                element: 'input',
                value: '',
                config:{
                    label: 'Severity Rating',
                    name: 'rating',
                    type: 'text',
                    placeholder: 'Severity Rating',      
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

        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Added Antecedent by Behaviour Data Sheet successfully, You will be redirected shortly.'
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

        if(formIsValid){
            console.log(dataToSubmit);
            this.props.dispatch(adBehaveSheet(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Added Antecedent by Behaviour Data Sheet",dataToSubmit,"/forms/behave_sheet",'add')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/behave_sheet')
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
            // this.updateFields(newFormData)
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
    const title = " Antecedent by  Behaviour Data Sheet";
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
                                id={'setting'}
                                formdata={this.state.formdata.setting}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'timeb'}
                                formdata={this.state.formdata.timeb}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'timee'}
                                formdata={this.state.formdata.timee}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'snacking'}
                                formdata={this.state.formdata.snacking}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'destruct'}
                                formdata={this.state.formdata.destruct}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'vocal'}
                                formdata={this.state.formdata.vocal}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'sib'}
                                formdata={this.state.formdata.sib}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'elopment'}
                                formdata={this.state.formdata.elopment}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'rating'}
                                formdata={this.state.formdata.rating}
                                change={(element) => this.updateForm(element)}
                            />
                                                                               
                        { this.state.formError ?
                        <span style={{ color: 'red'}}id="exampleInputEmail1-error">
                        Check your data
                        </span>
                        :null}
                        <strong>Severity Ratings</strong><br/><strong> 1) Mild 2) Moderate 3) Very Severe</strong> <br/><br/>
                        <strong>Antecedents</strong>
                        <br/>
                        <strong>1. Demand: Is asked to do something, go some place, etc</strong>
                        <br/>
                        <strong>2. Discomfort: Is uncomfortable due to sickness, teasing, threat cannot find something, frequently occurring outcome does not occur, doctor's appiontment, e.t.c</strong>
                        <br/>
                        <strong>3. Denial: wants something that is not available or delayed, or wants to continue to engage in a preferred activity and must stop.</strong>
                        <br/>
                        <strong>4. Can't have food</strong>
                        <br/>
                        <strong>5. Can't have twist tie from bread</strong>
                        <br/>
                        <strong>6. Attention: Seeks attention from staff but staff is not available (e.g, busy)</strong>
                        <br/>
                        <strong>Free time: Periods of time Which are demand free during which parent/staff attention is available but not necessarily given</strong>
                        <br/><br/>
                        <strong>Instructions: (a) When a behaviour occurs, place the number of the behaviour Antecedent in the appropriate column to represent the occurence of the behaviour. (b) To total the behaviours, count the number of numbers. (c) If behaviour occurs at the same time, place on the same row across column. (d) Place parenthesis around antecedent occuring together and tally as single behaviour. (e) Number and describe antecedents not identified in the space provided below (Other), End time is recorded when no target behaviours have occurred for 5 minutes.</strong>
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

export default connect(mapStateToProps)(AddBehaveSheet);