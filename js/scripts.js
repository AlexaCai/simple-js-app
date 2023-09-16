let pokemonRepository = (function () {


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


    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
        button.classList.add('btn', 'btn-danger', 'btn-block');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        button.innerText = pokemon.name;
        button.addEventListener('click', function () {
            showDetails(pokemon)
        })
        listItem.appendChild(button);
        pokemonList.append(listItem);
        button.addEventListener('click', function () { pokemonRepository.showDetails(pokemon) });
    };


    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
    }


    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            }).then(function (details) {
                item.imageUrlFront = details.sprites.front_default;
                item.imageUrlBack = details.sprites.back_default;
                item.height = details.height;
                item.weight = details.weight;
                item.types = [];
                for (let i = 0; i < details.types.length; i++) {
                    item.types.push(' ' + details.types[i].type.name);
                }
                item.abilities = [];
                for (let i = 0; i < details.abilities.length; i++) {
                    item.abilities.push(' ' + details.abilities[i].ability.name);
                }
            }).catch(function (e) {
                console.error(e);
            })

    }


    function showDetails(pokemon) {
        loadDetails(pokemon)
            .then(function () {
                showModal(pokemon);
            });
    }


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
        let abilitiesElement = $('<h4>' + 'abilities : ' + pokemon.abilities + '</h4>');
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
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();


pokemonRepository.loadList()
    .then(function () {
        pokemonRepository.getAll()
            .forEach(function (pokemon) {
                pokemonRepository.addListItem(pokemon);
            });
    });

    
pokemonRepository.getAll()
    .forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })