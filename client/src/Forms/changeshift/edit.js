import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import FormField from '../../components/utils/Form/formfield';
import { update,  generateData, isFormValid, populateOptionFields, populateFields, resetFields } from '../../components/utils/Form/formActions';
import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getAddr, clearForm, updateChangeShift, getChangeShiftId, adLog } from '../../actions/form_actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Retrive from '../../components/utils/retrive'

const MySwal = withReactContent(Swal)

class EditChangeShift extends Component {
   

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
            shift: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shift',
                    name: 'dressed',
                    options: [
                        {key: '8-3',value: '8-3'},
                        {key: '3-11', value: '3-11'},
                        {key: '11-8', value: '11-8'},
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
            allacc: {
                element: 'select',
                value: '',
                config: {
                    label: 'All individuals accounted for & in good status',
                    name: 'allacc',
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
            cabinet: {
                element: 'select',
                value: '',
                config: {
                    label: 'Medication cabinet neat and well organised',
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
            pmof: {
                element: 'select',
                value: '',
                config: {
                    label: 'PMOF\'s current, signed & dated',
                    name: 'pmof',
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
            mar: {
                element: 'select',
                value: '',
                config: {
                    label: 'All medications entered on MAR\'s as seen in PMOF',
                    name: 'mar',
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
            pills: {
                element: 'select',
                value: '',
                config: {
                    label: 'Pills administered intiated on blister pack',
                    name: 'pills',
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
            error: {
                element: 'select',
                value: '',
                config: {
                    label: 'Medication errors/ommission. RN notification documented',
                    name: 'error',
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
            lock: {
                element: 'select',
                value: '',
                config: {
                    label: 'Controlled drugs under double lock',
                    name: 'lock',
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
            count: {
                element: 'select',
                value: '',
                config: {
                    label: 'Controlled drug count accurate, count sheet signed by previous shift',
                    name: 'count',
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
            prn: {
                element: 'select',
                value: '',
                config: {
                    label: 'New Medications and all PRN\'s accompanied with PMOF',
                    name: 'prn',
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
            firstaid: {
                element: 'select',
                value: '',
                config: {
                    label: 'First Aid kit with enough supplies and with no item missing',
                    name: 'firstaid',
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
            keys: {
                element: 'select',
                value: '',
                config: {
                    label: 'Medication cabinet locked and key handed over',
                    name: 'keys',
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
            goal: {
                element: 'select',
                value: '',
                config: {
                    label: 'Behaviour, GOAL charts recorded ',
                    name: 'goal',
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
            intake: {
                element: 'select',
                value: '',
                config: {
                    label: 'Fluid intake, BM, AON log, Siezure Charts all updated',
                    name: 'intake',
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
            log: {
                element: 'select',
                value: '',
                config: {
                    label: 'Nurse Contact Log (if applicable)',
                    name: 'log',
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
            food: {
                element: 'select',
                value: '',
                config: {
                    label: 'Food supply adequate, appropriate as per menu',
                    name: 'food',
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
            linen: {
                element: 'select',
                value: '',
                config: {
                    label: 'Hygiene items/linen supply adequate (if NOT, write report)',
                    name: 'linen',
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
            cleaning: {
                element: 'select',
                value: '',
                config: {
                    label: 'Cleaning/Laundry supplies adequate (if NOT, write report)',
                    name: 'cleaning',
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
            alu: {
                element: 'select',
                value: '',
                config: {
                    label: 'ALU: Living Room-neat & clean. Beds made.',
                    name: 'alu',
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
            neat: {
                element: 'select',
                value: '',
                config: {
                    label: 'Kitchen: Clean & Neat',
                    name: 'neat',
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
            rooms: {
                element: 'select',
                value: '',
                config: {
                    label: 'Individual Rooms: Neat & Clean Beds made.',
                    name: 'rooms',
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
            complete: {
                element: 'select',
                value: '',
                config: {
                    label: 'Laundry Completed.',
                    name: 'complete',
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
            above: {
                element: 'input',
                value: '',
                config:{
                    label: 'Water temperature checked & not above 110F',
                    name: 'above',
                    type: 'text',
                    placeholder: 'Type the Temperature',      
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
            chores: {
                element: 'select',
                value: '',
                config: {
                    label: 'All unit chores compeleted, Trash removed',
                    name: 'chores',
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
            repairs: {
                element: 'select',
                value: '',
                config: {
                    label: 'Maintenance request/repairs? (write report)',
                    name: 'repairs',
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
            incident: {
                element: 'select',
                value: '',
                config: {
                    label: 'Incident Report if any during shift - completed & reported',
                    name: 'incident',
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
            damaged: {
                element: 'select',
                value: '',
                config: {
                    label: 'Vehicle FREE of unreported damage',
                    name: 'damaged',
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
            mileage: {
                element: 'select',
                value: '',
                config: {
                    label: 'Vehicle mileage, Log Sheet recorded',
                    name: 'mileage',
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
            parked: {
                element: 'select',
                value: '',
                config: {
                    label: 'Vehicle parked in assigned location, Key & Log book in Unir',
                    name: 'parked',
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
                    name: 'comment',
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
                title: 'Edited Change of Shift successfully, You will be redirected shortly.'
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
            this.props.dispatch(updateChangeShift(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.props.dispatch(adLog(this.props.user.userData._id,"Modified Change of Shift",dataToSubmit,"/change_shift_view/"+dataToSubmit._id,'edit')).then(response =>{});
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.props.dispatch(clearForm());
                    setTimeout(()=>{
                    this.props.history.push('/forms/change_shift')
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
        this.props.dispatch(getChangeShiftId(id)).then(response=>{
            // if(!this.props.form.Dailyprognoteid){
                //console.log(id+"product found ")
            //     this.props.history.push('/')
            // }
            console.log(this.props.form.form);
            const newFormdata  = populateFields(this.state.formdata,this.props.form.form, 'change_shift');
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
                                id={'shift'}
                                formdata={this.state.formdata.shift}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'allacc'}
                                formdata={this.state.formdata.allacc}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'cabinet'}
                                formdata={this.state.formdata.cabinet}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'pmof'}
                                formdata={this.state.formdata.pmof}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'mar'}
                                formdata={this.state.formdata.mar}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'pills'}
                                formdata={this.state.formdata.pills}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'error'}
                                formdata={this.state.formdata.error}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'lock'}
                                formdata={this.state.formdata.lock}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'count'}
                                formdata={this.state.formdata.count}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'prn'}
                                formdata={this.state.formdata.prn}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'firstaid'}
                                formdata={this.state.formdata.firstaid}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'keys'}
                                formdata={this.state.formdata.keys}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'goal'}
                                formdata={this.state.formdata.goal}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'intake'}
                                formdata={this.state.formdata.intake}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'log'}
                                formdata={this.state.formdata.log}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'food'}
                                formdata={this.state.formdata.food}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'linen'}
                                formdata={this.state.formdata.linen}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'cleaning'}
                                formdata={this.state.formdata.cleaning}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'alu'}
                                formdata={this.state.formdata.alu}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'neat'}
                                formdata={this.state.formdata.neat}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'rooms'}
                                formdata={this.state.formdata.rooms}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'complete'}
                                formdata={this.state.formdata.complete}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'above'}
                                formdata={this.state.formdata.above}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'chores'}
                                formdata={this.state.formdata.chores}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'repairs'}
                                formdata={this.state.formdata.repairs}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'incident'}
                                formdata={this.state.formdata.incident}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'damaged'}
                                formdata={this.state.formdata.damaged}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'mileage'}
                                formdata={this.state.formdata.mileage}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'parked'}
                                formdata={this.state.formdata.parked}
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

export default connect(mapStateToProps)(EditChangeShift);