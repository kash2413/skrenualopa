$(function () {
  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  if(!getCookie('close-best-store').length){
    setTimeout(function(){
      $('.find-best-store').addClass('show')
    }, 2000);
  }


  $('.find-best-store__close, .find-best-store').on('click', function(){
    $('.find-best-store').addClass('hide')
    setCookie('close-best-store', '1', 0.01042) // 15minut
  })
});
