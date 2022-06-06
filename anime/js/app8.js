$(document).ready(function() {
    $.ajax({
        url: MyAjaxURL+'Single/Download.php',
        type: 'POST',
        data: {id: "455838"},
    })
    .done(function(date) {
        $(".media-download").html(date);
    });
});
