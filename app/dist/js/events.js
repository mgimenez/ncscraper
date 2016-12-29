(function(win, doc, $) {
  'use strict';

  let events = {

    getEvents: function(zone) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: 'http://localhost:3000?zone=' + zone,
          success: function(data) {
            resolve(data);
          }
        });
      })
    }
  };

  window.events = events;

}(window, window.document, jQuery));