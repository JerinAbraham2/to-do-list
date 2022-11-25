function openTheForm() {
  document.getElementById("form-id").style.display = "flex";
}

function closeTheForm() {
  document.getElementById("form-id").style.display = "none";
}

function openCardsPanel() {
  document.getElementById("main-section").style.display = "flex";
}


function closeCardsPanel() {
  document.getElementById("main-section").style.display = "none";
}


// Checking each person's checkbox
let persons = document.getElementsByName('person');
Array.from(persons).forEach((element) => {
  element.addEventListener('change', validate);
})

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


(function () { //function initiated by submit click, to validate the user entries
  'use strict'

  var forms = document.querySelectorAll('.needs-validation') //extract the fields from the form class for validation

  Array.prototype.slice.call(forms)
    .forEach(function (forms) {
      forms.addEventListener('submit', function (event) {
        if (!forms.checkValidity()) {

          event.preventDefault() //stop executing
          event.stopPropagation()
          //validate()
          forms.classList.add('was-validated')
        }

        if (validate() == false) { //check for checkbox button group has been checked separately via validate() function
          event.preventDefault()
          event.stopPropagation()
        }

      }, false)
    })
})()