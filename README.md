# Omnivox
## Mettre l'app en ligne avec GitHub Pages

1. Crée un dépôt sur GitHub (par exemple `Omnivox`).
2. Dépose-y **tout le contenu de ce dossier** (`index.html`, `manifest.webmanifest`, `sw.js`, le dossier `icons/`, `.nojekyll`).
   Sur github.com : *Add file › Upload files*, puis *Commit changes*.
3. Va dans *Settings › Pages*. Sous *Build and deployment*, choisis *Deploy from a branch*, la branche `main` et le dossier `/ (root)`, puis *Save*.
4. Après une minute environ, l'adresse apparaît en haut de la page : `https://TON-NOM.github.io/Omnivox/`.

## L'installer sur le téléphone

- **iPhone (Safari)** : ouvre l'adresse, touche l'icône Partager, puis *Sur l'écran d'accueil*.
- **Android (Chrome)** : ouvre l'adresse, menu ⋮, puis *Installer l'application* ou *Ajouter à l'écran d'accueil*.

L'app s'ouvre alors en plein écran et fonctionne aussi sans connexion après la première visite.

## Bon à savoir

- Les réglages (favoris, messages lus, événements ajoutés) restent dans le navigateur de l'appareil.
- *Mon compte › Réglages de la démo* permet de simuler une autre date ou heure et de tout réinitialiser.
- Pour modifier le contenu (cours, notes, horaire, messages), ouvre `index.html` : les données sont au début du script.
- Après une modification, change `CACHE = 'cap-campus-v1'` dans `sw.js` (par exemple `v2`) pour que les téléphones rechargent la nouvelle version.
