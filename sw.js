// Service worker pour ton site existant.
// Stratégie « réseau d'abord » : si tu es en ligne, tu vois toujours la dernière
// version de ton site. Si tu es hors ligne, le téléphone ressort la dernière copie gardée.

const VERSION = "v3";
const CACHE = "portail-" + VERSION;

// Fichiers gardés dès la première ouverture.
const DE_BASE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", (event) => {
  // allSettled : si un fichier de la liste n'existe pas, l'installation continue quand même.
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(DE_BASE.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((noms) =>
        Promise.all(noms.filter((n) => n !== CACHE).map((n) => caches.delete(n)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requete = event.request;
  const url = new URL(requete.url);

  // On ne touche qu'aux demandes GET vers ton propre site.
  if (requete.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(requete)
      .then((reponse) => {
        // En ligne : on garde une copie fraîche pour plus tard.
        if (reponse.ok) {
          const copie = reponse.clone();
          caches.open(CACHE).then((cache) => cache.put(requete, copie));
        }
        return reponse;
      })
      .catch(() =>
        // Hors ligne : on ressort la copie, ou la page d'accueil en dernier recours.
        caches.match(requete).then((copie) => copie || caches.match("./index.html"))
      )
  );
});
