/* sw.js — service worker da LME.
 *
 * Rede primeiro, cache depois. O site muda toda semana (OA novo, versao nova):
 * servir do cache por padrao entregaria material velho ao estudante. O cache
 * existe so para o aparelho sem internet.
 *
 * Gerado por _scripts/gerar_instalar_lme.py — nao editar a mao.
 */
/* O nome do cache carrega a data/hora desta geracao. Ele MUDA a cada
 * publicacao, e e isso que faz o `activate` apagar o cache anterior:
 * o handler so remove caches com nome DIFERENTE do atual, entao com um
 * nome fixo ('lme-oa-v1') nada era apagado — as respostas antigas
 * ficavam ali para sempre e voltavam a ser servidas em qualquer falha
 * de rede. Foi o bug de 2026-09-14: a pagina abria com as 7 abas novas
 * e, num tropeco de rede, voltava para a copia velha de 6. */
var CACHE = 'lme-oa-20260916-173104';

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(['./', './manifest.webmanifest',
                     './_icones/app-site-192.png', './_icones/app-site-512.png']);
  }).catch(function () { /* sem rede na instalacao: segue sem cache */ }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (nomes) {
    return Promise.all(nomes.filter(function (n) { return n !== CACHE; })
                            .map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') { return; }
  e.respondWith(
    fetch(e.request).then(function (resp) {
      /* So entra no cache resposta boa e do proprio site: guardar um 404 ou um
         502 faria o modo offline servir a pagina de erro para sempre. */
      if (resp && resp.ok && resp.type === 'basic') {
        var copia = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copia); });
      }
      return resp;
    }).catch(function () {
      return caches.match(e.request).then(function (r) {
        return r || caches.match('./');
      });
    })
  );
});
