


document.addEventListener("click", function(event) {
    if (event.target.matches("#seasonss") ) {
        document.getElementById("episodess").classList.remove("active");
        document.getElementById("seasonss").classList.add("active");
    
        document.getElementById("dojengo1").style.display = "none";
        document.getElementById("dojengo2").style.display = "block";
    }
  },
  false
  );
  

  document.addEventListener("click", function(event) {
    if (event.target.matches("#episodess") ) {
        document.getElementById("seasonss").classList.remove("active");
        document.getElementById("episodess").classList.add("active");
    
        document.getElementById("dojengo2").style.display = "none";
        document.getElementById("dojengo1").style.display = "block";
        document.getElementById("dojengo3").style.display = "block";
    }
  },
  false
  );


  document.addEventListener("click", function(event) {
    if (event.target.matches("#passShow") ) {
        document.getElementById("passe1").type = "text";
        document.getElementById("passShow").style.display = "none";
        document.getElementById("passHide").style.display = "block";
    }
  },
  false
  );


  document.addEventListener("click", function(event) {
    if (event.target.matches("#passHide") ) {
        document.getElementById("passe1").type = "password";
        document.getElementById("passShow").style.display = "block";
        document.getElementById("passHide").style.display = "none";
    }
  },
  false
  );

  document.addEventListener("click", function(event) {
    if (event.target.matches("#passShow2") ) {
        document.getElementById("passe2").type = "text";
        document.getElementById("passShow2").style.display = "none";
        document.getElementById("passHide2").style.display = "block";
    }
  },
  false
  );


  document.addEventListener("click", function(event) {
    if (event.target.matches("#passHide2") ) {
        document.getElementById("passe2").type = "password";
        document.getElementById("passShow2").style.display = "block";
        document.getElementById("passHide2").style.display = "none";
    }
  },
  false
  );