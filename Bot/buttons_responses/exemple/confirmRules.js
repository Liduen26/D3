module.exports = async (Client,interaction)=>{
    // Le membre qui clique sur le bouton
    const member = interaction.member;

    // Les configs
    const config = main_configs[interaction.guild.id].configs;

    //on récupére l'objet du roles que l'on veut attribuer | avt: 1007381249226182746
    const role_to_add = config.accept.role_add;
    const chan_log = interaction.guild.channels.cache.get(config.chan_log);

    console.log(interaction.member.roles.cache.get(role_to_add));
    
    // On log l'accept dans le channel spécifié
    if (interaction.member.roles.cache.get(role_to_add) === undefined) {
        // On ajoute le rôle au membre qui vient de rejoindre
        member.roles.add(role_to_add);
        
        await interaction.reply({
            content: "Parfait ! Bon jeu !", 
            ephemeral: true
        });
        
        chan_log.send(`**${member.user.username}** a certifié avoir lu les règles et les avoir acceptées.`);
    } else {
        await interaction.reply({ 
            content: "M'emmerde pas, t'as déjà accepté les règles", 
            ephemeral: true
        });
    }
}