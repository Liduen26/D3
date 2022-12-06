# D3, powered by Windaube XP-TDR

Ceci est un projet de S4, qui à pour but de lier un bot discord avec une application web. 
L'application web - Windaube XP-TDR - est faite pour ressembler à un OS, dans lequel est implémenté plusieurs applis, qui permettent différentes fonctionnalités liées avec le bot discord. 

On peut citer par exemple : 
- Une app d'administration
- Une app Soundbox
- Une app de Logs
- Une app de personnalisation
...

Et on peut en ajouter autant qu'on a d'idées !

## Nécessite

- Node.js v16

# Setup

Pour lancer le projet, vous aurez besoin de créer un fichier nommé "config.env" à la raçine. Copiez le texte ci-dessous dans le fichier créé, puis mettez le token de votre bot à sa place (voir en juste en dessous). N'oubliez pas d'enregistrer ;).

```
DISCORD_BOT_TOKEN='VOTRE_TOKEN_ICI'
INSULT_GEN_URI=https://evilinsult.com/generate_insult.php?lang=en&type=json
PORT='5000'
```

Si vous n'avez **pas de token** de bot, [allez ici.](#annexe---vous-navez-pas-de-bot-discord)

Avant de passer à la suite, vérifiez bien que votre bot est sur un serveur. si ce n'est pas le cas, [allez ici.](#annexe---vous-navez-pas-de-bot-discord).

## 1. Le Back-end (API + BOT)

Dans un cmd Unix (ex: git bash, powershell), en partant du dossier racine du projet, tapez les lignes suivantes : 

```shell
$ cd Bot/
$ npm install
Wait...
$ cd ../API/
$ npm install
Wait...
$ node main.js
```
Le programme devrait fonctionner maintenant, si vous voyez les logs, il devrait y avoir marqué que votre bot est en ligne. Vous devriez aussi le voir se connecter sur Discord.

## 2. Le Front-end

Commencer par créer un fichier **.env** au niveau du dossier Front, dans lequel vous mettez ceci : 
```
VITE_URL_API='http://localhost:5000'
```
Ceci vous permettra de changer l'url sur lequel le front envoie ses requêtes à l'API si besoin


Ensuite, ouvrez un nouveau CMD, et toujours en partant de la racine du projet, tapez les lignes suivantes : 

```shell
$ cd Front/
$ npm install
Wait...
$ npm run dev
```

Après qqles secondes, la console devrait afficher un lien sur lequel vous pouvez cliquer, et qui vous emmènera sur le site !

Et voilà, bien joué !

# Annexe - Vous n'avez pas de bot discord ?

### Créer l'app
Si vous n'en avez pas déjà un, vous pouvez créer [**ici un bot discord**](https://discord.com/developers/applications). Si vous arrivez sur une page de connexion à discord, recliquez sur le lien après vous être connecté. Commencez par cliquer sur **New Application**, en haut à droite de la page, et nommez votre application (ce n'est pas encore un bot). Une fois cela fait, sélectionnez votre application sur la page d'accueil, et allez dans l'onglet **Bot**, via la sidebar à gauche. 

### Créer le bot
Vous pouvez maintenant cliquer sur le bouton Add Bot, à droite de la page. Et là votre bot est créé ! La première chose à faire, et de changer les authorisations du bot, en allant dans l'onglet **Privileged Gateway Intents**, au milieu de la page. Là, cochez les 3 cases : **Presence Intent, Server Members Intent, Message Content Intent**. 

### Le token
Ensuite, en haut de la page, juste en dessous du pseudo du bot, devrait y avoir un bouton pour **copier le Token**. *S'il n'apparait pas, il y aura un bouton Reset Token à la place qui le fera apparaitre une fois cliqué.* Ce token est à mettre dans le fichier **config.env**.

### L'invitation
Une fois tout cela fait, il faut faire rentrer votre bot sur un serveur discord, pour pouvoir s'en servir. Pour cela, il faut aller dans l'ongler **OAaut2** de la sidebar, puis **URL Generator** juste en dessous. Dans le tableau, cochez **Bot**. Ensuite dans le tableau des **permissions** juste en dessous, cochez **Administrator**. 

Et pour finir, en bas du tableau URL Generator, il doit y avoir un URL, que vous pouvez copier. Vous la mettez dans votre navigateur, et vous devriez voir une page qui vous propse d'inviter le bot sur le serveur de votre choix !

[Retourner au Setup](#setup)