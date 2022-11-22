<script setup>
import { onMounted, ref } from 'vue';

let myGuilds = ref([]);
let d3Guilds = ref([]);
let guilds = ref([]);

const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

if (!accessToken) {
    console.log(`Accès refusé`);
    onMounted(() => {
        document.getElementById('info').innerText += `Token Invalide : Accès refusé`;
    });
} else {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
    .then(result => result.json())
    .then(response => {
        const { username } = response;
        document.getElementById('info').innerText += `Bienvenue ${username} !`;
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

    
    
    //Ordi ruben : http://10.8.111.195:5000/api/servers
    const fetchD3Guilds = fetch('http://localhost:5000/api/servers', {
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
        console.log(myGuilds.value);

        // guilds.value = myGuilds.filter(guild => {
        //     d3Guilds.value.filter(guildD3 => {
        //         guild.id === guildD3.id;
        //     });
        // });

        console.log(d3Guilds.value);
        let tab = [];
        let imgs = [];

        for (let i = 0; i < myGuilds.value.length; i++) {
            for (let j = 0; j < d3Guilds.value.length; j++) {
                if (d3Guilds.value[j].id === myGuilds.value[i].id) {
                    tab.push(myGuilds.value[i]);
                }
            }
        }
        // const fetchMyGuildsIcons = fetch('https://discord.com/api/users/@me/icons/guild_id/guild_icon.png', {
        //     headers: {
        //         authorization: `${tokenType} ${accessToken}`,
        //     },
        // })
        // .then(result => result.json())
        // .then(response => {
        //     myGuilds.value = response;
        // })
        // .catch(console.error);
    
        guilds.value = tab;
    }); 

}


function transfer(id) {
    sessionStorage.idGuild = id;
    sessionStorage.accessToken = accessToken;
}
</script>

<template>
    <div class="page">
        <div class="container">
            <label id="info"></label>
            <div class="guildList">
                <router-link v-for="guild in guilds" class="guild" to="/windaube_XP-TDR">
                    <div class="title" :id="guild.id" @click="transfer(guild.id)">{{ guild.name }}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container {
    padding: 20px;
    background-color: #18191c;
    color: #bbbcbd;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
}

#info {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.guildList {
    margin: 70px;

}

.guildList .guild {
    text-decoration: none;
}
.guildList .guild .title {
    padding: 10px;
    border-radius: 10px;
    transition: background-color .2s;
    cursor: pointer;

    font-size: 1.3em;
    color: #bbbcbd;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 2em;


    &:hover {
        background-color: rgba(128, 128, 128, 0.4);
        // background-color: rgba(255, 255, 255, 0.2);
    }
}


</style>
