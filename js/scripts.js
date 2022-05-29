




// Declaring variables inside IIFE, the add function and the getAll allow me to access it from outside the function
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

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
        //Reset modal content
        modalContainer.innerHTML = '';
        //create div and add 'modal' class to it
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Create and define button, h2, p, img elements
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);


        let titleElement = document.createElement('h2');
        titleElement.classList.add('pokemon-title');
        titleElement.innerText = pokemon.name.toUpperCase();

        let heightElement = document.createElement('p');
        heightElement.classList.add('pokemon-height');
        heightElement.innerText = `Height: ${pokemon.height}`;

        let typesElement = document.createElement('p');
        typesElement.classList.add('pokemon-types');
        typesElement.innerText = `Types: ${pokemon.types.join(', ')}`;

        let imgElement = document.createElement('img');
        imgElement.src = pokemon.imageUrl;
        imgElement.classList.add('pokemon-img');
        imgElement.setAttribute('alt', ' ' + pokemon.name);

        //Append elements to Modal div
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(typesElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible')
    }

    //Function to hide Modal via CSS Class
    function hideModal() {
        modal.Container.classList.remove('is-visible');
    }
    //Event listner for ESC, will close modal by removing 'is-visible' class
    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //Close modal by click
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if(target === modalContainer) {
            hideModal();
        }
    });
    //Return Functions
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        


    };

})();




//Function loads the data from the api, forEach loop retrieves pokemon list one by one
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
