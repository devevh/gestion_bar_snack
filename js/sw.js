//variabilisation
var nomCache='gesbar-v1';
var contenuCache=[
 '/index.htm'
,'/js/app.js'
,'/js/sw.js'
,'/js/fonctions.js'
,'/css/w3.css'
,'/css/w3color.css'
,'/images/logo.png'
,'/images/logo192blanc.png'
,'/images/logo512blanc.png'
,'/images/favicon-256x256.png'
,'/images/favicon.ico'
,'/images/coca.png'
,'/images/orangina.png'
,'/images/djino.png'
,'/images/sprite.png'
,'/images/beaufort.png'
,'/images/regab.png'
,'/images/heineken.png'
,'/images/1664.png'
,'/images/33export.png'
,'/images/castelbeer.png'
,'/images/corona.png'
,'/images/vinocola.png'
,'/images/neutre.png'
];
//
//installation
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(nomCache).then(function(cache) {
      return cache.addAll(contenuCache);
    })
  );
});
//
//repondre aux requetes par le cache
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/images/logo.png');
      });
    }
  }));
});
