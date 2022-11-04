<script setup>
import VueResizable from 'vue-resizable';
import { onMounted, ref } from "vue";

const dragSelector = ".w-picker";
const handlers = ["r", "rb", "b", "lb", "l", "lt", "t", "rt"];
const min = { w: 100, h: 100 };
let placer = ref(false);

let focusWindow = ref("");


let activesWindows = ref({});
activesWindows.name = "activesWindows"
activesWindows.value = {
    "Firefox": {
        x: 300,
        y: 150,
        w: 300,
        h: 200,
        icon: "Firefox_logo,_2019.svg",
        moving: false,
    },
    "Spotify": {
        x: 600,
        y: 300,
        w: 450,
        h: 300,
        icon: "icon_spoty",
        moving: false,
    }
};

let minWindows = ref({});
minWindows.name = "minWindows";
minWindows.value = {
    "Minecraft": {
        x: 600,
        y: 500,
        w: 250,
        h: 300,
        icon: "minecraft-icon",
        moving: false,
    }
};

// Juste avant l'affichage
onMounted(() => {

    // Si localStorage.activesWindows contient qqchose
    if (localStorage.activesWindows) {
        const data = JSON.parse(localStorage.activesWindows);
        activesWindows.value = {};
        
        // Boucle pour remplir le tableau des fenêtres actives à partir des datas dans les cookies
        for (const window in data) {
            activesWindows.value[window] = data[window];
        }
    }
    
    
    // Si localStorage.minWindows contient qqchose
    if (localStorage.minWindows) {
        const data = JSON.parse(localStorage.minWindows);
        minWindows.value = {};

        // Boucle pour remplir le tableau des fenêtres actives à partir des datas dans les cookies
        for (const window in data) {
            minWindows.value[window] = data[window];
        }
    }
})

/**
 * Gère les évents et la prise en compte des données au déplacement et resize
 * @param {*} data event du DOM
 * @param {*} i index du tableau
 * @param {boolean} end Est-ce que c'est la fin d'une action ? (pour la save)
 */
function eHandler(data, i, end, moving) {
    // Redéfinit les variables des objet par rapport au depl et resize
    activesWindows.value[i].w = data.width;
    activesWindows.value[i].h = data.height;
    activesWindows.value[i].x = data.left;
    activesWindows.value[i].y = data.top;

    if (end) {
        activesWindows.value[i].moving = false;
        setStorage(activesWindows);
    }

    if (moving) {
        activesWindows.value[i].moving = true;

        // Affichage du placer
        if (placer.value) {
            const divPlacer = document.querySelector("#w-placer");

            divPlacer.style.left = data.left + 'px';
            divPlacer.style.top = data.top + 'px';
            divPlacer.style.width = data.width + 'px';
            divPlacer.style.height = data.height + 'px';
            console.log(divPlacer);

            divPlacer.classList.add("placer-maximized");

            // Va falloir faire du SCSS pour avoir une classe qui s'adapte 
        }
    }
}

/**
 * Prends en argument le tableau qu'on veut stocker (Pas de .value en cas de ref !)
 * @param {object} payload 
 */
function setStorage(params) {
    localStorage.setItem(params.name, JSON.stringify(params.value));

    return true;
}

function log() {
    // for (const fenetres in activesWindows) {
    //     console.log(activesWindows[fenetres]);
    // }
    console.log(activesWindows.value);
    console.log(focusWindow);
    // console.log(minWindows);
}

function clearStorage() {
    localStorage.clear();
    console.log(localStorage);
}

/**
 * Envoie la fenêtre dans la barre des tâches
 * @param {*} index 
 */
function minimize(index) {
    console.log("slt");
    minWindows.value[index] = activesWindows.value[index];
    delete activesWindows.value[index];

    setStorage(minWindows);
    setStorage(activesWindows);
}

/**
 * Sors la fenêtre de la barre des tâches et l'affiche
 * @param {*} index 
 */
function unMinimize(index) {
    activesWindows.value[index] = minWindows.value[index];
    delete minWindows.value[index];

    setStorage(minWindows);
    setStorage(activesWindows);
}

function selectWindow(e, index) {
    focusWindow.value = index;
}


function upscale(side, reset) {
    console.log("heyyy");

    placer.value = reset ? false : true;
    console.log(placer.value);

    switch (side) {
        case "top":
            
            break;
        case "left":
            
            break;
        case "right":
            
            break;
        default:
            break;
    }
}
</script>

<template>
    <header>
        <h1>Test fenêtres déplaçables</h1>
        <button @click="log">Log</button>
        <button @click="clearStorage">Clear</button>
    </header>
    <div class="page">
        <div class="upscale top" @mouseenter="upscale('top')" @mouseleave="upscale('top', reset = true)"></div>
        <div class="upscale left" @mouseenter="upscale('left')" @mouseleave="upscale('left', reset = true)"></div>
        <div class="upscale right" @mouseenter="upscale('right')" @mouseleave="upscale('right', reset = true)"></div>

        <div id="w-placer"></div>

        <vue-resizable v-for="(window, index) of activesWindows" :key="index"
        :id="index" class="default"
        :class="[(index === focusWindow) ? 'foreground-w' : 'background-w', window.moving ? 'moving' : '']" 
        :dragSelector="dragSelector" :active="handlers" :fit-parent="false"
        :width="window.w" :height="window.h"
        :left="window.x" :top="window.y"
        :min-width="min.w" :min-height="min.h"
        @mount="eHandler($event, index)"
        @mousedown="selectWindow($event, index)"
        @resize:start="eHandler($event, index, false)"
        @resize:move="eHandler($event, index, false, moving = true)"
        @resize:end="eHandler($event, index, end = true)"
        @drag:start="eHandler($event, index, false)"
        @drag:move="eHandler($event, index, false, moving = true)"
        @drag:end="eHandler($event, index, end = true)">
            <div class="w-picker">
                <img :src="`./testWindows/assets/icons/${window.icon}.png`" alt="icon" class="iconW">
                <div class="buttonBar">
                    <button class="minimizeW" @click="minimize(index)">-</button>
                    <button class="closeW">X</button>
                </div>
            </div>
            
            <div class="w-content"><pre>{{ window }}</pre></div>
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

<style scoped lang="scss">
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
    perspective: 1em;


    .upscale {
        position: absolute;
        

    }
    .upscale.top {
        background-color: rgba(255, 0, 0, 0.4);
        left: 0;
        top: 0;
        width: 100%;
        height: 5%;
    } 
    .upscale.left {
        background-color: rgba(0, 157, 255, 0.4);
        left: 0;
        top: 0;
        width: 3%;
        height: 100%;
    }
    .upscale.right {
        background-color: rgba(0, 157, 255, 0.4);
        right: 0;
        top: 0;
        width: 3%;
        height: 100%;
    }
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

.foreground-w {
    z-index: 2;
}
.background-w {
    z-index: 1;
}

.moving {
    pointer-events: none;
}


/* Placer */

#w-placer {
    // transition: ;
    pointer-events: none;
    position: absolute;

    background-color: red;

    
}

.placer-maximized {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.placer {

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
