import TaskManager from './TaskManager.js'; // Importing TaskManager class

// Declaring Task Manager object
const taskManager = new TaskManager();
// DOM Elements
const formEl = document.getElementById("taskform");
let taskName = document.getElementById("taskName");

let taskTags = document.getElementsByName("tag-group");
let tagInput = document.getElementById("tag-input");
// console.log(TagInput);
// console.log(taskTags);
let taskDesc = document.getElementById("description");
let taskDueDate = document.getElementById("due-date");
let taskStatus = document.getElementById("status");
let taskAssignees = document.getElementsByName('person');

// Task 4
// return a formated current date string:"YYYY-MM-DD".
const processCurrentDate = () => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const currentDate = `${yyyy}-${mm}-${dd}`;
    return currentDate;
}
// return a formated time.
const processCurrentTime = () => {
    const today = new Date();
    let hh = today.getHours();
    const mm = today.getMinutes();
    const ss = today.getSeconds();
    let ampm = null;
    if (hh > 12) {
        hh -= 12;
        ampm = 'PM';
    } else {
        ampm = 'AM';
    }
    const currentDate = `${hh}:${mm}:${ss} ${ampm}`;
    return currentDate;
}
const getAssignee = () => {
    const assignee = Array.from(taskAssignees);
    const persons = [];
    assignee.map(person => {
        if (person.checked) {
            persons.push(person.value);
        };
    });
    return persons;
}
// Assign validation (for dynamic validation)
// Checking the change of each person's checkbox and call function 
//validateAssign() to check at least one person is checked.
//validateAssign function alone doesn't change the feedback when unchecking 
// all persons.
// render the feedback from validate to the html for "TaskName", "Descritpion", "DueDate".
// Parameter:result Object. This contains result.status:(true or false), result.feedback: feedback string.
const renderFeedback = (result, idName) => {
    const feedbackValidText = document.getElementById(`valid-${idName}`);
    const feedbackInvalidText = document.getElementById(`invalid-${idName}`);
    if (result.status === true) {
        feedbackValidText.style.display = "block";
        feedbackValidText.innerHTML = result.feedback;
        feedbackInvalidText.style.display = "none";
    } else {
        feedbackValidText.style.display = "none";
        feedbackInvalidText.style.display = "block";
        feedbackInvalidText.innerHTML = result.feedback;
    }
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

// Function for the Validatation of the DueDate
// Parameter: currentDate with format "YYYY-MM-DD".  
// Function return with reulst object that cotains Boolean values and feed back string. 
const validateDate = (currDate) => {
    const selectedDate = taskDueDate.value;
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
// validate name function
const validateTaskName = () => {
    const formName = taskName;
    const result = validateString(formName.value, 'string', 8, 100);
    //console.log(result);
    renderFeedback(result, "taskName");
    //console.log(result.status);
    return result.status;
}


const validateTaskTags = () =>{
    const arrResults = [];
    Array.from(taskTags).forEach((tag)=> {
        const result = validateString(tag.innerText, 'string', 1, 100);
        renderFeedback(result, "tag"); //render the feedback of each tag-input
        arrResults.push(result);
    })
    console.log(arrResults);

    // find if there is a false in all results for tags
    const falseResult =arrResults.some(e => e.status ===false);
    console.log(falseResult);

    
    if(falseResult) {
        console.log("valid the input format");
        return false;
    }
    else {
        return true;
    }
}

// validate description
const validateTaskDesc = () => {
    const formDesc = taskDesc;
    const result = validateString(formDesc.value, 'string', 15, 200);
    renderFeedback(result, "desc");
    return result.status;
}
// validate description
const validateTaskDate = () => {
    const result = validateDate(processCurrentDate())
    renderFeedback(result, 'date');
    return result.status;
}
const validateTaskStatus = () => {
    const statuses = taskStatus;
    let result = null
    if (statuses.options[0].selected) {
        result = { feedback: 'Please select atleast one status', status: false };
        renderFeedback(result, "status");
    } else {
        result = { feedback: 'Looks good', status: true };
        renderFeedback(result, "status");
    }
    return result.status;
}
const saveLocalData = (taskObjectArr) => {
    for (let taskObj of taskObjectArr) {
        localStorage.setItem(taskObj.taskID.toString(), JSON.stringify(taskObj));
    }
}
const disableFeedback = () => {
    const feedbackItems = ['taskName', 'desc', 'date', 'status']
    for (let i = 0; i < feedbackItems.length; i++) {
        const item = document.getElementById(`valid-${feedbackItems[i]}`)
        item.style.display = "none";
    }
    //fix bootstrap feedback
    const bootstrapFeedback = document.getElementById(`chk_option_ok`)
    bootstrapFeedback.style.visibility = "hidden";
    const assignee = Array.from(taskAssignees);
    assignee.forEach(person => person.checked = false);
    // const statuses = taskStatus;
    const selectedChoose = taskStatus;
    selectedChoose.selectedIndex = 0;
}

// Increcement ID doesn' work well. the Unique ID works better for further fucntions
// unique random id using mathematics, time and date (milliseconds)
const tId = () => {
    let id = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    id += (new Date()).getDate()
    id += (new Date()).getTime();
    return id
}


// If the saved task have ID already. keep the old by passing the ID 
// if it is a new task create a new uniqe ID by id ="needNewid";
// console.log(placeholder);
//create task object 
const taskObject = (id, taskName, taskDescription, assignee, dueDate, status) => {
    if(id === 'needNewid')
    return {
        taskID: tId(),
        taskName: taskName,
        taskDescription: taskDescription,
        assignee: assignee,
        dueDate: dueDate,
        status: status
    }
    else{
    return{
        taskID: id,
        taskName: taskName,
        taskDescription: taskDescription,
        assignee: assignee,
        dueDate: dueDate,
        status: status
    
    }
    }
}
const validateTaskForm = () => {
    const checkAllTrue = [];
    // push validation to validation array
    checkAllTrue.push(validateTaskName(),validateTaskTags(), validateTaskDesc(), validateAssign(), validateTaskDate(), validateTaskStatus());
    // look at each element, and see if they passed
    return checkAllTrue.every((item) => item);
}
const closeForm = () => {
    const addTaskButton = document.getElementById('submit-button');
    addTaskButton.setAttribute('data-dismiss', 'modal');
    addTaskButton.click();
    addTaskButton.removeAttribute('data-dismiss');
}
// a major function to validate forms. calling other fucntion to validate each individual
// category: "TaskName", "Description", "AssignTO", "DueDate" and update with the validate
// feedback

const getImage = async (taskName) => {
    const url = `https://api.unsplash.com/search/photos/?query=html&client_id=CyDgrDAy7EetBVsCAWcB5zosSiHDpcx1LVIygKrWkDw`
    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson);
    return responseJson.results[0].urls.regular
}

const main = async (e) => {
    // prevent it from refreshing
    e.preventDefault();
    // array to verify if all validation has passed
    const passedTrue = validateTaskForm();
    // special function to get array of assignees 
    const taskAssignee = getAssignee();
    // check if passed validation
    if (passedTrue) {
        // Create a task object (with special assignee value of persons)
        const task = taskObject('needNewid',taskName.value, taskDesc.value, taskAssignee, taskDueDate.value, taskStatus.value);
        // add task to manager
        taskManager.addTask(task);
        // Get HTML image
        const image = await getImage(taskName.value);
        // Create HTML for task
        const taskHTML = createTaskHTML(task);
        // render task
        taskManager.render(taskHTML);
        // reset the values on the form after submit
        taskName.value = taskDesc.value = taskDueDate.value = taskStatus.value = "";
        // saving the data to local storage
        saveLocalData(taskManager.getAllTasks());
        // disabling the feedback
        disableFeedback();
        // Special function to make form disappear with bootstrap
        closeForm();

    }
};
// Task 5 - Date object
const createDate = () => {
    // const currentDate = new Date();
    const headerDateEl = document.getElementById("header-date");
    headerDateEl.innerHTML = processCurrentDate().split('-').join('/') + "<br> " + processCurrentTime();
    setTimeout(createDate, 1000)
}
createDate();
// Event listeners here
formEl.addEventListener("submit", main);
taskName.addEventListener("input", validateTaskName);
tagInput.addEventListener("click", validateTaskTags);
taskDesc.addEventListener("input", validateTaskDesc);
taskDueDate.addEventListener("change", validateTaskDate);
taskStatus.addEventListener("change", validateTaskStatus);
Array.from(taskAssignees).forEach((element) => {
    element.addEventListener('change', validateAssign);
});


// Create the HTML element.
const createTaskHTML = (taskObj) => {

    // const src = 
    const cardTemplateHTML = `
        <img src="resources/images/phone.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
        <h5 class="card-title"> ${taskObj.taskName} </h5>
        <p class="card-text">${taskObj.taskDescription}
        </p>
        <div class="alert alert-info card-date" role="alert">
            Due: ${taskObj.dueDate}
        </div>
        <div class="status-assign">
            <span class="badge rounded-pill text-bg-info card-status">${taskObj.status}</span>
            <span class="badge text-bg-light">${taskObj.assignee}</span>
        </div>
        <a href="#" class="btn btn-primary">Delete task</a>
        </div>`
    return cardTemplateHTML;
};


// // Read json file from saved objects
const readFromJson = async (filePath) => {

    const response = await fetch(filePath)
    const json = await response.json();
    return json;
}

// Render pre-saved taskobjects in both localstorage and json file.
const renderSavedTasks = async () => {

    const temp = await readFromJson('./preLoadTasks.json');
    const ls = localStorage;

    //render all task from local Storage and find same task in json file/
    let overLapArr = [];
    for (let i = 0; i < ls.length; i++) {
        const key = ls.key(i)
        // console.log(key);
        const object = JSON.parse(ls.getItem(key));
        // console.log(object);
        // console.log(temp.length)
        // console.log(typeof(temp));
        for (let savedindex in temp) {
            // console.log(savedindex);
            // if saved task in the local storage store the index in array
            if(savedindex===key) {
                overLapArr.push(savedindex);
            }
        }     
        const task = taskObject(key,object.taskName, object.taskDescription, object.assignee, object.dueDate, object.status);
        // add task to manager
        taskManager.addTask(task);
        // Create HTML for task
        const taskHTML = createTaskHTML(task);
        // render task
        taskManager.render(taskHTML);
    }

    // console.log(overLapArr);
    let savedArry = []; 
    // only render the tasks not in the local storage
    for (let savedindex in temp) {
        // console.log(savedindex);
        savedArry.push(savedindex);
    }

    // Find the index for the preload task which are missing from local storage.
    let diffArr = savedArry.filter(el => !overLapArr.includes(el));

    // / only render saved task which is not in the local storage 
    for (let diffIdex of diffArr) {
        const diffObj=temp[diffIdex];
        // console.log(diffObj.taskDescription);
        const diffSavedTask = taskObject(diffIdex ,diffObj.taskName, diffObj.taskDescription, diffObj.assignee,diffObj.dueDate, diffObj.status);
        // console.log(diffSavedTask);
        taskManager.addTask(diffSavedTask);
        // console.log(taskManager.getAllTasks());
        // Create HTML for task
        const taskHTML = createTaskHTML(diffSavedTask);
        // render task
        taskManager.render(taskHTML);  
    }
}
renderSavedTasks();