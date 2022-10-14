module.exports = async (client,interaction)=>{
	console.log(interaction.options);

	 //si le salon cible n'est pas définis, on utilise le salon d'ou est partie la commande
	 if(interaction.options.get("salon")!==null)
	 {
	 	let name_channel= (interaction.options.get("salon").value).substr(2,(interaction.options.get("salon").value).length-3);
	 	const channel = client.channels.cache.find(channel => channel.id ===name_channel); 
	 	console.log("nom du channel: "+name_channel);
	 	console.log(channel);
		//si le salon est correctement définis et reconnu, on l'utilise sinon on prévient en mp l'auteur du soucis
		if(channel !== undefined)
		{
			 //si le message est destiné à une personne
			 if(interaction.options.get("user")!==null)
			 {
			 	let id_user=interaction.options.get("user").value
			 	id_user=id_user.substr(3,id_user.length-4)
			 	let target_user=client.users.cache.get(id_user)
				//si on arrive à identifier l'utilisateur
				if(target_user!==undefined)
				{
					let id_user=interaction.options.get("user").value;
					id_user=id_user.substr(3,id_user.length-4);
					let target_user=client.users.cache.get(id_user);
					let message=`@${target_user.username} : \n ${interaction.options.get("message").value}`;
					channel.send(message);
					await interaction.reply({ content: "Message en cours d'envoi !", ephemeral: true });
					return;
				}
				else
				{
					await interaction.reply({ content: "Impossible d'envoyer le message, utilisateur cible non reconnue!", ephemeral: true });
					return;
				}

			}
			else
			{

				let message=`${interaction.options.get("message").value}`;
				channel.send(message);
				await interaction.reply({ content: "Message en cours d'envoi !", ephemeral: true });
				return;
			}
		}
		else
		{
			//on envoie la réponse comme quoi la commande ne peux pas s'effectuer
			await interaction.reply({ content: "impossible d'envoyer le message, salon non reconnu!", ephemeral: true });
			return;
		}
	}
	else
	{
		const channel = client.channels.cache.find(channel => channel.id === interaction.channelId)
		let message=`${interaction.options.get("message").value}`;
		channel.send(message);
		await interaction.reply({ content: "Message en cours d'envoi !", ephemeral: true });
		return;
	}

	//si on reçois une instruction de diffusion (privée ou public)
	if(interaction.options.get("type")!==null)
	{
		//si on reçois une demande en privée et q'un utilisateur à été indiqué
		if(interaction.options.get("type").value==="private" && interaction.options.get("user")!== undefined)
		{
			let id_user=interaction.options.get("user").value
			id_user=id_user.substr(3,id_user.length-4)
			let target_user=client.users.cache.get(id_user)
			//si on arrive à identifier l'utilisateur
			if(target_user!==undefined)
			{
				target_user.send (interaction.options.get("message"))
				//on envoie la réponse comme quoi la commande est exectuer
				await interaction.reply({ content: "Le message est parti en privé!", ephemeral: true });
				return;
			}
			else
			{
				//on envoie la réponse comme quoi la commande ne peux pas s'effectuer
				await interaction.reply({ content: "impossible d'envoyer le message, utilisateur cible non reconnu!", ephemeral: true });
				return;
			}
			console.log("je suis ici")
			//console.log(interaction.options.get("user").value)

			//console.log( client.users.cache.get(interaction.options.get("user").value))
			console.log(target_user)
			target_user.send ("va chier")
		}
	}
//on envoie la réponse comme quoi la commande est en cours 
 //await interaction.reply({ content: 'message envoyé!', ephemeral: true });

}