
//IIFE making pokemonList local to the function (rather than global if outside of the IIFE)
let pokemonRepository = (function () {

    //Load the list of pokemons on my website from an external source via the API
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

    //Add pokemons (<li>) in the <ul> tag defined in the index.html
    function addListItem(pokemon) {
        //let pokemonList = document.querySelector('.pokemon-list'); select the class of the ul element in the HTML file
        let pokemonList = document.querySelector('.pokemon-list');
        //let listItem = document.createElement('li'); created a li (list)
        let listItem = document.createElement('li');
        //Add a class to the li element created on the line just before (upper)
        listItem.classList.add('list-group-item');
        //let button = document.createElement('button'); created a buttons elements (or buttons tags) for each Pokemon
        let button = document.createElement('button');
        //button.classList.add('pokemon-button-class'); added a class the the buttons created upper to be able to style them in CSS within styles.css, and ('btn','btn-primary') classes are for Bootstrap.
        button.classList.add('btn', 'btn-danger', 'btn-lg');
        //Two lines below used to make sure the buttons created refer to the Boostrap model created (see function showModal(pokemon) below)
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        //button.innerText = pokemon.name; inserted the name of a pokemon inside each of the buttons created
        //In this command, pokemon is equal to the (pokemon) parameter following the function in the code upper (function addListItem(pokemon) {)
        //.name is equal to the name object inside the IIFE upper (as in let pokemonList = [{ name: 'balbuzard', height: 7, types: ['grass', ' poison'] },
        button.innerText = pokemon.name;
        // button.addEventListener('click', function (event) created an event when a pokemon button is clicked on. This addEventListner code is associated to the function showDetails(pokemon) outisde the IIFE, and so return and take results from this outside function which shows each pokemon object inside the console.
        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        })
        //listItem.appendChild(button); attached each buttons to each li (list items) created previously for each Pokemon
        listItem.appendChild(button);
        //pokemonList.append(listItem); attached each li (list items) to the ul (unordered list - the parent element)
        pokemonList.append(listItem);
        button.addEventListener('click', function () { pokemonRepository.showDetails(pokemon) });
    };

    //Function loadList used to get the complete list of Pokemon from here: https://pokeapi.co/api/v2/pokemon/?limit=150, precised in the 'let' apiURL at the beginning/top of this IIFE. 
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
                console.log(pokemon); //This console.log(pokemon); add all the pokemons to the console, so when opening the console of the website, all pokemons appear.
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //For each item to have a name and a detailsUrl property - so using the detailsUrl property to load the detailed data for a given Pokémon. For this, we add a loadDetails() function, which takes a Pokémon item as an argument.
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //***Below is adding the details to the item
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        })

    }

    //Using showDetails() function to execute loadDetails() function in the IIFE upper. The showDetails() function is executed when a user clicks on a Pokémon. That’s the moment when Pokémon’s details are taken from the server acces to with the API. 
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon); //used here to call and display the results from the showModal function below
        });
    }

    //Implemanting code with Bootstrap
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
        console.log(pokemon.types);
        let abilitiesElement = $('<h4>' + 'abilities : ' + pokemon.abilities + '</h4>');
        console.log(pokemon.abilities);

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
        add: add, //({ name: 'pikachu', height: 4, types: 'electric' }) the object on the left following the add:add is to manually add a pokemon with caracteristics (ex here: Pikachu with his eight and type)
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

//The LoadList() method fetches data from the API, then add each Pokémon in the fetched data to pokemonList with the add function implemented earlier
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

//This function pokemonRepository.getAll().forEach(function (pokemon) will run the loop over the function below (pokemonRepository.addListItem(pokemon);)
pokemonRepository.getAll().forEach(function (pokemon) {
    //***This function pokemonRepository.addListItem(pokemon); which refere/is same to the addListItem function inside the IIFE upper will run as long as there is a new pokemon in the IIFE pokemonList array to go over on
    pokemonRepository.addListItem(pokemon);
})