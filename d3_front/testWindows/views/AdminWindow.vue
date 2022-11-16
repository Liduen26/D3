<script setup>
</script>

<template>
<div id = body_window>
<div id = container>
    <div id = outer>
        <div id = en_tête> 
            <h1>Admin</h1>
        </div>
        <div id = inner>
            <div id = salon>
                <div class="top">salon</div>
                <div class="contenu">
                  Test
                </div>
            </div>
            <div id = user>
                <div class ="top">user</div>
                <div class="contenu"> Test</div>
            </div>
        </div>
    </div>
    <div id="footer">
    <input id = "search" type="text" placeholder="search..." />
    </div>
</div>
</div>   
  
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Lobster&display=swap');


#body_window{
  position: absolute;
  top: 0px;
  margin-top: 38px;
  bottom: 0px;
  left : 0px;
  right: 0px;
  color: aliceblue;
  background-image: url("C:\Users\mirin\Desktop\d3\d3_front\image\1092728.jpg");
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