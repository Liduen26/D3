# Discord Command Center V1.0

## Intro
This is a full-stack discord bot-command center which allows a user to interact with any discord bot through a Nuxt front-end interfacing with an Express Rest API. 
Through this bot, users are able to execute the basic commands of kicking, banning, messaging, and dissing. 

The youtube video tutorial for this project is located here: https://youtu.be/VrrYymK45i4

![Web App Discord Command Center Preview](discordbotcommandcenter1.gif)
![Mobile Size Discord Command Center Preview](discordbotcommandcenter2.gif)

## Main Frameworks and Libraries Used
- Nuxt.js (Vue.js)
- Express.js (Node.js)
- Vuetify
- Discord.js

## Setup
### Step 1
Clone the required assets from GitLab, and install the node packages

### Step 2
Setup config environment variables file called 'config.env'. The variables required are as follows:
DISCORD_BOT_TOKEN='your token here'
INSULT_GEN_URI=https://evilinsult.com/generate_insult.php?lang=en&type=json
PORT='port number here'

### Step 3
Run the node instance and client:

Server (while in the root project directory):
> node main.js

Client (while in the client/ directory):
> npm run dev


