




// Declaring variables inside IIFE, the add function and the getAll allow me to access it from outside the function
let pokemonRepository = (function () {
    let pokemonList = [{ name: "Ponyta", height: 99.06, type: ["Fire"] },
    { name: "Slowpoke", height: 119.38, type: ["Water", "Psychic"] },
    { name: "Magnemite", height: 30.48, type: ["Electric", "Steel"] },
    { name: "Tentacool", height: 111.9, type: ["Water", "Poison"] },
    { name: "Seel", height: 109.22, type: ["Water"] }];
    //Function to add pokemon and validate the typeof
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "type" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Invalid Pokemon entry")
        }
    }
    //Fetches the pokemonList
    function getAll() {
        return pokemonList;
    }
    // Add buttons that are assigned with data from Pokemon list
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        addEvent(button, pokemon);
    }
    //Function listens to 'click' event in addListItem, and sends 'pokemon' to showDetails function
    function addEvent(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    }
    //Shows the name of the currently clicked pokemon in Console
    function showDetails(pokemon) {
        console.log(pokemon);
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails

    };

})();


pokemonRepository.add({ name: "Raichu", height: 30.25, type: "Electric" });
console.log(pokemonRepository.getAll());


pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

