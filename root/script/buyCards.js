/** Buy Cards
 * The code fetches Pokémon data from the API, stores it in the pokemons array, and renders the cards based on the current offset,
 * limit, and type filters. 
 * The "Load More" button allows for dynamically loading more Pokémon cards, 
 * and the type filters enable filtering based on the selected type.
 */

let url = "https://pokeapi.co/api/v2";
let offset = 0;
let limit = 20;
let pokemons = [];
let currentType = "all";

const pokeContainer = document.querySelector(".container");

/** renderCards
 * is a function that takes an array of Pokémon data and renders the cards in the HTML.
 * It creates a new div element for each Pokémon card, adds the necessary HTML content, 
 * and appends the card to the container element.
 * @param {*} pokemons 
 */
const renderCards = (pokemons) => {
  pokeContainer.innerHTML = ""; // Clean container before rendering new cards

  // Create Pokemon cards
  pokemons.forEach((pokemon) => {
    let pokeCard = document.createElement("div");
    pokeCard.className = "pokeCard";
    pokeCard.innerHTML = `
      <div class = "card-text">
        <p>${pokemon.name}</p>
        <i class="fa-regular fa-heart heart"></i>
        
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

/**getPokemon
 * is an asynchronous function that retrieves Pokémon data from the API.
 * It first fetches a large number of Pokémon (limit 100000) to ensure all Pokémon are retrieved.
 * The retrieved data is mapped to the pokemons array, with initial values for sprites, types, and base experience.
 * Additional data (sprites, types, and base experience) for each Pokémon is fetched and stored in the array.
 */
const getPokemon = async () => {
  try {
    const res = await fetch(`${url}/pokemon?limit=128&offset=0`);
    const data = await res.json();

    // Map the retrieved data to the pokemons array
    pokemons = data.results.map((pokemon) => ({
      url: pokemon.url,
      name: pokemon.name,
      sprites: {},
      types: [],
      base_experience: 0,
    }));

    // Fetch additional data for each Pokémon
    await Promise.all(
      pokemons.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();

        // Update the sprites, types, and base experience for each Pokémon
        pokemon.sprites = data.sprites;
        pokemon.types = data.types;
        pokemon.base_experience = data.base_experience;
      })
    );
     // Render the initial set of cards  
    renderCards(pokemons.slice(offset, limit));
    setupFavorites();

 
  } catch (error) {
    console.log(error);
    
  }
};

/** loadMoreCards
 * is a function that loads additional cards when the "Load More" button is clicked.
 * The offset is updated to fetch the next set of Pokémon data.
 * If the currentType is "all", all Pokémon are rendered. Otherwise, only Pokémon matching the current type are rendered.
 */
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

/** filterByType 
 * is a function that filters Pokémon cards based on the selected type.
 * It updates the offset and currentType variables.
 * If the type is "all", all Pokémon are rendered. Otherwise, only Pokémon of the selected type are rendered.
 * @param {*} type 
 */
const filterByType = (type) => {
  offset = 0;
  currentType = type;

  if (type === "all") {
    renderCards(pokemons.slice(0, limit));
    setupFavorites();
  } else {
    const filteredPokemon = pokemons.filter((pokemon) => {
      return pokemon.types.some((pokemonType) => {
        return pokemonType.type.name === type;
      });
    });

    renderCards(filteredPokemon.slice(0, limit));
    setupFavorites();
  }
};

getPokemon();

const btnMore = document.querySelector(".btnMore");
btnMore.addEventListener("click", loadMoreCards);

// Get text from HTML nav and execute filter
const typeList = document.querySelectorAll(".type");

typeList.forEach((typeText) => {
  typeText.addEventListener("click", (event) => {
    const pestanaActive= document.querySelector(".pestanaActive");
    pestanaActive.classList.replace("pestanaActive","pestanaInactive");
    event.target.classList.replace("pestanaInactive","pestanaActive");
    event.preventDefault();

    const type = typeText.textContent.toLowerCase();
    filterByType(type);
  });
});

const setupFavorites=()=>{
  const hearts= document.querySelectorAll(".heart");
  
  hearts.forEach(heart =>{
    heart.addEventListener("click", (event) => {
      // const unchecked= document.querySelector(".unchecked");
      // unchecked.classList.replace("unchecked","checked");
      // event.target.classList.replace("checked","unchecked");
      // event.preventDefault();
      
      if(event.target.className.includes("fa-regular")){
        event.target.classList.remove("fa-regular")
        event.target.classList.add("fa-solid")
      } else {
        event.target.classList.remove("fa-solid")
        event.target.classList.add("fa-regular")
      }
    
    });

  })
  
}