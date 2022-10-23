<script setup>
import { ref } from "vue";

let windows = {
    "w-test": {
        x: ref(20),
        y: ref(200),
        moving: ref(false)
    }
}

let moving = ref(false);
console.log(moving.value);

function inMove(event, myWindow) {
    // Inversion de la valeur moving
    myWindow.moving.value = !myWindow.moving.value;

    console.log(event);
    // const startX = e.x;
    // const startY = e.y;

    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);

    function mouseMove(e) {
        console.log(e);
        // Application des coordonées
        myWindow.x.value = e.x;
        myWindow.y.value = e.y;
    }


    function mouseUp() {
        // Inversion de la valeur moving
        myWindow.moving.value = !myWindow.moving.value;

        window.removeEventListener("mouseup", mouseUp);
        window.removeEventListener("mousemove", mouseMove);
    }
}

</script>

<template>
    <header>
        <h1>Test fenètres déplaçables</h1>
    </header>
    <div class="page" v-for="(window, index) of windows">
        <h3>{{window.objectName}}</h3>

        <div class="default" :class="[window.moving.value ? 'move' : 'static']" :id="index" :style="{top: window.y.value + 'px', left: window.x.value + 'px'}" >
            <div class="w-picker" @mousedown="inMove(event, window)"></div>

            <div class="w-content"></div>
        </div>

    </div>
</template>

<style scoped>

/* Mise en page */
header{
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
}

/* Style Fenètres déplacables */
.default {
    width: 25%;
    height: 300px;
    border: 3px solid red;

    position: absolute;
    left: 20%;
    top: 50px;

    display: flex;
    flex-direction: column;
    border-radius: 10px;

    transition: border-color .2s;
}

.w-picker {
    height: 20px;
    background-color: gray;
    cursor: move;
    border-radius: 5px;
}

/* Style Moving */

.static {
    border: 3px solid red;
}

.move {
    border-color: cyan;
}
</style>
