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

  if (typeof (taskName) !== 'string') {
    return 'Please insert text for your task.'

  }
  if (taskName.length <= 8) {
    return 'Please insert text over 8 characters.'
  }
  if (taskName.length > 200) {
    return 'Please insert text less than 200 characters.'
  }
  return "The format is good!"
};

const validateDesc = (Desc) => {

  if (typeof (Desc) !== 'string') {
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

  if (typeof (Assigned) !== 'string') {
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

  if (typeof (Assigned) !== 'Date') {
    return 'Please insert text for your task.'

  }
  if (Assigned.length <= currDate) {
    return 'Please insert longer text over 8 characters.'
  }

  return "The format is good!";
};

// Assign validation

// Checking each person's checkbox
const checkAssignChange = () => {
  let persons = document.getElementsByName('person');
  Array.from(persons).forEach((element) => {
    element.addEventListener('change', validateAssign);
  })
}

/*seperate function validate() to validate the checkbox button group*/
// adopt the validate function for each individual person.
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
}



const validateEachInput = (validatedString, input) => {
  if (validatedString === "The format is good!") {
    document.getElementById(`valid-${input}`).style.display = "block";
    document.getElementById(`valid-${input}`).innerHTML = validatedString;
    document.getElementById(`invalid-${input}`).style.display = "none";
  } else {
    document.getElementById(`valid-${input}`).style.display = "none";
    document.getElementById(`invalid-${input}`).style.display = "block";
    document.getElementById(`invalid-${input}`).innerHTML = validatedString;
  }
}


const validateForm = (e) => {
  e.preventDefault();
  // name
  const formName = document.getElementById("name");
  validateEachInput(validateName(formName.value), "name");
  // description
  const formDesc = document.getElementById("description");
  validateEachInput(validateDesc(formDesc.value), "desc");

  // assign to
  checkAssignChange();
  validateAssign()

  // date
  const today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  currentDate = `${yyyy}-${mm}-${dd}`;

  const selectedDate = document.getElementById("due-date").value;

  if (selectedDate >= currentDate) {
    validateEachInput("Looks good", "date")
  } else {
    validateEachInput("Cannot set that date", "date")
  }


};
const formEl = document.getElementById("taskform");
formEl.addEventListener("submit", validateForm)










// document.getElementById("dateInput").addEventListener("submit", function() {
//     var input = this.value;
//     var dateEntered = new Date(input);
//     console.log(input); //e.g. 2015-11-13
//     console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
// });

