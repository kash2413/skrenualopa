function calendar(lang) {
    var dateFormat = $(".selector").datepicker("option", "dateFormat");

    var Months = ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"];
    var minMonths = ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"];

    $("#kalendar-rezervace").datepicker({
        altField: '#date-input',
        monthNames: Months,
        dayNamesMin: minMonths,
        dateFormat: 'dd. mm. yy',
        firstDay: 1,
        showOtherMonths: true,
        minDate: 0,
        onSelect: function (dateText, inst) {
            checkRezervace();
        }
    });

    $('.location').click(function () {
        $('.location ul').slideToggle('slow');
    });

    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Zadajte prosím platní telefonní číslo"
    );


    /*  $('#rezervace_form').validate({
        errorElement: 'span',
        errorPlacement: function (error, element) {
        if (element.attr("type") == "checkbox") {
            error.insertAfter($(element).next());
            $('#vop-error').css('paddingLeft', '0');
        } else {
            error.insertAfter($(element));
        }
      }
      });*/

    $('#kontakt_form').validate({
        errorElement: 'span',
        errorPlacement: function (error, element) {
            if (element.attr("type") == "checkbox") {
                error.insertAfter($(element).next());
                $('#vop-error').css('paddingLeft', '0');
                $('#vop1-error').css('paddingLeft', '0');
            } else {
                error.insertAfter($(element));
            }
        }
    });


    checkRezervace();

    $('#date-input-mobile').change(function () {
        checkRezervace();
    });

    $('#date-input-mobile').datetimepicker({
        datepicker: true,
        timepicker: false,
        format: 'd. m. Y',
        minDate: 0
    });

    $('#date-input').change(function () {
        checkRezervace();
    });

    $('#date-input').datetimepicker({
        datepicker: true,
        timepicker: false,
        format: 'd. m. Y',
        minDate: 0
    });


}
    function checkRezervace() {
        $('#time').val('');
        var d = new Date();
        var time_input = $('#date-input').val();

        var current_time = d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();
        var getDate = d.getDate();
        var getMonth = d.getMonth() + 1;
        var mins = d.getMinutes();

        if (mins < 10) {
            mins = '0' + mins;
        }
        if (getDate < 10) {
            getDate = '0' + getDate;
        }
        if (getMonth < 10) {
            getMonth = '0' + getMonth;
        }

        var current_time = getDate + '. ' + getMonth + '. ' + d.getFullYear();

        if (time_input == current_time) {
            rezervaceGetTimer((d.getHours() + 4) + ':' + mins);

        } else {
            rezervaceGetTimer('9:00');
        }
    }

    function rezervaceGetTimer(minTime) {
        $('#time-mobile').datetimepicker({
            datepicker: false,
            format: 'H:i',
            minTime: minTime,
            step: 30,
        });

        $('#time').datetimepicker({
            datepicker: false,
            format: 'H:i',
            minTime: minTime,
            step: 30,
        });
    }

$(document).ready(function () {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })


    // $('#rezervace_form').submit(function (e) {
    // 	e.preventDefault();
    //     if ($(this).valid()) {
    //         $.ajax({
    //             url: $(this).attr('action'),
    //             type: 'POST',
    //             data: $(this).serialize(),
    //             success: function (response) {
    //                 if (response == 'error-datetime') {
    //                     $('.error-datetime-alert').css('display', 'block');
    //                     $('#date-input').addClass('error');
    //                     $('#time').addClass('error');
    //                 } else {
    //                     $('.overlay_alert').css({'width': $(document).width(), 'height': $(document).height()}).show();
    //                     $('.alert#rezer').show();
    //                     dataLayer.push({
    //                         'event': 'GAevent', 'eventCategory': 'rezervace',
    //                         'eventAction': 'odeslání', 'eventLabel': 'rezervace'
    //                     });
    //                 }
    //             },
    //             error: function (response) {
    //                 console.log('neodoslane');
    //             }
    //         });
    //     }
    //     return false;
    // });

    $('.close').click(function () {
        location.reload();
    });

    $('.overlay_alert, .close-n').click(function () {
        $('.overlay_alert').fadeOut();
        $('.alert').fadeOut();
    });

    $(".fancybox").fancybox();


    $(".fancybox.video").click(function () {
        $.fancybox({
            'padding': 0,
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'title': this.title,
            'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
            'type': 'swf',
            'swf': {
                'wmode': 'transparent',
                'allowfullscreen': 'true'
            }
        });

        return false;
    });


    $(document).mouseup(function (e) {
        var container = $(".location ul");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.slideUp();
        }
    });

    $('.menu-mobile-button').click(function () {
        $('header .nav').slideToggle('slow');
    });

    $('.tabs-menu a').click(function (e) {
        window.location.hash = '';
        e.preventDefault();
        var href = $(this).attr('href');
        $('.tab').removeClass('is-visible');
        $(href).addClass('is-visible');
        $('.tabs-menu li').removeClass('is-active');
        $(this).parent().addClass('is-active');
    });

    var hash = window.location.hash;

    if (hash) {
        $('.tab').removeClass('is-visible');
        $(hash).addClass('is-visible');
        $('.tabs-menu li').removeClass('is-active');
        $('.tabs-menu a[href=' + hash + ']').parent().addClass('is-active');
    }

    href = $('.tabs-menu .is-active a').attr('href');
    $(href).addClass('is-visible');

    $('input[type="date"]').change(function () {
        val = $(this).val();

        $('#dateInput').val(val);
    });

    $('.awards-header').click(function () {
        $(this).parent().toggleClass('is-open', 400, 'easeInQuad').focus();
    });

    $('.awards').blur(function () {
        $(this).removeClass('is-open', 400, 'easeInQuad');
    });
    $('.owl-caurosel').owlCarousel({
        navigation: true,
        rewindNav: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        pagination: true,
        singleItem: true,
        autoHeight: true,
        lazyLoad: false,
        lazyFollow: false,
        lazyEffect: false,
        beforeUpdate: function () {
            $('.owl-carousel:visible').css('height', $('.owl-carousel:visible').height());
        },
        afterUpdate: function () {
            $('.owl-carousel:visible').css('height', 'auto');
        }
    });

    $('.banner-close').click(function () {
        $(this).parent().toggleClass('active');
        $('.intro-small').toggleClass('with-banner');
        if (($(window).width() < 980))
            $(".banner").animate({"top": "-=170px"}, "slow");
        else
            $(".banner").animate({"top": "-=190px"}, "slow");

        if ($(window).width() < 980) {
            $("#intro .intro-title").css("padding-top", "190px");
            $("#intro .intro-beer img").css("width", "70%");
        }

        if ($(window).width() < 480) {
            $("#intro .intro-title").css("padding-top", "70px");
            $("#intro .intro-beer img").css("width", "100%");
        }

        if ($(window).width() < 350) {
            $("#intro .intro-title").css("padding-top", "70px");
            $("#intro .intro-beer img").css("width", "100%");
        }

        if (($(window).width() > 1250) && ($(window).height() < 691)) {
            $("#intro .intro-title").delay(500).animate({"padding-top": "-=90px"}, "slow");
        }

    });

    setTimeout(function () {
        if ($('.banner').length) {
            $('.banner').addClass('active');
            $('.intro-small').addClass('with-banner');
            if (($(window).width() < 980))
                $(".banner").animate({"top": "+=170px"}, "slow");
            else
                $(".banner").animate({"top": "+=165px"}, "slow");

            if ($(window).width() < 980) {
                $("#intro .intro-title").css("padding-top", "230px");
                $("#intro .intro-beer img").css("width", "60%");
            }

            if ($(window).width() < 480) {
                $("#intro .intro-title").css("padding-top", "180px");
                $("#intro .intro-beer img").css("width", "80%");
            }

            if ($(window).width() < 350) {
                $("#intro .intro-title").css("padding-top", "140px");
                $("#intro .intro-beer img").css("width", "80%");
            }
        }
    }, 500);


    /*if($('.page-galeria').length>0){
      //var count = $('.gallery-tab').length;
      //for (var i = 1; i <= count; i++) {
      $('.gallery-tab').each(function(index, el) {
        $this = $('#'+$(this).attr('id')+' .gallery');
        //$('#gallery_easyP-'+i).easyPaginate({
        $this.easyPaginate({
          //paginateElement: '.gallery-list-item-'+i,
          paginateElement: '.gallery-list-item',
          elementsPerPage: 8,
          firstButton: false,
          lastButton: false,
          nextButtonText: '',
          prevButtonText: ''
        });
      });
      //};

      var pages = $('.easyPaginateNav:visible').find('a.page').length;
      var current = $('.easyPaginateNav:visible').find('a.current').text();
      $('.page_max').text(pages);
      $('.page_current').text(current);

      $('.next, .prev').click(function(){
        current = $(this).parent().find('a.current').text();
        $('.page_current').text(current);
        //current = parseInt($('.easyPaginateNav').find('a.current').text());
        //$('.page_current').text(current);
      });
    }*/

    if ($('.page-galeria').length > 0) {
        $('.gallery-tab').each(function (index, el) {
            $this = $('#' + $(this).attr('id') + ' .gallery ul');
            $this.easyPaginate({
                step: 8
            });

            $this.parent().find('ol.pagination li.prev, ol.pagination li.next').text('');
            var pages = $this.parent().find('ol.pagination li[data-index]').length;
            var current = $this.parent().find('ol.pagination li.current').text();
            $(this).find('.page_max').text(pages);
            $(this).find('.page_current').text(current);

            if (pages == 0) {
                $(this).find('.pages').hide();
            }

            $('.next, .prev').click(function () {
                current = $(this).parent().find('li.current').text();
                $(this).closest('.gallery-tab').find('.page_current').text(current);
            });

        });
    }


});
