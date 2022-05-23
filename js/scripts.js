




// Declaring variables inside IIFE, the add function and the getAll allow me to access it from outside the function
let pokemonRepository = (function () {
    let pokemonList = [{ name: "Ponyta", height: 99.06, type: ["Fire"] },
    { name: "Slowpoke", height: 119.38, type: ["Water", "Psychic"] },
    { name: "Magnemite", height: 30.48, type: ["Electric", "Steel"] },
    { name: "Tentacool", height: 111.9, type: ["Water", "Poison"] },
    { name: "Seel", height: 109.22, type: ["Water"] }];
    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);

        },
        getAll: function () {
            return pokemonList;
        }
    };
})();


pokemonRepository.add({ name: "Raichu", height: 30.25, type: "Electric" });
console.log(pokemonRepository.getAll());


pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = "placeholder";
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);




});

