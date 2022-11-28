<script setup>
import axios from 'axios';
import{ref} from 'vue';

const url = import.meta.env.VITE_URL_API || 'http://localhost:5000';

let channels = ref('');
axios.get(url + '/api/servers/'+ sessionStorage.idGuild).then(function (response){
  channels.value = response.data.channels;
});

let members = ref('');
axios.get(url + '/api/servers/'+ sessionStorage.idGuild).then(function (response){
  members.value = response.data.members;
});

const input = ref(null);

// fonction channels
function suppr(i) {
  axios ({
    method : 'POST',
    url : url + '/api/deletesalon/dellchannel',
    data : {
      guildID : sessionStorage.idGuild,
      channelID : i
    }
  });
};

function addbot(i) {
  console.log('channel id de général :'+i);
  axios ({
    method : 'POST',
    url : url + '/api/joinchannel',
    data : {
      channelID : i,
      guildID : sessionStorage.idGuild,
    }
  });
};

function delbot(i) {
  axios ({
    method : 'POST',
    url : url + '/api/leavechannel',
    data : {
      guildID : sessionStorage.idGuild,
    }
  });
};

function restrain(i) {
  axios ({
    method : 'POST',
    url : url + '/api/unban/user',
    data : {
      userID :"1044980052821028974",
      guildID : sessionStorage.idGuild

    }
  });
};

// fonction members
function ban(i) {
  axios ({
    method : 'POST',
    url : url + '/api/ban/user',
    data : {
      userID : i,
      guildID : sessionStorage.idGuild,
      reason : "tu étais chiant"

    }
  });
};

function putbracelet(i) {
  axios ({
    method : 'POST',
    url : url + '/api/bracelet/role',
    data : {
      userID :i,
      guildID : sessionStorage.idGuild,
      roleID : "1032221518249332746"

    }
  });
};

function delbracelt(i) {
  console.log(i);
  axios ({
    method : 'POST',
    url : url + '/api/nobracelet/norole',
    data : {
      userID :i,
      guildID : sessionStorage.idGuild,
      roleID : "1032221518249332746"

    }
  });
};

//barre de recherche
/*function search(){
  console.log (input.value);
  if(input.value == null || input.value =="reset"){
    let channels = ref('');
    axios.get(url + '/api/servers/'+ sessionStorage.idGuild).then(function (response){
    channels.value = response.data.channels;
    });

    let members = ref('');
    axios.get(url + '/api/servers/'+ sessionStorage.idGuild).then(function (response){
      members.value = response.data.members;
    });
  }
  else{
    let lchannel = [] ;
    (channels.value).forEach(channel => {
      if(channel.name[0] == input.value[0] && channel.name[1] == input.value[1] && channel.name[2] == input.value[2] ){
        console.log(channel.name[0])
        lchannel.push(channel);
      }
    });
    console.log(lchannel);
    channels.value = lchannel;
  }
};*/ // en travaux (. ❛ ᴗ ❛.)

function poster(i) {
  var mess = document.getElementById('poster');
  console.log(mess.value);
  axios ({
    method : 'POST',
    url : url + '/api/messaging/message/'+ i,
    data : {
      message : mess.value
    }
  });
};

function creer(i){
  console.log("c");
  var mess = document.getElementById('poster');
  axios ({
    method : 'POST',
    url : url + '/api/createsalontextuel/channel',
    data : {
      channelname : mess.value,
      categoryID : "1027139435680235551",
      guildID : sessionStorage.idGuild,
      
    }
  });
}

function creerV(i){
  console.log("c");
  var mess = document.getElementById('poster');
  axios ({
    method : 'POST',
    url : url + '/api/createsalonvocal/channel',
    data : {
      channelname : mess.value,
      categoryID : "1027139436124848188",
      guildID : sessionStorage.idGuild,
      
    }
  });
}

</script>

<template>
<div id = body_window >
<div id = container>
    <div id = outer>
        <div id = en_tête> 
            <h1>Admin</h1>
        </div>
        <div id = inner>
            <div id = salon>
                <div class="top">salon</div>
                <div class="contenu">
                  <ul >
                    <li v-for="channel in channels" :key="i" class="elem">
                      <div class="nom">{{channel.name}}</div>
                      <button class="ordre" v-on:click="suppr(channel.id)">❌</button>
                      <button class="ordre" v-on:click="addbot(channel.id)">🤖</button>
                      <button class="ordre" v-on:click="delbot(channel.id)">👉</button>
                      <button class="ordre" v-on:click="restrain(channel.id)">🔒</button>
                    </li>
                  </ul>
                </div>
            </div>
            <div id = user>
                <div class ="top">user</div>
                <div class="contenu"> 
                  <ul >
                    <li v-for="member in members" :key="i" class="elem">
                      <div class="nom">{{member.name}}</div>
                      <button class="ordre" v-on:click="ban(member.id)">🔨</button>
                      <button class="ordre" v-on:click="putbracelet(member.id)">🔐</button>
                      <button class="ordre" v-on:click="delbracelt(member.id)">🔓</button>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
      <div id="footer">
        <button @click="creer(i)"> Créer textuel </button>
        <input id = "poster" type="text" placeholder="poster"/>
        <button @click="creerV(i)"> Créer vocal </button>
        <div>
          <button v-for="channel in channels" class="but" v-on:click="poster(channel.id)">{{channel.name}}</button>
        </div>
      </div>
  </div>
</div>    
  
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Lobster&display=swap');

.but
{
  float: inline-start;
  height: 30px;
  width: 10%;
  overflow: hidden;
  margin: 5px;
}

#body_window{
  position: absolute;
  top: 0px;
  margin-top: 30px;
  bottom: 0px;
  left : 0px;
  right: 0px;
  color: aliceblue;
  background-image: url("./src/assets/back/1092728.jpg");
  background-size: cover;
 
    


}


#container{
    position: relative;
    top: 0;
    left: 0;
    height: 95%;
    width: 100%;
    padding: 0;

}

#en_tête
{
  width:100%;
  height:40px;
  text-align: center;
  color: goldenrod;
  font-family: 'Lobster', cursive;
  

}
#outer
{
  margin:20px auto;
  width:100%;
  height:80%;
}
#inner
{
  height:90%;
  padding:0 0 64px 0;
  text-align:center;

}
#salon, #user
{
  display:inline-block;
  width:49.5%;
  height:100%;
  margin:0px;
  text-align:center;
  font-family: 'Chakra Petch', sans-serif;

}

#salon
{
  float: left;
}

.contenu
{
  overflow-x: hidden;
  overflow-y: scroll;
  width: 300px;
  height: 100px;
  overflow-y: scroll;
  scrollbar-color: rgb(161, 83, 180) rgb(107, 10, 83);
  scrollbar-width: thin;
}

.elem
{
  margin: 10px;
  border: solid 1px whitesmoke;
  background-color: rgba(240, 248, 255, 0.522);
}




#footer{
  text-align: center;
  font-family: 'Chakra Petch', sans-serif;
  height: 60px;
  width: 100%;
  position: absolute;
  
}
#search{
  margin-top: 20px;
  
}

.top{
  border: solid 1px white;
  width: 100%;
  background-color: slategray;
  color: lightgoldenrodyellow;

}

.contenu{
  border: solid 1px;
  width: 100%;
  height: 100%;
}


</style>