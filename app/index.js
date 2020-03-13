/**
 * Main JS file for project.
 */

/**
 * Define globals that are added through the js.globals in
 * the config.json file, here, mostly so linting won't get triggered
 * and its a good queue of what is available:
 */
// /* global $, _ */

/**
 * Adding dependencies
 * ---------------------------------
 * Import local ES6 or CommonJS modules like this:
 * import utilsFn from './shared/utils.js';
 *
 * Or import libraries installed with npm like this:
 * import module from 'module';
 */

// Dependencies
import utils from './shared/utils.js';

// DOM loaded
utils.documentReady(() => {
  // Mark page with note about development or staging
  utils.environmentNoting();
});


// Auto enable Pym for embedding.  This will enable a Pym Child if
// the url contains ?pym=true
utils.autoEnablePym();



/**
 * Adding Svelte templates in the client
 * ---------------------------------
 * We can bring in the same Svelte templates that we use
 * to render the HTML into the client for interactivity.  The key
 * part is that we need to have similar data.
 *
 * First, import the template.  This is the main one, and will
 * include any other templates used in the project.
 *
 *   `import Content from '../templates/_index-content.svelte.html';`
 *
 * Get the data parts that are needed.  There are two ways to do this.
 * If you are using the buildData function to get data, then add make
 * sure the config for your data has a `local: "content.json"` property
 *
 *  1. For smaller datasets, just import them like other files.
 *     `import content from '../assets/data/content.json';`
 *  2. For larger data points, utilize window.fetch.
 *     `let content = await (await window.fetch('../assets/data/content.json')).json();`
 *
 * Once you have your data, use it like a Svelte component:
 *
 * utils.documentReady(() => {
 *   const app = new Content({
 *     target: document.querySelector('.article-lcd-body-content'),
 *     hydrate: true,
 *     data: {
 *       content
 *     }
 *   });
 * });
 */



// Common code to get svelte template loaded on the client.  Note that
// we need to pull in the data we assume is in the template.
//
// import Content from '../templates/_index-content.svelte.html';
// // import content from '../content.json';
//
// utils.documentReady(() => {
//   const app = new Content({
//     target: document.querySelector('.article-lcd-body-content'),
//     hydrate: true,
//     data: {
//       // content
//     }
//   });
// });

import locations from '../sources/locations.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA';

var dzoom = 11;
var mzoom = 10.3;

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/shadowflare/ciqzo0bu20004bknkbrhrm6wf',
    // center: [-93.264313, 44.973269],
    center: [-93.272226, 44.986057],
    zoom: dzoom,
    minZoom: dzoom
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();
map.doubleClickZoom.disable();

                
map.on('load', function() {

    //grid
    map.addSource('nb', {
        type: 'geojson',
        data: './shapefiles/hex.json'
      });
     
       map.addLayer({
            'id': 'nb-layer',
            'interactive': true,
            'source': 'nb',
            'layout': {},
            'type': 'fill',
                 'paint': {
                'fill-antialias' : true,
                'fill-opacity': 0.7,
                'fill-color': {
                 "property": "NUMPOINTS",
                 "stops": [
                   [0, "rgba(255, 255, 255, 0)"],
                   [1, "rgba(247, 251, 255, 0.5)"],
                   [20, "#D1E6E1"],
                   [40, "#A7E6E3"],
                   [60, "#67B4C2"],
                   [80, "#3580A3"]
                ]
             },
                'fill-outline-color': {
                 "property": "NUMPOINTS",
                 "stops": [
                   [0, "rgba(255, 255, 255, 0)"],
                   [1, "#888888"],
                   [20, "#888888"],
                   [40, "#888888"],
                   [60, "#888888"],
                   [80, "#888888"]
                ]
             }
          }
        }, 'road-primary');

    //neighborhoods
    map.addSource('nb2', {
        type: 'geojson',
        data: './shapefiles/minneapolis_nb.json'
    });

    map.addLayer({
        'id': 'nb2-layer',
        'interactive': true,
        'source': 'nb2',
        'layout': {},
        'type': 'fill',
        'paint': {
            'fill-antialias': true,
            'fill-opacity': 0.7,
            'fill-color': 'rgba(255, 255, 255, 0.5)',
            'fill-outline-color': 'rgba(0, 0, 0, 1)'
        }
    }, 'road-primary');

    //arrests
    map.addSource('locations', {
        type: 'geojson',
        data: locations
      });

      map.addLayer({
        'id': 'arrest-layer',
        'interactive': true,
        'source': 'locations',
        'layout': {},
        'type': 'circle',
         'paint': {
            'circle-opacity': 0.3,
            'circle-radius': 2,
            'circle-stroke-width': 0,
            'circle-stroke-color': '#C28059',
            'circle-color': '#C28059'
         }
    }, 'road-primary');
});

// $(document).ready(function() {
//     if ($("#wrapper").width() < 600) {
//         map.flyTo({
//             center: [-93.272226, 44.986057],
//             zoom: mzoom,
//         });
//     } else {
//         map.flyTo({
//             center: [-93.272226, 44.986057],
//             zoom: dzoom,
//         });
//     }
//     $(window).resize(function() {
//         if ($("#wrapper").width() < 600) {
//             map.flyTo({
//                 center: [-93.272226, 44.986057],
//                 zoom: mzoom,
//             });
//         } else {
//             map.flyTo({
//                 center: [-93.272226, 44.986057],
//                 zoom: dzoom,
//             });
//         }
//     });
// });