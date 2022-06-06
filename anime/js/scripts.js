  $(document).ready(function(){

    $(window).scroll(function(){
      if(window.innerWidth<=980){

      if(this.scrollY > 20){
        $(".navbar").addClass("sticky");
        $(".itatchi").addClass("addso");
        $(".bellos").addClass("notification_bell");
        $(".goTop").fadeIn();
      }
      else{
        $(".navbar").removeClass("sticky");
        $(".itatchi").removeClass("addso");
        $(".bellos").removeClass("notification_bell");
        $(".goTop").fadeOut();
      }
    }});

    $(".goTop").click(function(){scroll(0,0)});

    $('.menu-toggler').click(function(){
      $(this).toggleClass("active");
      $(".navbar-menu").toggleClass("active");
    });

    $(".works").magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery:{enabled:true}
    });
  });

