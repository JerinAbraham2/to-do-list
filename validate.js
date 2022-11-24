 import TaskManager from './TaskManager.js';
 const taskManager = new TaskManager();
console.log(taskManager)
// Click create task : open the form and close the main-section on html

// Task 4 

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
    //console.log(today)
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const currentDate = `${yyyy}-${mm}-${dd}`;
    return currentDate
}

const processCurrentTime = () => {
    const today = new Date();
    const hh = today.getHours();
    const mm = today.getMinutes();
    const ss = today.getSeconds();
    let ampm = null;
    if (hh >= 12) {
        ampm = 'PM';
    } else {
        ampm = 'AM';
    }

    const currentDate = `${hh}:${mm}:${ss} ${ampm}`;
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
    const result=validateString(formName.value, 'string', 8, 100);
    //console.log(result);
    renderFeedback(result, "taskName");
    //console.log(result.status);
    return result.status;
}
// validate description
const validateDesc = () => {
    const formDesc = document.getElementById("description");
    const result=validateString(formDesc.value, 'string', 15, 200);
    //renderFeedback(validateString(formDesc.value, 'string', 15, 200), "desc");
    renderFeedback(result,"desc");
    //console.log(result.status);
    return result.status;
}
// validate description
const validateTaskDate = () => {
    const result = validateDate(processCurrentDate())
    renderFeedback(result, 'date');
    //console.log(result.status);
    return result.status;
}

const validateStatus = () => {
    const statuses = document.getElementById("status");
    let result = null
    if (statuses.options[0].selected) {
         result = { feedback: 'Please select atleast one status',status:false };
        renderFeedback(result, "status");
    } else {
         result = { feedback: 'Looks good',status:true };
        renderFeedback(result, "status");
    }
    return result.status;
}


// a major function to validate forms. calling other fucntion to validate each individual
// category: "TaskName", "Description", "AssignTO", "DueDate" and update with the validate
// feedback

const validateForm = (e) => {
    e.preventDefault();
    const checkAllTrue =[];
    // Task Name
    checkAllTrue.push(validateTaskName());

    // description
    checkAllTrue.push(validateDesc());

    // assign to
    checkAllTrue.push(validateAssign());

    // date
    checkAllTrue.push(validateTaskDate());

    //Status
    checkAllTrue.push(validateStatus());

   // console.log(taskManager);
    const passedTrue=checkAllTrue.every((el)=>el)
    console.log(document.getElementById("taskName").value);
    console.log(passedTrue)
   taskManager.addTask();
};

const formEl = document.getElementById("taskform");
formEl.addEventListener("submit", validateForm);

// Task 5 - Date object
const createDate = () => {

    // const currentDate = new Date();
    const headerDateEl = document.getElementById("header-date");
    headerDateEl.innerHTML = processCurrentDate().split('-').join('/') + "<br> " + 
    
    processCurrentTime();

    setInterval(createDate, 1000)

}

createDate();



// const createTask = document.getElementById('buttontask');

// createTask.addEventListener('click', openTheForm);
//console.log(createTask.value);

document.getElementById("taskName").addEventListener("input", validateTaskName);

document.getElementById("description").addEventListener("input", validateDesc);

document.getElementById("due-date").addEventListener("change", validateTaskDate);

document.getElementById("status").addEventListener("change", validateStatus);

//create task object

const taskObject=(taskName,taskDescription,assignee,dueDate,status) => {
  const uid = (() => (id = 0, () => id++))();
  return {
    userID: uid(),
    taskName: "",
    taskDescription: "",
    assignee: [],
    dueDate: "",
    status:""
  }
}

