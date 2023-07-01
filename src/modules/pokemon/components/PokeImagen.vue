<template>
<div class="contenedorImg" v-if="contenedorNegro">
        <img  :src="imagenFuente" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return {
            contenedorNegro: true,
        }
    },

    computed: {
        imagenFuente() {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
        }

    },

    props: {
        pokemonId: {
            type: Number,
            required: true 
        },

        muestraPokemon:{
            type: Boolean,
            required: true
        }
    }
}
</script>

<style>
img {
    display: flex;
    justify-content: center;
    align-content: center;
    max-height: 100%;
    max-width: 100%;
}

.contenedorImg {
    height: 40vh;
    display: flex;
    align-items: center;
    /* background-color: black;   */
    justify-content: center;
}
</style>