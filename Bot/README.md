# Bot Discord : D3

Ceci est un bot discord 

## Setup

Demander le fichier config.js

```sh
cd ./Bot/
```
Le chemin devrait être .../d3/Bot

```sh
npm install
```

## Lancement

```sh
node ./main.js
```
<!-- slt -->

## Mode d'emploi 

LA BIBLE : https://discord.js.org/#/

La structure de ce bot a été faite pour faciliter la création de commandes, et permettre d'aller plus vite. Pour commencer, un petit tour du propriétaire, avec les dossiers dans l'ordre : 

  - assets : Pour les fichiers de ressources
  - buttons_responses : Pour les actions qui vont répondre au clic sur un boutton attaché à un message du bot
  - class : Pour faire des objets
  - commands_msg : Vieille méthode pour faire des commandes de bot, s'utilise avec un préfixe et le nom de la commande. Exemple : "+ver", commande pour obtenir la version.
    Le préfixe se change dans core/config.js.
  - commands_slashs : Méthode actuelle de commande du bot, comme son nom l'indique avec un "/"
  - configs_commands : Fichiers de configuration par serveur
  - core : coeur et config du bot
  - Cycle : Programmes cycliques, qui s'éxecute en boucle selon un interval donné.
  - events : Déclaration des évenements que le bot va traquer, doit respecter les conventions de la doc
  - main.js : Fichier racine du bot, celui que Node lance. 


Maintenant dans le détail : 

### Commandes Slachs "/"

#### 1ère étape : Déclarer la commande

Pour créer un commande slach, il faut commencer par ouvrir le fichier core/slach_commands.js.
On trouve dedans exports.slc, qui a un array. Cet array définit la liste des commandes slachs que le bot a à gérer. 
Pour ajouter une commande, on va donc ajouter un objet "SlashCommandBuilder" de cette manière : 

```js
new SlashCommandBuilder()
.setName("demo")
.setDescription("Une commande de démo")
etc
```
Toutes les méthodes à ajouter à cet objet sont ici : 
https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder

#### 2ème étape : Créer le fichier

Ensuite, il va falloir créer le fichier dans lequel on veut écrire le code de la commande. Ca se fait dans le dossier "commands_slash"