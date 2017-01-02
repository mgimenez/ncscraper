(function(win, doc, $, events, templates) {
  'use strict';

  var app = {

    init: function() {
      this.populateEvents();
      this.zonesHandler();
    },

    populateEvents: function(z) {
      let location = doc.location.search,
          zone = z || location.split('?zone=')[1],
          $nextEvents = $('.js-next-events').addClass('loading'),
          defaultZone = 'buenos-aires';

      events.getEvents(zone).then(function(events) {
        $nextEvents
          .append(templates.listEvents(events))
          .removeClass('loading');
      });

      // first time
      if (z === undefined) {
        zone = zone === undefined ? defaultZone : zone;
        location = location === '' ? '?zone=' + defaultZone : location;
        $('a[href="' + location || + '"]').addClass('active');
        win.history.pushState({'zone':zone},'eRaver', '/?zone=' + zone);
      }


    },

    getZones: function(zone, self) {
      $('.js-list-zones a').removeClass('active');
      $(self).addClass('active');
      $('.js-next-events').empty();
      app.populateEvents(zone);

    },

    zonesHandler: function() {
      $('.js-list-zones').on('click', 'a', function(ev) {
        ev.preventDefault();
        let zone = ev.target.href.split('?zone=')[1];
        app.getZones(zone, this);
        win.history.pushState({'zone':zone},'eRaver', '/?zone=' + zone);
      });

      window.onpopstate = function(event) {
        if (event.state !== null) {
          let trigger = $('a[href="?zone=' + event.state.zone + '"]');
          app.getZones(event.state.zone, trigger);
        }
      };
    }
  };

  app.init();

}(window, window.document, window.jQuery, window.events, window.templates));