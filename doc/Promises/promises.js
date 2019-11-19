// Exemple 1
let myPromise = new Promise((resolve, reject) => {
  resolve("Je renvoie un succès tout de suite !");
});

myPromise.then(msg => console.log(msg));

// Exemple 2
let myFailedUncaughtPromise = new Promise((resolve, reject) => {
  reject(
    "Je renvoie une erreur qui n'est pas attrapée car je suis exécutée à la construction de la promesse !"
  );
});

let myFailedPromise = new Promise((resolve, reject) => {
  reject("Je renvoie une erreur !");
});

myFailedPromise
  .then(msg => console.log("Succès", msg))
  .catch(err => console.error("Echec", err));

// Exemple 3
const requestToMyServer = () =>
  new Promise((resolve, reject) => {
    let requestSuccess = true;

    // Pour simuler un temps de réponse
    setTimeout(() => {
      if (requestSuccess) {
        resolve("La requête a réussi !");
      } else {
        reject("La requête a échoué :(");
      }
    }, 4000);
  });

requestToMyServer()
  .then(msg => console.log(msg))
  .catch(err => console.error(err));

requestToMyServer()
  .then(msg => "Succès : " + msg.toUpperCase())
  .then(formattedMsg => console.log(formattedMsg))
  .catch(err => console.error(err));

console.log("Je suis ligne 42");

// Exemple 4
const asyncRequest = async () => {
  try {
    let msgFromServer = await requestToMyServer();
    console.log(
      "Je viens de lancer ma requête dans la fonction asynchrone, je suis avant le log du résultat"
    );
    // Le script va attendre d'avoir le résultat
    console.log(msgFromServer);
    console.log("Je suis après le log du résultat");
  } catch (err) {
    console.error(err);
  }
};

asyncRequest();
