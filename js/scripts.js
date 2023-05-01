let pokemonList = [
    { name: 'balbuzard', height: 7, types: ['grass', 'poison'] },
    { name: 'charmander', height: 6, types: ['fire', 'air'] },
    { name: 'squirtle', height: 5, types: ['water', 'grass'] }
];

// This piece of code write down on the webpage all pokemon names from the array, as well as their respective heights and an highlight message for those very tall
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 6) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, thats big! ');
    }
    else {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
    }
}
