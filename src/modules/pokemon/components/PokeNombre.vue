<template>
<div class="contenedorNombre">
        <li v-for="pokemon in pokemonElegido" :key="pokemon.id"> {{ pokemon.nombre }}</li>
    
</div>
</template>

<script>
export default {
    props: {
        pokemonElegido: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>
li {
    list-style-type: none;
    text-align: center;
    justify-content: center;
    font-size: large;
    font-weight: bold;
}
</style>