function openTheForm() {
    document.getElementById("form-id").style.display = "flex";
}
  
  function closeTheForm() {
    document.getElementById("form-id").style.display = "none";
}

  function openCardsPanel() {
    document.getElementById("main-section").style.display = "block";
}
  
  function closeCardsPanel() {
    document.getElementById("main-section").style.display = "none";
}

  function validationForm() {
    // Get the values of the input field with id=""
    let name        = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let assignTo    = document.getElementById("assignto").value;
    let dueDay      = document.getElementById("due").value;
    let option      = document.getElementById("satus").value;


    // If name is Not a letter or less than 3 charactors or greater than 100 charactors
    let nameRegex = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/;
    if (name.match(nameRegex) &&  2 < name.length < 101) {
        text = "Input success";
        closeTheForm();
        openCardsPanel();
    } else {
        text = "Requres name";
    }
    document.getElementById("demo").innerHTML = text;

    let desciptRegex = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/;
    if (name.match(nameRegex) &&  2 < name.length < 101) {
        text = "Input success";
        closeTheForm();
        openCardsPanel();
    } else {
        text = "Requres name";
    }
    document.getElementById("demo").innerHTML = text;
}
}

