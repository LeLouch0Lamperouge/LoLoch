document.getElementById("go").onclick = function() {filterFunction()};

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    div = document.getElementById("myMenu");
    a = div.getElementsByTagName("div");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }


  document.querySelector('#searchBar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      var input, filter, ul, li, a, i;
      input = document.getElementById("searchBar");
      filter = input.value.toUpperCase();
      div = document.getElementById("myMenu");
      a = div.getElementsByTagName("div");
      for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
        } else {
          a[i].style.display = "none";
        }
      }
  
    }
  });