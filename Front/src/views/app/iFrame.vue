<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  url: String,
  id: String
});


let url = ref(props.url);
let id = ref(props.id);



</script>

<template>
    <iframe :id="id" :src="url" ></iframe>
</template>

<style>

iframe {
    width: 100%;
    height: 100%;
    border: none;
}

</style>