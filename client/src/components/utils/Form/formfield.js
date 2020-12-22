import React from 'react';

const Formfield = ({formdata, change, id}) => {

    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            // {document.getElementsByTagName('input')[0].setAttribute("class", "form-control is-invalid")}

            errorMessage = (                
                <span  style={{ color: 'red'}}id="exampleInputEmail1-error">
                    {formdata.validationMessage}
                </span>
                    
            )
        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){

            case('input'):
                formTemplate = (
                    <div className="form-group">
                        { formdata.showlabel ?
                        
                        <label>{formdata.config.label}</label>
                                                   
                    :null}
                        <input 
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event)=> change({event,id,blur:true})}
                            onChange={(event)=> change({event,id})}
                        />
                        {showError()}
                    </div>
                )
            break;
            case('date'):
                formTemplate = (
                    // <div className="input-group date" id={formdata.id} data-target-input="nearest">
                    //     { formdata.showlabel ?
                        
                    //     <label>{formdata.config.label}</label>
                                                   
                    // :null}
                    //     <input 
                    //         {...formdata.config}
                    //         value={formdata.value}
                    //         onBlur={(event)=> change({event,id,blur:true})}
                    //         onChange={(event)=> change({event,id})}
                    //         data-target={form.target}
                    //     />
                    //     {showError()}
                    // </div>

                <div className="bootstrap-timepicker">
                    <div className="form-group">
                    { formdata.showlabel ?
                        
                        <label>{formdata.config.label}</label>
                                                   
                    :null}
                        <div className="input-group date" id={formdata.id} data-target-input="nearest">
                            <input 
                                {...formdata.config}
                                value={formdata.value}
                                onBlur={(event)=> change({event,id,blur:true})}
                                onChange={(event)=> change({event,id})}
                                data-target={formdata.target}
                             />
                            <div className="input-group-append" data-target={formdata.target} data-toggle="datetimepicker">
                                <div className="input-group-text"><i className="fas fa-clock" /></div>
                            </div>                            
                        </div>
                        {showError()}
                    </div>
                    
                </div>

                )
            break;
            case ('select'):
                formTemplate = (
                    <div className="form-group">
                        { formdata.showlabel ?
                        
                            <label>{formdata.config.label}</label>
                                                       
                        :null}
    
                        <select 
                        {...formdata.config}
                        value={formdata.value}
                        onBlur={(event)=> change({event,id,blur:true})}
                        onChange={(event)=> change({event,id})}
                        >
                            <option value="">Select one</option>
                            {
                                formdata.config.options.map(item=>(
                                    <option key={item.key}
                                        value={item.key}
                                    >
                                        {item.value}
                                     </option>
                                ))
                            }
                        </select>
                        
                        {showError()}
                    </div>
                )
            break;
            case('textarea'):
            formTemplate = (
                <div className="form-group">
                        { formdata.showlabel ?
                        
                            <label>{formdata.config.label}</label>
                                                       
                        :null}

                    <textarea 
                    {...formdata.config}
                    value={formdata.value}
                    onBlur={(event)=> change({event,id,blur:true})}
                    onChange={(event)=> change({event,id})}
                    name="" 
                    id="" 
                    cols="30" 
                    rows="10"/>
                    
                    {showError()}
                </div>
            )
            break;
            case('textareaL'):
            formTemplate = (
                <div className="form-group">
                        { formdata.showlabel ?
                        
                            <label>{formdata.config.label}</label>
                                                       
                        :null}

                    <textarea 
                    {...formdata.config}
                    value={formdata.value}
                    onBlur={(event)=> change({event,id,blur:true})}
                    onChange={(event)=> change({event,id})}
                    name="" 
                    id="" 
                    cols="60" 
                    rows="20"/>
                    
                    {showError()}
                </div>
            )
            break;
            case('image'):
            formTemplate = (
                <div className="form-group">
                        { formdata.showlabel ?
                        
                            <label>{formdata.config.label}</label>
                                                       
                        :null}
                    <input
                        {...formdata.config}
                        value={formdata.value}
                        onBlur={(event) => change({ event, id, blur: true })}
                        onChange={(event) => change({ event, id })}
                    />
                    
                    {showError()}
                </div>
            )
            break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }



    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default Formfield;