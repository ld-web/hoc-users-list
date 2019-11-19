# ReactJS : Récupération, affichage et recherche d'utilisateurs

## Création de l'application

> Utilisez create-react-app, qui fournit une structure de base, les dépendances à jour et le hot reload déjà configurés

### Pour ajouter Sass à votre projet

`yarn add node-sass`

Renommez ensuite les fichiers CSS en SCSS, et changez les imports dans `index.js` et `App.js`

### Ajout et inclusion de Bootstrap au projet

`yarn add bootstrap`

Import de Bootstrap :

> Fichier : src/index.scss

```scss
// '~' désigne le dossier node_modules
@import "~bootstrap/scss/bootstrap";
```

Pour personnaliser les variables de configuration SASS : [Documentation](https://getbootstrap.com/docs/4.3/getting-started/theming/#sass-options).

### Création d'une barre de menu

Créez un composant (sous forme de classe pour le moment) qui sera chargé d'afficher le menu de l'application.

Pour le moment on ne veut qu'un menu simple et non dynamique, avec un élément "Liste".

> **Note : les noms de composants commencent toujours par une majuscule, sinon React va interpréter le nom de la balise comme une balise HTML normale**
>
> **Note : un composant React ne peut pas retourner plusieurs balises adjacentes. Il doit retourner une seule balise "racine" avec le contenu du composant.**
>
> **Note : l'attribut `class` en HTML devient `className` en JSX, `class` étant un mot réservé en JS**

---

> Fichier : src/Nav.js

```javascript
import React, { Component } from "react";

class Nav extends Component {
  render = () => (
    //...
  );
}

export default Nav;
```

> Fichier : src/App.js

```javascript
//...
import Nav from "./Nav";
//...
const App = () => {
  return (
    <>
      <Nav />
      <div className="container-fluid">{/* ... */}</div>
    </>
  );
};
```

> **Note : si vous voulez retourner plusieurs balises adjacentes, utilisez les [fragments](https://reactjs.org/docs/fragments.html)**

### Import de Bootstrap (JS)

Notre barre de menu s'affiche, mais en mode responsive, le bouton "burger" ne fonctionne pas.

Nous n'avons pas importé le JS de Bootstrap, seulement le CSS dans notre fichier SASS.

> Fichier : src/index.js

```javascript
//...
import "bootstrap";
//...
```

Bootstrap a des [dépendances](https://getbootstrap.com/docs/4.3/getting-started/javascript/#dependencies) Javascript pour assurer le fonctionnement de ses barres de menu, modals, popups, etc...nous devons donc les installer dans notre projet.

```bash
yarn add jquery popper.js
```

Une fois les dépendances installées, notre menu devrait fonctionner en responsive.

## Affichage d'une liste d'utilisateurs

Pour récupérer nos utilisateurs, nous allons faire appel à une API : <https://jsonplaceholder.typicode.com/>.

Un aperçu de la liste d'utilisateurs au format JSON est disponible à cette URL : <https://jsonplaceholder.typicode.com/users>.

C'est cette URL que nous allons utiliser.

### Récupération de données via une API

Pour récupérer des données depuis une API, nous allons utiliser des fonctions nous permettant de faire des requêtes.

Les deux principales utilisées sont :

- la méthode native "fetch"
- le package [Axios](https://github.com/axios/axios)

Nous allons utiliser le package Axios.

```bash
yarn add axios
```

Puis nous allons l'utiliser pour faire notre requête.

> Fichier : src/App.js

```javascript
//...
import Axios from "axios";
//...

const App = () => {
  let users = [];

  Axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => (users = res.data))
    .then(() => console.log(users));

  //...
};

//...
```

La console devrait afficher la liste reçue.

### Affichage de notre liste d'utilisateurs

Nous allons tenter, dans un premier temps, de générer une liste dans notre composant `App`, puis de l'inclure dans notre template.

> Fichier : src/App.js

```javascript
//...
Axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
  users = res.data.map(user => (
    <div className="col" key={user.id}>
      <p>{user.name}</p>
    </div>
  ));
});

return (
  <>
    <Nav />
    <div className="container">
      <div className="row">
        <div className="col p-2">
          <h1>Utilisateurs</h1>
        </div>
      </div>
      <div className="row">{users}</div>
    </div>
  </>
);
//...
```

La page n'affiche aucune liste.

### Utilisation du state pour initialiser notre liste puis l'affecter via notre API

Pour afficher notre liste, nous allons devoir passer par une variable `state` héritée de la classe `Component` de React.

Le `state` nous permet de contrôler notre liste directement dans notre composant, donc de temporiser son affectation.

Nous allons donc :

- Initialiser notre liste
- L'affecter selon le retour de l'API
- L'afficher dans le template

#### Transformation de notre composant en classe

Pour le moment, n'utilisons pas les composants fonctionnels. Nous verrons plus tard comment gérer un état dans un composant fonctionnel.

> Fichier : src/App.js

```javascript
import React, { Component } from "react";
//...

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  render = () => {
    return (
      <>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col p-2">
              <h1>Utilisateurs</h1>
            </div>
          </div>
          <div className="row"></div>
        </div>
      </>
    );
  };
}

//...
```

Notre liste est à présent initialisée dans le constructeur du composant.

Pour l'affecter, nous allons utiliser une méthode du [cycle de vie](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) du composant.

> Fichier : src/App.js

```javascript
//...

class App extends Component {
  constructor(props) {
    super(props);
    //...
  }

  componentDidMount = () => {
    Axios.get("https://jsonplaceholder.typicode.com/users").then(res =>
      this.setState({
        users: res.data
      })
    );
  };

  render = () => {
    //...
  };
}
//...
```

> L'appel à la méthode `setState` permet de modifier l'état du composant et rafraîchir l'affichage de notre composant, en rappelant la méthode `render`

#### Génération de la liste dans le template

Pour générer une liste, nous pouvons faire appel à la méthode JS `map` sur un tableau JS.

Pour chaque élément de notre tableau, nous allons générer une balise HTML contenant l'affichage d'un utilisateur

> Fichier : src/App.js

```javascript
//...

class App extends Component {
  //...

  render = () => {
    return (
      <>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col p-2">
              <h1>Utilisateurs</h1>
            </div>
          </div>
          <div className="row">
            {this.state.users.map(user => (
              <div className="col-12 col-lg-4" key={user.id}>
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
}

//...
```

Les noms de nos utilisateurs s'affichent bien à l'écran.

## Factorisation des composants

Notre composant `App` s'occupe de trop de choses.

Il effectue l'appel à l'API, affiche la liste d'utilisateurs, et génère le template de chaque utilisateur.

Nous allons séparer notre architecture en plusieurs composants, que nous pourrons ensuite appeler dans `App`. Au besoin, nous pourrons aussi les réutiliser.

> Fichier : src/User.js

```javascript
import React, { Component } from "react";

class User extends Component {
  render = () => {
    const { name } = this.props.data;

    return <div className="col-12 col-lg-4">{name}</div>;
  };
}

export default User;
```

Dans le composant `User`, nous tirons partie des `props`, ou encore propriétés de composant.

Cette notion est différente d'un `state`, car il s'agit de données fournies en entrée, et qui sont en lecture seule.

> Nous aurions également pu écrire ce composant sous forme d'une fonction javascript pure. Une fonction pure est une fonction qui a un comportement prévisible, qui ne change pas les paramètres passés en entrée (ici nos propriétés), et qui n'a aucun effet de bord (elle ne se charge que de générer un template à partir des propriétés, rien d'autre. Pas d'autre appel à une API, pas de changement dans un autre élément d'interface, etc...).

---

> Fichier : src/UserList.js

```javascript
import React, { Component } from "react";
import Axios from "axios";
import User from "./User";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    Axios.get("https://jsonplaceholder.typicode.com/users").then(res =>
      this.setState({
        users: res.data
      })
    );
  };

  render = () => {
    return this.state.users.map(user => <User data={user} key={user.id} />);
  };
}

export default UserList;
```

Le résultat devrait être strictement le même. L'avantage est que nous avons découplé les différentes responsabilités d'affichage de notre application. Notre composant `App` fait appel à une `UserList`. Cette `UserList` récupère les utilisateurs et génère un template utilisateur pour chacun, à l'aide du composant `User`.

> Séparez la logique de récupération des utilisateurs dans un autre fichier, `UserService.js` par exemple, dans lequel vous déporterez l'appel à l'API.
>
> Fichier : src/UserService.js

```javascript
import Axios from "axios";

export const getUsers = () => {
  return Axios.get("https://jsonplaceholder.typicode.com/users").then(
    res => res.data
  );
};
```

> Note : on pourrait également déporter l'URL dans une constante, déclarée dans un autre fichier

---

> Fichier : src/UserList.js

```javascript
//...
import { getUsers } from "./UserService";
//...

class UserList extends Component {
  //...

  componentDidMount = () => {
    getUsers().then(users => {
      this.setState({
        users: users
      });
    });
  };

  //...
}
```

> Nous avons déporté dans un autre fichier la logique de récupération des utilisateurs. Notre composant `UserList` s'appuie à présent sur une couche de service, sans se soucier de la façon conrète dont on va récupérer des utilisateurs.

### Exercice

> ### Faites évoluer le template `User` pour avoir un résultat plus élaboré à l'écran. Tirez parti du passage de propriétés dans votre composant

### Filtre de recherche

Nous voulons à présent installer une zone de texte nous permettant de filtrer les utilisateurs à l'écran.

> Faites un composant pour gérer la recherche
>
> Fichier : src/Search.js

```javascript
import React, { Component } from "react";

class Search extends Component {
  render = () => {
    const { handleChange, searchTerm } = this.props;

    return (
      <div className="row">
        <div className="col">
          <input
            onChange={handleChange}
            value={searchTerm}
            placeholder="Recherche..."
          />
        </div>
      </div>
    );
  };
}

export default Search;
```

Nous parlerons après de la propriété `handleChange`.

Nous ne pouvons pas intégrer `Search` dans `UserList`, nous mélangerions deux fonctionnalités différentes.

Nous allons donc créer un nouveau composant `Users` qui regroupera la recherche et la liste.

Par ailleurs, c'est ce composant qui détiendra dans son state :

- La liste d'utilisateurs initiale
- La liste à afficher (filtrée à partir de la liste initiale)
- Le terme de recherche

>Fichier : src/UserList.js

```javascript
import React, { Component } from "react";
import User from "./User";

class UserList extends Component {
  render = () => {
    return this.props.users.map(user => <User data={user} key={user.id} />);
  };
}

export default UserList;
```

>Fichier : src/Users.js

```javascript
import React, { Component } from "react";
import { getUsers } from "./UserService";
import Search from "./Search";
import UserList from "./UserList";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSearch: [],
      search: ""
    };
    this.users = [];
  }

  componentDidMount = () => {
    getUsers().then(users => {
      this.users = users;
      this.setState({
        userSearch: users
      });
    });
  };

  search = e => {
    const search = e.target.value;
    let userSearch = this.users;

    if (search !== "") {
      userSearch = this.users.filter(user => user.name.includes(search));
    }

    this.setState({
      userSearch: userSearch,
      search: search
    });
  };

  render = () => {
    return (
      <>
        <Search handleChange={this.search} searchTerm={this.state.search} />
        <div className="row">
          <UserList users={this.state.userSearch} />
        </div>
      </>
    );
  };
}

export default Users;
```

> Nous pouvons passer des fonctions (ici `this.search`) dans les propriétés ! Nous allons donc pouvoir déléguer la définition de la fonctionnalité de recherche au composant supérieur.
>
>Vu que c'est le composant `Users` qui détient toutes les informations, il détient aussi la logique de recherche, et ne fait que transmettre le terme de recherche et la fonction à déclencher lors de la frappe dans la zone de recherche.
>
>**On aurait pu faire un appel à l'API à chaque frappe clavier, mais ça ferait beaucoup d'appels en peu de temps. Dans ce cas précis, on conserve une copie de notre liste originale pour éviter de spammer le serveur de l'API**

### Fiche utilisateur et navigation

Notre application ne contient qu'un seul point d'entrée : `index.js`.

Pour pouvoir naviguer, nous allons simplement donner l'illusion d'un changement de page en affichant un composant ou un autre en fonction de l'URL.

Pour faire ça, on va utiliser le package `react-router-dom` ([documentation](https://reacttraining.com/react-router/web/guides/quick-start)) :

```bash
yarn add react-router-dom
```

Pour afficher un utilisateur, nous allons créer un nouveau composant `UserPage`.

> Fichier : src/UserPage.js

```javascript
import React, { Component } from 'react';
import { getUser } from './UserService';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getUser(id).then(user => this.setState({
      user: user
    }));
  }

  render = () => {
    return this.state.user && (
      <div className="row">
        <div className="col">
          <h1>{this.state.user.name}</h1>
          <a href="/">Retour à la liste</a>
        </div>
      </div>
    )
  }
}

export default UserPage;
```

On définit un `state` ici le temps d'effectuer l'appel à l'API. On notera l'appel à `getUser` définie dans `UserService`.

On notera également la manière de récupérer le paramètre d'URL `id` :

```javascript
const { id } = this.props.match.params;
```

> Fichier : src/UserService.js

```javascript
export const getUser = async id => {
  const res = await Axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.data;
}
```

- On a utilisé une méthode asynchrone (alternative à l'utilisation des promesses)
- On a utilisé l'interpolation de chaînes
- Puisqu'on répète dans `UserService` la chaîne `https://jsonplaceholder.typicode.com/users`, il vaudrait mieux l'externaliser dans une constante, définie dans un nouveau fichier

> Externalisez la définition de l'URL de base de l'API dans un fichier `constants.js`

#### Routage

Utilisation du package `react-router-dom` :

> Fichier : src/App.js

```javascript
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Nav from "./Nav";
import Users from "./Users";
import UserPage from "./UserPage";

class App extends Component {
  render = () => {
    return (
      <>
        <Nav />
        <div className="container">
          <Router>
            <div>
              <Switch>
                <Route path="/user/:id" component={UserPage} />
                <Route path="/" component={Users} />
              </Switch>
            </div>
          </Router>
        </div>
      </>
    );
  };
}

export default App;
```

Enfin, dans notre composant `User`, on va ajouter un lien vers une fiche :

> Fichier : src/User.js

```javascript
//...

class User extends Component {
  render = () => {
    const { id, name } = this.props.data;

    return (
      <div className="col-12 col-lg-4">
        {name}
        <p>
          <a href={`/user/${id}`} className="btn btn-success">
            Voir
          </a>
        </p>
      </div>
    );
  }
}

//...
```

>On pourrait définir nos routes dans les constantes ! On n'aurait plus qu'à se référer aux constantes pour générer des routes

### Bonus : un loader le temps de récupérer l'utilisateur

Dans le composant `UserPage`, introduire une clé `loading` dans le state, valeur d'initialisation à `true`.

Ensuite :

- Passer `loading` à `false` à l'issue du chargement de l'utilisateur
- Adapter le template : si `loading` est à `true`, afficher un texte ou un spinner de chargement (voir par exemple [better-react-spinkit](http://better-react-spinkit.benjamintatum.com/)). Sinon, retourner le contenu du composant
