# portfolio-briac-le-meillat

Ceci est le projet de SAE 103 demandé par mon département de formation Réseau et Télécommunication, de l'IUT de Bétune, qui était de coder à partir d'un template bootstrap notre portfolio en html/css


Construit avec : **JavaScript**, **HTML/CSS**, **Copilot GPT-5 mini**, **Bootstrap**

## Crédits

*code written by* **Briac Le Meillat**

*with the assistance of* **Copilot GPT-5 mini**

*email :* **briac.le.meillat@gmail.com**

## Licence

Il est permis d'utiliser ce projet à des fins personnelles et professionnelles, s'il est **précisé clairement** que **j'en suis l'auteur originel**.

Ce projet est sous licence **MIT**.

## Téléchargement de PDF (CV)

Un lien de téléchargement a été ajouté sur la page d'accueil. Il utilise l'attribut `data-doc-download`.

- Placez votre fichier PDF (par exemple votre CV) dans le dossier `assets/docs/` et nommez-le `mon-document.pdf` ou mettez à jour l'attribut `data-doc-download` dans `index.html`.
- Exemple d'ancre dans `index.html`:

```
<a data-doc-download="assets/docs/mon-document.pdf" data-doc-filename="CV-Briac-Le-Meillat.pdf">Télécharger mon CV</a>
```

Le script JavaScript dans `assets/js/main.js` intercepte les clics sur `data-doc-download`, télécharge le fichier via `fetch` et force l'enregistrement avec le nom indiqué dans `data-doc-filename` (ou le nom extrait de l'URL si absent).
