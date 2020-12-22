import React, { Component } from 'react';
import UserLayout from '../hoc/user'
import FormField from '../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, resetFields } from '../components/utils/Form/formActions';
// import MyButton from '../components/utils/button';
import { connect } from 'react-redux';
import {adLog} from '../actions/form_actions'
import { clearForm, adIndivAss } from '../actions/user_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getUsrs, getIndiv } from '../actions/user_actions';


const MySwal = withReactContent(Swal)

class AddIndiv extends Component {
   
    state = {
        formError: false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'select',
                value: '',
                config:{
                    label: 'Name',
                    name: 'name_input',
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
            individual: {
                element: 'select',
                value: '',
                config:{
                    label: 'Individual',
                    name: 'indiv_input',
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
            indivname: {
                element: 'input',
                value: '',
                config:{
                    label: 'Name',
                    name: 'name',
                    type: 'text',
                    placeholder: 'Name',      
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
            indivlastname: {
                element: 'input',
                value: '',
                config:{
                    label: 'Last Name',
                    name: 'lastname',
                    type: 'text',
                    placeholder: 'Last Name',      
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
                title: 'Added Individual Association successfully, You will be redirected shortly.'
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
        console.log(dataToSubmit);
        if(formIsValid){
            console.log(dataToSubmit);
            this.props.dispatch(adIndivAss(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Added Individual Association",dataToSubmit,"/view_user/"+dataToSubmit.name,'add')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                        this.props.history.goBack()
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

        this.props.dispatch(getUsrs()).then(response => {
            const newFormData = populateOptionFields(formdata, this.props.form.users, 'name');
            // console.log(newFormData);
            this.updateFields(newFormData)
        })
        this.props.dispatch(getIndiv()).then(response => {
            const newFormData = populateOptionFields(formdata, this.props.form.individual, 'individual');
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
    const title = "Individual Association";
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
                                id={'indivname'}
                                formdata={this.state.formdata.indivname}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'indivlastname'}
                                formdata={this.state.formdata.indivlastname}
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

export default connect(mapStateToProps)(AddIndiv);