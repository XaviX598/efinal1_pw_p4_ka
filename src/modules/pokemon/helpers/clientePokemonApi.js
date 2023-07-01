const obtenerPokemon = async () => {
    const vectorObj = await obtenerNombresPokemon(obtenerVectorNumerico());
    return vectorObj;
};

function getNumeroAleatorio(min, max) {
    max++;
  return Math.floor(Math.random() * (max - min) + min);
}

const obtenerVectorNumerico = () => {
    return getNumeroAleatorio(379, 379);
};

const consumirApi = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (result) => result.json()
    );
    return data;
};

const obtenerNombresPokemon = async (id1) => {
    const data = await consumirApi(id1);
    const obj1 = {
    nombre: data.name,
    id: data.id,
    };
    const vectorObjeto = [obj1];
    return vectorObjeto;
};

const obtenerFachadaPokemons = async () => {
    return await obtenerPokemon();
};

export default obtenerFachadaPokemons;
