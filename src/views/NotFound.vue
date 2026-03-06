<!-- src/views/NotFound.vue -->
<script setup lang="ts"></script>
<template>
    <center>
        <h1>404 - Not Found!</h1>
        <p>The page you are looking for does not exist.</p>
        <router-link to="/">Go Home</router-link>
    </center>
</template>

<style scoped>
center {
    margin: 15vw;
}
h1 {
    color: var(--border);
    font-size: 2em;
}
</style>
