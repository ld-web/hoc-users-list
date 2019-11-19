# Promesses

Une promesse en Javascript est un **objet**.

Elle permet d'effectuer des traitements **asynchrones**, car elle ne fournit pas forcément tout de suite une valeur. On va donc pouvoir effectuer d'autres traitements sans bloquer l'exécution du script.

Pour construire une promesse, **on va passer dans son constructeur une fonction** prenant 2 arguments en entrée : `resolve` et `reject`.

La fonction passée dans le constructeur, suivant la situation (succès ou échec), appellera donc `resolve` ou `reject`, avec en paramètre la valeur à renvoyer.

Ensuite, on pourra appeler la fonction `then` pour effectuer des traitements sur la valeur résolue, ou bien la fonction `catch` pour effectuer des traitements sur l'erreur renvoyée.

## Exemples

Tous les exemples se trouvent dans le fichier `promises.js`, dans le même dossier que cette documentation.

### Instancier une promesse

>### Lorsqu'on instancie une promesse, la fonction passée en paramètre du constructeur est exécutée

Voir l'exemple n°2 : on instancie 2 promesses qui font toutes les deux un `reject`, mais avec les fonctions `then` et `catch` je gère uniquement la deuxième déclarée :

```javascript
myFailedPromise
  // Si ça réussit, je log le message renvoyé
  .then(msg => console.log("Succès", msg))
  // Si ça échoue, j'affiche le message renvoyé dans la console d'erreur
  .catch(err => console.error("Echec", err));
```

Dans la console du navigateur, ça donne ça :

![Uncaught Promise](img/uncaught_promise.png)

`myFailedPromise` est correctement gérée, on affiche bien le message sous forme d'erreur, mais pas `myFailedUncaughtPromise`.

Encore une fois, **la fonction passée au constructeur a été exécutée tout de suite, donc le `reject` a été appelé**.

>### C'est pour ça qu'on va voir des fonctions *retourner* des promesses (`Axios.get` par exemple). On peut ainsi chainer leur appel avec une gestion `then` ou `catch`

Dans l'exemple n°3, on simule une requête à un serveur.

>Vous pouvez manipuler la variable `requestSuccess` pour que la promesse soit résolue ou rejetée

**`requestToMyServer` est donc une fonction qui retourne une promesse**.

On peut donc chainer son appel avec les fonctions `then` et `catch` :

```javascript
requestToMyServer()
  .then(msg => console.log(msg))
  .catch(err => console.error(err));
```

On peut également chainer plusieurs appels à la fonction `then`, pour effectuer des traitements en plusieurs étapes :

```javascript
requestToMyServer()
  .then(msg => "Succès : " + msg.toUpperCase())
  // On va logger le message mais en majuscule et avec du contenu avant
  .then(formattedMsg => console.log(formattedMsg))
  .catch(err => console.error(err));
```

>Note : à la ligne 42, vous pouvez voir un log `console.log("Je suis ligne 42");`. Observez dans la console la position du texte `Je suis ligne 42` : avec les promesses, nous sommes en asynchrone. La ligne 42 n'est relative à aucune promesse, ce code a été interprété et affiché directement

Pour finir, l'exemple 4 utilise une fonction asynchrone avec le mot-clé `async`. Dans une fonction asynchrone (donc précédée du mot-clé `async`), on peut utiliser le mot-clé `await` pour attendre la résolution de notre promesse.
