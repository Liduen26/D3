const {PREFIX, D_Liia} = require('../../core/config');
//chargement de discord
const {Collection, MessageEmbed} = require('discord.js');

module.exports =  (client, msg) => {
    //si le message vient d'un robot on arrête l'execution du script
    if (msg.author.bot) return;
    
    // Fichier de config
    const config = main_configs[msg.guildId].configs;


    //si il n'y a pas le préfix on arrête l'execution du script
    if (!msg.content.startsWith(PREFIX)) return;


    //découpe du texte en utilisant comme séparateur l'espace et en supprimant le prefix
    const args = msg.content.slice(PREFIX.length).split(/ +/)
    //tout est passé en minuscule, ça simplifie la chose pour l'utilisateur qui tape en majuscule, et seulement le premier mot est utilsé comme identifiant commande
    const commandName = args.shift().toLowerCase();

    //chargement des commandes et leur alias prises en compte par ce boot
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return msg.channel.send("Et encore un qui n'est pas capable de saisir une commande valide, ça me fatigue!, Tapes +help pour avoir les commandes actives");
    if (command.help.args && !args.length) {
        let noArgsReply = `Il nous faut des arguments pour cette commande, ${msg.author}`
        if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande:\`${PREFIX}${command.help.name} ${command.help.usage}\``
        //let rp_channel = msg.guild.channels.cache.find(c => c.name === 'interface-bot');
        //return rp_channel.send(noArgsReply)
        return
    }
    

    //si le temps de non spam d'un commande n'est pas encore mémorisé
    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    }
    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldowns || 5) * 1000;

    //si le delai minimum entre chaque appel n'est pas respecté
    if (tStamps.has(msg.author.id)) {
        const cdExpirationTime = tStamps.get(msg.author.id) + cdAmount;

        if (timeNow < cdExpirationTime) {
            timeLeft = (cdExpirationTime - timeNow) / 1000;
            let rp_channel = msg.guild.channels.cache.find(c => c.name === 'interface-bot');
            return msg.channel.send(`merci d'attendre ${timeLeft.toFixed(0)} seconde (s) avant de réutiliser la commande\`${command.help.name}\`.`)
        }
    }

    tStamps.set(msg.author.id, timeNow);
    setTimeout(() => tStamps.delete(msg.author.id), cdAmount);

    //msg.delete();
    //if (!command) return
    command.run(client, msg, args);
}