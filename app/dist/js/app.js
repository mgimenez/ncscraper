(function(doc, $, events, templates) {
  'use strict';

  var app = {

    init: function() {
      this.populateEvents();
    },

    populateEvents: function() {
      let list = '<ul>',
          zone = doc.location.search.split('?zone=')[1],
          $nextEvents = $('.next-events').addClass('loading');

      events.getEvents(zone).then(function(events) {
        $nextEvents
          .append(templates.listEvents(events))
          .removeClass('loading');
      });
    }
  };

  app.init();

}(window.document, window.jQuery, window.events, window.templates));