"use strict";

let sandwich = function () {
    $('.sandwich__open-btn').click(function () {
        $('.sandwich__content').addClass('sandwich__content_opend');
    });
    $('.sandwich__close-btn').click(function () {
        $('.sandwich__content').removeClass('sandwich__content_opend');
    });
};

let maskedInput = function () {
    $(".mask-phone").inputmask({
        "mask": "+ 7 (999) 999-99-99"
    });
};


sandwich();
maskedInput();