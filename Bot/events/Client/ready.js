const { log } = require('console');
const Discord = require('discord.js');

const {EmbedBuilder } = require("discord.js");
const fs = require('fs');
const { config } = require('process');


module.exports = (Client) => {

    //affiche sur la console le nom du bot
    console.log(`Identifié en tant que ${Client.user.username}!`)

    //indique son statut
    Client.user.setPresence({
        activity: {name: 'V5 taper +help', type: 'COMPETING'},
        status: "ONLINE"
    })

    //indique son démarrage
    console.log("Je suis en train de démarrer...");

    //récupére la liste des serveurs sur lequel il est ajouté
    const guilds_in = Client.guilds.cache.map(guild => guild);
    let list_guild_name = '';

    console.log("______________________________________");
    global.main_configs = {};
    const dir_configs_files = "./configs_commands";
    main_configs.dir = dir_configs_files;
    for (const guild_info of guilds_in) {
        // Crée la liste des noms de serveurs pour l'embed
        list_guild_name += "\n- " + guild_info.name;


        // Regarde dans le dossier configs si un fichier avec l'id du server existe
        const configsFiles = fs.readdirSync(`${dir_configs_files}/`).filter(files => files.endsWith(`${guild_info.id}.json`));
        
        // Crée un fichier de config si la guild n'en a pas
        if (configsFiles.length === 0) {
            // Crée un nouveau fichier
            const new_content = {
                guild_name: guild_info.name,
                guild_id: guild_info.id,
                configs: {
                    
                }
            }

            // Crée un nouveau fichier .json avec l'objet au dessus
            fs.writeFileSync(`${dir_configs_files}/server${guild_info.id}.json`, JSON.stringify(new_content, null, '\t'));

            // Stocke le contenu dans la var globale configs_files à l'indice = id de la guild
            main_configs[guild_info.id] = new_content;
            console.log(`Fichier de config pour le serveur "${guild_info.name}" créé !`);
        } else {
            // Le fichier existe déjà, on le lit
            const content = fs.readFileSync(`${dir_configs_files}/server${guild_info.id}.json`);
            
            // Stocke le contenu dans la var globale configs_files à l'indice = id de la guild
            main_configs[guild_info.id] = JSON.parse(content);
            console.log(`Fichier de config pour le serveur "${guild_info.name}" chargé !`);
        }

    }
    console.log("______________________________________");

    //purge des commandes dans l'application
    Client.application.commands.cache.map(command => {
        command.delete()
    });

    //purge des commandes dans tous les serveurs
    const Guilds_id = Client.guilds.cache.map(guild => guild.id);
    for (guild_info of Guilds_id) {
        Client.guilds.cache.get(guild_info).commands.cache.map(command => {
            command.delete()
        });
    }

    //création des nouvelles commandes dans tous les serveur
    for (guild_info of Guilds_id) {
        for (commands of slach_commands) {
            Client.guilds.cache.get(guild_info).commands.create(commands);
        }

    }

    console.log("C'est parti !");
}