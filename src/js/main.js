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
        nextEl: '.protocols-navigation__next',
        prevEl: '.protocols-navigation__prev',
    },
});

let sliderReviews = new Swiper('.reviews-slider__container', {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
        nextEl: '.reviews-navigation__next',
        prevEl: '.reviews-navigation__prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        920: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    }
});

let sliderLaboratory = new Swiper('.laboratory-slider__container', {
    spaceBetween: 60,
    navigation: {
        nextEl: '.laboratory-navigation__next',
        prevEl: '.laboratory-navigation__prev',
    },
});

$('.calculator-form__textarea').attr('placeholder', 'Параметры объекта:' + '\n' + 'Кол-во линий' + '\n' + 'Кол-во замеров' + '\n' + 'Кол-во энергоустановок' + '\n' + 'Кол-во ВРУ шкафов' + '\n' + 'Кол-во электрораспределительных шкафов');

var spinner = $('.map__wrap').children('.loader');
var check_if_load = false;
var myMapTemp, myPlacemarkTemp;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init () {
    var myMapTemp = new ymaps.Map("map-yandex", {
        center: [55.6704384080915, 37.24221219938311], // координаты центра на карте
        zoom: 14, // коэффициент приближения карты
        controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
    });
    var myPlacemarkTemp = new ymaps.Placemark([55.6704384080915, 37.24221219938311], {
        balloonContent: "Здесь может быть ваш адрес",
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        iconImageHref: 'img/map-marker.png',
        // Размеры метки.
        iconImageSize: [50, 50],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-25, -50],
    });
    myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0);

    // Решение по callback-у для определения полной загрузки карты
    waitForTilesLoad(layer).then(function() {
        // Скрываем индикатор загрузки после полной загрузки карты
        spinner.removeClass('is-active');
    });
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer(layer), readyAll = true;
        tc.tiles.each(function (tile, number) {
            if (!tile.isReady()) {
                readyAll = false;
            }
        });
        if (readyAll) {
            resolve();
        } else {
            tc.events.once("ready", function() {
                resolve();
            });
        }
    });
}

function getTileContainer(layer) {
    for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
            if (
                layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
            ) {
                return layer[k];
            }
        }
    }
    return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
    var script = document.createElement("script");

    if (script.readyState){  // IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // Другие браузеры
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
    $('.map__wrap').mouseenter(function(){
            if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                    ymaps.load(init);
                })
            }
        }
    )};

$(function() {

    //Запускаем основную функцию
    ymap();

});

sandwich();
maskedInput();