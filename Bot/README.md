# Bot Discord : D3

Ceci est un bot discord utilisant node.js, avec la librairie discord.js.

## Setup

```sh
cd ./Bot/
```
Le chemin devrait être .../d3/Bot

```sh
npm install
```

Pour terminer le setup, demander à un membre du groupe du projet D3 le fichier .env pour avoir accès au Token de l'API du bot, et le mettre dans le dossier "Bot/".

## Lancement

```sh
node ./main.js
```

## Mode d'emploi

LA BIBLE : https://discord.js.org/#/

La structure de ce bot n'est pas native, mais a été faite pour faciliter la création de commandes, et permettre d'aller plus vite. Pour commencer, un petit tour du propriétaire, avec les dossiers dans l'ordre : 

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

## Hello World avec une commande Slach "/"

### 1ère étape : Déclarer la commande

Pour créer un commande slach, il faut commencer par ouvrir le fichier "core/slach_commands.js".
On trouve dedans "exports.slc", qui a un array. Cet array définit la liste des commandes slachs que le bot a à gérer. 
Pour ajouter une commande, on va donc ajouter un objet "SlashCommandBuilder" de cette manière : 

```js
new SlashCommandBuilder()
    .setName("demo")
    .setDescription("Une commande de démo")
etc...
```
Toutes les méthodes possibles à ajouter à cet objet sont ici : 
https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder

### 2ème étape : Créer le fichier

Ensuite, il va falloir créer le fichier dans lequel on veut écrire le code de la commande. Ca se passe dans le dossier "commands_slashs". En fonction du but de la commande, on crée un dossier dans "commands_slashs" avec comme nom la catégorie de la commande que vous voulez créer. Puis, dans ce dossier, créer un fichier avec le même nom que ce que vous avez mis dans le ".setName()" précedemment, avec .js à la fin. Dans cet exemple : "demo.js".

Une fois ce fichier créé, on l'ouvre, et on y copie-colle ceci : 

```js
module.exports = async (client,interaction) => {
    await interaction.reply({ 
        content: "Hi Discord world!", 
        ephemeral: true 
    });
}
```

Et c'est fini !

### 3ème étape : Executer la commande

Maintenant, pour executer la commande, on lance le bot avec : 
```sh
node ./main.js
```

Cela va lancer le bot. Maintenant, dans un channel d'un serveur discord où le bot est présent, on peut écrire "/ce_que_t'as_mis_dans_setName". Normalement le bot devrait proposer de l'autocompléter. 

Et en executant la commande, le bot devrait répondre par le message "Hi Discord world!", que vous seul devriez voir (c'est grace à l'attribut "ephemeral: true" ;D) !
