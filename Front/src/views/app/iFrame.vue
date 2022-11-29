<script setup>
import { ref } from 'vue';

const props = defineProps({
  url: String
});

const urlApi = import.meta.env.VITE_URL_API || 'http://localhost:5000';

let url = ref();
url = props.url;
console.log(url);


</script>

<template>
    <iframe :src="url"></iframe>
</template>

<style>

iframe {
    width: 100%;
    height: 100%;
    border: none;
}

</style>