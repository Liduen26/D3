module.exports = (Client, interaction) => {
    console.log("interaction détectée")
    console.log((interaction.commandName !== undefined) ? "/"+interaction.commandName :"btn "+interaction.customId);
    

    if (interaction.isCommand()) {
        commands_slashs[interaction.commandName](Client,interaction);
        return;
    }

    if (interaction.isButton()) {
        buttons_tab[interaction.customId](Client,interaction);
        return;
    }
}