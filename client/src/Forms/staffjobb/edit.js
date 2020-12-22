import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, clearForm, updateStaffDescB, getStaffDescBId, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../../components/utils/retrive'

const MySwal = withReactContent(Swal)

class EditStaffDescB extends Component {
   

    state = {
        loading: true,
        formError: false,
        formSuccess:false,
        formdata:{
            _id: {
                element: '_id',
                value: '',
                config:{
                    style: {display:'none'},
                    name: '_id_input',
                    type: 'text',
                    placeholder: '_id Name',                  
                },
                validation:{
                    required: false
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
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

            checklist: {
                element: 'select',
                value: '',
                config: {
                    label: 'Check the beginning of shift checklist',
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
            water: {
                element: 'select',
                value: '',
                config: {
                    label: 'Check the \"Hot water temperature\" before the beginning of shift (Bathroom and kitchen).',
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
            dinner: {
                element: 'select',
                value: '',
                config: {
                    label: 'Prepare dinner by 5 pm with the assitance of the individuals.',
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
            review: {
                element: 'select',
                value: '',
                config: {
                    label: 'Review Residential log book at the beginning of the shift.',
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
            snack: {
                element: 'select',
                value: '',
                config: {
                    label: 'Ensure all residents have their 3pm and 7pm snack',
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
            bp: {
                element: 'select',
                value: '',
                config: {
                    label: 'Complete all IP and BP documentations',
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
            activities: {
                element: 'select',
                value: '',
                config: {
                    label: 'Meet with the individuals to establish activities of choice for the upcoming week',
                    name: 'activities',
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
            note: {
                element: 'select',
                value: '',
                config: {
                    label: 'Document all activities of choice in progress notes',
                    name: 'note',
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
            activlogs: {
                element: 'select',
                value: '',
                config: {
                    label: 'Document completion of activities participated in activity logs (daily).',
                    name: 'activlogs',
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
            notesdaily: {
                element: 'select',
                value: '',
                config: {
                    label: 'Complete all residents progress notes daily',
                    name: 'notesdaily',
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
            unit: {
                element: 'select',
                value: '',
                config: {
                    label: 'Ensure unit is clean by the end of your shift',
                    name: 'notesdaily',
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
                    label: 'Empty/Clean inside and outside of trashcans before the end of shift. Take out all trash.',
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
            lunch: {
                element: 'select',
                value: '',
                config: {
                    label: 'Prepare lunch with the individuals before the end of shift',
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
                title: 'Edited Job Description 3pm - 11pm successfully, You will be redirected shortly.'
              })
        }
        
    }

    updateFields = (newFormData) => {
        this.setState({
            formdata: newFormData
        })
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'null');
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
            // console.log(dataToSubmit);
            this.props.dispatch(updateStaffDescB(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Modified Job Description 3pm - 11pm",dataToSubmit,"/staff_desc_b_view/"+dataToSubmit._id,'edit')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/staff_desc_b')
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
        const id = this.props.match.params.id;
        const formdata = this.state.formdata;
        // console.log(id)
        this.props.dispatch(getAddr()).then(response => {
            // console.log(newFormData);
            // this.updateFields(newFormData)
            if(this.props.user.userData.isAdmin){
                const newFormData = populateOptionFields(formdata, this.props.form.address, 'address');
                // this.updateFields(newFormData)
            }
            else{
                const newFormData = populateOptionFields(formdata, this.props.user.userData.address, 'address');
                // this.updateFields(newFormData)
            }
        });
        this.props.dispatch(getStaffDescBId(id)).then(response=>{
            // if(!this.props.form.Dailyprognoteid){
                //console.log(id+"product found ")
            //     this.props.history.push('/')
            // }
            console.log(this.props.form.form);
            const newFormdata  = populateFields(this.state.formdata,this.props.form.form, 'staff_desc_b');
            this.setState({
            formdata: newFormdata,
            loading: false           
                })
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
    const title = "Job Description 3pm - 11pm";
    if (this.state.loading) {
        return (
        <Retrive/>
    );
    }
    return (
        <UserLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1>Edit {title}</h1>
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
                        <p className="login-box-msg">Edit {title}</p>
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
                                id={'checklist'}
                                formdata={this.state.formdata.checklist}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'water'}
                                formdata={this.state.formdata.water}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'dinner'}
                                formdata={this.state.formdata.dinner}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'review'}
                                formdata={this.state.formdata.review}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'snack'}
                                formdata={this.state.formdata.snack}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'bp'}
                                formdata={this.state.formdata.bp}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'activities'}
                                formdata={this.state.formdata.activities}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'note'}
                                formdata={this.state.formdata.note}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'activlogs'}
                                formdata={this.state.formdata.activlogs}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'notesdaily'}
                                formdata={this.state.formdata.notesdaily}
                                change={(element) => this.updateForm(element)}
                            />                            
                            <FormField
                                id={'unit'}
                                formdata={this.state.formdata.unit}
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
                                id={'mop'}
                                formdata={this.state.formdata.mop}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'lunch'}
                                formdata={this.state.formdata.lunch}
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
                                id={'iron'}
                                formdata={this.state.formdata.iron}
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
                                    Edit {title}
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

export default connect(mapStateToProps)(EditStaffDescB);