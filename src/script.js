const API_BASE = "https://pokeapi.co/api/v2/pokemon/?limit=1&offset=";
const IMG_URL_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let currentPokemonIndex = 0;

//função de mudar imagem pelo id e pela url
function changeImage(id, url) {
  document.getElementById(id).src = url;
}
//função de mudar texto pelo id e pelo texto
function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

//Minhas alterações:
async function fetchData() {
  // a variavel const API_BASE retorna apenas 1 pokemon. É feita requesição de um único pokemon toda vez que essa função é chamada
  const response = await fetch(API_BASE + currentPokemonIndex.toString());
  const data = await response.json();
  // salva o nome e a imagem do pokemon de acordo com a resposta da api
  const pokemonName = data.results[0].name;
  const indexAux = currentPokemonIndex + 1;
  const pokemonImageUrl = IMG_URL_BASE + indexAux.toString() + ".png";

  //chama a alteração do nome e imagem pro html
  changeText("name", pokemonName);
  changeImage("img_sprite_front_default", pokemonImageUrl);
}

function previousPokemon() {
  //reduz o index do pokemón antes de chamar a funcao (ou volta pro último pokemon se já está no zero (existem 1008 pokémons))
  if (currentPokemonIndex == 0) {
    currentPokemonIndex = 1008;
  } else {
    currentPokemonIndex--;
  }
  console.log("Pokemon Anterior: " + currentPokemonIndex);
  fetchData();
}

function nextPokemon() {
  //aumenta o index do pokemón antes de chamar a funcao (ou volta pro primeiro pokemon se ja está no último (existem 1008 pokémons))
  if (currentPokemonIndex == 1008) {
    currentPokemonIndex = 0;
  } else {
    currentPokemonIndex++;
  }
  console.log("Pokemon Seguinte: " + currentPokemonIndex);
  fetchData();
}

// Carregando o primeiro Pokémon ao carregar a página
fetchData();
