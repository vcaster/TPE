import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import MyButton from '../utils/button';
import { connect } from 'react-redux';
import { loginUser, registerUser } from '../../actions/user_actions';
import {adLog} from '../../actions/form_actions'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class Register extends Component {

    componentDidMount(){
        document.getElementsByTagName('body')[0].className = 'hold-transition register-page';
        document.getElementsByTagName("nav")[0].style.display = "none";
        document.getElementsByClassName("wrapper")[0].style.display = "none";
        document.getElementsByTagName("footer")[0].style.display = "none";
        document.body.appendChild(document.getElementsByClassName('register-box')[0]);
    }

    componentWillUnmount() {
        document.getElementsByTagName('body')[0].className = 'hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed sidebar-collapse';
        document.getElementsByTagName("nav")[0].style.display = "";
        document.getElementsByClassName("wrapper")[0].style.display = "";
        document.getElementsByTagName("footer")[0].style.display = "";
        document.getElementsByClassName('register-box')[0].remove();
    }

    state = {
        formError: false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'First Name',
                    label: 'First Name (UPPERCASE)',
                    className: 'form-control'
                },
                validation:{
                    required: true,                    
                    caps: true,
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            lastname: {
                element: 'input',
                value: '',
                config:{
                    name: 'lastname',
                    type: 'text',
                    placeholder: 'Last Name',
                    label: 'Last Name (UPPERCASE)',
                    className: 'form-control'
                },
                validation:{
                    required: true,
                    caps: true, 
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'text',
                    placeholder: 'ID',
                    label: 'ID',
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
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Password',
                    label: 'Password',
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
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm Password',
                    label: 'Confirm Password (Required)',
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

            intpatogen: {
                element: 'input',
                value: '',
                config:{
                    name: 'intpathogen',
                    type: 'text',
                    placeholder: 'Initial BloodBorne Pathogen',
                    label: 'Initial BloodBorne Pathogen (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            patogen: {
                element: 'input',
                value: '',
                config:{
                    name: 'lastname',
                    type: 'text',
                    placeholder: 'Current BloodBorne Pathogen',
                    label: 'Current BloodBorne Pathogen(MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            cpr: {
                element: 'input',
                value: '',
                config:{
                    name: 'cpr',
                    type: 'text',
                    placeholder: 'CPR',
                    label: 'CPR (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                     
                    date: true
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            firstaid: {
                element: 'input',
                value: '',
                config:{
                    name: 'firstaid',
                    type: 'text',
                    placeholder: 'First Aid',
                    label: 'First Aid (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                     
                    date: true
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            comminte: {
                element: 'input',
                value: '',
                config:{
                    name: 'comminte',
                    type: 'text',
                    placeholder: 'Community Integration',
                    label: 'Community Integration (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            idoop: {
                element: 'input',
                value: '',
                config:{
                    name: 'idoop',
                    type: 'text',
                    placeholder: 'IDOOP',
                    label: 'IDOOP (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            chara: {
                element: 'input',
                value: '',
                config:{
                    name: 'chara',
                    type: 'text',
                    placeholder: 'Characteristics',
                    label: 'Characteristics (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            funda: {
                element: 'input',
                value: '',
                config:{
                    name: 'funda',
                    type: 'text',
                    placeholder: 'Fundamental Right',
                    label: 'Fundamental Right (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            commdis: {
                element: 'input',
                value: '',
                config:{
                    name: 'commdis',
                    type: 'text',
                    placeholder: 'Communicable Diseases',
                    label: 'Communicable Diseases (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            support: {
                element: 'input',
                value: '',
                config:{
                    name: 'support',
                    type: 'text',
                    placeholder: 'Support',
                    label: 'Support (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            commskill: {
                element: 'input',
                value: '',
                config:{
                    name: 'commskill',
                    type: 'text',
                    placeholder: 'Communication Skills',
                    label: 'Communication Skills (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            cmt: {
                element: 'input',
                value: '',
                config:{
                    name: 'cmt',
                    type: 'text',
                    placeholder: 'CMT',
                    label: 'CMT Expiration (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                     
                    date: true
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            mandt: {
                element: 'input',
                value: '',
                config:{
                    name: 'mandt',
                    type: 'text',
                    placeholder: 'BPS/MANDT',
                    label: 'BPS/MANDT (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            check: {
                element: 'input',
                value: '',
                config:{
                    name: 'check',
                    type: 'text',
                    placeholder: 'Background Check',
                    label: 'Background Check (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                     
                    date: true
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            phone: {
                element: 'input',
                value: '',
                config:{
                    name: 'Phone',
                    type: 'text',
                    placeholder: 'Phone Number',
                    label: 'Phone Number (required)',
                    className: 'form-control'
                },
                validation:{
                    
                    phone:true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            drivrec: {
                element: 'input',
                value: '',
                config:{
                    name: 'drivrec',
                    type: 'text',
                    placeholder: 'Driving Record',
                    label: 'Driving Record',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            app: {
                element: 'input',
                value: '',
                config:{
                    name: 'app',
                    type: 'text',
                    placeholder: 'Application?',
                    label: 'Application (required)',
                    className: 'form-control'
                },
                validation:{
                    required: true, 
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            drivlic: {
                element: 'input',
                value: '',
                config:{
                    name: 'drivlic',
                    type: 'text',
                    placeholder: 'Driving License Expiration',
                    label: 'Driving License (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                     
                    date: true
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            extra: {
                element: 'input',
                value: '',
                config:{
                    name: 'extra',
                    type: 'text',
                    placeholder: 'Extra Application',
                    label: 'Extra Application',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            eligib: {
                element: 'input',
                value: '',
                config:{
                    name: 'eligib',
                    type: 'text',
                    placeholder: 'Eligibility Status/Expiration',
                    label: 'Eligibility Status/Expiration (MM/DD/YYYY) (Required)',
                    className: 'form-control'
                },
                validation:{
                    required: true, 
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            hire: {
                element: 'input',
                value: '',
                config:{
                    name: 'hire',
                    type: 'text',
                    placeholder: 'Date of Hire',
                    label: 'Date of Hire (MM/DD/YYYY) (required)',
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
            obser: {
                element: 'input',
                value: '',
                config:{
                    name: 'obser',
                    type: 'text',
                    placeholder: 'Nursing Observation',
                    label: 'Nursing Observation',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            aging: {
                element: 'input',
                value: '',
                config:{
                    name: 'aging',
                    type: 'text',
                    placeholder: 'Aging',
                    label: 'Aging (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            incident: {
                element: 'input',
                value: '',
                config:{
                    name: 'incident',
                    type: 'text',
                    placeholder: 'Incident Reporting',
                    label: 'Incident Reporting  (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            seizure: {
                element: 'input',
                value: '',
                config:{
                    name: 'seizure',
                    type: 'text',
                    placeholder: 'Seizure',
                    label: 'Seizure  (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            autism: {
                element: 'input',
                value: '',
                config:{
                    name: 'autism',
                    type: 'text',
                    placeholder: 'Autism',
                    label: 'Autism  (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            social: {
                element: 'input',
                value: '',
                config:{
                    name: 'social',
                    type: 'text',
                    placeholder: 'Social Security Number',
                    label: 'Social Security Number',
                    className: 'form-control'
                },
                validation:{ 
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            phy: {
                element: 'input',
                value: '',
                config:{
                    name: 'phy',
                    type: 'text',
                    placeholder: 'Physical',
                    label: 'Physical (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{
                    date: true 
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            tb: {
                element: 'input',
                value: '',
                config:{
                    name: 'tb',
                    type: 'text',
                    placeholder: 'TB Test',
                    label: 'TB Test (MM/DD/YYYY)',
                    className: 'form-control'
                },
                validation:{ 
                    date: true 
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            edu: {
                element: 'input',
                value: '',
                config:{
                    name: 'edu',
                    type: 'text',
                    placeholder: 'Education History',
                    label: 'Education History',
                    className: 'form-control'
                },
                validation:{
                     
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            emginfo: {
                element: 'input',
                value: '',
                config:{
                    name: 'emginfo',
                    type: 'text',
                    placeholder: 'Emergency Information',
                    label: 'Emergency Information',
                    className: 'form-control'
                },
                validation:{
                     
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            overtime: {
                element: 'input',
                value: '',
                config:{
                    name: 'overtime',
                    type: 'text',
                    placeholder: 'Overtime Policy',
                    label: 'Overtime Policy',
                    className: 'form-control'
                },
                validation:{
                     
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            fininfo: {
                element: 'input',
                value: '',
                config:{
                    name: 'fininfo',
                    type: 'text',
                    placeholder: 'Financial Information',
                    label: 'Financial Information',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            empeligib: {
                element: 'input',
                value: '',
                config:{
                    name: 'empeligib',
                    type: 'text',
                    placeholder: 'Employment Verification',
                    label: 'Employment Verification',
                    className: 'form-control'
                },
                validation:{
                     
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            email1: {
                element: 'input',
                value: '',
                config:{
                    name: 'email1',
                    type: 'email',
                    placeholder: 'Email Address ',
                    label: 'Email Address (Required)',
                    className: 'form-control'
                },
                validation:{
                    email: true 
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            warn: {
                element: 'input',
                value: '',
                config:{
                    name: 'warn',
                    type: 'text',
                    placeholder: 'Warning',
                    label: 'Warning',
                    className: 'form-control'
                },
                validation:{
                  
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            role: {
                element: 'select',
                value: '',
                config: {
                    label: 'Role',
                    name: 'role',
                    options: [
                        {key: '0',value: 'User'},      
                        {key: '1',value: 'Admin'},               
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
            title: {
                element: 'select',
                value: '',
                config: {
                    label: 'Title',
                    name: 'title',
                    options: [
                        {key: '1',value: 'Staff'},      
                        {key: '2',value: 'Supervisor'},        
                        {key: '3',value: 'Quality Assurance'},  
                        {key: '4',value: 'Accountant'},  
                        {key: '5',value: 'Super Admin'},         
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
            
        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Registration successfull, You will be redirected shortly.'
              })
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
        console.log(this.state.formdata)
        let dataToSubmit = generateData(this.state.formdata,'null');
        let formIsValid = isFormValid(this.state.formdata,'null')
        console.log(dataToSubmit)
        if(formIsValid){
            this.props.dispatch(registerUser(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    setTimeout(()=>{
                    this.props.history.push('/user/dashboard')
                    },3000)
                    this.props.dispatch(adLog(this.props.user.userData._id,"Added a staff",dataToSubmit,"/user/users",'add')).then(response =>{
                    console.log(response.payload);
                    });
                }
            });
        } else {
            this.setState({
                formError: true
            })
        }
      
    }

    render() {
        return (
            <div>
                <div className="register-box">
                <div className="register-logo">
                    <a href=""><b>Admin</b>LTE</a>
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Register a new User</p>
                        <form onSubmit={(event)=>this.submitForm(event)}>

                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'lastname'}
                                formdata={this.state.formdata.lastname}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element) => this.updateForm(element)}
                            />                            
                            <FormField
                                id={'phone'}
                                formdata={this.state.formdata.phone}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'email1'}
                                formdata={this.state.formdata.email1}
                                change={(element) => this.updateForm(element)}
                            />
                            
                            <FormField
                                id={'emginfo'}
                                formdata={this.state.formdata.emginfo}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'hire'}
                                formdata={this.state.formdata.hire}
                                change={(element) => this.updateForm(element)}
                            />                            
                            <FormField
                                id={'app'}
                                formdata={this.state.formdata.app}
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

                            <FormField
                                id={'intpatogen'}
                                formdata={this.state.formdata.intpatogen}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'patogen'}
                                formdata={this.state.formdata.patogen}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'cpr'}
                                formdata={this.state.formdata.cpr}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'firstaid'}
                                formdata={this.state.formdata.firstaid}
                                change={(element) => this.updateForm(element)}
                            />                            
                            <FormField
                                id={'cmt'}
                                formdata={this.state.formdata.cmt}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'mandt'}
                                formdata={this.state.formdata.mandt}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'comminte'}
                                formdata={this.state.formdata.comminte}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'idoop'}
                                formdata={this.state.formdata.idoop}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'chara'}
                                formdata={this.state.formdata.chara}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'funda'}
                                formdata={this.state.formdata.funda}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'commdis'}
                                formdata={this.state.formdata.commdis}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'support'}
                                formdata={this.state.formdata.support}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'commskill'}
                                formdata={this.state.formdata.commskill}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'aging'}
                                formdata={this.state.formdata.aging}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'incident'}
                                formdata={this.state.formdata.incident}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'seizure'}
                                formdata={this.state.formdata.seizure}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'autism'}
                                formdata={this.state.formdata.autism}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'check'}
                                formdata={this.state.formdata.check}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'drivrec'}
                                formdata={this.state.formdata.drivrec}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'drivlic'}
                                formdata={this.state.formdata.drivlic}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'eligib'}
                                formdata={this.state.formdata.eligib}
                                change={(element) => this.updateForm(element)}
                            />                                                         
                            <FormField
                                id={'social'}
                                formdata={this.state.formdata.social}
                                change={(element) => this.updateForm(element)}
                            />                           
                            <FormField
                                id={'empeligib'}
                                formdata={this.state.formdata.empeligib}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'phy'}
                                formdata={this.state.formdata.phy}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'tb'}
                                formdata={this.state.formdata.tb}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'edu'}
                                formdata={this.state.formdata.edu}
                                change={(element) => this.updateForm(element)}
                            />                            
                            <FormField
                                id={'extra'}
                                formdata={this.state.formdata.extra}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'overtime'}
                                formdata={this.state.formdata.overtime}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'fininfo'}
                                formdata={this.state.formdata.fininfo}
                                change={(element) => this.updateForm(element)}
                            />                            
                            <FormField
                                id={'obser'}
                                formdata={this.state.formdata.obser}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'warn'}
                                formdata={this.state.formdata.warn}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'role'}
                                formdata={this.state.formdata.role}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'title'}
                                formdata={this.state.formdata.title}
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
                                {/* <MyButton 
                                    type="default-a"
                                    title="Already a user"
                                    linkTo="/register_login"
                                    addStyles={{                                        
                                    }}
                                /> */}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-block bg-gradient-primary" type="button" onClick={(event)=> this.submitForm(event)}>
                                    Register
                                </button>
                                </div>
                                

                                
                                {/* /.col */}
                            </div>
                        </form>
                        
                    </div>
                    {/* /.login-card-body */}
                    {this.state.formSuccess ? this.success() : null}
                </div>
            </div>
            <script src="../../plugins/sweetalert2/sweetalert2.min.js"></script>
            </div>
        );
    }
}

export default connect()(Register);