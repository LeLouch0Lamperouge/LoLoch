document.addEventListener("click", function(event) {
    if (!event.target.closest("#contapasta1") ) {
        document.getElementById("animes1").style.display = "none";
    }
},
    false
);
document.addEventListener("click", function(event) {
    if (event.target.matches(".animes1") || event.target.matches(".animes_imagess") ) {
        document.getElementById("animes1").style.display = "block";
    }
},
  false
);


document.addEventListener("click", function(event) {
    if (!event.target.closest("#contapasta2") ) {
        document.getElementById("animes6").style.display = "none";
    }
},
    false
);
document.addEventListener("click", function(event) {
    if (event.target.matches(".animes6") || event.target.matches(".animes_imagess6") ) {
        document.getElementById("animes6").style.display = "block";
    }
},
  false
);



document.addEventListener("click", function(event) {
    if (!event.target.closest("#contapasta") ) {
        document.getElementById("uploupadImage").style.display = "none";
    }
},
    false
);
document.addEventListener("click", function(event) {
    if (event.target.matches("#pacros") ) {
        document.getElementById("uploupadImage").style.display = "block";
    }
},
  false
);




document.addEventListener("click", function(event) {
  if (event.target.matches("#id_copy") ) {
    var copyText = document.getElementById("my_ids");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();

  }
},
false
);



let posts = document.getElementsByClassName("parsts");
let myBtn = document.getElementsByClassName("mycaracter_fav_input");

function hideOtherPosts(postNumber) {
    for(let i=0; i<posts.length; i++) {
        if(i == postNumber) {
            continue;
        }
        posts[i].style.display = "none";
        myBtn[postNumber].click();
        //console.log(bast);
    }

}

let kaitor = document.getElementsByClassName("kaitor");
let myBtso = document.getElementsByClassName("myanime_fav_input");

function hpdeOtherPosts2(postNumber2) {
    for(let j=0; j<kaitor.length; j++) {
        if(j == postNumber2) {
            continue;
        }
        kaitor[j].style.display = "none";
        myBtso[postNumber2].click();
        //console.log(bast);
    }

}


let xy = document.getElementById("animeso0");
let yl = document.getElementById("animeso1");
let hn = document.getElementById("animeso2");
let zo = document.getElementById("animeso3");
let eax = document.getElementById("episode-block1");
let ear = document.getElementById("episode-block2");
let eah = document.getElementById("episode-block3");

let ab = document.getElementById("crearcteroso");
let ba = document.getElementById("crarcterso1");
let cd = document.getElementById("crarcterso2");
let fk = document.getElementById("crarcterso3");
let il = document.getElementById("episode-black1");
let ct = document.getElementById("episode-black2");
let ks = document.getElementById("episode-black3");

if(eax !== null) {
    xy.style.display = "none";
}
if(ear !== null) {
    yl.style.display = "none";
}
if(eah !== null) {
    hn.style.display = "none";
    zo.style.display = "none";
}
if(il !== null) {
    ab.style.display = "none";
}
if(ct !== null) {
    ba.style.display = "none";
}
if(ks !== null) {
    cd.style.display = "none";
    fk.style.display = "none";
}
