
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