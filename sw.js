//variabilisation
var nomCache='gesbar-v1';
var contenuCache=[
 '/gestion_bar_snack/index.htm'
,'/gestion_bar_snack/js/app.js'
,'/gestion_bar_snack/js/sw.js'
,'/gestion_bar_snack/js/fonctions.js'
,'/gestion_bar_snack/css/w3.css'
,'/gestion_bar_snack/css/w3color.css'
,'/gestion_bar_snack/images/logo.png'
,'/gestion_bar_snack/images/favicon.ico'
,'/gestion_bar_snack/images/coca-90x300.png'
,'/gestion_bar_snack/images/orangina-90x300.png'
,'/gestion_bar_snack/images/djino-front.png'
,'/gestion_bar_snack/images/sprite-90x300.png'
,'/gestion_bar_snack/images/beaufort-79x300.png'
,'/gestion_bar_snack/images/REGAB-90x300.png'
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
