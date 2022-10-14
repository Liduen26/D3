module.exports = (Client, interaction) => {
    console.log("interaction détectée")
    console.log((interaction.commandName !== undefined) ? "/"+interaction.commandName :"btn "+interaction.customId);
    // console.log(commands_slachs)
    // console.log(buttons_tab);
    

    if (interaction.isCommand()) {
        commands_slachs[interaction.commandName](Client,interaction);
        return;
    }

    if (interaction.isButton()) {
        buttons_tab[interaction.customId](Client,interaction);
        return;
    }
}