<script setup>

import { ref } from 'vue';

let myGuilds = ref([]);
let d3Guilds = ref([]);
let guilds = ref([]);

const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

if (!accessToken) {
    // return (document.getElementById('login').style.display = 'block');
}

fetch('https://discord.com/api/users/@me', {
    headers: {
        authorization: `${tokenType} ${accessToken}`,
    },
})
.then(result => result.json())
.then(response => {
    const { username, discriminator } = response;
    document.getElementById('info').innerText += ` ${username}#${discriminator}`;
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
//http://10.8.111.195:5000/api/servers
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

        for (let i = 0; i < myGuilds.value.length; i++) {
            for (let j = 0; j < d3Guilds.value.length; j++) {
                if (d3Guilds.value[j].id === myGuilds.value[i].id) {
                    tab.push(myGuilds.value[i]);
                }
            }
        }

        guilds.value = tab;
    }); 
</script>

<template>
    Guilds
    <label id="info"></label>
    <div class="guildList">
        <router-link v-for="guild in guilds" class="guild">
            <div class="title" :id="guild.id">{{ guild.name }}</div>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.guildList {
    margin: 30px;
}

.guildList .guild {
    padding: 5px;
    transition: background-color .2s;
    cursor: pointer;

    &:hover {
        background-color: rgba(128, 128, 128, 0.4);
        // background-color: rgba(255, 255, 255, 0.2);
    }
}


</style>
