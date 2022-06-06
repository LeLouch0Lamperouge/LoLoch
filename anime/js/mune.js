
document.addEventListener("click", function(event) {
    if (event.target.matches("#main-menus") ) {
        document.getElement("body").classList.add("menu-ope");
        document.getElementById("main-menus").classList.remove("active");
        document.getElementById("main-menus").style.display = "sticky ";
    }
},
  false
);






document.addEventListener("click", function(event) {
  if (event.target.matches("#myWatchMenu") ) {
      document.getElementById("sub_myWatchMenu").style.display = "block ";
  }
},
false
);

