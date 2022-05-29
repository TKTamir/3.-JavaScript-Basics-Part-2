




// Declaring variables inside IIFE, the add function and the getAll allow me to access it from outside the function
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Function to add pokemon and validate the typeof
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Invalid Pokemon entry")
        }
    }
    //getAll function returns the pokemonList
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
        button.addEventListener("click", function (event) {
            showDetails(pokemon)
        });
    }

// Attempt load message function here-

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
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }


    //Promise function loads the img, height and types of the pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //Here details are added to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }


    //Shows the name of the currently clicked pokemon in Console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }
    //Return Functions
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails

    };

})();




//Function loads the data from the api, forEach loop retrieves pokemon list one by one
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
