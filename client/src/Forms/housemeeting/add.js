import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData,populateSign, isFormValid, populateOptionFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, clearForm, adHouseMeeting, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'

const MySwal = withReactContent(Swal)

class AddHouseMeeting extends Component {
   
    state = {
        trimmedDataURL1: null,
        trimmedDataURL2: null,
        trimmedDataURL3: null,
        trimmedDataURL4: null,
        trimmedDataURL5: null,
        trimmedDataURL6: null,
        formError: false,
        formSuccess:false,
        formdata:{
            staff: {
                element: 'input',
                value: '',
                config:{
                    label: 'Names of staff present (Fullname)',
                    name: 'staff_input',
                    type: 'text',
                    placeholder: 'Staff Name',                          
                    className: 'form-control'           
                },
                validation:{
                    required: true
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
                    label: 'Names of individual present (Fullname)',
                    name: 'individual_input',
                    type: 'text',
                    placeholder: 'Individual\'s Name',
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

            meetingnotes: {
                element: 'textareaL',
                value: '',
                config:{
                    label: 'Meeting Notes',
                    name: 'meetingnotes_input',
                    type: 'text',
                    placeholder: 'Meeting Notes',      
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

            indivsignimg1: {
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

            indivsignimg2: {
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

            indivsignimg3: {
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

            supervisorsignimg: {
                element: 'input',
                value: '',
                config:{
                    tyle: {display:'none'},
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

            managersignimg: {
                element: 'input',
                value: '',
                config:{
                    tyle: {display:'none'},
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

            supervisorsigndate: {
                element: 'input',
                value: '',
                config:{
                    label: 'Supervisor Sign Date',
                    name: 'spervisorsigndate_input',
                    type: 'text',
                    placeholder: 'Supervisor Sign Date',      
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

            managersigndate: {
                element: 'input',
                value: '',
                config:{
                    label: 'Manager Sign Date',
                    name: 'managersigndate_input',
                    type: 'text',
                    placeholder: 'Manager Sign Date',      
                    className: 'form-control'            
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
                title: 'Added House Meeting successfully, You will be redirected shortly.'
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
            this.props.dispatch(adHouseMeeting(dataToSubmit)).then(response =>{
                this.props.dispatch(adLog(this.props.user.userData._id,"Added House Meeting",dataToSubmit,"/forms/house_meeting",'add')).then(response =>{
                    if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/house_meeting')
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

    sigPad1 = {}
    sigPad3 = {}
    sigPad2 = {}
    sigPad4 = {}
    sigPad5 = {}
    sigPad6 = {}
    clear1 = () => {
        this.sigPad1.clear()
    }
    clear2 = () => {
        this.sigPad2.clear()
    }
    clear3 = () => {
        this.sigPad3.clear()
    }
    clear4 = () => {
        this.sigPad4.clear()
    }
    clear5 = () => {
        this.sigPad5.clear()
    }
    clear6 = () => {
        this.sigPad6.clear()
    }
    trim = () => {

        const sign1 = this.sigPad1.getTrimmedCanvas().toDataURL('image/png');
        const sign2 = this.sigPad2.getTrimmedCanvas().toDataURL('image/png');
        const sign3 = this.sigPad3.getTrimmedCanvas().toDataURL('image/png');
        const sign4 = this.sigPad4.getTrimmedCanvas().toDataURL('image/png');
        const sign5 = this.sigPad5.getTrimmedCanvas().toDataURL('image/png');
        const sign6 = this.sigPad6.getTrimmedCanvas().toDataURL('image/png');
        

        const formdata1 = this.state.formdata;
        const newFormData1 = populateSign(formdata1, sign1, 'indivsignimg1')
        this.updateFields(newFormData1)

        const formdata2 = this.state.formdata;
        const newFormData2 = populateSign(formdata2, sign2, 'indivsignimg2')
        this.updateFields(newFormData2)

        const formdata3 = this.state.formdata;
        const newFormData3 = populateSign(formdata3, sign3, 'indivsignimg3')
        this.updateFields(newFormData3)

        const formdata4 = this.state.formdata;
        const newFormData4 = populateSign(formdata4, sign4, 'staffsignimg')
        this.updateFields(newFormData4)

        const formdata5 = this.state.formdata;
        const newFormData5 = populateSign(formdata5, sign5, 'supervisorsignimg')
        this.updateFields(newFormData5)

        const formdata6 = this.state.formdata;
        const newFormData6 = populateSign(formdata6, sign6, 'managersignimg')
        this.updateFields(newFormData6)
                    
        // this.setState({
        //     trimmedDataURL1: this.sigPad1.getTrimmedCanvas()
        //         .toDataURL('image/png'),
        //     trimmedDataURL2: this.sigPad2.getTrimmedCanvas()
        //         .toDataURL('image/png'),
        //     trimmedDataURL3: this.sigPad3.getTrimmedCanvas()
        //     .toDataURL('image/png'),
        //     trimmedDataURL4: this.sigPad4.getTrimmedCanvas()
        //     .toDataURL('image/png'),
        //     trimmedDataURL5: this.sigPad5.getTrimmedCanvas()
        //     .toDataURL('image/png'),
        //     trimmedDataURL6: this.sigPad6.getTrimmedCanvas()
        //     .toDataURL('image/png')
        // })
        // // console.log(this.sigPad)

    }



    render(){
    const title = "House Meeting";
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
                                id={'staff'}
                                formdata={this.state.formdata.staff}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'address'}
                                formdata={this.state.formdata.address}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'meetingnotes'}
                                formdata={this.state.formdata.meetingnotes}
                                change={(element) => this.updateForm(element)}
                            />
                            <div className="row">
                                <div className="col-8">
                                <div className="form-group">
                                <label>Individual signature</label>
                                <SignaturePad canvasProps={{className: styles.sigPad}}
                                ref={(ref) => { this.sigPad1 = ref }} />
                                </div>
                                </div>
                                <div className="col-4">
                                <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.clear1()}>
                                    Clear
                                </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                <div className="form-group">
                                <label>Individual signature</label>
                                <SignaturePad canvasProps={{className: styles.sigPad}}
                                ref={(ref) => { this.sigPad2 = ref }} />
                                </div>
                                </div>
                                <div className="col-4">
                                <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.clear2()}>
                                    Clear
                                </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                <div className="form-group">
                                <label>Individual signature</label>
                                <SignaturePad canvasProps={{className: styles.sigPad}}
                            ref={(ref) => { this.sigPad3 = ref }} />
                                </div>
                                </div>
                                <div className="col-4">
                                <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.clear3()}>
                                    Clear
                                </button>
                                </div>
                            </div>

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

                            <div className="row">
                                <div className="col-8">
                                <div className="form-group">
                                <label>Residential Supervisor signature</label>
                                <SignaturePad canvasProps={{className: styles.sigPad}}
                            ref={(ref) => { this.sigPad5 = ref }} />
                                </div>
                                </div>
                                <div className="col-4">
                                <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.clear5()}>
                                    Clear
                                </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                <div className="form-group">
                                <label>Program Manager signature</label>
                                <SignaturePad canvasProps={{className: styles.sigPad}}
                            ref={(ref) => { this.sigPad6 = ref }} />
                                </div>
                                </div>
                                <div className="col-4">
                                <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.clear6()}>
                                    Clear
                                </button>
                                </div>
                            </div>
                                     
                            {/* {trimmedDataURL1
                                ? <img className={styles.sigImage}
                                    src={trimmedDataURL1} />
                                : null}
                            {trimmedDataURL2
                                ? <img className={styles.sigImage}
                                    src={trimmedDataURL2} />
                                : null}
                            {trimmedDataURL3
                                ? <img className={styles.sigImage}
                                    src={trimmedDataURL3} />
                                : null}{console.log(this.state)} */}
                                {/* {console.log(this.state)} */}
                            <FormField
                                id={'supervisorsigndate'}
                                formdata={this.state.formdata.supervisorsigndate}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'managersigndate'}
                                formdata={this.state.formdata.managersigndate}
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

export default connect(mapStateToProps)(AddHouseMeeting);