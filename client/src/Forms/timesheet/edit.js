import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, adLog, clearForm, updateTimeSheet, getTimeSheetId } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../../components/utils/retrive'

const MySwal = withReactContent(Swal)

class EditTimeSheet extends Component {
   

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
                    label: 'Location',
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

            sun1d: {
                element: 'input',
                value: '',
                config:{
                    name: 'sun1d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sun1di: {
                element: 'input',
                value: '',
                config:{
                    name: 'sun1di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sun1do: {
                element: 'input',
                value: '',
                config:{
                    name: 'sun1do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sun1dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'sun1dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            mon1d: {
                element: 'input',
                value: '',
                config:{
                    name: 'mon1d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            mon1di: {
                element: 'input',
                value: '',
                config:{
                    name: 'mon1di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            mon1do: {
                element: 'input',
                value: '',
                config:{
                    name: 'mon1do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            mon1dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'mon1dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            
            
            tue1d: {
                element: 'input',
                value: '',
                config:{
                    name: 'tue1d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            tue1di: {
                element: 'input',
                value: '',
                config:{
                    name: 'tue1di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            tue1do: {
                element: 'input',
                value: '',
                config:{
                    name: 'tue1do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            tue1dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'tue1dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            wed1d: {
                element: 'input',
                value: '',
                config:{
                    name: 'wed1d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            wed1di: {
                element: 'input',
                value: '',
                config:{
                    name: 'wed1di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            wed1do: {
                element: 'input',
                value: '',
                config:{
                    name: 'wed1do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            wed1dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'wed1dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            thu1d: {
                element: 'input',
                value: '',
                config:{
                    name: 'thu1d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            thu1di: {
                element: 'input',
                value: '',
                config:{
                    name: 'thu1di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            thu1do: {
                element: 'input',
                value: '',
                config:{
                    name: 'thu1do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            thu1dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'thu1dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            fri1d: {
                element: 'input',
                value: '',
                config:{
                    name: 'fri1d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            fri1di: {
                element: 'input',
                value: '',
                config:{
                    name: 'fri1di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            fri1do: {
                element: 'input',
                value: '',
                config:{
                    name: 'fri1do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{

                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            fri1dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'fri1dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sat1d: {
                element: 'input',
                value: '',
                config:{
                    name: 'sat1d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sat1di: {
                element: 'input',
                value: '',
                config:{
                    name: 'sat1di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sat1do: {
                element: 'input',
                value: '',
                config:{
                    name: 'sat1do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sat1dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'sat1dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sun2d: {
                element: 'input',
                value: '',
                config:{
                    name: 'sun2d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sun2di: {
                element: 'input',
                value: '',
                config:{
                    name: 'sun2di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sun2do: {
                element: 'input',
                value: '',
                config:{
                    name: 'sun2do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sun2dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'sun2dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            mon2d: {
                element: 'input',
                value: '',
                config:{
                    name: 'mon2d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            mon2di: {
                element: 'input',
                value: '',
                config:{
                    name: 'mon2di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            mon2do: {
                element: 'input',
                value: '',
                config:{
                    name: 'mon2do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            mon2dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'mon2dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            tue2d: {
                element: 'input',
                value: '',
                config:{
                    name: 'tue2d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            tue2di: {
                element: 'input',
                value: '',
                config:{
                    name: 'tue2di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            tue2do: {
                element: 'input',
                value: '',
                config:{
                    name: 'tue2do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            tue2dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'tue2dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            wed2d: {
                element: 'input',
                value: '',
                config:{
                    name: 'wed2d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            wed2di: {
                element: 'input',
                value: '',
                config:{
                    name: 'wed2di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            wed2do: {
                element: 'input',
                value: '',
                config:{
                    name: 'wed2do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            wed2dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'wed2dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            thu2d: {
                element: 'input',
                value: '',
                config:{
                    name: 'thu2d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            thu2di: {
                element: 'input',
                value: '',
                config:{
                    name: 'thu2di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            thu2do: {
                element: 'input',
                value: '',
                config:{
                    name: 'thu2do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            thu2dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'thu2dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            fri2d: {
                element: 'input',
                value: '',
                config:{
                    name: 'fri2d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            fri2di: {
                element: 'input',
                value: '',
                config:{
                    name: 'fri2di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            fri2do: {
                element: 'input',
                value: '',
                config:{
                    name: 'fri2do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            fri2dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'fri2dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sat2d: {
                element: 'input',
                value: '',
                config:{
                    name: 'sat2d',
                    type: 'text',
                    placeholder: 'MM/DD/YYYY',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sat2di: {
                element: 'input',
                value: '',
                config:{
                    name: 'sat2di',
                    type: 'text',
                    placeholder: 'Time In',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sat2do: {
                element: 'input',
                value: '',
                config:{
                    name: 'sat2do',
                    type: 'text',
                    placeholder: 'Time Out',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            sat2dt: {
                element: 'input',
                value: '',
                config:{
                    name: 'sat2dt',
                    type: 'text',
                    placeholder: 'Total Hours',            
                },
                validation:{
         number:true           
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            totalhrs: {
                element: 'input',
                value: '',
                config:{
                    name: 'totalhrs',
                    type: 'text',
                    placeholder: 'Total Hours',  
                    label: 'Total Hours'          
                },
                validation:{
                    required: true,
                    number: true
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
                    placeholder: 'Signature (Required)',            
                },
                validation:{
                    
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            supervisor: {
                element: 'input',
                value: '',
                config:{
                    name: 'supervisor',
                    type: 'text',
                    placeholder: 'Supervisor',  
                    label: 'Supervisor'          
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
                title: 'Edited Time Sheet successfully, You will be redirected shortly.'
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
            this.props.dispatch(updateTimeSheet(dataToSubmit)).then(response =>{                
                this.props.dispatch(adLog(this.props.user.userData._id,"Modified Time Sheet",dataToSubmit,"/time_sheet_view/"+dataToSubmit._id,'edit')).then(response =>{
                    if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    if(this.props.user.userData.isAdmin){
                        setTimeout(()=>{
                        this.props.history.push('/forms/time_sheet')
                        },3000)
                        console.log(response.payload);
                    }else{
                        setTimeout(()=>{
                            this.props.history.push('/forms/time_sheet_user')
                            },3000)
                            console.log(response.payload);
                    }
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
        this.props.dispatch(getTimeSheetId(id)).then(response=>{
            // if(!this.props.form.Dailyprognoteid){
                //console.log(id+"product found ")
            //     this.props.history.push('/')
            // }
            console.log(this.props.form.form);
            const newFormdata  = populateFields(this.state.formdata,this.props.form.form, 'time_sheet');
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
    const title = "Time Sheet";
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
                <form onSubmit={(event)=>this.submitForm(event)}>  
                    <div className="row">
                        <div className="col-12">

                            <div className="card">
                                <div className="card-header">
                                <h3 className="card-title">{title}</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                 
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Date (MM/DD/YYYY)</th>
                                                <th>Day</th>
                                                <th>Time In</th>
                                                <th>Time Out</th>
                                                <th>Total Hours</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><FormField
                                                    id={'sun1d'}
                                                    formdata={this.state.formdata.sun1d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Sunday</td>
                                                <td><FormField
                                                    id={'sun1di'}
                                                    formdata={this.state.formdata.sun1di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'sun1do'}
                                                    formdata={this.state.formdata.sun1do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'sun1dt'}
                                                    formdata={this.state.formdata.sun1dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'mon1d'}
                                                    formdata={this.state.formdata.mon1d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Monday</td>
                                                <td><FormField
                                                    id={'mon1di'}
                                                    formdata={this.state.formdata.mon1di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'mon1do'}
                                                    formdata={this.state.formdata.mon1do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'mon1dt'}
                                                    formdata={this.state.formdata.mon1dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'tue1d'}
                                                    formdata={this.state.formdata.tue1d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Tuesday</td>
                                                <td><FormField
                                                    id={'tue1di'}
                                                    formdata={this.state.formdata.tue1di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'tue1do'}
                                                    formdata={this.state.formdata.tue1do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'tue1dt'}
                                                    formdata={this.state.formdata.tue1dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'wed1d'}
                                                    formdata={this.state.formdata.wed1d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Wednesday</td>
                                                <td><FormField
                                                    id={'wed1di'}
                                                    formdata={this.state.formdata.wed1di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'wed1do'}
                                                    formdata={this.state.formdata.wed1do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'wed1dt'}
                                                    formdata={this.state.formdata.wed1dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'thu1d'}
                                                    formdata={this.state.formdata.thu1d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Thursday</td>
                                                <td><FormField
                                                    id={'thu1di'}
                                                    formdata={this.state.formdata.thu1di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'thu1do'}
                                                    formdata={this.state.formdata.thu1do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'thu1dt'}
                                                    formdata={this.state.formdata.thu1dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'fri1d'}
                                                    formdata={this.state.formdata.fri1d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Friday</td>
                                                <td><FormField
                                                    id={'fri1di'}
                                                    formdata={this.state.formdata.fri1di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'fri1do'}
                                                    formdata={this.state.formdata.fri1do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'fri1dt'}
                                                    formdata={this.state.formdata.fri1dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'sat1d'}
                                                    formdata={this.state.formdata.sat1d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Saturday</td>
                                                <td><FormField
                                                    id={'sat1di'}
                                                    formdata={this.state.formdata.sat1di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'sat1do'}
                                                    formdata={this.state.formdata.sat1do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'sat1dt'}
                                                    formdata={this.state.formdata.sat1dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                            </tr>
                                        </tbody>
                                    </table>                       
                                </div>
                        
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{title}</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                 
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Day</th>
                                                <th>Time In</th>
                                                <th>Time Out</th>
                                                <th>Total Hours</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><FormField
                                                    id={'sun2d'}
                                                    formdata={this.state.formdata.sun2d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Sunday</td>
                                                <td><FormField
                                                    id={'sun2di'}
                                                    formdata={this.state.formdata.sun2di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'sun2do'}
                                                    formdata={this.state.formdata.sun2do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'sun2dt'}
                                                    formdata={this.state.formdata.sun2dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'mon2d'}
                                                    formdata={this.state.formdata.mon2d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Monday</td>
                                                <td><FormField
                                                    id={'mon2di'}
                                                    formdata={this.state.formdata.mon2di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'mon2do'}
                                                    formdata={this.state.formdata.mon2do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'mon2dt'}
                                                    formdata={this.state.formdata.mon2dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'tue2d'}
                                                    formdata={this.state.formdata.tue2d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Tuesday</td>
                                                <td><FormField
                                                    id={'tue2di'}
                                                    formdata={this.state.formdata.tue2di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'tue2do'}
                                                    formdata={this.state.formdata.tue2do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'tue2dt'}
                                                    formdata={this.state.formdata.tue2dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'wed2d'}
                                                    formdata={this.state.formdata.wed2d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Wednesday</td>
                                                <td><FormField
                                                    id={'wed2di'}
                                                    formdata={this.state.formdata.wed2di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'wed2do'}
                                                    formdata={this.state.formdata.wed2do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'wed2dt'}
                                                    formdata={this.state.formdata.wed2dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'thu2d'}
                                                    formdata={this.state.formdata.thu2d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Thursday</td>
                                                <td><FormField
                                                    id={'thu2di'}
                                                    formdata={this.state.formdata.thu2di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'thu2do'}
                                                    formdata={this.state.formdata.thu2do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'thu2dt'}
                                                    formdata={this.state.formdata.thu2dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'fri2d'}
                                                    formdata={this.state.formdata.fri2d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Friday</td>
                                                <td><FormField
                                                    id={'fri2di'}
                                                    formdata={this.state.formdata.fri2di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'fri2do'}
                                                    formdata={this.state.formdata.fri2do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'fri2dt'}
                                                    formdata={this.state.formdata.fri2dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr>
                                                <td><FormField
                                                    id={'sat2d'}
                                                    formdata={this.state.formdata.sat2d}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td>Saturday</td>
                                                <td><FormField
                                                    id={'sat2di'}
                                                    formdata={this.state.formdata.sat2di}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                </td>
                                                <td><FormField
                                                    id={'sat2do'}
                                                    formdata={this.state.formdata.sat2do}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>
                                                <td><FormField
                                                    id={'sat2dt'}
                                                    formdata={this.state.formdata.sat2dt}
                                                    change={(element) => this.updateForm(element)}
                                                /></td>

                                            </tr>
                                            <tr><td colSpan={2}>
                                            <FormField
                                                id={'address'}
                                                formdata={this.state.formdata.address}
                                                change={(element) => this.updateForm(element)}
                                            /></td><td><img style={{height: 100, width:150}} src={this.props.form.form.staffsignimg} alt=""/></td>
                                            <td>
                                            <FormField
                                                id={'supervisor'}
                                                formdata={this.state.formdata.supervisor}
                                                change={(element) => this.updateForm(element)}
                                            /></td>
                                            <td>
                                            <FormField
                                                id={'totalhrs'}
                                                formdata={this.state.formdata.totalhrs}
                                                change={(element) => this.updateForm(element)}
                                            /></td></tr>

                                        </tbody>
                                    </table>
                                    { this.state.formError ?
                                <span style={{ color: 'red'}}id="exampleInputEmail1-error">
                                Provide Total Hours, Location, supervisor and Signature
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
                       
                                    
                                </div>
                                {/* /.card-body */}
                                {this.state.formSuccess ? this.success() : null}
                            </div>
                        </div>
                    </div>
                    </form>

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

export default connect(mapStateToProps)(EditTimeSheet);