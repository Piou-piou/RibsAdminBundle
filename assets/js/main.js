import '@fancyapps/fancybox';

import $ from 'jquery';

$(document).ready(() => {
    $(".menu .title i").click(function () {
        $(this).parent().parent().toggleClass("active");
        $(".inner").toggleClass("displayed-nav");
    });

    $(".menu ul li").click(function () {
        window.location = $(this).find("a").attr("href");
    });

    $('[data-fancybox]').fancybox({
        smallBtn: false,
        toolbar: false,
        touch: false,
        beforeShow(instance) {
            const message = instance.$lastFocus[0].getAttribute('data-message');
            const href = instance.$lastFocus[0].getAttribute('data-href');

            if (message !== undefined) {
                $('#info-popup p').html(message);
            }

            $('#info-popup a.validate').attr('href', href);
        },
        afterClose() {
            // pour click sur un bouton qui ouvre #info-popup
            $('#info-popup p').html('');
            $('input#param').val('');
        },
    });
});
