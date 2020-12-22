import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr,getIndiv, clearForm, updateActivityLog, getActivityLogId, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../../components/utils/retrive'

const MySwal = withReactContent(Swal)

class DeleteActvityLog extends Component {
   

    state = {
        loading: true,
        formError: false,
        formSuccess:false,
        formdata:{

            deleted: {
                element: '_id',
                value: '',
                config:{
                    style: {display:'none'},
                    name: 'deleted_input',
                    type: 'text',
                    placeholder: 'deleted Name',                  
                },
                validation:{
                    required: false
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

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


            activity: {
                element: 'input',
                value: '',
                config:{
                    label: 'Activity',
                    name: 'activity_input',
                    type: 'text',
                    placeholder: 'Activity',      
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

            location: {
                element: 'input',
                value: '',
                config:{
                    label: 'Location',
                    name: 'location_input',
                    type: 'text',
                    placeholder: 'Location',      
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

            time: {
                element: 'input',
                value: '',
                config:{
                    label: 'Time (HH:MM)',
                    name: 'time_input',
                    type: 'text',
                    placeholder: 'Time',      
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

            stafIntals: {
                element: 'input',
                value: '',
                config:{
                    label: 'Staff Initials',
                    name: 'Initials_input',
                    type: 'text',
                    placeholder: 'Staff Initials',      
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

            completed: {
                element: 'select',
                value: '',
                config: {
                    label: 'Completed?',
                    name: 'completed_input',
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
                    label: 'Comment',
                    name: 'comment_input',
                    type: 'text',
                    placeholder: 'Comment',      
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
                title: 'Deleted House Meeting successfully, You will be redirected shortly.'
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
            // console.log(dataToSubmit);
            this.props.dispatch(updateActivityLog(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Deleted Activity Log",dataToSubmit,"/activity_log_view/"+dataToSubmit._id,'delete')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/activity_log')
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
        this.props.dispatch(getActivityLogId(id)).then(response=>{
            // if(!this.props.form.Dailyprognoteid){
                //console.log(id+"product found ")
            //     this.props.history.push('/')
            // }
            console.log(this.props.form.form);
            const newFormdata  = populateFields(this.state.formdata,this.props.form.form, 'activity_log');
            this.setState({
            formdata: newFormdata,
            loading: false           
                })
        });

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

        this.props.dispatch(getIndiv()).then(response => {
            if(this.props.user.userData.isAdmin){
                const newFormData = populateOptionFields(formdata, this.props.form.individual, 'individual');
                // this.updateFields(newFormData)
            }
            else{
                const newFormData = populateOptionFields(formdata, this.props.user.userData.individual, 'individual');
                // this.updateFields(newFormData)
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
    const title = "Actvity Log";
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
                        <h1>Delete {title}</h1>
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
                        <p className="login-box-msg">Delete {title}</p>
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
                                id={'activity'}
                                formdata={this.state.formdata.activity}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'location'}
                                formdata={this.state.formdata.location}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'time'}
                                formdata={this.state.formdata.time}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'stafIntals'}
                                formdata={this.state.formdata.stafIntals}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'completed'}
                                formdata={this.state.formdata.completed}
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
                                    <button className="btn btn-block bg-gradient-danger" type="button" onClick={(event)=> this.submitForm(event)}>
                                    Delete {title}
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

export default connect(mapStateToProps)(DeleteActvityLog);