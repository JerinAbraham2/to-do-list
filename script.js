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


function checkAssignTo() {
  let button1 = document.getElementById("person1").onclick;
  let button2 = document.getElementById("person2").onclick;
  let button3 = document.getElementById("person3").onclick;
  let button4 = document.getElementById("person4").onclick;
  console.log(button1.toString());
  console.log(button2.toString());
  console.log(button3.toString());
  console.log(button4.toString());
}

// // Bind function to onclick event for checkbox
// document.getElementById('agree').onclick = function() {
//   // access properties using this keyword
//   if ( this.checked ) {
//       // Returns true if checked
//      
//   } else {
//       // Returns false if not checked
//   }
// };

/*window.onload=function(){
  alert("windows load")
document.getElementById('btn-group').addEventListener('change',confirm,false);
}*/

var checkboxes = document.querySelectorAll('input[type="checkbox"]');
var checkbox =document.getElementById('btn-group');
// var submit_btn=document.getElementById("submit-button");

function confirm(){
 
  checkboxes.forEach(function(entry) {
  //var checkbox=document.getElementById('btn-group');
 
  if(checkbox.checked){
    
    document.getElementById("chk_option_error").style.visibility = "hidden"
    document.getElementById("chk_option_ok").style.visibility = "visible"
  }
   else if(checkbox.checked==false){
      document.getElementById("chk_option_error").style.visibility = "visible"
      document.getElementById("chk_option_ok").style.visibility = "hidden"
    }
  
}
  );
}

checkboxes.forEach(function(entry) {
  entry.onchange = confirm; // Bind confirm() function on change of each checkboxes
  });



function validate() {
  document.getElementById('termsChkbx').addEventListener('click', function (e) {
  document.getElementById('sub1').disabled = !e.target.checked;
  });
} 



/*seperate function validate() to validate the checkbox button group*/
function validate() {

  var form_data = new FormData(document.querySelector("form"));
  if (!form_data.has("person[]")) //checking for the name person[] is present from the checkbox buttons
  {
    document.getElementById("chk_option_error").style.visibility = "visible"; //display invalid feedback if the checkbox isn't checked
    document.getElementById("chk_option_ok").style.visibility = "hidden"; //hide the positive feedback 
    return false;
  }
  else //if the form has person[]
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
        //validate()
      }, false)
    })
})()


