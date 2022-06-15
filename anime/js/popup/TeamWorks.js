document.addEventListener("click", function(event) {
    if (event.target.matches("#LoLochTeamWorks") ) {
        document.getElementById("TeamWorks").style.display = "block";
    }
},
  false
);
document.addEventListener("click", function(event) {
    if (event.target.matches("#TeamWorksClose") ) {
        document.getElementById("TeamWorks").style.display = "none";
    }
},
    false
);