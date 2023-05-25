
//IIFE making pokemonList from Exercise 1.2 local to the function (rather than global if outside of the IIFE, as shown upper)
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
        button.classList.add('pokemon-button-class', 'btn', 'btn-primary');
        //button.innerText = pokemon.name; inserted the name of a pokemon inside each of the buttons created
        //In this command, pokemon is equal to the (pokemon) parameter following the function in the code upper (function addListItem(pokemon) {)
        //In this command, .name is equal to the name object inside the IIFE upper (as in let pokemonList = [{ name: 'balbuzard', height: 7, types: ['grass', ' poison'] },
        button.innerText = pokemon.name;
        // button.addEventListener('click', function (event) created an event when a pokemon button is clicked on. This addEventListner code is associated to the function showDetails(pokemon) outisde the IIFE, and so return and take results from this outside function which shows each pokemon object inside the console.
        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        })
        //listItem.appendChild(button); attached each buttons to each li (list items) created previously for each Pokemon
        listItem.appendChild(button);
        //pokemonList.append(listItem); attached each li (list items) to the ul (unordered list - the parent element)
        pokemonList.append(listItem);
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
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Using showDetails() function to execute loadDetails() function in the IIFE upper. The showDetails() function is executed when a user clicks on a Pokémon. That’s the moment when Pokémon’s details are taken from the server acces to with the API. 
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon); //used here to call and display the results from the showModal function below
        });
    }

    //Implementing modal manually
    // function showModal(pokemon) {
    //     let modalContainer = document.querySelector('#modal-container');
    //     modalContainer.classList.add('is-visible');
    //     //Clear all existing modal content
    //     modalContainer.innerHTML = ''
    //     //Create the actual modal window
    //     let modal = document.createElement('div');
    //     modal.classList.add('modal');
    //     //Add the modal window element
    //     let closeButtonElement = document.createElement('button');
    //     closeButtonElement.classList.add('modal-close', 'btn','btn-primary');
    //     closeButtonElement.innerHTML = 'Close';
    //     //closeButtonElement.addEventListener('click', hideModal); is the an listener for closeButtonElement, and call the hideModal function below when clicked (and thus allows the modal window the close when user click on the 'close' button at the top right corner of the modal window).
    //     closeButtonElement.addEventListener('click', hideModal);
    //     //Add title to the modal windown
    //     let titleElement = document.createElement('h1');
    //     titleElement.innerHTML = pokemon.name;
    //     //Add text to the modal windown
    //     let contentElement = document.createElement('p');
    //     contentElement.innerHTML = `Height: ${pokemon.height}m<br>`;
    //     //Show image of each pokemon in modal window when a pokemon is clicked on
    //     let imageElement = document.createElement ('img')
    //     //Add class to images to use it in CSS to style them
    //     imageElement.classList.add('pokemon-image');
    //     //Get the URL for each pokemon image and show the image from that URL for each pokemon
    //     imageElement.src = pokemon.imageUrl
    //     imageElement.setAttribute('alt', 'Pokemon picture');

    //     modal.appendChild(closeButtonElement);
    //     modal.appendChild(titleElement);
    //     modal.appendChild(contentElement);
    //     modal.appendChild (imageElement);
    //     modalContainer.appendChild(modal);

    //     modalContainer.classList.add('is-visible');

    //     modalContainer.addEventListener('click', (e) => {
    //         //Make the modal window close when users click outside of it
    //         let target = e.target;
    //         if (target === modalContainer) {
    //             hideModal();
    //         }
    //     });
    // }

    //Implemanting code with Bootstrap
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');
        modalTitle.empty();
        modalBody.empty();
        modalHeader.empty();

        let nameElement = $('<h5>' + pokemon.name + '</h5>');
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attritbute('src', pokemon.imageUrlFront);
        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attritbute('src', pokemon.imageUrlBack);
        let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');
        let weightElement = $('<p>' + 'weight : ' + pokemon.weight + '</p>');
        let typesElement = $('<p>' + 'types : ' + pokemon.types + '</p>');
        let abilitiesElement = $('<p>' + 'abilities : ' + pokemon.abilities + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            //Make the modal window close when users click outside of it
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
    });
    //function hideModal() { which is linked with closeButtonElement.addEventListener('click', hideModal) in the showModal function upper, allows users to close the modal windown if pressing on the 'close' button on the top right corner of the modal window
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }
    //window.addEventListener('keydown', (e) => { allow user to close the modal windown if pressing escape on keyboard
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

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