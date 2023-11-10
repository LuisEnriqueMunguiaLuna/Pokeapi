let historial = [];

document.getElementById("search").addEventListener("click", () => {
  displayPokemons();
});

document.getElementById("reset").addEventListener("click", () => {
  resetTeam();
  document.getElementById('search').disabled = false
});

document.getElementById("sort-pokemon").addEventListener("click", () => {
  console.log(historial)
});

document.getElementById("check-water").addEventListener("click", () => {
  water();
  alert("Water type pokemon found")
});


async function displayPokemons() {
  const pokemonName = document.getElementById("pokemon-name").value;
  if (pokemonName === "") {
    alert("Write a pokemon name in the input")
  } else {
    document.getElementById('pokemon-name').value = "";
  }
  const pokemon = await getPokemon(pokemonName);
  historial.push(pokemon);
  historial.sort((a,b)=>{
    return a.base_experience-b.base_experience;
  });

  addPokemonUI(pokemon);
}

async function getPokemon(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (response.status === 404) {
      alert("Pokemon not found")
      return;
    }
    return response.json();
  } catch (error) {
    alert("You dont have access to internet")
  }

}

function alert(message) {
  const alert = document.getElementById('pokemon-alert');
  alert.innerHTML="";
  const element = document.createElement('div');
  element.innerHTML = `
    <strong>Alert</strong>:${message}
  `
  alert.appendChild(element)
}

function resetTeam(){
  const team = document.getElementById("pokémon-container");
  team.innerHTML = "";
  document.getElementById("reset").disabled = true;
  alert("Team has been reset");
}

function addPokemonUI(pokemon) {
  const pokemonList = document.getElementById("pokémon-container");
  if (pokemonList.childElementCount >= 3) {
    alert("Your team is already full");
    return;
  }
  const element = document.createElement("div");
  const pokemonImage = pokemon.sprites.front_default
  element.innerHTML = `
    <img src="${pokemonImage}">
    <strong>ID: </strong> ${pokemon.id}
    <strong>Name: </strong> ${pokemon.name}
    <strong>Base xp: </strong> ${pokemon.base_experience}
    <strong>First ability: </strong> ${pokemon.abilities[0].ability.name}
    <strong>Type: </strong> ${pokemon.types[0].type.name}
  `;
  pokemonList.appendChild(element);
  if (pokemonList.childElementCount == 3) {
    document.getElementById("reset").disabled = false;
  }
  if (pokemonList.childElementCount == 3) {
    document.getElementById("search").disabled = true;
  }

}

function water(){
  if (historial.filter(pokemon => pokemon.types.includes("water"))) {
    const alert = document.getElementById('water');
    const element = document.createElement('div');
    element.innerHTML = `
    <img src="img.jpeg">
    `
  alert.appendChild(element)
  }
}

