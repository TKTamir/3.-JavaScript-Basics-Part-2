




// Declaring variables inside IIFE, the add function and the getAll allow me to access it from outside the function
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Function to add pokemon and validate the typeof
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            //"detailsUrl" in pokemon
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

    // Function communicates with api throgh json and returns name and url
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
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
        showDetails: showDetails,
        loadList: loadList

    };

})();

//Push item to PokemonList
pokemonRepository.add({ name: "Raichu", height: 30.25, type: "Electric" });
console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
