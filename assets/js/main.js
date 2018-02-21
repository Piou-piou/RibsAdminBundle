import '@fancyapps/fancybox';

import $ from 'jquery';

$(document).ready(() => {
    $(".menu .title i").click(function () {
        $(this).parent().parent().toggleClass("active");
        $(".inner").toggleClass("displayed-nav");
        $(".nav-page").toggleClass("displayed-nav");
    });

    $(".menu ul li").click(function () {
        window.location = $(this).find("a").attr("href");
    });
});
