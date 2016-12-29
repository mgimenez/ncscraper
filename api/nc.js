/**
 * Module dependencies
 */
const { StaticScraper } = require('scraperjs');

/**
 * Url Zones
 */
const urlZones = {
  'buenos-aires': {
    'url': 'https://www.nightclubber.com.ar/foro/5/eventos-proximos-argentina/'
  },
  'interior': {
    'url': 'https://www.nightclubber.com.ar/foro/88/eventos-del-interior/'
  },
  'costa-atlantica': {
    'url': 'https://www.nightclubber.com.ar/foro/60/eventos-costa-atlantica/'
  },
  'cordoba': {
    'url': 'https://www.nightclubber.com.ar/foro/237/eventos-cordoba/'
  },
  'rosario': {
    'url': 'https://www.nightclubber.com.ar/foro/203/eventos-rosario/'
  }
}

const defaultZone = 'buenos-aires';

let response = {};
let z = defaultZone;

/**
 * Scrap events and built a response
 */
function scrapEventsbyZones($) {
  const eventCollections = [];
  response = {};
  $('h3.threadtitle a.title').map(function() {
      eventCollections.push($(this).text());
  }).get();
  response[z] = eventCollections;
  return response;
}

/**
 * getNcEvents
 */
function getNcEvents(zone) {
  z = urlZones.hasOwnProperty(zone) ? zone : defaultZone;

  return StaticScraper.create(urlZones[z].url).scrape(scrapEventsbyZones);
}

/**
 * Expose getNcEvents
 */
module.exports = getNcEvents;