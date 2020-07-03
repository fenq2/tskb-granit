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

$(".lazyload").lazyload();

let sliderProtocols = new Swiper('.protocols-slider__container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

$('.calculator-form__textarea').attr('placeholder', 'Параметры объекта:' + '\n' + 'Кол-во линий' + '\n' + 'Кол-во замеров' + '\n' + 'Кол-во энергоустановок' + '\n' + 'Кол-во ВРУ шкафов' + '\n' + 'Кол-во электрораспределительных шкафов');

sandwich();
maskedInput();