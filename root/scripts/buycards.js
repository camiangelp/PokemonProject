let url= "https://pokeapi.co/api/v2/pokemon"

const createCards = async () => {
    try{
        const res = await fetch(url);
        const data = await res.json();
        
        data.results.forEach(async (pokemon) => {
            const response = await fetch (pokemon.url);
            const dataPokemon=await response.json();

            const container = document.querySelector('.container');
            
            let pokeCard = document.createElement('div');
            pokeCard.className= 'pokeCard';
            pokeCard.innerHTML= `
            <div class="headerCard">
                    <p>${dataPokemon.name}</p>
                    <i>

            </div>
            <img class= "imgPoke" src="${dataPokemon.sprites.other["home"].front_default}">
            <div class="headerCard">
                    <p>${dataPokemon.base_experience}</p>
                    <button>Buy</button>

            </div>
            `        
            container.appendChild(pokeCard);
        });
    }catch(error){
        alert("Error")
    }
}


createCards();