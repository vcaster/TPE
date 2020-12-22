import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getIndiv, clearForm, updateBowel, getBowelId, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../../components/utils/retrive'

const MySwal = withReactContent(Swal)

class DeleteBowel extends Component {
   

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
                config:{
                    label: 'Individual',
                    name: 'Individual',
                    options: [],
                    className: 'form-control',
                    disabled: true
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
                    name: 'dressed',
                    options: [
                        {key: '8am-3pm',value: '8am-3pm'},      
                        {key: '3pm-11pm',value: '3pm-11pm'},  
                        {key: '11pm-8am',value: '11pm-8am'},                    
                    ],
                    className: 'form-control',
                    disabled: true
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            amount: {
                element: 'input',
                value: '',
                config:{
                    label: 'Amount',
                    name: 'amount',
                    type: 'text',
                    placeholder: 'Amount',      
                    className: 'form-control',
                    disabled: true       
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            consist: {
                element: 'input',
                value: '',
                config:{
                    label: 'Consistency',
                    name: 'consist',
                    type: 'text',
                    placeholder: 'Consistency',      
                    className: 'form-control',
                    disabled: true            
                },
                validation:{
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
                title: 'Deleted Bowel Movement Chart successfully, You will be redirected shortly.'
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
            this.props.dispatch(updateBowel(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Deleted Bowel Movement",dataToSubmit,"/bowel_view/"+dataToSubmit._id,'delete')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/bowel')
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
        this.props.dispatch(getBowelId(id)).then(response=>{
            // if(!this.props.form.Dailyprognoteid){
                //console.log(id+"product found ")
            //     this.props.history.push('/')
            // }
            console.log(this.props.form.form);
            const newFormdata  = populateFields(this.state.formdata,this.props.form.form, 'bowel');
            this.setState({
            formdata: newFormdata,
            loading: false           
                })
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
    const title = "Change of Shift";
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
                                id={'shift'}
                                formdata={this.state.formdata.shift}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'amount'}
                                formdata={this.state.formdata.amount}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'consist'}
                                formdata={this.state.formdata.consist}
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

export default connect(mapStateToProps)(DeleteBowel);