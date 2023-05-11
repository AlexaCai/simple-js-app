//***Exercise 1.2 - Initial PokemonList - global data
//let pokemonList = [
//{ name: 'balbuzard', height: 7, types: ['grass', 'poison'] },
//{ name: 'charmander', height: 6, types: ['fire', 'air'] },
//{ name: 'squirtle', height: 5, types: ['water', 'grass'] }
//];

//***Exercise 1.3 - This piece of code write down on the webpage all pokemon names from the array, as well as their respective heights and an highlight message for those very tall
//for (let i = 0; i < pokemonList.length; i++) {
//if (pokemonList[i].height > 6) {
//document.write("<br>" + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, thats big! ');
//}
//else {
//document.write("<br>" + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
//}
//}

//***Exercise 1.5 - forEach method using the global pokemonList from Exercise 1.2 and replacing the FOR loop used in Exercise 1.3 to iterate over your repository array
//pokemonList.forEach(function (pokemon) {
//console.log("<br>" + pokemon.name + ': height of ' + pokemon.height + 'm / ' + pokemonList.types);
//document.write("<br>" + pokemon.name + ': height of ' + pokemon.height + 'm / ' + pokemonList.types);
//});

//***Exercise 1.5 - IIFE making pokemonList from Exercise 1.2 local to the function (rather than global if outside of the IIFE, as shown upper)
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

    //*** Exercise 1.6 - 
    function addListItem(pokemon) {
        //let pokemonList = document.querySelector('.pokemon-list'); select the class of the ul element in the HTML file
        let pokemonList = document.querySelector('.pokemon-list');
        //let listItem = document.createElement('li'); created a li (list)
        let listItem = document.createElement('li');
        //let button = document.createElement('button'); created a buttons elements (or buttons tags) for each Pokemon
        let button = document.createElement('button');
        // button.addEventListener('click', function (event) created an event when a pokemon button is clicked on. This addEventListner code is associated to the function showDetails(pokemon) outisde the IIFE, and so return and take results from this outside function which shows each pokemon object inside the console.
        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        })
        //button.innerText = pokemon.name; inserted the name of a pokemon inside each of the buttons created
        //In this command, pokemon is equal to the (pokemon) parameter following the function in the code upper (function addListItem(pokemon) {)
        //In this command, .name is equal to the name object inside the IIFE upper (as in let pokemonList = [{ name: 'balbuzard', height: 7, types: ['grass', ' poison'] },
        button.innerText = pokemon.name;
        //button.classList.add('pokemon-button-class'); added a class the the buttons created upper to be able to style them in CSS within styles.css
        button.classList.add('pokemon-button-class');
        //listItem.appendChild(button); attached each buttons to each li (list items) created previously for each Pokemon
        listItem.appendChild(button);
        //pokemonList.append(listItem); attached each li (list items) to the ul (unordered list - the parent element)
        pokemonList.append(listItem);
    };

    return {
        getAll: getAll,
        add: add({ name: 'pikachu', height: 4, types: 'electric' }),
        addListItem: addListItem
    };
})();


//***Exercise 1.5 - forEach method using an inside local function within the IIFE upper to retrieve pokemonList array since its not possible anymore to reach the pokemonList outside of that IIFE
//pokemonRepository.getAll().forEach(function (pokemon) {
//if (pokemon.height > 6) {
//console.log("<br>" + pokemon.name + ': height (' + pokemon.height + 'm - thats very big!) / type(s) (' + pokemon.types + ')');
//document.write("<br>" + pokemon.name + ': height (' + pokemon.height + 'm - thats very big!) / type(s) (' + pokemon.types + ')');
//}
//else {
//console.log("<br>" + pokemon.name + ': height (' + pokemon.height + 'm) / type(s) (' + pokemon.types + ')');
//document.write("<br>" + pokemon.name + ': height (' + pokemon.height + 'm) / type(s) (' + pokemon.types + ')');
//}
//})

//***Exercise 1.6 
//This function pokemonRepository.getAll().forEach(function (pokemon) { will run the loop over the function below (pokemonRepository.addListItem(pokemon);)
pokemonRepository.getAll().forEach(function (pokemon) {
    //***This function pokemonRepository.addListItem(pokemon); which refere/is same to the addListItem function inside the IIFE upper will run as long as there is a new Pokemon in the IIFE pokemonList array to go over on
    pokemonRepository.addListItem(pokemon);
})

//***Exercise 1.6 -  This function is there only to be called inside the addListItem function upper (inside the IIFE), and more specifically for the on click addEventListner. By calling this function here in the IIFE upper, the addEventListner is logging each pokemon object (all info) to the console everytime a pokemon button is clicked on.
function showDetails(pokemon) {
    console.log(pokemon);
}
