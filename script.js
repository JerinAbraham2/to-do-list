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

// Anonymous function in Javascript that work as inline <script> or 
// work within the other fucntion call
(function () {
  'use strict'


  var forms = document.querySelectorAll('.needs-validation');
  let checkboxSelector = document.querySelectorAll
  ('.mincheckbox-validator input[type="checkbox"]');
  let minimumChecked = 1;

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

  checkboxSelector.forEach(function(index){
    if (index.checked == true){
      minimumChecked--;
      console.log(minimumChecked);
    }
  })
  if(minimumChecked <=0) {
          this.submit();
  }
  else{
          alert("Please check minimum " + minimumChecked + "more checkboxes");
  }

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
// };