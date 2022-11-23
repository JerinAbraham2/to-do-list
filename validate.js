const openTheForm = () => {
    document.getElementById("form-id").style.display = "flex";
    document.getElementById("main-section").style.display = "none";
};

const longString = 'Create a javascript fileOne of those farmers is Brian Barry, a grain grower south of Manangatang' + 
'who now faces a 120-kilometre detour to access the local Graincorp that is just 10km away He said the closure of the' +
'Robinvale-Sea Lake Road was creating a lot of problems.s a major transport route for' +
 'grain and irrigat ruit and vegetables out of the Robinvale-Wemen area, Mr Barry said.' +
 'Create a javascript fileOne of those farmers is Brian Barry, a grain grower south of Manangatang' + 
'who now faces a 120-kilometre detour to access the local Graincorp that is just 10km away He said the closure of the' +
'Robinvale-Sea Lake Road was creating a lot of problems.s a major transport route for' +
 'grain and irrigat ruit and vegetables out of the Robinvale-Wemen area, Mr Barry said.'

const validateName = (taskName) => {

    if (typeof (taskName) !== 'string'){
        return [false, 'Please insert text for your task.']

    }
    if (taskName.length <= 8) {
        return [false, 'Please insert text for your task.']
    } 
    if (taskName.length > 200) {
        return [false, 'Please insert text for your task.']
    }
    
    return [true, 'Please insert text for your task.']
};

const value = validateName(); 





const validate_form(value) {
    const status = value[0];
    const string = value[1];

    if(status){
        
    }

]}




const validateDesc = (Desc) => {

    if (typeof (Desc) !== 'string'){
        return 'Please insert description text for your task.'

    }
    if (Desc.length <= 15) {
        return 'Please insert text over 15 characters.'
    } 
    if (Desc.length > 300) {
        return 'Please insert text less than 200 characters.'
    }
    
    return "The format is good!";
};


const validateAssignedTo = (Assigned) => {

    if (typeof (Assigned) !== 'string'){
        return 'Please insert description text for your task.'

    }
    if (Assigned.length <= 8) {
        return 'Please insert longer text over 8 characters.'
    } 
    if (Assigned.length > 200) {
        return 'Please insert longer text less than 200 characters.'
    }
    
    return "The format is good!";
};

const validateDueDate = (Duedate, currDate) => {

    if (typeof (Assigned) !== 'Date'){
        return 'Please insert text for your task.'

    }
    if (Assigned.length <= currDate) {
        return 'Please insert longer text over 8 characters.'
    } 

    return "The format is good!";
};

console.log(validateName(longString));


const validateForm = (e) => {
    try{
        e.preventDefault()
        e.stopPropagation()
        console.log(validateName('Create a javascript file'));
        // validatesDesc();
        // validatesAssinedTo();
    }
    catch(error){
            console.log(error);
        }
};

// document.getElementById("dateInput").addEventListener("submit", function() {
//     var input = this.value;
//     var dateEntered = new Date(input);
//     console.log(input); //e.g. 2015-11-13
//     console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
// });




