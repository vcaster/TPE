import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr,getIndiv, clearForm, updateFundsSheet, getFundsSheetId, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../../components/utils/retrive'

const MySwal = withReactContent(Swal)

class EditFundSheet extends Component {
   

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


            amountr: {
                element: 'input',
                value: '',
                config:{
                    label: 'Amount Received',
                    name: 'amountr',
                    type: 'text',
                    placeholder: 'Amount Received',      
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

            amounts: {
                element: 'input',
                value: '',
                config:{
                    label: 'Amount Spent',
                    name: 'amounts',
                    type: 'text',
                    placeholder: 'Amount Spent',      
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

            ogstaff: {
                element: 'input',
                value: '',
                config:{
                    label: 'Out-Going Staff Initials',
                    name: 'ogstaff',
                    type: 'text',
                    placeholder: 'Out-Going Staff Initials',      
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

            icstaff: {
                element: 'input',
                value: '',
                config:{
                    label: 'In-Coming Staff Initials',
                    name: 'icstaff',
                    type: 'text',
                    placeholder: 'In-Coming Staff Initials',      
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

            dailyb: {
                element: 'input',
                value: '',
                config:{
                    label: 'Daily Balance',
                    name: 'dailyb',
                    type: 'text',
                    placeholder: 'Daily Balance',      
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

            check: {
                element: 'input',
                value: '',
                config:{
                    label: 'Checked By:',
                    name: 'check',
                    type: 'text',
                    placeholder: 'Checked By:',      
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

            receipt: {
                element: 'input',
                value: '',
                config:{
                    label: 'Receipt Attached? State: yes or No If "No" state reason',
                    name: 'receipt',
                    type: 'text',
                    placeholder: 'Receipt Attached? State: yes or No If "No" state reason',      
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

            comment: {
                element: 'input',
                value: '',
                config:{
                    label: 'Comment',
                    name: 'comment',
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

            clark: {
                element: 'input',
                value: '',
                config:{
                    label: 'Accounts Clerk Verification',
                    name: 'clark',
                    type: 'text',
                    placeholder: 'Accounts Clerk Verification',      
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
                title: 'Edited Individual Weekly Activity Funds Accounting Sheet successfully, You will be redirected shortly.'
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
            this.props.dispatch(updateFundsSheet(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Modified Individual Weekly Activity Funds Accounting Sheet",dataToSubmit,"/fund_sheet_view/"+dataToSubmit._id,'edit')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/fund_sheet')
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

        this.props.dispatch(getFundsSheetId(id)).then(response=>{
            // if(!this.props.form.Dailyprognoteid){
                //console.log(id+"product found ")
            //     this.props.history.push('/')
            // }
            console.log(this.props.form.form);
            const newFormdata  = populateFields(this.state.formdata,this.props.form.form, 'fund_sheet');
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
    const title = "Individual Weekly Activity Funds Accounting Sheet";
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
                                id={'amountr'}
                                formdata={this.state.formdata.amountr}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'amounts'}
                                formdata={this.state.formdata.amounts}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'ogstaff'}
                                formdata={this.state.formdata.ogstaff}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'icstaff'}
                                formdata={this.state.formdata.icstaff}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'dailyb'}
                                formdata={this.state.formdata.dailyb}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'check'}
                                formdata={this.state.formdata.check}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'receipt'}
                                formdata={this.state.formdata.receipt}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'comment'}
                                formdata={this.state.formdata.comment}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'clark'}
                                formdata={this.state.formdata.clark}
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

export default connect(mapStateToProps)(EditFundSheet);