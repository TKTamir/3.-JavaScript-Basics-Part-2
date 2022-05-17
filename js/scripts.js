let pokemonList = [
    { name: 'Ponyta', height: 99.06, type: ['Fire'] },
    { name: 'Slowpoke', height: 119.38, type: ['Water', 'Psychic'] },
    { name: 'Magnemite', height: 30.48, type: ['Electric', 'Steel'] },
    { name: 'Tentacool', height: 111.9, type: ['Water', 'Poison'] },
    { name: 'Seel', height: 109.22, type: ['Water'] }
];


//Writes out the Pokemons by checking the length of the list until reaching the last item
for (let i = 0; i < pokemonList.length; i++) {
    document.write('<br>' + pokemonList[i].name + ' ' + pokemonList[i].height + ' ');

    //Make sure to place [i] before .name/height/type, first choose the variable, then the value inside of it.
    if (pokemonList[i].height >= '110') {
        document.write(' - Wow that is quite big ');
    }
    if (pokemonList[i].type.includes('Poison')) {
        document.write(' - Beware of Poison! You might need an Antidote');
    }


}

