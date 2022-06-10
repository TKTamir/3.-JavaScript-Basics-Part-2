// Declaring variables inside IIFE, the add function and the getAll allow me to access it from outside the function
const pokemonRepository = (function () {
  const pokemonList = [];
  const input = $('input');
  input.on('input', filterList);
  let prevURL = nextURL = null;
  const prevBtn = document.getElementById("prevbtn");
  const nextBtn = document.getElementById("nextbtn");

  //Event listeners listen to prevBtn and NextBtn, load the list and clear previous list
  prevBtn.addEventListener("click", (e) => {
    pokemonsByPage(prevURL);
  });

  nextBtn.addEventListener("click", (e) => {
    pokemonsByPage(nextURL);
  });

  function pokemonsByPage(url) {
    if (url) {
      const pokemonListElement = document.querySelector('.pokemon-list');
      pokemonListElement.innerHTML = '';
      pokemonRepository.loadList(url).then(function () {
        pokemonRepository.getAll().forEach(function (pokemon) {
          pokemonRepository.addListItem(pokemon);
        });
      });
    }
  }

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
    const pokemonList = document.querySelector('.pokemon-list');
    const pokeListItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = pokemon.name;
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
      event.target.blur;
    });

  
    
    

    //Add Classes and attributes to pokeListItem
    
    button.classList.add('button-class', 'btn', 'btn-primary');
    button.classList.add('btn-block', 'btn-outline-primary', 'm-1');
    button.classList.add('bg-primary', 'text-capitalize');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '.modal');

    pokemonList.classList.add('pagination')
    pokeListItem.classList.add('group-list-item', 'col-sm-9', 'page-item');

    //Add pokeListItem
    pokeListItem.appendChild(button);
    pokemonList.appendChild(pokeListItem);
  }

  // Function communicates with api throgh json and returns name and url
  function loadList(apiURL) {
    return fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        // Read pagination info from the API response
        prevURL = json.previous;
        nextURL = json.next;
        pokemonList.length = 0; // Clear the previous data
        toggleDisabledBtns();
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  //Search function to filter out list items
  function filterList() {
    const inputValue = $('input').val();
    const list = $('li');
    list.each(function () {
      const item = $(this);
      const name = item.text();
      if (name.startsWith(inputValue)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  // Optimize this later- Function to disable buttons when prev/next=null
  function toggleDisabledBtns() {
    if (!prevURL) {
      prevBtn.disabled = true;
    }
    else {
      prevBtn.disabled = false;
    }
    if (!nextURL) {
      nextBtn.disabled = true;
    }
    else {
      nextBtn.disabled = false;
    }
  }

  //Promise function loads the img, height and types of the pokemon
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //Here details are added to the item
        item.spriteUrl = details.sprites.front_default;
        item.svgUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = details.types;
        //Function shows the types instead of "[object]" through forEach loop that goes through each pokemon
        const types = [];
        details.types.forEach((pokemon) => types.push(pokemon.type.name));
        item.types = types;
      })
      .catch(function (e) {
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
    const modalTitle = $('.modal-title');
    const modalBody = $('.modal-body');

    //Reset modal content
    modalTitle.empty();
    modalBody.empty();

    //Create and define h1, p, img elements

    const pokemonName = $(`<h1>${pokemon.name}</h1>`);
    const pokemonSprite = $(
      `<img class="modal-sprite" src="${pokemon.spriteUrl}" alt="Sprite of Pokemon">`
    );
    const pokemonHeight = $(
      `<p class="mt-2 ml-4 mb-1">Height: ${pokemon.height}</p>`
    );
    const pokemonTypes = $(
      `<p class="mt-2 ml-4 mb-1">Types: ${pokemon.types.join(', ')}</p>`
    );
    const pokemonSvg = $(
      `<img class="modal-img mx-auto" src="${pokemon.svgUrl}" alt="SVG illustration of Pokemon">`
    );

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
    showModal: showModal,
    filterList: filterList,
  };
})();

//Function loads the data from the api, forEach loop retrieves pokemon list one by one
const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
pokemonRepository.loadList(API_URL).then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
