import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, adLog, clearForm, adSafetyInspec } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class AddSafetyInspec extends Component {
   

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
                element: 'input',
                value: '',
                config: {
                    label: 'Initals of individual present in home',
                    name: 'individual_input',
                    type: 'text',
                    placeholder: 'Individual\'s Initials',
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

            shift: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shift',
                    name: 'shift_input',
                    options: [
                        {key: '9am-3pm',value: '9am-3pm'},
                        {key: '3pm-11pm',value: '3pm-11pm'},
                        {key: '11pm-9am', value: '11pm-9am'}
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

            marks: {
                element: 'input',
                value: '',
                config:{
                    label: 'Any unusual bruising or marks on individual if so please specify',
                    name: 'marks_input',
                    type: 'text',
                    placeholder: 'Marks or Bruises',      
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

            complaints: {
                element: 'input',
                value: '',
                config:{
                    label: 'Any individual complaints or concerns',
                    name: 'complaints_input',
                    type: 'text',
                    placeholder: 'Individual complaints or concerns',      
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

            comments: {
                element: 'input',
                value: '',
                config:{
                    label: 'Comments',
                    name: 'comment_input',
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

            items: {
                element: 'select',
                value: '',
                config: {
                    label: 'Items Checked',
                    name: 'items_input',
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

            clutter: {
                element: 'select',
                value: '',
                config: {
                    label: 'Clean and free from clutter?',
                    name: 'clutter_input',
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

            lint: {
                element: 'select',
                value: '',
                config: {
                    label: 'Dryer trap and vent clean & free of lint buildup?',
                    name: 'lint_input',
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

            appliances: {
                element: 'select',
                value: '',
                config: {
                    label: 'Apliances clean and working?',
                    name: 'appliances_input',
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

            food: {
                element: 'select',
                value: '',
                config: {
                    label: 'Adequate food?',
                    name: 'food_input',
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

            refrigerator: {
                element: 'select',
                value: '',
                config: {
                    label: 'Refrigerator temperature maintained between 32 - 45 degrees F?',
                    name: 'refrigerator_input',
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

            freezer: {
                element: 'select',
                value: '',
                config: {
                    label: 'Freezer temperature maintained between 0 - 10 degrees F?',
                    name: 'refrigerator_input',
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
            
            rodent: {
                element: 'select',
                value: '',
                config: {
                    label: 'Free of rodents, insects and pest?',
                    name: 'rodent_input',
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

            dishware: {
                element: 'select',
                value: '',
                config: {
                    label: 'Dishware, flatware, cookware clean and in good condition?',
                    name: 'dishware_input',
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

            soap: {
                element: 'select',
                value: '',
                config: {
                    label: 'Soap/towels/toilet paper?',
                    name: 'soap_input',
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

            sanitary: {
                element: 'select',
                value: '',
                config: {
                    label: 'Clean and sanitary?',
                    name: 'rodent_input',
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

            trash: {
                element: 'select',
                value: '',
                config: {
                    label: 'Trash can available?',
                    name: 'trash_input',
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

            clothes: {
                element: 'select',
                value: '',
                config: {
                    label: 'Basket for dirty clothes?',
                    name: 'clothes_input',
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

            bedroom: {
                element: 'select',
                value: '',
                config: {
                    label: 'Bedroom clean and in good condition?',
                    name: 'bedroom_input',
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

            hotwater: {
                element: 'select',
                value: '',
                config: {
                    label: 'Hot water adjusted to a safe temperature - no higher than 110 degress F?',
                    name: 'hotwater_input',
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

            firstaid: {
                element: 'select',
                value: '',
                config: {
                    label: 'Stocked and accessible first aid kit?',
                    name: 'firstaid_input',
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

            detector: {
                element: 'select',
                value: '',
                config: {
                    label: 'working smoke detector on each floor and each room?',
                    name: 'detector_input',
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

            generalcomment: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'General Comment',
                    name: 'generalcomment_input',
                    placeholder: 'General Comment',
                    className: 'form-control'
                },
                validation: {
                    required: true
                },
                valid: false,
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
                title: 'Added Safety Inspection Checklist successfully, You will be redirected shortly.'
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
        
        let dataToSubmit = generateData(this.state.formdata,'safetyinpec');
        let formIsValid = isFormValid(this.state.formdata,'safetyinpec')

        if(formIsValid){
            console.log(dataToSubmit);
            this.props.dispatch(adSafetyInspec(dataToSubmit)).then(response =>{
                this.props.dispatch(adLog(this.props.user.userData._id,"Added Safety Inspection",dataToSubmit,"/forms/safety_inspection",'add')).then(response =>{
                if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/safety_inspection')
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



    render(){
    const title = "Safety Inspection Checklist";
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
                                id={'shift'}
                                formdata={this.state.formdata.shift}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'marks'}
                                formdata={this.state.formdata.marks}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'complaints'}
                                formdata={this.state.formdata.complaints}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'comments'}
                                formdata={this.state.formdata.comments}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'items'}
                                formdata={this.state.formdata.items}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'clutter'}
                                formdata={this.state.formdata.clutter}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'lint'}
                                formdata={this.state.formdata.lint}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'appliances'}
                                formdata={this.state.formdata.appliances}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'food'}
                                formdata={this.state.formdata.food}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'refrigerator'}
                                formdata={this.state.formdata.refrigerator}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'freezer'}
                                formdata={this.state.formdata.freezer}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'rodent'}
                                formdata={this.state.formdata.rodent}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'dishware'}
                                formdata={this.state.formdata.dishware}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'soap'}
                                formdata={this.state.formdata.soap}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'sanitary'}
                                formdata={this.state.formdata.sanitary}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'trash'}
                                formdata={this.state.formdata.trash}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'clothes'}
                                formdata={this.state.formdata.clothes}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'bedroom'}
                                formdata={this.state.formdata.bedroom}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'hotwater'}
                                formdata={this.state.formdata.hotwater}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'firstaid'}
                                formdata={this.state.formdata.firstaid}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'detector'}
                                formdata={this.state.formdata.detector}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'generalcomment'}
                                formdata={this.state.formdata.generalcomment}
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

export default connect(mapStateToProps)(AddSafetyInspec);