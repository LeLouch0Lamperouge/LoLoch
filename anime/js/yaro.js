$('#AddWatchedMenu2').on('click' , function(){
    Swal.fire({
        title: 'لاستخدام هذه الميزه قم بتسجيل الدخول اولا',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'تسجيل الدخول',
        denyButtonText: 'إنشاء حساب'
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("LogineForms12").style.display = "block";
        }else if (result.isDenied) {
          document.getElementById("SignupForms12").style.display = "block";
        }
      })
});


document.addEventListener("click", function(event) {
  if (event.target.matches("#MyWatchMenuClose") || !event.target.closest(".conta") ) {
      document.getElementById("MyWatchMenu").style.display = "none";
  }
},
  false
);
document.addEventListener("click", function(event) {
  if (event.target.matches("#AddWatchedMenu") ) {
      document.getElementById("MyWatchMenu").style.display = "block";
  }
},
false
);

document.getElementById("LoginFormClose12").addEventListener("click", myCloseFunction1);

function myCloseFunction1() {
  document.getElementById("LogineForms12").style.display = "none";
}

document.getElementById("SignupFormClose12").addEventListener("click", myCloseFunction2);

function myCloseFunction2() {
  document.getElementById("SignupForms12").style.display = "none";
}