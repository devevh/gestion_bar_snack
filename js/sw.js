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
,'/gestion_bar_snack/images/logo192blanc.png'
,'/gestion_bar_snack/images/logo512blanc.png'
,'/gestion_bar_snack/images/favicon-256x256.png'
,'/gestion_bar_snack/images/favicon.ico'
,'/gestion_bar_snack/images/coca.png'
,'/gestion_bar_snack/images/orangina.png'
,'/gestion_bar_snack/images/djino.png'
,'/gestion_bar_snack/images/sprite.png'
,'/gestion_bar_snack/images/beaufort.png'
,'/gestion_bar_snack/images/regab.png'
,'/gestion_bar_snack/images/heineken.png'
,'/gestion_bar_snack/images/1664.png'
,'/gestion_bar_snack/images/33export.png'
,'/gestion_bar_snack/images/castelbeer.png'
,'/gestion_bar_snack/images/corona.png'
,'/gestion_bar_snack/images/vinocola.png'
,'/gestion_bar_snack/images/neutre.png'
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
