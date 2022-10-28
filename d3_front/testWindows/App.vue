<script setup>
import VueResizable from 'vue-resizable';
import { ref } from "vue";

const dragSelector = ".w-picker";
const handlers = ["r", "rb", "b", "lb", "l", "lt", "t", "rt"];
const min = { w: 100, h: 100 };
const fit = false;

const x = ref(300);
const y = ref(150);


let activesWindows = ref({});
activesWindows.value = {
    "Firefox": {
        x: x,
        y: y,
        w: ref(300),
        h: ref(200),
        moving: ref(false),
        fit: true,
        icon: "Firefox_logo,_2019.svg",
        minimized: false
    },
    "Spotify": {
        x: 600,
        y: 300,
        w: ref(450),
        h: ref(300),
        moving: ref(false),
        icon: "icon_spoty",
        minimized: false
    }
};

let minWindows = ref({});
minWindows.value = {
    "Minecraft": {
        x: 600,
        y: 500,
        w: ref(250),
        h: ref(300),
        moving: ref(false),
        icon: "minecraft-icon",
        minimized: true
    }
};

if (document.cookie) {
    const stringCookie = JSON.parse(document.cookie);

    activesWindows = stringCookie;
}

function eHandler(data, i, end) {
    // Redéfinit les variables des objet par rapport au depl et resize
    activesWindows.value[i].w = data.width;
    activesWindows.value[i].h = data.height;
    activesWindows.value[i].x = data.left;
    activesWindows.value[i].y = data.top;

    if (end) {
        setCookies();
    }
}

function setCookies() {
    console.log("setCookie");

    document.cookie = `"activesWindows":${JSON.stringify(activesWindows.value)}`;
    console.log(document.cookie);
}

function log() {
    // for (const fenetres in activesWindows) {
    //     console.log(activesWindows[fenetres]);
    // }
    console.log(activesWindows.value[0].x);
    console.log(activesWindows.value);
    // console.log(minWindows);
}

function minimize(index) {
    activesWindows.value[index].minimized = true;
    minWindows.value[index] = activesWindows.value[index];
    delete activesWindows.value[index];
}

function unMinimize(index) {
    minWindows.value[index].minimized = false;
    activesWindows.value[index] = minWindows.value[index];
    delete minWindows.value[index];
}

</script>

<template>
    <!-- <header>
        <h1>Test fenêtres déplaçables</h1>
        <button @click="log">Log</button>
    </header> -->
    <div class="page">

        <vue-resizable v-for="(window, index) of activesWindows" :key="index"
        class="default"
        :id="index"
        :dragSelector="dragSelector"
        :active="handlers"
        :fit-parent="fit"
        :width="window.w" :height="window.h"
        :left="window.x" :top="window.y"
        :min-width="min.w" :min-height="min.h"
        @mount="eHandler($event, index)"
        @resize:move="eHandler($event, index)"
        @resize:start="eHandler($event, index)"
        @resize:end="eHandler($event, index, end=true)"
        @drag:move="eHandler($event, index)"
        @drag:start="eHandler($event, index)"
        @drag:end="eHandler($event, index, end=true)">
            <div class="w-picker">
                <img :src="`./testWindows/assets/icons/${window.icon}.png`" alt="icon" class="iconW">
                <div class="buttonBar">
                    <button class="minimizeW" @click="minimize(index)">-</button>
                    <button class="closeW">X</button>
                </div>
            </div>
            
            <div class="w-content"> {{ window }}</div>
        </vue-resizable> 

    </div>
    <div class="toolbar">
        <div class="minimContainer" v-for="(window, index) of minWindows">
            <div class="minimApp" :id="index" @click="unMinimize(index)">
                <img :src="`./testWindows/assets/icons/${window.icon}.png`" alt="icon">
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Mise en page */
header {
    display: flex;
    justify-content: center;
    
    border-bottom: 2px solid black;
    height: 10%;
}

.page {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    height: 90%;
    position: relative;
    overflow: hidden;

    background: no-repeat center/cover url("./testWindows/assets/back/Squadron\ 42\ -\ Star\ Citizen\ Screenshot\ 2022.08.08\ -\ 18.14.29.28.png") ;
}

.resizable {
    background-position: top left;
    width: 150px;
    height: 150px;
    padding: 0;
    border: 1px solid #003eff;
    background: #007fff;
    font-weight: normal;
    color: #ffffff;
    position: relative;
}

#Firefox {
    z-index: 2;
}

/* Style Fenètres déplacables */
.default {
    width: 25%;
    height: 300px;
    outline: 1px solid black;
    background-color: darkgoldenrod;
    box-shadow: 2px 2px 4px black;
    
    position: absolute;
    left: 20%;
    top: 50px;
    
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    
    transition: border-color .2s, left .01s, top .01s, height .02s, width .02s; 
}

.w-picker {
    background-color: gray;
    cursor: move;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 3px;
}


.buttonBar {
    display: flex;
    justify-content: right;
    align-items: center;
    height: 100%;
}

.minimizeW, .closeW {
    background-color: rgba(255, 255, 255, 0.474);
    border-radius: 50%;
    width: 1.8em;
    height: 1.8em;
    cursor: pointer;
    border: 0;
    margin-left: 5px;
    transition: background-color .2s;
}

.minimizeW:hover {
    background-color: rgba(255, 166, 0, 0.6);
}

.closeW:hover {
    background-color: rgba(220, 20, 60, 0.8);
}

.iconW {
    height: 80%;
    padding-left: 3px;
}


/* Toolbar */

.toolbar {
    display: flex;
    justify-content: center;
    height: 5vh;
    background-color: lightslategray;
}

.minimContainer {
    height: 100%;
}


.minimApp {
    height: 92%;
    display: flex;
    align-items: center;
    padding: 0 1.6vh;
    margin-bottom: -4px;
    background-color: rgba(255, 255, 255, 0.1);
    border-bottom: 2px solid cyan;
    border-radius: 3px;

    transition: background-color .2s;
}

.minimApp:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.minimApp img {
    height: 60%;
}
</style>
