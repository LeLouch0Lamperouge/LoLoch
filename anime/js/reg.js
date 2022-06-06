
document.addEventListener("click", function(event) {
    if (event.target.matches("#LoginFormClose") || !event.target.closest(".conta") ) {
        document.getElementById("LogineForms").style.display = "none";
    }
},
    false
);
document.addEventListener("click", function(event) {
    if (event.target.matches("#logoinForm") ) {
        document.getElementById("LogineForms").style.display = "block";
        document.getElementById("bodyMan").classList.remove("menu-ope");
        document.getElementById("main-menu").classList.remove("active");
    }
},
  false
);


document.addEventListener("click", function(event) {
    if (event.target.matches("#SignupFormClose") || !event.target.closest(".conta") ) {
        document.getElementById("SignupForms").style.display = "none";

    }
},
    false
);
document.addEventListener("click", function(event) {
    if (event.target.matches("#signoup") ) {
        document.getElementById("SignupForms").style.display = "block";
        document.getElementById("bodyMan").classList.remove("menu-ope");
        document.getElementById("main-menu").classList.remove("active");
    }
},
  false
);

document.addEventListener("click", function(event) {
    if (event.target.matches("#loginations") ) {
        document.getElementById("SignupForms").style.display = "none";
        document.getElementById("LogineForms").style.display = "block";
        document.getElementById("bodyMan").classList.remove("menu-ope");
        document.getElementById("main-menu").classList.remove("active");
    }
},
  false
);

document.addEventListener("click", function(event) {
    if (event.target.matches("#registertations") ) {
        document.getElementById("SignupForms").style.display = "block";
        document.getElementById("LogineForms").style.display = "none";
        document.getElementById("bodyMan").classList.remove("menu-ope");
        document.getElementById("main-menu").classList.remove("active");
    }
},
  false
);

function myMenu() {
    var x = document.getElementById('starous');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    }