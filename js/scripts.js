let pokemonList = [
    { name: 'Ponyta', height: 99.06, type: ['Fire'] },
    { name: 'Slowpoke', height: 119.38, type: ['Water', 'Psychic'] },
    { name: 'Magnemite', height: 30.48, type: ['Electric', 'Steel'] },
    { name: 'Tentacool', height: 111.9, type: ['Water', 'Poison'] },
    { name: 'Seel', height: 109.22, type: ['Water'] }
];


//Writes out the Pokemons by checking the length of the list until reaching the last item


    pokemonList.forEach(function (pokemon) {
        if (pokemon.height >= 110) {
            document.write('<p>' + pokemon.name + ' ' + pokemon.height + ' '  + ' - Wow that is quite big ' + '</p>');
        }
        if (pokemon.type.includes('Poison')) {
            document.write( '-Beware of Poison! You might need an Antidote' + '<br>');
        }
        else if (pokemon.height < 110) {
            document.write('<p>' + pokemon.name + ' ' + pokemon.height + ' ' + '</p>');

        }
    

    //Make sure to place [i] before .name/height/type, first choose the variable, then the value inside of it.




});


