let url = "https://pokeapi.co/api/v2";
let offset = 0;
let limit = 20;
let totalLoaded = 0;

const getPokemon = async () => {
  try {
    const res = await fetch(`${url}/pokemon?offset=${offset}&limit=${limit}`);
    const data = await res.json();

    data.results.forEach(async (pokemon) => {
      if (totalLoaded < offset + limit) {
        
        const response = await fetch (pokemon.url);
        const dataPokemon=await response.json();

        const [type1,type2]= dataPokemon.types.map(
            (typePokemon) => typePokemon.type.name
        );

       //pName.textContent =element.name.charAt(0).toUpperCase() +
       // element.name.slice(1).toLowerCase();

        const container = document.querySelector('.container');

            
            
            let pokeCard = document.createElement('div');
            pokeCard.className= 'pokeCard';
            pokeCard.innerHTML = `
                <div class = "card-text">
                    <p  class= "pokemonName">${dataPokemon.name}</p>
                    <img class="heart" src="./assets/heart-svgrepo-com.svg" alt="heart"/>
                </div>

                <img class = "imgPoke" src = "${dataPokemon.sprites.other["home"].front_default}">
                <div class="card-text text-bottom">
                    <p> Power level:     ${dataPokemon.base_experience}</p>
                    <button class="buy">Buy</button>
                </div>

            `
            
                container.appendChild(pokeCard);
               
                pokeCard.setAttribute("type1", type1);
                pokeCard.setAttribute("type2", type2);
                

        totalLoaded++;

        const cardCount = document.querySelector(".cardsCount");
        cardCount.textContent = `${totalLoaded} Cards`;

        const pName=dataPokemon.name;
        pName.textContent =element.name.charAt(0).toUpperCase() +element.name.slice(1).toLowerCase();
       
      }
    });
    offset += limit;
  } catch (error) {
    alert("Error en la URL");
  }
};



const btnMore = document.querySelector(".btnMore");
btnMore.addEventListener("click", getPokemon);

const filter = document.querySelectorAll('.type');

filter.forEach((filterType) =>{
    filterType.addEventListener("click",(event)=> {
        event.preventDefault();
        const type = filterType.textContent.toLowerCase();
        filterByType(type);
    })
})

const filterByType = (type) => {
    const cards = document.querySelectorAll(".pokeCard");
    cards.forEach((card) => {
        const cardType1 = card.getAttribute("type1");
        const cardType2 = card.getAttribute("type2"); 

        if ( type === "all" || cardType1=== type || cardType2 === type){
            card.classList.remove("hidden");
        }else{
            card.classList.add("hidden");
        }
    });

}
getPokemon();