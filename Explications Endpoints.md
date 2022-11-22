# API D3

## Récupère des infos générales sur le bots et les serveur dans lequel il est (servers.js)
    GET : http://localhost:5000/api/servers/

    ne nécessite rien dans le body

## Récupérer les infos des membres, channels, roles (servers.js)
    GET : http://localhost:5000/api/servers/'serverID'

    ne nécessite rien dans le body

## Envoyer une message dans un channel (messaging.js)

    POST : http://localhost:5000/api/messaging/message/'channelID'

    nécessite dans l'URL le channelID

    nécessite dans le body :
    {
        "message" : ""
    }

## Kick un membre (kick.js)
    POST : http://localhost:5000/api/kick/user

    nécessite dans le body : 
    {
        "userID" : "",
        "guildID" : "",
        "reason" : ""
    }

## Ban un membre (ban.js)
    POST : http://localhost:5000/api/ban/user

    nécessite dans le body : 
    {
        "userID" : "",
        "guildID" : "",
        "reason" : ""
    }

## Unban un membre (unban.js)
    POST : http://localhost:5000/api/unban/user

    nécessite dans le body : 
    {
        "userID" : "",
        "guildID" : ""
    }

## Envoyer le bot dans un channel (joinchannel.js)
    POST : http://localhost:5000/api/joinchannel

    nécessite dans le body : 
    {
        "channelID" : "",
        "guildID" : ""
    }

## Décconecter le bot d'un channel (leavechannel.js)
    POST : http://localhost:5000/api/leavechannel

    nécessite dans le body : 
    {
        "guildID" : ""
    }

## Jouer un son sur le bot (playsound.js) PAS ENCORE FONCTIONNEL
    POST : http://localhost:5000/api/playsound

    nécessite dans le body : 
    {
        "guildID" : ""
    }

## Crée un salon textuel (createsalontextuel.js)
    POST : http://localhost:(port)/api/createsalontextuel/channel

        nécessite dans le body : 
{
    "guildID" : "",
    "categoryID" : "",
    "channelname" : ""
}

## Crée un salon vocal (createsalonvocal.js)
    POST : http://localhost:(port)/api/createsalonvocal/channel

        nécessite dans le body : 
{
    "guildID" : "",
    "categoryID" : "",
    "channelname" : ""
}

## Supprimer un salon (deletesalon.js)
    POST : http://localhost:(port)/api/deletesalon/dellchannel

        nécessite dans le body : 
{
    "guildID" : "",
    "channelID" : ""
}

## Ajouter un bracelet a un membre (bracelet.js)
    POST : http://localhost:(port)/api/bracelet/role

        nécessite dans le body :
{
    "guildID" : "1027139435680235550",
    "userID" : "238660830210555905",
    "roleID" : "1032221518249332746"
}

## Retirer un bracelet a un membre (nobracelet.js)
    POST : http://localhost:(port)/api/nobracelet/role

        nécessite dans le body :
{
    "guildID" : "1027139435680235550",
    "userID" : "238660830210555905",
    "roleID" : "1032221518249332746"
}
