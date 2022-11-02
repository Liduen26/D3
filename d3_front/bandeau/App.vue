<script setup>

</script>

<template>
<html>
    <header>
        <top>
            <div id = "image">
            <img id = logo classe = logo src = ./images/logo.png />
            </div>
        </top>
    </header>
    <footer>
        <div class="btn" id = window><input class="button-54"   type="button" value="fenêtre"></div>
        <div class="btn" id = soundbox><input class="button-54"  type="button" value="soundbox"></div>
        <div class="btn" id = change><input  class="button-54" type="button" value="changer de server"></div>
    </footer>
</html>
</template>

<style >
html{
    overflow: hidden;
    height: 100%;
}

body{
    overflow: hidden;
    margin: 0%;
    width: 100%;
    background-color: black;
    background-image: url(./images/body_1.gif);
    height: 100%;
    position: relative;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;


}
footer{
    overflow: hidden;
    position: absolute ;
    bottom: 0 ;
    border: solid;
    border-color: darkblue;
    background-color: black;
    width: 61%;
    margin-left: 22%;
    
}

header{
    background-image: url("./images/cloud.png");
    background-position: center;
    background-size: cover;
}

#image { 
    width : 150px;
    height : 150px;
    object-fit : contain;
}

#logo {
    height: 100%;
}

.btn{
    display: inline-block;
    padding-left: 10px;

}

/* CSS */
.button-54 {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: rgb(70, 69, 69);
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-54:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}

@media (min-width: 768px) {
  .button-54 {
    padding: 0.25em 0.75em;
  }
}



</style>
