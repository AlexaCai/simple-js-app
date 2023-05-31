
//IIFE making the variable pokemonList local to the function (rather than global if outside the IIFE).
let pokemonRepository = (function () {

    //Load the list of pokemons on my website from an external source (via the API).
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    //Add pokemons (<li>) in the <ul> tag defined in the index.html, as well as buttons and other elements appearing on the web page, but not defined with HTML tags in the index.html.
    function addListItem(pokemon) {
        //let pokemonList = document.querySelector('.pokemon-list'); select the class of the <ul> element in the index.html.
        let pokemonList = document.querySelector('.pokemon-list');
        //let listItem = document.createElement('li'); created a <li> (list) inside the <ul> element in the index.html. The <li> element is created here via JS, so it doesnt appear as a tag in the index.html.
        let listItem = document.createElement('li');
        //Add a class to the <li> element created previsouly on the line before (upper).
        listItem.classList.add('list-group-item');
        //let button = document.createElement('button'); created a button element (or button tag) to make each pokemon clickable via this button eventually. The button element is created here via JS, so it doesnt appear as a tag in the index.html.
        let button = document.createElement('button');
        //button.classList.add('btn', 'btn-danger', 'btn-block'); add a class the buttons created in the line before. These classes as well as their stylings come from Bootstrap. Some features from these Boostrap visuals have been re-styled and personnalized by using the same classes names inside CSS (within styles.css).
        button.classList.add('btn', 'btn-danger', 'btn-block');
        //The two lines below are used to make sure the buttons created refer to the Boostrap modal created and shown inside the index.html.
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        //button.innerText = pokemon.name; insert the name of a pokemon inside each of the buttons created
        //In this command, pokemon is equal to the (pokemon) parameter following the function upper (function addListItem(pokemon) {)
        //.name is equal to the name object inside let pokemonList = []. As a reminder, each pokemon push inside these [] comes to a format similar to this: [{ name: 'balbuzard', height: 7, types: ['grass', ' poison']}. The .name is therefore used to take the value associated with the key ''name'' inside the object of each poekmon.
        button.innerText = pokemon.name;
        // button.addEventListener('click', function (event) create an event when a pokemon button is clicked on. This addEventListner code is associated to the function showDetails(pokemon) below, and so return the results from this function which shows each pokemon objects.
        button.addEventListener('click', function () {
            showDetails(pokemon)
        })
        //listItem.appendChild(button); attach each button to each <li> (list items) created previously for each pokemon.
        listItem.appendChild(button);
        //pokemonList.append(listItem); attach each <li> (list items) to the pokemonList.
        pokemonList.append(listItem);
        button.addEventListener('click', function () { pokemonRepository.showDetails(pokemon) });
    };

    //Function loadList is use to get the complete list of pokemon from here: https://pokeapi.co/api/v2/pokemon/?limit=150. This link is present in this code, in the ''let apiURL'' variable at the beginning/top of this IIFE. 
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

    //In this function, detailsUrl is used to load, from the API, the detailed data that wished to be display (images, height, types...) on the website for every pokemon.
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //The code lines below are adding the details to the item (item being each pokemon). Each line get specific information from the API for each pokemon, such as images, types, weights, etc.
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
            //The empty [] upper create the space where each type for each pokemon is stored. To do so, the for loop below extract all the pokemon types from his original type array within the API. Then, the item.types.push(details.types[i].type.name) make sure to push each type found for each pokemon after every round of the loop inside the [] of the item.types = [];, making it possible to show them on the webpage.
            for (let i = 0; i < details.types.length; i++) {
                item.types.push(' ' + details.types[i].type.name);
            }

            item.abilities = [];
            //The empty [] upper create the space where each ability for each pokemon is stored. To do so, the for loop below extract all the pokemon abilities from his original abilities array within the API. Then, the item.abilities.push(details.abilities[i].ability.name) make sure to push each ability found after every round of the loop inside the [] of the abilities.types = [];, making it possible to show them on the webpage.
            for (let i = 0; i < details.abilities.length; i++) {
                item.abilities.push(' ' + details.abilities[i].ability.name);
            }
        }).catch(function (e) {
            console.error(e);
        })

    }

    //showDetails() function is use to execute loadDetails() function upper. The showDetails() function is executed when a user clicks on a pokemon. That’s the moment when a pokemon details are taken from the server via the API. See addListItem function, last line of code to have a look on the event listner trigerring that (button.addEventListener('click', function () { pokemonRepository.showDetails(pokemon) });).
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon); //used here to call and display the results from the showModal function below
        });
    }

    //The function showModal specifies what must be shown in the modal pop up when a user click on a pokemon button. These visual features use jQuery, as the visual features come from Bootstrap (some visual features are however redifined in styles.css).
    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');
        modalTitle.empty();
        modalBody.empty();

        let nameElement = $('<h1>' + pokemon.name + '</h1>');
        let imageElementFront = $('<img class="modal-img" style="width:30%">');
        imageElementFront.attr('src', pokemon.imageUrlFront);
        let imageElementBack = $('<img class="modal-img" style="width:30%">');
        imageElementBack.attr('src', pokemon.imageUrlBack);
        let heightElement = $('<h4>' + 'height : ' + pokemon.height + 'm' + '</h4>');
        let weightElement = $('<h4>' + 'weight : ' + pokemon.weight + 'kg' + '</h4>');

        let typesElement = $('<h4>' + 'types : ' + pokemon.types + '</h4>');

        //Code below (for loop) make all the types for each pokemon appear one by one in the console (the for loop extract them from their original array from the API).
        // let typesElement = pokemon.types
        // for (let i = 0; i < typesElement.length; i++) {
        //     console.log(typesElement[i].type.name);
        //     console.log(typeof (typesElement[i].type.name));
        // }

        let abilitiesElement = $('<h4>' + 'abilities : ' + pokemon.abilities + '</h4>');

        //Code below (for loop) make all the abilities for each pokemon appear one by one in the console (the for loop extract them from their original array from the API).
        // let abilitiesElement = pokemon.abilities
        // for (let i = 0; i < abilitiesElement.length; i++) {
        //     console.log(abilitiesElement[i].ability.name);
        //     console.log(typeof (abilitiesElement[i].ability.name))
        // }

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }

    return {
        getAll: getAll,
        add: add, //({ name: 'pikachu', height: 4, types: 'electric' }) the object on the left (Pikachu) following the add:add would be to manually add a pokemon with caracteristics (ex here: Pikachu with his eight and type).
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

//The LoadList() method fetches data from the API, then add each pokemon in the fetched data to pokemonList with the add function.
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

//This function pokemonRepository.getAll().forEach(function (pokemon) will run the forEach over the function below (pokemonRepository.addListItem(pokemon);).
pokemonRepository.getAll().forEach(function (pokemon) {
    //This function pokemonRepository.addListItem(pokemon); will run as long as there is a new pokemon in the IIFE pokemonList array to go over on.
    pokemonRepository.addListItem(pokemon);
})