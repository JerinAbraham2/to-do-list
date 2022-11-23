// Click create task : open the form and close the main-section on html
const openTheForm = () => {
    document.getElementById("form-id").style.display = "flex";
    document.getElementById("main-section").style.display = "none";
};

// validateString function to validate the "TaskName" and "Description"
// Parameters with 1. form input.  2.expected dataType, 3 minimum length of input string 
// 4 maximum length of input string .
// Function return with reulst object that cotains Boolean values and feed back string.
const validateString = (input, dataType, minLength, maxLength) => {

    let result = { status: false, feedback: '' };
    if (typeof (input) !== dataType) {
        result.status = false
        result.feedback = 'Please insert text for your task.'
        return result;
    }
    if (input.length <= minLength) {
        result.status = false;
        result.feedback = `Please insert text over ${minLength} characters.`;
        return result;
    }
    if (input.length > maxLength) {
        result.status = false;
        result.feedback = `Please insert text less than ${maxLength} characters.`;
        return result;
    }
    result.status = true;
    result.feedback = "The format is good!";
    return result;
};

// Separation of concern for current date processing
// return a formated current date string:"YYYY-MM-DD".
const processCurrentDate = () => {
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    currentDate = `${yyyy}-${mm}-${dd}`;
    return currentDate
}

// Function for the Validatation of the DueDate
// Parameter: currentDate with format "YYYY-MM-DD".  
// Function return with reulst object that cotains Boolean values and feed back string. 
const validateDate = (currDate) => {
    const selectedDate = document.getElementById("due-date").value;
    let result = { status: false, feedback: '' };
    if (selectedDate >= currDate) {
        result.status = true;
        result.feedback = "The date is valid.";
        return result;
    } else {
        result.status = false;
        result.feedback = "Cannot set the date earlier than today";
        return result;
    }
};


// Assign validation (for dynamic validation)
// Checking the change of each person's checkbox and call function 
//validateAssign() to check at least one person is checked.
//validateAssign function alone doesn't change the feedback when unchecking 
// all persons.
const checkAssignChange = (() => {
    let persons = document.getElementsByName('person');
    Array.from(persons).forEach((element) => {
        element.addEventListener('change', validateAssign);
    })
})()

//the validateAssign function only check at least one person click and offerfeedback.
// doesn't update the change. requires the assistence from function checkAssignChange().
function validateAssign() {
    var form_data = new FormData(document.querySelector("form"));
    if (!form_data.has("person")) //checking for the name person[] is present from the checkbox buttons
    {
        document.getElementById("chk_option_error").style.visibility = "visible"; //display invalid feedback if the checkbox isn't checked
        document.getElementById("chk_option_ok").style.visibility = "hidden"; //hide the positive feedback 
        return false;
    }
    else //if the form has person
    {
        document.getElementById("chk_option_error").style.visibility = "hidden"; //hide the invalid feedback
        document.getElementById("chk_option_ok").style.visibility = "visible"; //display the positive feedback
    }
    return true;
};

// render the feedback from validate to the html for "TaskName", "Descritpion", "DueDate".
// Parameter:result Object. This contains result.status:(true or false), result.feedback: feedback string.
const renderFeedback = (result, idName) => {
    if (result.status === true) {
        document.getElementById(`valid-${idName}`).style.display = "block";
        document.getElementById(`valid-${idName}`).innerHTML = result.feedback;
        document.getElementById(`invalid-${idName}`).style.display = "none";
    } else {
        document.getElementById(`valid-${idName}`).style.display = "none";
        document.getElementById(`invalid-${idName}`).style.display = "block";
        document.getElementById(`invalid-${idName}`).innerHTML = result.feedback;
    }
};



// validate name function
const validateTaskName = () => {
    const formName = document.getElementById("taskName");
    renderFeedback(validateString(formName.value, 'string', 8, 100), "taskName");
}
// validate description
const validateDesc = () => {
    const formDesc = document.getElementById("description");
    renderFeedback(validateString(formDesc.value, 'string', 15, 200), "desc");
}
// validate description
const validateTaskDate = () => {
    renderFeedback(validateDate(processCurrentDate()), 'date');
}

const validateStatus = () => {
    const statuses = document.getElementById("status");
    if (statuses.options[0].selected) {
        const result = { feedback: 'Please select atleast one status' };
        renderFeedback(result, "status");
    } else {
        const result = { feedback: 'Looks good' };
        renderFeedback(result, "status");
    }
}


// a major function to validate forms. calling other fucntion to validate each individual
// category: "TaskName", "Description", "AssignTO", "DueDate" and update with the validate
// feedback

const validateForm = (e) => {
    e.preventDefault();
    // Task Name
    validateTaskName();

    // description
    validateDesc();

    // assign to
    validateAssign();

    // date
    validateTaskDate();

    //Status
    validateStatus();
};

const formEl = document.getElementById("taskform");
formEl.addEventListener("submit", validateForm);

