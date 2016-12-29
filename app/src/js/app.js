(function(doc) {
  'use strict';

  var app = {

    init: function() {
      this.populateEvents();
    },

    populateEvents: function() {
      let list = '<ul>',
          zone = doc.location.search.split('?zone=')[1];
      events.getEvents(zone).then(function(events) {
        for(event in events) {
          events[event]['events'].forEach(function(ev) {
            list += '<li>' + ev + '</li>';
          });
        }
        list += '</ul>';
        $('.next-events')[0].insertAdjacentHTML('beforeend', list);
      });
    }
  };

  app.init();

}(window.document));