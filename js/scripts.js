let pokemonRepository = (function () {

    //***Initialize the Pokemons list as empty.
    let pokemonList = [];
    //***Load the list of Pokemons from an external source (via the API).
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //***Function to add Pokemon objects to the pokemonList array. 
    function add(pokemon) {
        //***Checks if the parameter pokemon is of type "object" and if it has a property called "name". 
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            //***If both condition are true, Pokemon object is added to the pokemonList array using the push() method. 
            pokemonList.push(pokemon);
        } else {
            //***If both conditions are not true, an error message is logged in the console.
            console.log("pokemon is not correct");
        }
    }

    //***Function to to retrieve the entire list of Pokemon objects stored in the pokemonList array.
    function getAll() {
        return pokemonList;
    }

    //***Function to add Pokemons in the <ul> tag defined in the index.html, as well as buttons and other elements appearing on the web page.
    function addListItem(pokemon) {
        //***Select the class of the <ul> element in the index.html where the Pokemon list items is added.
        let pokemonList = document.querySelector('.pokemon-list');
        //***Created a <li> inside the <ul> element in the index.html. The <li> element is created here via JS, so it doesnt appear as a tag in the index.html.
        let listItem = document.createElement('li');
        //***Add a class to the <li> element created previsouly on the line before.
        listItem.classList.add('list-group-item');
        //***Created a button element to make each Pokemon clickable via this button eventually. The button element is created here via JS, so it doesnt appear as a tag in the index.html.
        let button = document.createElement('button');
        //***Add a class the buttons created on the line before. These classes as well as their stylings come from Bootstrap. Some features from these Bootstrap visuals have been re-styled and personnalized by using CSS (styles.css).
        button.classList.add('btn', 'btn-danger', 'btn-block');
        //***The two lines below are used to make sure the buttons created refer to the Bootstrap modal created and shown inside the index.html.
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        //***button.innerText = pokemon.name insert the name of a Pokemon inside each of the buttons created.
        //***In this command, pokemon is equal to the (pokemon) parameter of the function (function addListItem(pokemon))
        //***.name is equal to the ''name'' key inside each object of the Pokemon array (let pokemonList = []). As a reminder, each Pokemon push inside this array comes to the following format: [{ name: 'balbuzard', height: 7, types: ['grass', ' poison']}. The .name is therefore used to take the value associated with the name key inside the object of each poekmon.
        button.innerText = pokemon.name;
        //***Create an event when a Pokemon button is clicked on. This addEventListner code is associated to the function showDetails(pokemon) below, and so return the results from this function which shows each Pokemon objects in details (name, images, height, weight, types and abilities).
        button.addEventListener('click', function () {
            showDetails(pokemon)
        })
        //***Attach each button to each <li> created previously for each Pokemon.
        listItem.appendChild(button);
        //***pokemonList.append(listItem) attach each <li> to the pokemonList.
        pokemonList.append(listItem);
        button.addEventListener('click', function () { pokemonRepository.showDetails(pokemon) });
    };

    //***Function used to get the complete list of Pokemon names and URLs (URLs for each Pokemon redircting to a more in-detailed page of Pokemon attributes) from the Pokemon API, by using the apiURL variable as defined upper, which is equal to the API link.
    function loadList() {
        //***Initiates a network request to the URL stored in the apiUrl variable.
        return fetch(apiUrl)
            //***Chain of Promises that handles the response from the server.
            .then(function (response) {
                //***.json() method is called on the response object to parse the response body as JSON. This method also returns a Promise that resolves to the parsed JSON data.
                return response.json();
                //***Handles the parsed JSON data. It's executed when the JSON data is successfully parsed. Inside this block, a forEach loop iterates over the results array within the JSON data.
            }).then(function (json) {
                //***For each item (which are Pokemons) in the ''results'' array (results.forEach) (''results'' array coming from the API structure, where Pokemons are all displayed in a ''result'' array), the ''function (item)'' is executed and create a Pokemon (let pokemon = ...) with his name and detailed URL for each Pokemon within the ''results'' array from the API.
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    //***Add function is called, adding the Pokemon objects fecthed from the API to the array of the pokemonList variable upper.
                    add(pokemon);
                });
                //***Handles any errors that occur during the Promise chain.
            }).catch(function (e) {
                console.error(e);
            })
    }

    //***loadDetails function fetches additional details for Pokemons from URL ''detailsUrl''
    function loadDetails(item) {
        //***Extracts the detailsUrl property from the provided item (which represents a Pokemon). This URL, as it is presentend in the external API for each Pokemon, lead to more detailed information about each Pokemon.
        let url = item.detailsUrl;
        //***Network request to the url (detailsUrl). This fetch function returns a Promise that resolves to the response from the server.
        return fetch(url)
            //***Handles response from the server.
            .then(function (response) {
                //***.json() method is called on the response object to parse the response body as JSON. This method also returns a Promise that resolves to the parsed JSON data.
                return response.json();
                //***Handles the parsed JSON data. It's executed when the JSON data is successfully parsed. The block of code below containing various item.something assigns details (extracted from the fetched JSON data) to each item object (each item object being a Pokemon).
            }).then(function (details) {
                item.imageUrlFront = details.sprites.front_default;
                item.imageUrlBack = details.sprites.back_default;
                item.height = details.height;
                item.weight = details.weight;
                item.types = [];
                //***The empty item.types = [] upper create the space where each type for each Pokemon is stored. To do so, the for loop below extract all the Pokemon types from his original type array within the API. Then, the item.types.push(details.types[i].type.name) make sure to push each type found for each pokemon after every round of the loop inside the [] of the item.types = [], making it possible to show each types for each Pokemon on the webpage.
                for (let i = 0; i < details.types.length; i++) {
                    item.types.push(' ' + details.types[i].type.name);
                }
                item.abilities = [];
                //***The empty item.abilities = [] upper create the space where each ability for each Pokemon is stored. To do so, the for loop below extract all the Pokemon abilities from his original abilities array within the API. Then, the item.abilities.push(details.abilities[i].ability.name) make sure to push each ability found after every round of the loop inside the [] of the abilities.types = [], making it possible to show each abilities for each Pokemon on the webpage.
                for (let i = 0; i < details.abilities.length; i++) {
                    item.abilities.push(' ' + details.abilities[i].ability.name);
                }
                //***Handles any errors that occur during the Promise chain.
            }).catch(function (e) {
                console.error(e);
            })

    }

    //***The showDetails() function is executed when a user clicks on a Pokemon. That’s the moment when a Pokemon details are taken from the server via the API. See addListItem function, last line of code to have a look on the event listner trigerring that (button.addEventListener('click', function () { pokemonRepository.showDetails(pokemon) });).
    function showDetails(pokemon) {
        //***When showDetails is executed, it calls to loadDetails function that fetches additional details about the Pokemon that has been clicked on using its detailsUrl.
        loadDetails(pokemon)
            //***Promise chain that waits for the loadDetails function to finish loading the detailed information about the Pokemon. Once that data is loaded and the Promise resolves, the then block is executed.
            .then(function () {
                //***showModal(pokemon) function is called, passing the Pokemon object as a parameter. This function is used to display the detailed information of a Pokemon in a modal.
                showModal(pokemon);
            });
    }

    //***This function specifies what must be shown in the modal pop up when a user click on a Pokemon button. 
    function showModal(pokemon) {
        //***The code selects the different parts of the modal (the modal title, body, and header) using jQuery. It then empties the contents of these elements to clear any previous data that might have been displayed.
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');
        modalTitle.empty();
        modalBody.empty();
        //***Various HTML elements are created to display the detailed information about the Pokemon clicked on inside the modal. The content of each element is set using the properties of the Pokemon object that was passed as a parameter in the function above, and each Pokemon propoerties (e.g.: pokemon.imageUrlFront) is coming directly from the API structure for data (imageUrlFront, imageUrlBack, height, etc.).
        let nameElement = $('<h1>' + pokemon.name + '</h1>');
        let imageElementFront = $('<img class="modal-img" style="width:30%">');
        imageElementFront.attr('src', pokemon.imageUrlFront);
        let imageElementBack = $('<img class="modal-img" style="width:30%">');
        imageElementBack.attr('src', pokemon.imageUrlBack);
        let heightElement = $('<h4>' + 'height : ' + pokemon.height + 'm' + '</h4>');
        let weightElement = $('<h4>' + 'weight : ' + pokemon.weight + 'kg' + '</h4>');
        let typesElement = $('<h4>' + 'types : ' + pokemon.types + '</h4>');
        let abilitiesElement = $('<h4>' + 'abilities : ' + pokemon.abilities + '</h4>');
        //***The created elements are appended to the modal's title and body sections. This is how the detailed information about the Pokemon clicked on is added to the modal pop up. The jQuery .append() method is used to add these elements as children to the modal's title and body sections.
        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }

    //***Used to expose the different encapsulated functions in my code in a controlled manner to make them available to use in the rest of the file, allowing other parts of the code to access and utilize their functionalities.
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

//***Block of code used to fetch data from the API, then adds each fetched Pokemon to the user interface as a list item using the addListItem function.
pokemonRepository.loadList()
    //***Promise return by loadList. The function execute once the data is fetched and the Promise resolves.
    .then(function () {
        //***Calls the getAll function from the pokemonRepository module. It returns the array pokemonList that contains all the Pokemon data.
        pokemonRepository.getAll()
            //***Iterates through each element of the array returned by pokemonRepository.getAll().
            .forEach(function (pokemon) {
                //***Calls the addListItem function from the pokemonRepository module, passing in the current Pokemon from the loop as an argument. This function adds the current Pokemon as a list item to the user interface.
                pokemonRepository.addListItem(pokemon);
            });
    });

//***Retrieves the array pokemonList that contains all the Pokemon data.
pokemonRepository.getAll()
    //***Iterates through each element of the pokemonList array (forEach is executed for each Pokemon in the array).
    .forEach(function (pokemon) {
        //***Calls the addListItem function from the pokemonRepository module, passing in the current Pokemon from the loop as an argument. This function adds the current Pokemon as a list item to the user interface.
        pokemonRepository.addListItem(pokemon);
    })