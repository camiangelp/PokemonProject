let url = "https://pokeapi.co/api/v2";
let offset = 0;
let limit = 20;
let pokemons = [];
let currentType = "all";

const pokeContainer = document.querySelector(".container");

// Function that creates cards and renders them in HTML
const renderCards = (pokemons) => {
  pokeContainer.innerHTML = ""; // Clean container before rendering new cards

  // Create Pokemon cards
  pokemons.forEach((pokemon) => {
    let pokeCard = document.createElement("div");
    pokeCard.className = "pokeCard";
    pokeCard.innerHTML = `
      <div class = "card-text">
        <p>${pokemon.name}</p>
        <img class="heart" src="./assets/heart-svgrepo-com.svg" alt="heart"/>
      </div>
      <img class="imgPoke" src="${pokemon.sprites.other["home"].front_default}">
      <div class="card-text text-bottom">
        <p> Power level: ${pokemon.base_experience}</p>
        <button class="buy">Buy</button>
      </div>`;

    // Select div container and push cards
    pokeContainer.appendChild(pokeCard);
  });

  // Count cards
  const totalCards = document.querySelector(".cardsCount");
  totalCards.textContent = `${pokemons.length} Cards`;
};

// Get data from the API and populate the pokemons array
const getPokemon = async () => {
  try {
    const res = await fetch(`${url}/pokemon?limit=100000&offset=0`);
    const data = await res.json();

    pokemons = data.results.map((pokemon) => ({
      url: pokemon.url,
      name: pokemon.name,
      sprites: {},
      types: [],
      base_experience: 0,
    }));

    await Promise.all(
      pokemons.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();

        pokemon.sprites = data.sprites;
        pokemon.types = data.types;
        pokemon.base_experience = data.base_experience;
      })
    );

    renderCards(pokemons.slice(offset, limit));
  } catch (error) {
    alert("URL not found");
  }
};

// Load more cards
const loadMoreCards = () => {
  offset += limit;

  if (currentType === "all") {
    renderCards(pokemons.slice(0, offset + limit));
  } else {
    const filteredPokemon = pokemons.filter((pokemon) => {
      return pokemon.types.some((pokemonType) => {
        return pokemonType.type.name === currentType;
      });
    });

    renderCards(filteredPokemon.slice(0, offset + limit));
  }
};

// Filter Pokemon Cards
const filterByType = (type) => {
  offset = 0;
  currentType = type;

  if (type === "all") {
    renderCards(pokemons.slice(0, limit));
  } else {
    const filteredPokemon = pokemons.filter((pokemon) => {
      return pokemon.types.some((pokemonType) => {
        return pokemonType.type.name === type;
      });
    });

    renderCards(filteredPokemon.slice(0, limit));
  }
};

getPokemon();

const btnMore = document.querySelector(".btnMore");
btnMore.addEventListener("click", loadMoreCards);

// Get text from HTML nav and execute filter
const typeList = document.querySelectorAll(".type");

typeList.forEach((typeText) => {
  typeText.addEventListener("click", (event) => {
    event.preventDefault();
    const type = typeText.textContent.toLowerCase();
    filterByType(type);
  });
});
