<script setup>
import { ref } from 'vue';

const url = import.meta.env.VITE_URL_API || 'http://localhost:5000';

let myGuilds = ref([]);
let d3Guilds = ref([]);
let guilds = ref([]);

let msgName = ref("");
let idUser = ref();
let avatarUser = ref();

const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

if (!accessToken) {
    console.log(`Accès refusé`);
    msgName.value = `Token Invalide : Accès refusé`;
} else {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
    .then(result => result.json())
    .then(response => {
        const { username, id, avatar } = response;
        msgName.value = `Bienvenue ${username} ! Choisis ton serveur :`;
        idUser.value = id;
        avatarUser.value = avatar;
    })
    .catch(console.error);
    
    
    
    
    const fetchMyGuilds = fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
    .then(result => result.json())
    .then(response => {
        myGuilds.value = response;
    })
    .catch(console.error);
    
    const fetchD3Guilds = fetch(url + '/api/servers', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    })
    .then(result => result.json())
    .then(response => {
        d3Guilds.value = response;
    })
    .catch(console.error);
    
    Promise.all([fetchMyGuilds, fetchD3Guilds])
    .then(responses => {
        let tab = [];
        
        for (let i = 0; i < myGuilds.value.length; i++) {
            for (let j = 0; j < d3Guilds.value.length; j++) {
                if (d3Guilds.value[j].id === myGuilds.value[i].id) {
                    let guild = myGuilds.value[i]
                    tab.push(guild);
                    
                    if (guild.icon) {
                        guild.icon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                    } else {
                        guild.icon = ``;
                    }
                }
            }
        }
        guilds.value = tab;
    }); 
    
}


function transfer(id) {
    sessionStorage.idGuild = id;
    sessionStorage.accessToken = accessToken;
}
</script>

<template>
    <div id="backgroundImg"></div>
    
    <div class="page">
        <div class="container">
            <label id="info">
                <img :src="`https://cdn.discordapp.com/avatars/${idUser}/${avatarUser}.jpg`" draggable="false">
                {{ msgName }}
            </label>
            <div class="guildList">
                <router-link v-for="guild in guilds" class="guild" to="/windaube_XP-TDR" draggable="false">
                    <img :src="guild.icon" draggable="false">
                    <div class="title" :id="guild.id" @click="transfer(guild.id)">{{ guild.name }}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

* {
    // --primary: hsl(220, calc(1 * 7.7%), 22.9%); couleurs discord
    // --secondary: hsl(223, calc(1 * 6.9%), 19.8%);

    // Scrollbar for Firefox
    scrollbar-width: thin;
    scrollbar-color: #202225 #2f3136;
}

/* Scrollbar for Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 0.9vh;
}
*::-webkit-scrollbar-track {
    background: #2f3136;
}
*::-webkit-scrollbar-thumb {
    background-color: #202225;
}

#backgroundImg {
    background: center/cover url("../assets/back/Squadron\ 42\ -\ Star\ Citizen\ Screenshot\ 2022.05.22\ -\ 17.05.28.22.png");
    filter: blur(8px);
    -webkit-filter: blur(8px);
    width: 100%;
    height: 100%;
}

.page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

img[src=""] {
    opacity: 100%;
    border: none !important;
}

.container {
    padding: 1.3vh;
    background-color: #1a1b1ee8;
    color: #bbbcbd;
    display: flex;
    flex-direction: column;
    border-radius: 3.5vh;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.5);
    
    width: 60vh;
    max-height: 42vh;
    
}

#info {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    display: flex;
    align-items: center;
    background-color: rgba(128, 128, 128, 0.17);
    padding-right: 20px;
    border-radius: 3vh;
    font-size: 1.8vh;

    img {
        width: 6vh;
        margin-right: 10px;
        border-radius: 50%;
        border: 1px solid black;
    }
}



.guildList {
    display: flex;
    flex-direction: column;
    align-items: safe center;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    margin-top: 10px;
}

.guildList .guild {
    text-decoration: none;
    padding: 10px;
    display: flex;
    align-items: center;
    width: 85%;
    border-radius: 1vh;
    margin-top: 10px;
    
    transition: all .3s;
    
    .title {
        border-radius: 10px;
        transition: background-color .2s;
        cursor: pointer;
        
        color: #bbbcbd;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 3.1vh;
    }
    
    img {
        height: 7vh;
        border-radius: 3.5vh;
        margin-right: 10px;
        border: 1px solid black;
        transition: all .3s;
    }
    
    &:hover {
        background-color: rgba(128, 128, 128, 0.4);
        
        img {
            border-radius: 2.5vh;
        } 
    }
}
</style>