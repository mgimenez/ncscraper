(function(doc) {
  'use strict';

  var app = {

    init: function() {
      this.populateEvents();
    },

    populateEvents: function() {
      let list = '<ul>',
          zone = doc.location.search.split('?zone=')[1],
          $nextEvents = $('.next-events');

      $nextEvents.addClass('loading');

      events.getEvents(zone).then(function(events) {
        for(zone in events) {
          events[zone].forEach(function(ev) {
            list += '<li>' + ev + '</li>';
          });
        }
        list += '</ul>';
        $nextEvents[0].insertAdjacentHTML('afterbegin', '<h2>' + zone.replace('-', ' ') + '</h2>');
        $nextEvents[0].insertAdjacentHTML('beforeend', list);
        $nextEvents.removeClass('loading');
      });
    }
  };

  app.init();

}(window.document));