var menu = [
    about = {
        name: 'about',
        color: '#2ecc71',
    },
    education = {
        name: 'education',
        color: '#1abc9c',
    },
    skills = {
        name: 'skills',
        color: '#3498db',
    },
    portfolio = {
        name: 'portfolio',
        color: '#9b59b6',
    },
    contact = {
        name: 'contact',
        color: '#e67e22',
    },
];

$('#menu').css('border-bottom', "2px solid #2ecc71");

$.each(menu, function (menuItem, itemValue) {
    $('.' + this.name).click(function () {
        $('.current').removeClass('current');
        $(this).addClass('current');
        $('#menu').css('border-bottom', "2px solid " + itemValue.color);

        $(".title").fadeOut("fast", function () {
            $('.title').html(title[menuItem]);
            $(".title").fadeIn("fast");
        });
        $(".content").fadeOut("fast", function () {
            $('.content').html(content[menuItem]);
            $(".content").fadeIn("fast");
        });

        $('html, body').animate({
            scrollTop: $("#" + itemValue.name).offset().top - 52
        }, 1000);

        $('#content').on('click', '.hover-parent', function (e) {
            e.target.style.opacity = '1';
        });

    });
});

$(document).ready(function () {
    var menu = $('#menu').offset().top;
    $(window).scroll(function () {
        $('.hideme').each(function (i) {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_object) {
                $(this).animate({'opacity': '1'}, 500);
            }

            if ($(window).scrollTop() > menu) {
                $('#menu').css({position: 'fixed', top: '0px', backgroundColor: 'rgba(0, 0, 0, 0.8)'});
            } else {
                $('#menu').css({position: 'absolute', top: 'auto', backgroundColor: 'transparent'});
            }
        });
    });
});