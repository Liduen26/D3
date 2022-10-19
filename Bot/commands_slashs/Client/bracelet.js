module.exports = async (client,interaction)=>{
	//Trouver le rôle

    //Trouver l'utilisateur
    const User = interaction.options.getUser("utilisateur")
    //ajouter le rôle a l'utilisateur

	await interaction.reply({ 
        content: "Le bracelet a bien été posé", 
        ephemeral: true
});
}