//commande anti saturation du bot
require('events').EventEmitter.defaultMaxListeners = 15;

//chargement du fichier de config et des variables
const {TOKEN, PREFIX} = require('./core/config');
//charquement de la lib discord V13
const  {Client,GatewayIntentBits ,Collection} = require('discord.js');
//chargement de la lib chargeur de fichier
const { readdirSync, readFileSync} = require("fs");

//affichage de la version de node qui lance ce bot
console.log("node : " + process.version);

const start = JSON.parse(readFileSync("./assets/starter/startD3.json", {encoding:'utf8'}));

for (const line of start) {
    console.log(line);
}


//initialisation du bot discord et déclaration des permissions nécessaires
global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 

    ] 
});

//création des commandes par /command
global.slash_commands = require('./core/slash_commands').slc;


// Recherche et chargement des slashCommand à appeller

console.log("\nCommandes slashs chargées-------------");
global.commands_slashs=[];
const loadSlashCommands = (dir = "./commands_slashs/") => {
    readdirSync(dir).forEach(dirs => {
        const slashCommands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const slashCommand of slashCommands) {
            const slcName = slashCommand.split(".")[0];
            commands_slashs[slcName]=require(`${dir}/${dirs}/${slashCommand}`);
            console.log(`> /${slcName}`);
        }
    });
};
loadSlashCommands();


// Recherche et chargement des boutons

console.log("\nBoutons chargés-----------------------");
global.buttons_tab=[];
const loadButtons = (dir = "./buttons_responses/") => {
    readdirSync(dir).forEach(dirs => {
        const buttons = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const button of buttons) {
            const btnName = button.split(".")[0];
            buttons_tab[btnName] = require(`${dir}/${dirs}/${button}`);
            console.log(`> ${btnName}`);
        }
        ;
    });
};
loadButtons();


// Recherche et chargement des events à surveiller

console.log("\nEvents chargés------------------------");
const loadEvents = (dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log(`> ${evtName}`)
        }
        ;
    });
};
loadEvents();


// Recherche et chargement des différents fichiers de commandes

console.log("\nCommandes prefix chargées ("+ PREFIX +")---------");
['commands', 'cooldowns'].forEach(x => client[x] = new Collection());
const loadCommands = (dir = "./commands_msg/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const file of commands) {
            const getFilename = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFilename.help.name, getFilename);
            console.log(`> ${PREFIX}${getFilename.help.name}`);
        }
        ;
    });
};
loadCommands();


// Recherche et chargement des tache cyclique

console.log("\nFonctions cycliques chargées----------");
const loadCycles = (dir = "./Cycle/") => {
    readdirSync(dir).forEach(dirs => {
        const cycles = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const cycle of cycles) {
            const evt = require(`${dir}/${dirs}/${cycle}`);
            console.log(`> ${cycle}`)
        }
        ;
    });
};
loadCycles();

client.login(TOKEN);



// API

const express = require("express");
const { connect } = require("../API/db/connect");
const routerUtilisateurs = require("../API/routers/utilisateur");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routerUtilisateurs);

connect("mongodb://localhost:27017/", (err) => {
  if (err) {
    console.log("Erreur lors de la connexion à la base de données");
    process.exit(-1);
  } else {
    console.log("********************************* Connexion avec la base de données établie *********************************");
    app.listen(3000);
    console.log("************************************* Attente des requêtes au port 3OOO *************************************");
  }
});