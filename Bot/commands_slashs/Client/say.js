module.exports = async (client,interaction)=>{
	const channel = client.channels.cache.find(channel => channel.id === interaction.channelId)
	let message=`${interaction.options.get("message").value}`;

	channel.send(message); // Envoi du message dans le channel

	await interaction.reply({ 
		content: "Message envoyé !", 
		ephemeral: true 
	});
}