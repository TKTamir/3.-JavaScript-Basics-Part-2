




// Declaring variables inside IIFE, the add function and the getAll allow me to access it from outside the function
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Function to add pokemon and validate the typeof
    function add(pokemon) {
        if (pokemon.name && pokemon.detailsUrl) {
            pokemonList.push(pokemon);
        } else {
            console.log('Invalid Pokemon entry');
        }
    }
    //getAll function returns the pokemonList
    function getAll() {
        return pokemonList;
    }
    // Add buttons that are assigned with data from Pokemon list
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let pokeListItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.addEventListener("click", function (event) {
            showDetails(pokemon);
            event.target.blur;
        });


        //Add Classes and attributes to pokeListItem
        button.classList.add('button-class', 'btn', 'btn-primary');
        button.classList.add('btn-block', 'btn-outline-primary', 'm-1');
        button.classList.add('bg-primary', 'text-capitalize');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '.modal');
        pokeListItem.classList.add("group-list-item");
        pokeListItem.classList.add('col-sm-9');



        //Add pokeListItem
        pokeListItem.appendChild(button);
        pokemonList.appendChild(pokeListItem);
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
            item.spriteUrl = details.sprites.front_default;
            item.svgUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = details.types;
            //Function shows the types instead of "[object]" through forEach loop that goes through each pokemon
            let types = [];
            details.types.forEach((pokemon) => types.push(pokemon.type.name));
            item.types = types;

        }).catch(function (e) {
            console.error(e);
        });
    }


    //Shows the name of the currently clicked pokemon in Console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //Showmodal function
    function showModal(pokemon) {
        // Select Elements
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');


        //Reset modal content
        modalTitle.empty();
        modalBody.empty();



        //Create and define h1, p, img elements

        let pokemonName = $(`<h1>${pokemon.name}</h1>`);
        let pokemonSprite = $(`<img class="modal-sprite" src="${pokemon.spriteUrl}" alt="Sprite of Pokemon">`);
        let pokemonHeight = $(`<p class="mt-2 ml-4 mb-1">Height: ${pokemon.height}</p>`);
        let pokemonTypes = $(`<p class="mt-2 ml-4 mb-1">Types: ${pokemon.types.join(', ')}</p>`);
        let pokemonSvg = $(`<img class="modal-img mx-auto" src="${pokemon.svgUrl}" alt="SVG illustration of Pokemon">`);




        //Append elements to Modal div
        modalTitle.append(pokemonName);
        modalTitle.append(pokemonSprite);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonTypes);
        modalBody.append(pokemonSvg);
    }


    //Return Functions
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal

    };

})();




//Function loads the data from the api, forEach loop retrieves pokemon list one by one
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
