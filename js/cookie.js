; // jshint ignore:line
(function (root, factory, undefined) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    // root is window
    root.CookiesEuBanner = factory();
  }
}(window, function () {
  'use strict';

  var CookiesEuBanner,
    document = window.document;

  CookiesEuBanner = function (launchFunction, waitAccept, undefined) {
    if (!(this instanceof CookiesEuBanner)) {
      return new CookiesEuBanner(launchFunction);
    }

    this.cookieTimeout = 33696000000; // 13 months in milliseconds
    this.bots = /bot|googlebot|crawler|spider|robot|crawling/i;
    this.cookieName = 'hasConsent';
    this.trackingCookiesNames = [ '__utma', '__utmb', '__utmc', '__utmt', '__utmv', '__utmz', '_ga', '_gat' ];
    this.launchFunction = launchFunction;
    this.waitAccept = waitAccept || false;
    this.init();
  };

  CookiesEuBanner.prototype = {
    init: function () {
      // Do nothing if it is a bot
      // If DoNotTrack is activated, do nothing too
      if (this.isBot() || !this.isToTrack() || this.hasConsent() === false) {
        return false;
      }

      // User has already consent to use cookies to tracking
      if (this.hasConsent() === true) {
        // Launch user custom function
        //this.launchFunction();
        return true;
      }

      // If it's not a bot, no DoNotTrack and not already accept : show banner
      this.showBanner();

      if (!this.waitAccept) {
        // Accept cookies by default for the next page
        this.setCookie(this.cookieName, null);
      }
    },

    /*
     * Show banner at the top of the page
     */
    showBanner: function () {
      var _this = this,
        banner = document.getElementById('cookies-eu-banner'),
        rejectButton = document.getElementById('cookies-eu-reject'),
        acceptButton = document.getElementById('cookies-eu-accept'),
        moreLink = document.getElementById('cookies-eu-more');

      banner.style.display = 'block';

      if (moreLink) {
        this.addEventListener(moreLink, 'click', function () {
          _this.deleteCookie(_this.cookieName);
        });
      }

      if (acceptButton) {
        this.addEventListener(acceptButton, 'click', function () {
          var cookie_unique_id = makeid();
          var url = window.location.href;
          var link = $('#cookies-eu-more').attr('href');
          var text = $('.cc-message').text();
          $.ajax({
              url: '/users/cookie_log',
              type: 'POST',
              data: {
                cookie_unique_id: cookie_unique_id, 
                link: link, 
                url: url, 
                text: text
              },
              dataType: 'json',
              success : function(data) {
                 console.log('success');
              },
              error : function() {
                 console.log('error');
                  
              }
          });

          banner.parentNode.removeChild(banner);
          _this.setCookie(_this.cookieName, true);
          _this.setCookie('randomToken', cookie_unique_id);
          //_this.launchFunction();





              
  
          

              


        });
      }

      if (rejectButton) {
        this.addEventListener(rejectButton, 'click', function () {
          banner.parentNode.removeChild(banner);
          _this.setCookie(_this.cookieName, false);
          _this.deleteTrackingCookies();
        });
      }
    },

    /*
     * Check if user already consent
     */
    hasConsent: function () {
      if (document.cookie.indexOf(this.cookieName + '=true') > -1) {
        return true;
      } else if (document.cookie.indexOf(this.cookieName + '=false') > -1) {
        return false;
      }

      return null;
    },

    /*
     * Detect if the visitor is a bot or not
     * Prevent for search engine take the cookie
     * alert message as main content of the page
     */
    isBot: function () {
      return this.bots.test(navigator.userAgent);
    },

    /*
     * Check if DoNotTrack is activated
     */
    isToTrack: function () {
      var dnt = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack;
      return (dnt !== null && dnt !== undefined) ? (dnt && dnt !== 'yes' && dnt !== 1 && dnt !== '1') : true;
    },

    /*
     * Delete existent tracking cookies
     */
    deleteTrackingCookies: function () {
      var _this = this;
      this.trackingCookiesNames.map(function (cookieName) {
        _this.deleteCookie(cookieName);
      });
    },

    /*
     * Create/update cookie
     */
    setCookie: function (name, value) {
      var date = new Date();
      date.setTime(date.getTime() + this.cookieTimeout);

      document.cookie = name + '=' + value + ';expires=' + date.toGMTString() + ';path=/';
    },

    /*
     * Delete cookie by changing expire
     */
    deleteCookie: function (name) {
      var hostname = document.location.hostname;
      if (hostname.indexOf('www.') === 0) {
        hostname = hostname.substring(4);
      }
      document.cookie = name + '=; domain=.' + hostname + '; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
      document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
    },

    addEventListener: function (DOMElement, evnt, callback) {
      if (document.addEventListener) { // For all major browsers, except IE 8 and earlier
        DOMElement.addEventListener(evnt, callback);
      } else if (DOMElement.attachEvent) { // For IE 8 and earlier versions
        DOMElement.attachEvent('on' + evnt, callback);
      }
    }
  };

  return CookiesEuBanner;
}));

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 64; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}