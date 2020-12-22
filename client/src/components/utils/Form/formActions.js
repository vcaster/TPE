export const validate = (element, formdata= []) => {
    let error = [true,''];


    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Must be a valid email':''}`;
        error = !valid ? [valid,message] : error;
    }
    if(element.validation.number){
        const valid = /^[0-9]*$/.test(element.value)
        const message = `${!valid ? 'Must be a Numbers only':''}`;
        error = !valid ? [valid,message] : error;
    }
    if(element.validation.date){
        const valid = /(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d\d/.test(element.value)
        const message = `${!valid ? 'Invalid Date (MM/DD/YYYY)':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.phone){
        const valid = /[0-9]{10}/.test(element.value)
        const message = `${!valid ? 'Invalid Phone Number (10 digits only)':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.dated){
        const valid = /((\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1]{1})\/(\d{2,4})|[CITIZEN])/.test(element.value)
        const message = `${!valid ? 'Invalid Date (MM/DD/YYYY) OR Value':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.caps){
        const valid = /[A-Z]*/.test(element.value)
        const message = `${!valid ? 'Must be in UPPERCASE':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.length){
        const valid = element.value.length > 5;
        const message = `${!valid ? 'Must be a More than 5 Charaters':''}`;
        error = !valid ? [valid,message] : error;
    }

    if (element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Password do not match':''}`;
        error = !valid ? [valid,message] : error;
    }

    if (element.validation.name){
        const valid = element.value.trim() === formdata[element.validation.name].value;
        const message = `${!valid ? 'First Names Don\'t Match':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required':''}`;
        error = !valid ? [valid,message] : error;
    }

    return error
}

export const update = (element, formdata, formName ) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;

    if(element.blur){
        let validData = validate(newElement,formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    return newFormdata;
}

export const generateData = (formdata, formName) =>{
    let dataToSubmit = {};

    for(let key in formdata){
        if(key !== 'confirmPassword'){
            dataToSubmit[key] = formdata[key].value;
        }
    }

    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for(let key in formdata){
        formIsValid = formdata[key].valid && formIsValid
    }
    return formIsValid;

}

export const populateOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    const newFormdata = {...formdata};

    if(field == "individual"){
        arrayData.forEach(item=> {
            newArray.push({key:item._id, value:item.name+' '+item.lastname})
        });
    }
    else if(field == "name"){
        arrayData.forEach(item=> {
            newArray.push({key:item._id, value:item.lastname+' '+item.name})
        });
    }
    else if(field == "phone"){
        arrayData.forEach(item=> {
            newArray.push({key:item.phone, value:item.lastname+' '+item.name+' '+item.phone})
        });
    }else{
        arrayData.forEach(item=> {
            newArray.push({key:item._id, value:item.name})
        });
    }
    

    newFormdata[field].config.options = newArray;
    return newFormdata;

}

export const populateSign = (formdata, data , field) => {
    const newFormdata = {...formdata};

    newFormdata[field].value = data;
    return newFormdata;

}

export const resetFields = (formdata, formname) => {
    const newFormdata = {...formdata};

    for(let key in newFormdata){

        if (key === 'product'){
            newFormdata[key].value = [];
        }else{
            newFormdata[key].value = '';
        }
        newFormdata[key].valid = false;
        newFormdata[key].touched = false;
        newFormdata[key].validationMessage = '';
    }

    return newFormdata;
}

export const populateFields = (formData, fields,  formName = null) => {
    
    let id = '_id';
    //     for(let key in formData){
    //         console.log(fields[key][id]);
    //     }  

    //console.log(fields);
    
    if (formName == 'Daily_prog_note' || formName == 'training'){
        
    const name = 'name';
    const deleted = 'deleted'
    const lastname = 'lastname';
    const name1 = 'name';
    const individual = 'individual'
    for(let key in formData){

        if(key == name || key == individual){
            formData[key].value = fields[key][id];
        }else if(key == deleted){
            formData[key].value = true;
        }
        else{
            formData[key].value = fields[key];
        }

        formData[key].valid = true;
        formData[key].touched = true;
        formData[key].validationMessage = '';

    }
    console.log(formData)
    }
    if (formName == 'incident'){
        
        const address = 'address';
        const deleted = 'deleted'
        const individual = 'individual'
        for(let key in formData){
    
            if(key == address || key == individual){
                formData[key].value = fields[key][id];
            }else if(key == deleted){
                formData[key].value = true;
            }
            else{
                formData[key].value = fields[key];
            }
    
            formData[key].valid = true;
            formData[key].touched = true;
            formData[key].validationMessage = '';
    
        }
        console.log(formData)
        }
    else if (formName == 'safety_inspection'){
        
        const name = 'name';
        const deleted = 'deleted'
        const lastname = 'lastname';
        const name1 = 'name';
        const address = 'address'
        for(let key in formData){
    
            if(key == name || key == address ){
                formData[key].value = fields[key][id];
            }else if(key == deleted){
                formData[key].value = true;
            }
            else{
                formData[key].value = fields[key];
            }
    
            formData[key].valid = true;
            formData[key].touched = true;
            formData[key].validationMessage = '';
    
        }
        console.log(formData)
        }
        else if (formName == 'appoint'){
        
            const name = 'name';
            const deleted = 'deleted'
            const daten = 'daten';
            const dated = 'dated';
            const individual = 'individual'
            for(let key in formData){
        
                if(key == name || key == individual ){
                    formData[key].value = fields[key][id];
                }
                else if (key == dated || key == daten){
                    formData[key].value =  new Date(fields[key]);
                }
                else{
                    formData[key].value = fields[key];
                }
        
                formData[key].valid = true;
                formData[key].touched = true;
                formData[key].validationMessage = '';
        
            }
            console.log(formData)
            }
    else if (formName == 'house_meeting'){
    
        const name = 'name';
        const deleted = 'deleted'
        const lastname = 'lastname';
        const name1 = 'name';
        const address = 'address'
        for(let key in formData){
    
            if(key == address){
                formData[key].value = fields[key][id];
            }else if(key == deleted){
                formData[key].value = true;
            }
            else{
                formData[key].value = fields[key];
            }
    
            formData[key].valid = true;
            formData[key].touched = true;
            formData[key].validationMessage = '';
    
        }
        console.log(formData)
        }
        else if (formName == 'Message'){
            const name = 'name'
            const deleted = 'deleted'
            for(let key in formData){
        
                if(key == name){
                    formData[key].value = fields[key][id];
                }else if(key == deleted){
                    formData[key].value = true;
                }
                else{
                    formData[key].value = fields[key];
                }
        
                formData[key].valid = true;
                formData[key].touched = true;
                formData[key].validationMessage = '';
        
            }
            console.log(formData)
            }
        else if (formName == 'time_sheet'){
    
            const submitted = 'submitted';
            const deleted = 'deleted'
            const lastname = 'lastname';
            const name1 = 'name';
            const address = 'address'
            for(let key in formData){
        
                if(key == address){
                    formData[key].value = fields[key][id];
                }else if(key == deleted || key == submitted){
                    formData[key].value = true;
                }
                else{
                    formData[key].value = fields[key];
                }
        
                formData[key].valid = true;
                formData[key].touched = true;
                formData[key].validationMessage = '';
        
            }
            console.log(formData)
            }

        else if (formName == 'indivi'){
        
            const deleted = 'deleted'
            const address = 'address'
            for(let key in formData){
        
                if(key == address){
                    formData[key].value = fields[key][id];
                }else if(key == deleted){
                    formData[key].value = "1";
                }
                else{
                    formData[key].value = fields[key];
                }
        
                formData[key].valid = true;
                formData[key].touched = true;
                formData[key].validationMessage = '';
        
            }
            console.log(formData)
            }

            else if (formName == 'fire_safety' || formName == 'statement'){
        
                const deleted = 'deleted'
                const address = 'address'
                for(let key in formData){
            
                    if(key == address){
                        formData[key].value = fields[key][id];
                    }else if(key == deleted){
                        formData[key].value = true;
                    }
                    else{
                        formData[key].value = fields[key];
                    }
            
                    formData[key].valid = true;
                    formData[key].touched = true;
                    formData[key].validationMessage = '';
            
                }
                console.log(formData)
                }
                
                else if (formName == 'staff_desc_a' || formName == 'staff_desc_b' || formName == 'change_shift'){
                    const address = 'address'
                    const deleted = 'deleted'
                    for(let key in formData){
                
                        if(key == address){
                            formData[key].value = fields[key][id];
                        }else if(key == deleted){
                            formData[key].value = true;
                        }
                        else{
                            formData[key].value = fields[key];
                        }
                
                        formData[key].valid = true;
                        formData[key].touched = true;
                        formData[key].validationMessage = '';
                
                    }
                    console.log(formData)
                    }
                    

            else if (formName == 'days_prog' || formName == 'activity_log' || formName == 'fund_sheet' || formName == 'behave_sheet' || formName == 'attend' || formName == 'overnight' || formName == 'bowel'){
        
            const deleted = 'deleted'
            const individual = 'individual'
            const address = 'address'
            
            for(let key in formData){
                console.log([key])
                if(key == address || key == individual){
                    formData[key].value = fields[key][id];
                }else if(key == deleted){
                    formData[key].value = true;
                }
                else{
                    formData[key].value = fields[key];
                }
        
                formData[key].valid = true;
                formData[key].touched = true;
                formData[key].validationMessage = '';
        
            }
            console.log(formData)
            }
            else if (formName == 'user'){
                const deleted = 'deleted'
                const intpatogen = 'intpatogen'    
                const pathogen = 'patogen'                
                for(let key in formData){
            
                    if(key == intpatogen || pathogen){
                        formData[key].value = fields[key];
                    }else if(key == deleted){
                        formData[key].value = true;
                    }
                    else{
                        formData[key].value = fields[key];
                    }
            
                    formData[key].valid = true;
                    formData[key].touched = true;
                    formData[key].validationMessage = '';
            
                }
                console.log(formData)
                }
            else if (formName == 'userS'){
                const deleted = 'deleted'              
                for(let key in formData){
            
                    if(key == deleted){
                        formData[key].value = '1';
                    }
                    else{
                        formData[key].value = fields[key];
                    }
            
                    formData[key].valid = true;
                    formData[key].touched = true;
                    formData[key].validationMessage = '';
            
                }
                console.log(formData)
                }
            else if (formName == 'userT'){
                const deleted = 'deleted'             
                for(let key in formData){
                    
                     if(key == deleted){
                        formData[key].value = '2';
                    }
                    else{
                        formData[key].value = fields[key];
                    }
            
                    formData[key].valid = true;
                    formData[key].touched = true;
                    formData[key].validationMessage = '';
            
                }
                console.log(formData)
                }
                else if (formName == 'userR'){
                    const deleted = 'deleted'             
                    for(let key in formData){
                        
                         if(key == deleted){
                            formData[key].value = '0';
                        }
                        else{
                            formData[key].value = fields[key];
                        }
                
                        formData[key].valid = true;
                        formData[key].touched = true;
                        formData[key].validationMessage = '';
                
                    }
                    console.log(formData)
                    }
    else{
        for(let key in formData){
            const deleted = 'deleted'
            if(key == deleted){
                formData[key].value = true;
            }
            else{
            formData[key].value = fields[key];
            formData[key].valid = true;
            formData[key].touched = true;
            formData[key].validationMessage = '';
            }    
        }
    }
    
    return formData;
}