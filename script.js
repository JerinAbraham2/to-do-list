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





// function checkAssignTo() {
//   var checkboxes = document.querySelectorAll("input"[type])
// }

// var person1_name, person2_name, person3_name, person4_name = null;
// var person1_status, person2_status, person3_status, person4_status = false;
// var result = [false,'no-person'];




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






// function checkAssignTo() {
//     let checkboxes = document.getElementById("person1");
//     let checkbox2 = document.getElementById("person2");
//     let checkbox3 = document.getElementById("person3");
//     let checkbox4 = document.getElementById("person4");  


//     result = checkbox1.addEventListener('change', function(e) {
//     console.log(typeof(checkbox1.checked), typeof(checkbox1.value));
//     if (checkbox1.checked===true){
//       console.log("chekced");
//     }
//     else {
//       console.log("Not checked");
//     }

    // person1_status=checkbox1.checked;
    // person1_name=checkbox1.value;
    // return(person1_status,person1_name)
    // });result= [checkbox1.checked, checkbox1.value];
    // return result;
    // console.log(result);
    

    // checkbox2.addEventListener('change', function(e) {
    // console.log(checkbox2.checked, checkbox2.value);
    // // person2_status=checkbox2.checked;
    // // person2_name=checkbox2.value;
    // });
    // checkbox3.addEventListener('change', function(e) {
    // console.log(checkbox3.checked, checkbox3.value);
    // // person3_status=checkbox1.checked;
    // // person3_name=checkbox1.value;
    // });
    // checkbox4.addEventListener('change', function(e) {
    // console.log(checkbox4.checked, checkbox4.value);
    // // person4_status=checkbox1.checked;
    // // person4_name=checkbox1.value;
    // });

    // console.log(person1_status,person1_name);
    // person1_name = null;
    // person1_status = false; 

    // 


//   }
// console.log(result[0]);

// Anonymous function in Javascript that work as inline <script> or 
// work within the other fucntion call
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

// // Bind function to onclick event for checkbox
// document.getElementById('agree').onclick = function() {
//   // access properties using this keyword
//   if ( this.checked ) {
//       // Returns true if checked
//       alert( this.value );
//   } else {
//       // Returns false if not checked
//   }
// }