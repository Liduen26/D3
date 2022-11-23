<script setup>
import axios from 'axios';
import{ref} from 'vue';



let channels = ref('');
axios.get('http://localhost:5000/api/servers/'+ sessionStorage.idGuild).then(function (response){
  channels.value = response.data.channels;
});

let members = ref('');
axios.get('http://localhost:5000/api/servers/'+ sessionStorage.idGuild).then(function (response){
  members.value = response.data.members;
});

const input = ref(null);

// fonction channels
function suppr(i) {
  axios ({
    method : 'post',
    url : 'http://localhost:5000/api/messaging/message/'+i,
    data : {
      message : "Changer ça en supprimer"
    }
  });
};

function addbot(i) {
  axios ({
    method : 'post',
    url : 'http://localhost:5000/api/messaging/message/'+i,
    data : {
      message : "Changer ça ajouter bot"
    }
  });
};

function delbot(i) {
  axios ({
    method : 'post',
    url : 'http://localhost:5000/api/messaging/message/'+i,
    data : {
      message : "Changer ça retirer bot"
    }
  });
};

function restrain(i) {
  axios ({
    method : 'post',
    url : 'http://localhost:5000/api/messaging/message/'+i,
    data : {
      message : "Changer ça en restraindre"
    }
  });
};

// fonction members
function ban(i) {
  axios ({
    method : 'post',
    url : 'http://localhost:5000/api/messaging/message/1032251826495561749',
    data : {
      message : "ton id est"+ i
    }
  });
};

function putbracelet(i) {
  axios ({
    method : 'post',
    url : 'http://localhost:5000/api/messaging/message/1032251826495561749',
    data : {
      message : "ton id est"+ i
    }
  });
};

function delbracelt(i) {
  axios ({
    method : 'post',
    url : 'http://localhost:5000/api/messaging/message/1032251826495561749',
    data : {
      message : "ton id est"+ i
    }
  });
};

//barre de recherche
/*function search(){
  console.log (input.value);
  if(input.value == null || input.value =="reset"){
    let channels = ref('');
    axios.get('http://localhost:5000/api/servers/'+ sessionStorage.idGuild).then(function (response){
    channels.value = response.data.channels;
    });

    let members = ref('');
    axios.get('http://localhost:5000/api/servers/'+ sessionStorage.idGuild).then(function (response){
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
    method : 'post',
    url : 'http://localhost:5000/api/messaging/message/'+ i,
    data : {
      message : mess.value
    }
  });
};

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
        <input id = "poster" type="text" placeholder="poster"/>
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
  margin-top: 36px;
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