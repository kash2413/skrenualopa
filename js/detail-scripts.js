var $window = $(window);
var window_height, window_top_position, window_bottom_position;

var $menu = $('.page-menu');
var menu_top_position, menu_bottom_position;

var $menu_about = $('.page-about');
var menu_about_top_position, menu_about_bottom_position;

var $menu_gallery = $('.page-galeria');
var menu_gallery_top_position, menu_gallery_bottom_position;

$(document).scroll(function () {

    if (window.innerWidth < 768) {

        window_height = $window.innerHeight();
        window_top_position = $window.scrollTop();
        window_bottom_position = (window_top_position + window_height);

        if ($menu.length) {
            menu_top_position = $menu.offset().top;
            menu_bottom_position = menu_top_position + $menu.outerHeight();
            var $menu_nav = $menu.find('.menu-nav');

            if ((window_bottom_position > menu_top_position + 250) && (window_bottom_position < menu_bottom_position)) {
                if (!$menu_nav.hasClass('visible')) {
                    $menu_nav.addClass('visible');
                }
            } else {
                $menu_nav.removeClass('visible');
            }
        }

        if ($menu_about.length) {
            menu_about_top_position = $menu_about.offset().top;
            menu_about_bottom_position = menu_about_top_position + $menu_about.outerHeight();
            var $about_nav = $menu_about.find('.top-nav');

            if ((window_bottom_position > menu_about_top_position + 250) && (window_bottom_position < menu_about_bottom_position)) {
                if (!$about_nav.hasClass('visible')) {
                    $about_nav.addClass('visible');
                }
            } else {
                $about_nav.removeClass('visible');
            }
        }

        if ($menu_gallery.length) {
            menu_gallery_top_position = $menu_gallery.offset().top;
            menu_gallery_bottom_position = menu_gallery_top_position + $menu_gallery.outerHeight();
            var $gallery_nav = $menu_gallery.find('.top-nav');

            if ((window_bottom_position > menu_gallery_top_position + 250) && (window_bottom_position < menu_gallery_bottom_position)) {
                if (!$gallery_nav.hasClass('visible')) {
                    $gallery_nav.addClass('visible');
                }
            } else {
                $gallery_nav.removeClass('visible');
            }
        }
    }

});

$('#rezervace_form').validate({
    errorElement: 'span',
    errorPlacement: function (error, element) {

        if (element.attr("type") === "checkbox") {
            error.insertAfter($(element).next());
        } else {
            if (window.innerWidth < 768) {
                if ($(element).parent().parent().hasClass('multiple-fields')) {
                    error.insertAfter($(element).parent().parent());
                } else {
                    error.insertAfter($(element).parent());
                }
            } else {
                error.insertAfter($(element).parent());
            }
        }

    }
});

$('#post_newsletter_mobile').validate({
    errorElement: 'p',
    errorPlacement: function (error, element) {

        if (element.attr("type") === "checkbox") {
            error.insertAfter($(element).next());
        } else {
            error.insertAfter($(element).parent());
        }

    }
});

$('#post_newsletter').validate({
    errorElement: 'p',
    errorPlacement: function (error, element) {

        if (element.attr("type") === "checkbox") {
            error.insertAfter($(element).next());
        } else {
            error.insertAfter($(element).parent());
        }
    }
});

$(".menu-nav .nav-link").click(function () {
    var scrollTo = 294;
    if (window.innerWidth < 768) {
        scrollTo = 205;
    }
    $('html, body').animate({
        scrollTop: scrollTo
    }, 500);
});

$(".top-nav a").click(function () {
    var scrollTo = 294;
    if (window.innerWidth < 768) {
        scrollTo = 205;
    }
    $('html, body').animate({
        scrollTop: scrollTo
    }, 500);
});

$(document).ready(function () {

    if ($('#wine-tab').length > 0) {
        $('.page-menu .menu-nav li').css('width', '25%');
    }
});

$('.panel-heading').click(function () {
    if ($(this).hasClass('panel-show')) {
        $(this).removeClass('panel-show');
    } else {
        $(this).addClass('panel-show');
    }
});

$('#post_newsletter_mobile').submit(function () {
    if ($(this).valid()) {
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                $('#post_newsletter_mobile')[0].reset();
                $('.overlay_alert').css({'width': $(document).width(), 'height': $(document).height()}).show();
                $('.alert#mail').fadeIn();
            },
            error: function (response) {
                console.log('neodoslane');
            }
        });
    }
    return false;
});

$('#post_newsletter').submit(function () {
    if ($(this).valid()) {
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                $('#post_newsletter')[0].reset();
                $('.overlay_alert').css({'width': $(document).width(), 'height': $(document).height()}).show();
                $('.alert#mail').fadeIn();
            },
            error: function (response) {
                console.log('neodoslane');
            }
        });
    }
    return false;
});

$('#rezervace_form').submit(function (e) {
	e.preventDefault();
    var serialized_data;

    if (window.innerWidth < 768) {
        serialized_data = $(this).find('#mobile-inputs input, #mobile-inputs select, #others-inputs input').serialize();
    } else {
        serialized_data = $(this).find('#desktop-inputs input, #desktop-inputs select, #others-inputs input').serialize();
    }

    if ($(this).valid()) {
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: serialized_data,
            success: function (response) {
                if (response == 'error-datetime') {
                    $('.error-datetime-alert').css('display', 'block');
                    $('#date-input').addClass('error');
                    $('#time').addClass('error');
                } else {
                    $('.overlay_alert').css({'width': $(document).width(), 'height': $(document).height()}).show();
                    $('.alert#rezer').show();
                    $('.alert').show();
                    dataLayer.push({
                        'event': 'GAevent', 'eventCategory': 'rezervace',
                        'eventAction': 'odeslání', 'eventLabel': 'rezervace'
                    });
                }
            },
            error: function (response) {
                console.log('neodoslane');
            }
        });
    }
    return false;
});

$('.gallery-select').on('change', function () {
    window.location.hash = '';
    var href = this.value;
    $('.tab').removeClass('is-visible');
    $(href).addClass('is-visible');
});

$('.rezervacia .open-vop').click(function () {
    var $vop_details = $('.rezervacia .label-vop');
    if ($vop_details.hasClass('show')) {
        $vop_details.removeClass('show');
    } else {
        $vop_details.addClass('show');
    }
});

$('.newsletter .open-vop').click(function () {
    var $vop_details = $('.newsletter .label-vop');
    if ($vop_details.hasClass('show')) {
        $vop_details.removeClass('show');
    } else {
        $vop_details.addClass('show');
    }
});
