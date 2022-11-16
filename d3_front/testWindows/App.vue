<script setup>
import VueResizable from 'vue-resizable';
import { onMounted, ref } from "vue";
import AdminWindowVue from './views/AdminWindow.vue';



const dragSelector = ".w-picker";
const handlers = ["r", "rb", "b", "lb", "l", "lt", "t", "rt"];
const min = { w: 100, h: 100 };
let placer = ref({state: false, place: ""});

let replaceCo = ref({x: 0, y: 0});

// const page = document.querySelector(".page");
// const pageRect = page.getBoundingClientRect();

// let screen = ref({width: pageRect.width, height: pageRect.height});


let activesWindows = ref({});
activesWindows.name = "activesWindows"
activesWindows.value = {
    "Firefox": {
        x: 300,
        y: 150,
        w: 300,
        h: 200,
        max: {
            state: false,
            side: ""
        },
        icon: "Firefox_logo,_2019.svg",
        moving: false,
        minSize: {
            x: false, // false si désactivé (qd même 100x100px)
            y: false
        },
        barColor: '#000',
        textColor: 'rgb(255, 72, 0)'
    },
    "Spotify": {
        x: 600,
        y: 300,
        w: 450,
        h: 300,
        max: {
            state: false,
            side: ""
        },
        icon: "icon_spoty",
        moving: false,
        minSize: {
            x: false,
            y: false
        },
        barColor: false,
        textColor: false
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
        max: {
            state: false,
            side: ""
        },
        icon: "minecraft-icon",
        moving: false,
        minSize: {
            x: false,
            y: false
        },
        barColor: false,
        textColor: false
    }
};

// Juste avant l'affichage
onMounted(() => {

    // Si le localStorage.activesWindows contient qqchose
    if (localStorage.activesWindows) {
        const data = JSON.parse(localStorage.activesWindows);
        activesWindows.value = {};
        console.log(data);
        
        // Boucle pour remplir le tableau des fenêtres actives à partir des datas dans les cookies
        for (const window in data) {
            activesWindows.value[window] = data[window];
        }
    }
    
    
    // Si le localStorage.activesWindows contient qqchose
    if (localStorage.minWindows) {
        const data = JSON.parse(localStorage.minWindows);
        minWindows.value = {};
        console.log(data);

        // Boucle pour remplir le tableau des fenêtres actives à partir des datas dans les cookies
        for (const window in data) {
            console.log(window);
            minWindows.value[window] = data[window];
            console.log(minWindows);
        }
    }

    if (localStorage.focusWindow) {
        focusWindow.value = localStorage.focusWindow;
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


    const appBar = document.querySelector(`#${i} .w-picker`);

    if (end) {
        activesWindows.value[i].moving = false;
        delete placer.value.app;
        saveState();
    }
    
    if (moving) {
        activesWindows.value[i].moving = true;
        placer.value.app = i;
    
        if (activesWindows.value[i].max.state) {
            activesWindows.value[i].max.state = false;

            const page = document.querySelector(".page");
            const pageRect = page.getBoundingClientRect();

            
            // Déplacer la fenêtre sur les coordonées de la souris 
            activesWindows.value[i].x = replaceCo.value.x - (data.width / 2);
            activesWindows.value[i].y = replaceCo.value.y - 10 - pageRect.top;
        }
        
    }
}

function setReplaceCo(e) {
    replaceCo.value.x = e.x;
    replaceCo.value.y = e.y;
}


/**
 * Sauvegarde l'état du système, les tableaux de fenètres actives et minimisées, et la fenêtre en focus
 */
function saveState() {
    localStorage.setItem("activesWindows", JSON.stringify(activesWindows.value));
    localStorage.setItem("minWindows", JSON.stringify(minWindows.value));
    
    const page = document.querySelector(".page");
    const pageRect = page.getBoundingClientRect();

    localStorage.setItem("screen", JSON.stringify({width: pageRect.width, height: pageRect.height}))
}

function log() {
    // for (const fenetres in activesWindows) {
    //     console.log(activesWindows[fenetres]);
    // }
    console.log(localStorage);
    console.log(focusWindow.value);
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
    saveState();
}

/**
 * Sors la fenêtre de la barre des tâches et l'affiche
 * @param {*} index 
 */
function unMinimize(index) {
    activesWindows.value[index] = minWindows.value[index];
    delete minWindows.value[index];
    selectWindow(index)
}

function selectWindow(index) {
    let obj = activesWindows.value[index];
    delete activesWindows.value[index];
    activesWindows.value[index] = obj;
    saveState();
}


function upscale(side, reset) {
    placer.value.state = reset ? false : true;
    placer.value.place = side;
    let i;

    if (placer.value.app) {
        i = placer.value.app;
    }

    if (reset) {
        const divPlacer = document.querySelector(`.w-placer.${placer.value.place}`);
        divPlacer.classList.remove("placer-visible");
        divPlacer.classList.remove("placer-maximized");
        divPlacer.classList.remove("placer-half-left");
        divPlacer.classList.remove("placer-half-right");
    } else if (i) {
        console.log(i);
        
        // Gestion de la div transparente qui montre où va être l'app
        const divPlacer = document.querySelector(`.w-placer.${placer.value.place}`);
        const app = document.querySelector(`#${i}`);

        divPlacer.classList.add("placer-visible");

        if (placer.value.place === "top") {
            divPlacer.classList.add("placer-maximized");
            
        } else if(placer.value.place === "left" || placer.value.place === "right") {
            divPlacer.classList.add(`placer-half-${placer.value.place}`);
        }
        
        
        const zonePlacer = document.querySelector(`.upscale.${placer.value.place}`);
        zonePlacer.addEventListener("mouseup", mouseup);
        zonePlacer.addEventListener("mouseleave", mouseleave)

        // Quand on lache le clic / Gestion de l'agrandissement réel de l'app
        function mouseup() {
            console.log("salut !", app);

            scale(i, side);
            
            zonePlacer.removeEventListener("mouseup", mouseup);
            zonePlacer.removeEventListener("mouseleave", mouseleave);
        }

        // Pour enlever les event listeners
        function mouseleave() {
            zonePlacer.removeEventListener("mouseleave", mouseleave);
            zonePlacer.removeEventListener("mouseup", mouseup);
        }
    }
}

function scale(i, side) {
    activesWindows.value[i].max.state = true;
    activesWindows.value[i].max.side = side;
}

/**
 * Retourne les coordonnées d'une div par rapport à une autre
 * @param targP La div dont on veut les coordonnées
 * @param section Le référentiel
 */
function getRect(targP, section) {
    let offset = [];

    let divRect = section.getBoundingClientRect();
    let elemRect = targP.getBoundingClientRect();
    offset.left = (elemRect.left - divRect.left) + section.scrollLeft;
    offset.top = (elemRect.top - divRect.top) + section.scrollTop;
    offset.width = elemRect.width;
    offset.height = elemRect.height;

    return offset;
}
</script>

<template>
    <header>
        <h3>Test fenêtres déplaçables</h3>
        <button @click="log">Log</button>
        <button @click="clearStorage">Clear</button>
    </header>
    <div class="page">
        <div class="upscale top" @mouseenter="upscale('top')" @mouseleave="upscale('top', reset = true)"></div>
        <div class="upscale left" @mouseenter="upscale('left')" @mouseleave="upscale('left', reset = true)"></div>
        <div class="upscale right" @mouseenter="upscale('right')" @mouseleave="upscale('right', reset = true)"></div>

        <div class="w-placer top"></div>
        <div class="w-placer left"></div>
        <div class="w-placer right"></div>

        <vue-resizable v-for="(window, index) of activesWindows" :key="index"
        :id="index" class="app"
        :class="[window.moving ? 'moving' : '', 
        window.max.state ? (window.max.side === 'top') ? 'max-top' : '' : '', 
        window.max.state ? (window.max.side === 'left') ? 'max-left' : '' : '', 
        window.max.state ? (window.max.side === 'right') ? 'max-right' : '' : '']"  
        :dragSelector="dragSelector" :active="handlers" :fit-parent="false"
        :width="window.w" :height="window.h"
        :left="window.x" :top="window.y"
        :min-width="(window.minSize.x) ? window.minSize.x : min.w" :min-height="(window.minSize.y) ? window.minSize.y : min.h"
        @mount="eHandler($event, index)"
        @mousedown="selectWindow(index)"
        @resize:start="eHandler($event, index, false)"
        @resize:move="eHandler($event, index, false, moving = true)"
        @resize:end="eHandler($event, index, end = true)"
        @drag:start="eHandler($event, index, false)"
        @drag:move="eHandler($event, index, false, moving = true)"
        @drag:end="eHandler($event, index, end = true)">
            <div class="w-picker" @mousedown="setReplaceCo" @dblclick="scale(index, 'top')"
            :style="[window.barColor ? `background-color: ${window.barColor}` : '', window.textColor ? `color: ${window.textColor}` : '']">
                <img :src="`./testWindows/assets/icons/${window.icon}.png`" alt="icon" class="iconW" draggable="false">
                <label class="appName">{{ index }}</label>
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
            <div class="minimApp" :id="index" @click="unMinimize(index)" :title="index">
                <img :src="`./testWindows/assets/icons/${window.icon}.png`" alt="icon" draggable="false">
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
    height: 5%;
}

.page {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    height: 90%;
    position: relative;
    overflow: hidden;

    background: no-repeat center/cover url("./testWindows/assets/back/Squadron\ 42\ -\ Star\ Citizen\ Screenshot\ 2022.08.08\ -\ 18.14.29.28.png") ;


    .upscale {
        position: absolute;
    }
    .upscale.top {
        // background-color: rgba(255, 0, 0, 0.4);
        left: 0;
        top: 0;
        width: 100%;
        height: 5%;
    } 
    .upscale.left {
        // background-color: rgba(0, 157, 255, 0.4);
        left: 0;
        top: 0;
        width: 3%;
        height: 100%;
    }
    .upscale.right {
        // background-color: rgba(0, 157, 255, 0.4);
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

/* Style Fenètres déplacables */
.app {
    width: 25%;
    height: 300px;
    outline: 1px solid black;
    background-color: darkgoldenrod;
    box-shadow: 1px 1px 8px black;
    box-sizing: border-box;
    
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
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 3px;
}

.appName {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.9em;
}


.buttonBar {
    display: flex;
    justify-content: right;
    align-items: center;
    height: 100%;
}

.minimizeW, .closeW {
    // background-color: rgba(255, 255, 255, 0.474);
    background-color: transparent;
    border-radius: 50%;
    width: 1.8em;
    height: 1.8em;
    cursor: pointer;
    border: 0;
    margin-left: 5px;
    transition: background-color .2s;
    color: inherit;
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

.moving {
    pointer-events: none;
}


/* Placer */

.w-placer {
    pointer-events: none;
    position: absolute;

    background-color: rgba(255, 255, 255, 0.2);
    border: 10px solid rgba(0, 0, 0, 0.4);
    
    visibility: collapse;
    opacity: 0%;
    transition: all .5s;

    &.top {
        left: 50%;
        top: 0%;
        width: 0%;
        height: 0%;
    }
    &.left {
        left: 0%;
        top: 50%;
        width: 0%;
        height: 0%;
    }
    &.right {
        left: 100%;
        top: 50%;
        width: 0%;
        height: 0%;
    }
    
    &.placer-visible {
        visibility: visible;
        opacity: 100%;
    }
    
    &.placer-maximized {
        left: 0%;
        top: 0%;
        width: 100%;
        height: 100%;
    }
    &.placer-half-left {
        left: 0%;
        top: 0%;
        width: 50%;
        height: 100%;
    }
    &.placer-half-right {
        left: 50%;
        top: 0%;
        width: 50%;
        height: 100%;
    }
}

.max-top {
    left: 0% !important;
    top: 0% !important;
    width: 100% !important;
    height: 100% !important;
}
.max-left {
    left: 0% !important;
    top: 0% !important;
    width: 50% !important;
    height: 100% !important;
}
.max-right {
    left: 50% !important;
    top: 0% !important;
    width: 50% !important;
    height: 100% !important;
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
