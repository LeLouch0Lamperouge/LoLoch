function copyToClipboard(element) {
    var $temp = jQuery("<input>");
    jQuery("body").append($temp);
    $temp.val(jQuery(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
    jQuery(".copied").show();
}
