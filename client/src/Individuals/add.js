import React, { Component } from 'react';
import UserLayout from '../hoc/user'
import FormField from '../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, resetFields } from '../components/utils/Form/formActions';
import MyButton from '../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, clearForm, adIndiv } from '../actions/user_actions';
import { adLog } from '../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class AddIndividual extends Component {
   
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
                    placeholder: 'Individual\'s First Name',
                    label: 'Individual\'s First Name',
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

            lastname: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Individual\'s Last Name',
                    label: 'Individual\'s Last Name',
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
            
            telephone: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Telephone',
                    label: 'Telephone',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            sex: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Sex',
                    label: 'Sex',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            dob: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Date of Birth',
                    label: 'Date of Birth',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            ssn: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Social Security',
                    label: 'Social Security',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            doa: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Date of Admission',
                    label: 'Date of Admission',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            medicaid: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Medicaid',
                    label: 'Medicaid',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            medicare: {
                element: 'input',
                value: '',
                config:{
                    name: 'medicare',
                    type: 'text',
                    placeholder: 'Medicare',
                    label: 'Medicare',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            lmgname: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Legal Medical Gaurdian',
                    label: 'Legal Medical Gaurdian',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            lmgrelationship: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Legal Medical Gaurdian Relationship',
                    label: 'Legal Medical Gaurdian Relationship',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            lmgaddress: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Legal Medical Gaurdian Address',
                    label: 'Legal Medical Gaurdian Address',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            lmgtelephone: {
                element: '',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Legal Medical Gaurdian Telephone',
                    label: 'Legal Medical Gaurdian Telephone',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            emgcontact: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Emergency Contact',
                    label: 'Emergency Contact',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            emgtelephone: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Emergency Contact Telephone',
                    label: 'Emergency Contact Telephone',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            emgposition: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Emergency Contact Position',
                    label: 'Emergency Contact Position',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            emgcompany: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Emergency Contact Company',
                    label: 'Emergency Contact Company',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            fcname: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Family Contact Name',
                    label: 'Family Contact Name',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            fcrelationship: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Family Contact Relationship',
                    label: 'Family Contact Relationship',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            fcaddress: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Family Contact Address',
                    label: 'Family Contact Address',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            fctelephone: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Family Contact Telephone',
                    label: 'Family Contact Telephone',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            scname: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Service Coordinatior Name',
                    label: 'Service Coordinatior Name',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            scaddress: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Service Coordinatior Address',
                    label: 'Service Coordinatior Address',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            sctelephone: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Service Coordinatior Telephone',
                    label: 'Service Coordinatior Telephone',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            scfax: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Service Coordinatior Fax',
                    label: 'Service Coordinatior Fax',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            vcprogram: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Vocational Program Name',
                    label: 'Vocational Program Name',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            vcaddress: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Vocational Program Address',
                    label: 'Vocational Program Address',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            
            vctelephone: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Vocational Program Telephone',
                    label: 'Vocational Program Telephone',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            vcfax: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Vocational Program Fax',
                    label: 'Vocational Program Fax',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            martialstatus: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Martial Status',
                    label: 'Martial Status',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            height: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Height',
                    label: 'Height',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            weight: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Weight',
                    label: 'Weight',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            race: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Race',
                    label: 'Race',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            haircolor: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Hair Color',
                    label: 'Hair Color',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            eyecolor: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Eye Color',
                    label: 'Eye Color',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            verbal: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Verbal',
                    label: 'Verbal',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            ambulatory: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Ambulatory',
                    label: 'Ambulatory',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            adaptivedevices: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Adaptive Devices',
                    label: 'Adaptive Devices',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            religion: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Religion',
                    label: 'Religion',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            diet: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Diet',
                    label: 'Diet',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            allergy: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Allergy',
                    label: 'Allergy',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            medicaldiagnosis: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Medical Diagnosis',
                    label: 'Medical Diagnosis',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            pcp: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'PCP (address telephone fax)',
                    label: 'PCP (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            dental: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Dental (address telephone fax)',
                    label: 'Dental (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            vision: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Vision (address telephone fax)',
                    label: 'Vision (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            hearing: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Hearing (address telephone fax)',
                    label: 'Hearing (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            ent: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'ENT (address telephone fax)',
                    label: 'ENT (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            cardiologist: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Cardiologist (address telephone fax)',
                    label: 'Cardiologist (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            psychiatrist: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Psychiatrist (address telephone fax)',
                    label: 'Psychiatrist (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            therapist: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Therapist (address telephone fax)',
                    label: 'Therapist (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            neorology: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Neorology (address telephone fax)',
                    label: 'Neorology (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            gynecology: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Gynecology (address telephone fax)',
                    label: 'Gynecology (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            urology: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Urology (address telephone fax)',
                    label: 'Urology (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            groupsessions: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Groupsessions (address telephone fax)',
                    label: 'Groupsessions (address telephone fax)',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            extra1: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'extra1',
                    label: 'extra1',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            extra2: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'extra2',
                    label: 'extra2',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            extra3: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'extra3',
                    label: 'extra3',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            extra4: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'extra4',
                    label: 'extra4',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            extra5: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'extra5',
                    label: 'extra5',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            extra6: {
                element: 'input',
                value: '',
                config:{
                    name: 'name',
                    type: 'text',
                    placeholder: 'extra6',
                    label: 'extra6',
                    className: 'form-control'
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            }
        }
    }

    success = () => {
        if (this.state.formSuccess){
            MySwal.fire({
                icon: 'success',
                title: 'Added Individual successfully, You will be redirected shortly.'
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
        console.log(this.state.formdata)
        let dataToSubmit = generateData(this.state.formdata,'null');
        let formIsValid = isFormValid(this.state.formdata,'null')

        if(formIsValid){
            console.log(dataToSubmit);
            this.props.dispatch(adIndiv(dataToSubmit)).then(response =>{
                this.props.dispatch(adLog(this.props.user.userData._id,"Added an Individual",dataToSubmit,"/individuals/individual",'add')).then(response =>{
                if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/individuals/individual')
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
        const formdata = this.state.formdata;

        this.props.dispatch(getAddr()).then(response => {
            const newFormData = populateOptionFields(formdata, this.props.form.address, 'address');
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


    render(){
    const title = "Individual";
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
                                id={'lastname'}
                                formdata={this.state.formdata.lastname}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'address'}
                                formdata={this.state.formdata.address}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'telephone'}
                                formdata={this.state.formdata.telephone}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'sex'}
                                formdata={this.state.formdata.sex}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'dob'}
                                formdata={this.state.formdata.dob}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'ssn'}
                                formdata={this.state.formdata.ssn}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'doa'}
                                formdata={this.state.formdata.doa}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'medicaid'}
                                formdata={this.state.formdata.medicaid}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'medicare'}
                                formdata={this.state.formdata.medicare}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'lmgname'}
                                formdata={this.state.formdata.lmgname}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'lmgrelationship'}
                                formdata={this.state.formdata.lmgrelationship}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'lmgaddress'}
                                formdata={this.state.formdata.lmgaddress}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'lmgtelephone'}
                                formdata={this.state.formdata.lmgtelephone}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'emgcontact'}
                                formdata={this.state.formdata.emgcontact}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'emgtelephone'}
                                formdata={this.state.formdata.emgtelephone}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'emgposition'}
                                formdata={this.state.formdata.emgposition}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'emgcompany'}
                                formdata={this.state.formdata.emgcompany}
                                change={(element) => this.updateForm(element)}
                            />   
                            <FormField
                                id={'fcname'}
                                formdata={this.state.formdata.fcname}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'fcrelationship'}
                                formdata={this.state.formdata.fcrelationship}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'fcaddress'}
                                formdata={this.state.formdata.fcaddress}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'fctelephone'}
                                formdata={this.state.formdata.fctelephone}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'scname'}
                                formdata={this.state.formdata.scname}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'scaddress'}
                                formdata={this.state.formdata.scaddress}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'sctelephone'}
                                formdata={this.state.formdata.sctelephone}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'scfax'}
                                formdata={this.state.formdata.scfax}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'vcprogram'}
                                formdata={this.state.formdata.vcprogram}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'vcaddress'}
                                formdata={this.state.formdata.vcaddress}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'vctelephone'}
                                formdata={this.state.formdata.vctelephone}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'vcfax'}
                                formdata={this.state.formdata.vcfax}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'martialstatus'}
                                formdata={this.state.formdata.martialstatus}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'height'}
                                formdata={this.state.formdata.height}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'weight'}
                                formdata={this.state.formdata.weight}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'race'}
                                formdata={this.state.formdata.race}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'haircolor'}
                                formdata={this.state.formdata.haircolor}
                                change={(element) => this.updateForm(element)}
                            />      
                            <FormField
                                id={'eyecolor'}
                                formdata={this.state.formdata.eyecolor}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'verbal'}
                                formdata={this.state.formdata.verbal}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'ambulatory'}
                                formdata={this.state.formdata.ambulatory}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'adaptivedevices'}
                                formdata={this.state.formdata.adaptivedevices}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'religion'}
                                formdata={this.state.formdata.religion}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'diet'}
                                formdata={this.state.formdata.diet}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'allergy'}
                                formdata={this.state.formdata.allergy}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'medicaldiagnosis'}
                                formdata={this.state.formdata.medicaldiagnosis}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'pcp'}
                                formdata={this.state.formdata.pcp}
                                change={(element) => this.updateForm(element)}
                            />                            
                            <FormField
                                id={'psychiatrist'}
                                formdata={this.state.formdata.psychiatrist}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'dental'}
                                formdata={this.state.formdata.dental}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'vision'}
                                formdata={this.state.formdata.vision}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'hearing'}
                                formdata={this.state.formdata.hearing}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'ent'}
                                formdata={this.state.formdata.ent}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'cardiologist'}
                                formdata={this.state.formdata.cardiologist}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'therapist'}
                                formdata={this.state.formdata.therapist}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'neorology'}
                                formdata={this.state.formdata.neorology}
                                change={(element) => this.updateForm(element)}
                            />      
                            <FormField
                                id={'gynecology'}
                                formdata={this.state.formdata.gynecology}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'urology'}
                                formdata={this.state.formdata.urology}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'groupsessions'}
                                formdata={this.state.formdata.groupsessions}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'extra1'}
                                formdata={this.state.formdata.extra1}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'extra2'}
                                formdata={this.state.formdata.extra2}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'extra3'}
                                formdata={this.state.formdata.extra3}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'extra4'}
                                formdata={this.state.formdata.extra4}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'extra5'}
                                formdata={this.state.formdata.extra5}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'extra6'}
                                formdata={this.state.formdata.extra6}
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

export default connect(mapStateToProps)(AddIndividual);