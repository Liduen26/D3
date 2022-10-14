//commande anti saturation du bot
require('events').EventEmitter.defaultMaxListeners = 15;

//affichage de la version de node qui lance ce bot
console.log(process.version);

//chargement du fichier de config et des variables
const {TOKEN, PREFIX, D_Liia} = require('./core/config');
//charquement de la lib discord V13
const  {Client,GatewayIntentBits ,Collection} = require('discord.js');
//chargement de la lib chargeur de fichier
const {readdirSync} = require("fs");

//chargement des function audio de discord

//initialisation du bot discord et déclaration des droits nécessaire
global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 

    ] 
});

//création des commandes par /command
global.slash_commands =require('./core/slash_commands').slc;

//tableau qui contiendra tous les son de la commande rh
//global.sound_list=[];
//global.playlist=[];

/*
    recherche et chargement des slashCommand à appeller
*/

console.log("______________________________________");
global.commands_slashs=[];
const loadSlashCommands = (dir = "./commands_slashs/") => {
    readdirSync(dir).forEach(dirs => {
        const slashCommands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const slashCommand of slashCommands) {
            const slcName = slashCommand.split(".")[0];
            commands_slashs[slcName]=require(`${dir}/${dirs}/${slashCommand}`);
            console.log(`Commande slash chargée: /${slcName}`);
        }
    });
};
loadSlashCommands();
console.log("______________________________________");

/*
    recherche et chargement des events à surveiller
*/
const loadEvents = (dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log(`Event chargé: ${evtName}`)
        }
        ;
    });
};
loadEvents();
console.log("______________________________________");



/*
    recherche et chargement des différents fichiers de commandes
*/
['commands', 'cooldowns'].forEach(x => client[x] = new Collection());
const loadCommands = (dir = "./commands_msg/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const file of commands) {
            const getFilename = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFilename.help.name, getFilename);
            console.log(`Commande chargée: ${getFilename.help.name}`);
        }
        ;
    });
};
loadCommands();
console.log("______________________________________");

/*
    recherche et chargement des tache cyclique
*/
const loadCycles = (dir = "./Cycle/") => {
    readdirSync(dir).forEach(dirs => {
        const cycles = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const cycle of cycles) {
            const evt = require(`${dir}/${dirs}/${cycle}`);
            console.log(`Commande cycliques: ${cycle}`)
        }
        ;
    });
};
loadCycles();
console.log("______________________________________");

/*
    recherche et chargement des boutons
*/
global.buttons_tab=[];
const loadButtons = (dir = "./buttons_responses/") => {
    readdirSync(dir).forEach(dirs => {
        const buttons = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
        for (const button of buttons) {
            const btnName = button.split(".")[0];
            buttons_tab[btnName] = require(`${dir}/${dirs}/${button}`);
            console.log(`Bouton chargé : ${btnName}`);
        }
        ;
    });
};
loadButtons();
console.log("______________________________________");


client.login(TOKEN);
