$(document).ready(function(){
    var glide = new Glide('.home-slider', {
        type: 'carousel',
        autoplay: 7000,
        animationDuration: 1000,
        hoverpause: true,
        perView: 6,
        rewind:true,
        gap: 0,
        direction: 'rtl',
        breakpoints :{
            1300: {perView: 5},
            1024: {perView: 4},
            990:  {perView: 3},
            650:  {perView: 2},
            370:  {perView: 1},
        }
    });
    glide.mount();    
});
