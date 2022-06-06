function CloseTrailer()
{
    $(".PopupTrailer").removeClass('Opened').find(".content").html(spinnerLoad);
}
jQuery(document).ready(function($) {
    $('[data-src]').each(function () {
        var backgroundImage = $(this).attr('data-src');
        $(this).attr('src', backgroundImage);
        $(this).removeAttr("data-src");
    });	
});
$(document).ajaxSuccess(function(){
    $('[data-src]').each(function () {
        var backgroundImage = $(this).attr('data-src');
        $(this).attr('src', backgroundImage);
        $(this).removeAttr("data-src");
    });	
});
$(window).ajaxComplete(function(){
    $('[data-src]').each(function () {
        var backgroundImage = $(this).attr('data-src');
        $(this).attr('src', backgroundImage);
        $(this).removeAttr("data-src");
    });	
});
spinnerLoad = $('<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
$("body").on('click', '.loadEpisodes', function(event) {
    event.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    $(this).parent().addClass('active');
    $(".episodes-list").append(spinnerLoad);
    $.ajax({
        url: '#',
        type: 'POST',
        dataType: 'html',
        data: {currentSeason: $(this).data('slug')},
        success:function(requesetResponse){
            $(".loadEpisodes").remove();
            $(".episodes-list").find(".spinner").remove();;
            $(".episodes-list").append(requesetResponse);
        }
    });
});
$("body").on('click', '.allseasonstab ul li', function(event) {
    event.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    $(".episodes-list").html('<h3>جارى التحميل ....</h3>');
    $(this).parent().addClass('active');
    $.ajax({
        url: '#',
        type: 'POST',
        dataType: 'html',
        data: {season: $(this).data('id')},
        success:function(requesetResponse){
            $(".allseasonstab ul").slideUp();
            $(".episodes-list").html(requesetResponse);
        }
    });
});
"use strict";
$(document).ready(function(){
                $(".seasons--episodes").css("height", $(".stream-player").height());
                        $(".tab-class:nth-child(1)").show();
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
    $('[data-src]').each(function () {
        var backgroundImage = $(this).attr('data-src');
        $(this).css('background-image', 'url(' + backgroundImage + ')');
    });
    var data = '';
    $('.filters-li').change(function(){
        $(this).parent().parent().find('li').removeClass('active');
        $(this).parent().addClass('active');
        $('.paginate').hide();
        $(this).parent().parent().parent().children('a').text($(this).text());
        $('.holdposts').html('<div style="width: 100%;"><h2 style="text-align:center;">جارى التحميل <em>...</em></h2></div>');
        data = '';
        $('.dropdown-list.form-ui').find('li').each(function(els, el){
            if( $(el).hasClass('active') ){
                data = $(el).data('tax')+'='+$(el).data('cat')+'&'+data;
            }
        });
        $.ajax({
            url:"#",
            type:"POST",
            data: data,
            success: function(msg) {
                $('.holdposts').html(msg);
                $('[data-src]').each(function () {
                    var backgroundImage = $(this).attr('data-src');
                    $(this).css('background-image', 'url(' + backgroundImage + ')');
                });
            }
        });
    });
});
$("body").on('click', '.content-box.fillter', function(event) {
    $('.category-block').removeClass('active');
    $(this).parent().addClass('active');
    $('.holdposts').html('<div style="width: 100%;"><h2 style="text-align:center;">جارى التحميل <em>...</em></h2></div>');
    event.preventDefault();
    $.ajax({
        url: "#",
        data: {action:"categoryblock", "key": $(this).attr('data-get')},
        type: "POST",
    }).done(function(data){
        $('.holdposts').html(data);
    })
});
$("body").on('click', '.bottom-single .single-tabs ul li', function(event) {
    $(this).addClass("active").siblings().removeClass("active");
    $(".tab-class").hide();
    $("#"+$(this).data("id")).show();
});
$("body").on('click', '.media-stream .servers-list li', function(event) {
    event.preventDefault();
    $(this).addClass("active").siblings().removeClass('active');
    $.ajax({
        url: MyAjaxURL+'Single/Server.php',
        type: 'POST',
        data: {id: $(this).data('id') , i : $(this).data('i') , meta: $(this).data("meta") , type: $(this).data("type")},
        success:function(data) {
            $(".stream-player").html(data);
        }
    });
});
var ImagesLoader = function(){
    $('.imgInit').each(function(index){
        if( ($(window).scrollTop() + $(window).height()) > $(this).offset().top + 100 ) {
            $(this).attr('src', $(this).data('image')).on('load', function(response){
                if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                    $(this).remove();
                } else {
                    $(this).addClass('Loaded');
                    $(this).removeAttr('data-image')
                }
            });
        }
    });
};
$(window).on('scroll', ImagesLoader);
$(window).on('resize', ImagesLoader);
$(window).ajaxSuccess(ImagesLoader);
$(window).on('load', ImagesLoader);
$("body").on('click', '.allseasonstab >span', function(event) {
    $(this).next("ul").slideToggle();
});
$("body").on('submit', '#loginNow', function(event) {
    event.preventDefault();
    $(".ajaxfyAlerts").html("انتظر لحظة ..");
    $.ajax({
        url: MyAjaxURL+"Users/Login.php",
        data: { username: $("[name=email]").val(), password : $("[name=password]").val() },
        type: "POST",
        success: function(msg){
            $(".ajaxfyAlerts").html(msg);
        }
    })
});
$("body").on('submit', '#joinUsNow', function(event) {
    event.preventDefault();
    $.ajax({
        url: MyAjaxURL+"Users/Register.php",
        data: {
            fname: $("[name=name]").val(),
            mail: $('[name=email]').val(),
            display: $("[name=username]").val(),
            pass: $("[name=password]").val(),
        },
        type:"POST",
        success: function(msg){
            $(".ajaxfyAlerts").html(msg);
        },
    });
});
function notUserMsg(){
    $.alert({
        title: 'رساله',
        content: 'لاستخدام هذه الميزه قم بتسجيل الدخول اولا',
        theme: 'Material',
        type: 'red',
        closeIcon: true,
        animationBounce: 2,
        animationSpeed: 400,
        animation: 'scale',
        rtl: true,
        buttons: {
            login: {
                text: 'تسجيل الدخول',
                btnClass: 'btn-blue',
                action:function openLoginForm() {
                    document.getElementById("LoginForm").style.display = "block";
                }
                                  
            },
            register: {
                text: 'تسجيل جديد',
                btnClass: 'btn-green',
                action: function openSignupForm() {
                    document.getElementById("LoginForm").style.display = "none";
                    document.getElementById("SignupForm").style.display = "block";
                }
            }
        }
    });
}
$("body").on('click', '.AddWatched', function(event) {
    if (isUser == "false")
    {
        notUserMsg();
    }
    else
    {
        var getClass = $(this).attr("class");
        $.ajax({
            url: MyAjaxURL+'Users/MetaAction.php',
            type: 'POST',
            data: {post_id: $(this).data("post") , meta: getClass.replace(/ /g,'') , type:$(this).data("type") },
            success:function(requestResponse){
                $("body").append(requestResponse)
            }
        });
    }
});

$("body").on('click', '.ShowTrailerSingle', function(event) {
    event.stopPropagation();
    $(".PopupTrailer").addClass('Opened').find(".content").html("");
    href = $(this).data("url");
    $.ajax({
        url: MyAjaxURL+'Home/LoadTrailer.php',
        type: 'POST',
        data: {href: href},
    })
    .done(function(date) {
        $(".PopupTrailer").find(".content").html(date);
    });
});