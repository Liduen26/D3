<script setup>
import { ref } from "vue";

let windows = {
    "w-test": {
        x: ref(20),
        y: ref(200)
    }
}

let moving = ref(false);
console.log(moving.value);

function inMove(evt) {
    moving.value = !moving.value;

    console.log("weee");
    console.log(moving.value);

    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);

    function mouseMove(evt) {
        
    }


    function mouseUp(evt) {
        moving.value = !moving.value;
        console.log("up ", moving.value);

        window.removeEventListener("mouseup", mouseUp);
    }
}

</script>

<template>
    <header>
        <h1>Test fenètres déplaçables</h1>
    </header>
    <page v-for="(window, index) of windows">
        <h3>{{window.objectName}}</h3>

        <div class="default" :class="[moving.value ? 'move' : 'static']" :id="index" :style="{top: window.y.value + 'px', left: window.x.value + '%'}" >
            <div class="w-picker" @mousedown="inMove(evt)"></div>

            <div class="w-content"></div>
        </div>

    </page>
</template>

<style scoped>

/* Mise en page */
header{
    display: flex;
    justify-content: center;
    
    border-bottom: 2px solid black;
    height: 10%;
}

page {
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

    transition: border-color .3s;
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
    border-color: blue;
}
</style>
