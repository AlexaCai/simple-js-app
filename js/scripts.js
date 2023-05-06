//Sarting PokemonList - global data
//let pokemonList = [
//{ name: 'balbuzard', height: 7, types: ['grass', 'poison'] },
//{ name: 'charmander', height: 6, types: ['fire', 'air'] },
//{ name: 'squirtle', height: 5, types: ['water', 'grass'] }
//];

// OLD *forEach* method using the global pokemonList upper
//pokemonList.forEach(function (pokemon) {
//console.log("<br>" + pokemon.name + ': height of ' + pokemon.height + 'm / ' + pokemonList.types);
//document.write("<br>" + pokemon.name + ': height of ' + pokemon.height + 'm / ' + pokemonList.types);
//});

//IIFE making pokemonList local to the function (rather than global if outside of the IIFE, as shown upper)
let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'balbuzard', height: 7, types: ['grass', ' poison'] },
        { name: 'charmander', height: 6, types: ['fire', ' air'] },
        { name: 'squirtle', height: 5, types: ['water', ' grass'] }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        getAll: getAll,
        add: add({ name: 'pikachu', height: 4, types: 'electric' })
    };
})();


//NEW *forEach* method using an inside local function within the IIFE upper to retrieve pokemonList array
//since its not possible anymore to reach the pokemonList outside of that IIFE.
pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height > 6) {
        console.log("<br>" + pokemon.name + ': height (' + pokemon.height + 'm - thats very big!) / type(s) (' + pokemon.types + ')');
        document.write("<br>" + pokemon.name + ': height (' + pokemon.height + 'm - thats very big!) / type(s) (' + pokemon.types + ')');
    }
    else {
        console.log("<br>" + pokemon.name + ': height (' + pokemon.height + 'm) / type(s) (' + pokemon.types + ')');
        document.write("<br>" + pokemon.name + ': height (' + pokemon.height + 'm) / type(s) (' + pokemon.types + ')');
    }
})