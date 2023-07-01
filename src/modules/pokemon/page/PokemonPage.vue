<template>
    <div class="marcador" v-if="marcadorMostrar">
        <div class="puntos">
            <h2>Puntaje: {{ puntaje }}</h2>
        </div>
        <div class="intentos">
            <h2>Intento: {{ intentos }}</h2>
        </div>

    </div>

    <div class="cuadrosInicio" v-if="mostrarCuadros">
        <PokeCuadro class="cuadro1" />
        
        <PokeCuadro class="cuadro2" />
        <PokeCuadro class="cuadro3" />
    </div>

    <div class="juegoPokemon" v-if="mostrarJuego">
        <div class="contenedorImagenes">
            <div class="contenedorUno">
                <div>
                    <PokeImagen :pokemonId="imagen1" :muestraPokemon="false" />
                </div>
                <div class="contenedorNombre">
                    <PokeNombre :pokemonElegido="nombrePokemon1" v-if="mostrarNombre" />
                </div>
            </div>

            <div class="contenedorDos">
                <div>
                    <PokeImagen :pokemonId="imagen2" :muestraPokemon="false" />
                </div>
                <div class="contenedorNombre">
                    <PokeNombre :pokemonElegido="nombrePokemon2" v-if="mostrarNombre" />
                </div>
            </div>

            <div class="contenedorTres">
                <div>
                    <PokeImagen :pokemonId="imagen3" :muestraPokemon="false" />
                </div>
                <div class="contenedorNombre">
                    <PokeNombre :pokemonElegido="nombrePokemon3" v-if="mostrarNombre" />
                </div>
            </div>
        </div>
        <button class="btn_iniciar" v-on:click="botonIniciar()">JUGAR</button>
    </div>
    <div v-if="fallido" class="fallido">
        <h1>Has utilizado tus 5 intentos</h1>
        <h1>El juego ha terminado, intentalo nuevamente</h1>
        <button class="btn_reiniciar" v-on:click="reiniciar()">Nuevo Juego</button>
    </div>

    <div v-if="felicidades" class="felicidades">
        <div class="marcador">
            <h2>Puntaje: {{ puntaje }}</h2>
        </div>
        <h2>Felicidades has ganado un premio de $10.000,00</h2>
        <button class="btn_reiniciar" v-on:click="reiniciar()">Nuevo Juego</button>

    </div>
</template>

<script>
import PokeNombre from '../components/PokeNombre.vue'
import PokeImagen from '../components/PokeImagen.vue'
import PokeCuadro from '../components/PokeCuadro.vue'
import obtenerFachadaPokemons from "../helpers/clientePokemonApi"

export default {
    data() {
        return {
            nombrePokemon1: null,
            nombrePokemon2: null,
            nombrePokemon3: null,
            imagen1: null,
            imagen2: null,
            imagen3: null,

            puntaje: 0,
            intentos: 0,


            mostrarNombre: false,



            fallido: false,
            felicidades: false,

            mostrarJuego: true,
            mostrarCuadros: true,
            marcadorMostrar: true
        }
    },

    components: {
        PokeImagen,
        PokeNombre,
        PokeCuadro
    },

    mounted() {
        this.mostrarCuadros()
    },

    methods: {
        async cargaJuegoInicial() {
            const pokemon1 = await obtenerFachadaPokemons()
            this.nombrePokemon1 = pokemon1
            const pokemon2 = await obtenerFachadaPokemons()
            this.nombrePokemon2 = pokemon2
            const pokemon3 = await obtenerFachadaPokemons()
            this.nombrePokemon3 = pokemon3
        },
        async cargaJuego() {
            const pokemon1 = await obtenerFachadaPokemons()
            this.nombrePokemon1 = pokemon1
            this.imagen1 = pokemon1[0].id
            const pokemon2 = await obtenerFachadaPokemons()
            this.nombrePokemon2 = pokemon2
            this.imagen2 = pokemon2[0].id
            const pokemon3 = await obtenerFachadaPokemons()
            this.nombrePokemon3 = pokemon3
            this.imagen3 = pokemon3[0].id
            this.comprobar(this.imagen1, this.imagen2, this.imagen3)
        },

        async botonIniciar() {
            this.mostrarNombre = true
            await this.cargaJuego();
            this.mostrarCuadros = false
        },

        comprobar(idPokemon1, idPokemon2, idPokemon3) {
            if (idPokemon1 === idPokemon2 && idPokemon2 === idPokemon3) {
                console.log('salieron 3 iguales')
                this.puntaje += 5
                this.intentos += 1
            } else if (idPokemon1 === idPokemon2 || idPokemon1 === idPokemon3) {
                console.log('salieron 2 iguales a la 1 con la 2 o la 1 con la 3')
                this.puntaje += 2
                this.intentos += 1
            } else if (idPokemon2 === idPokemon3) {
                console.log('salieron 2 iguales la 2 con la 3')
                this.puntaje += 2
                this.intentos += 1
            } else if (idPokemon1 != idPokemon2 && idPokemon2 != idPokemon3) {
                console.log('ninguna coincidencia a')
                this.intentos += 1
            }

            this.comprobarEstado(this.intentos, this.puntaje)
        },

        comprobarEstado(intentos, puntuacion) {
            this.intentos = intentos
            this.puntaje = puntuacion
            
            if (this.intentos === 5 && this.puntaje < 10) {
                this.fallido = true
                this.mostrarJuego = false
                this.marcadorMostrar = false
            }
            if (this.puntaje > 9) {
                this.mostrarJuego = false
                this.felicidades = true
                this.marcadorMostrar = false
            }
        },

        reiniciar() {
            location.reload()
        }

    },


}
</script>

<style>
.contenedorImagenes {
    display: flex;
    justify-content: center;
    align-content: center;
}

/* .cuadroInicio {
    background-color: black;
} */

.nombres {
    display: flex;
    justify-content: center;
    align-content: center;
}

.marcador {
    display: flex;
    justify-content: center;
    align-items: center;
}

.contenedorUno,
.contenedorDos {
    margin-right: 50px;
    width: 500px;

}

.contenedorTres {
    width: 500px;
}

/* .contenedorUno,
.contenedorDos,
.contenedorTres {
    border: 5px solid black;
    border-radius: 5px;
    margin-bottom: 20px;
} */

.puntos {
    display: flex;
    margin-right: 300px;
}

.intentos {
    display: flex;
}

.contenedorNombre {
    margin-bottom: 25px;
    margin-top: 20px;
}

.felicidades {
    display: block;
    justify-content: center;
    align-items: center;
}

.btn_reiniciar {
    padding: 15px 40px;
}

.btn_iniciar {
    padding: 15px 70px;
}

.btn_iniciar,
.btn_reiniciar {
    background-color: rgb(141, 0, 207);
    border: 5px solid;
    font-size: large;
    font-weight: bold;
}

.btn_reiniciar:hover {
    background-color: rgb(208, 92, 115);
    cursor: pointer;
}

.btn_iniciar:hover {
    background-color: rgb(87, 117, 206);
    cursor: pointer;
}

.felicidades {
    color: rgb(57, 57, 247);
}

.fallido {
    color: red;
}

.juegoPokemon {
    margin-top:20px;
}


.cuadrosInicio{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
    margin-left: 210px;
    margin-bottom: -250px;
}
.cuadro1,
.cuadro2,
.cuadro3 {
    margin-right: 200px;
    /* width: 100%; */
    
}
</style>