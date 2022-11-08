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


// Validation for forms with bootstrap classes.
(function () {
  'use strict'


  var forms = document.querySelectorAll('.needs-validation');
  let checkboxSelector = document.querySelectorAll('.mincheckbox-validator input[type="checkbox"]');
  let minimumChecked = 0;

  Array.prototype.slice.call(forms)
  .forEach(function (form) {
      form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
      }


      form.classList.add('was-validated')
      }, false)
  })


})()



// Separtae validation for the assign to without bootstrap support.
function checkAssignTo() {
  var checkboxes  = document.getElementsByName('person');
  var hasChecked  = false;
  
  for(var i = 0; i < checkboxes.length; i++){
    if (checkboxes[i].checked){
      hasChecked = true;
      break;
    }
  }
  if (hasChecked == false)
  {
      alert("please select at least one person to assign to.")
      return false;
  }
return true;
}


function checkButton() {
  var checkboxes  = document.getElementsByName('person');
  var hasChecked  = false;
  
  for(var i = 0; i < checkboxes.length; i++){
    if (checkboxes[i].checked){
      hasChecked = true;
      // please insert vaild feedback here
      //  "OK"  visiable;
      // "Error" invisible; 
    }
  }
  if (hasChecked == false)
  {
      // please insert vaild feedback here
      //  "OK"  invisable;
      // "Error" visible; 
      return false;
  }
return true;
}

// Jira prefix testing
// Jira prefix test 2