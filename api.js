import { tipos } from "./tipos_pokemon.js";

export async function paginacion(url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12" ){

    try{
        let res = await fetch(url)
        if(res.ok){
            let datos = await res.json();
            let pokemons = datos.results;


            let $nextPage = document.getElementById("next-page");
            let $prevPage = document.getElementById("prev-page");

            $nextPage.href = datos.next;
            $prevPage.href = datos.previous;

            let $contenedor = document.getElementById("main");
            let $fragment = document.createDocumentFragment();
            
            for (let index = 0; index < pokemons.length; index++) {
                const element = pokemons[index];
                let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${element.name}/`);
                let pokemonEncontrado = await res.json();
                
                let $div = document.createElement("div");
                $div.setAttribute("class","card-pokemon")
                $div.setAttribute("data-url-pokemon",`${element.url}`);
                $div.innerHTML = `    <div class="img-pokemon" >
                                        <img src="${pokemonEncontrado.sprites.front_default}" alt="">
                                    </div>
                                    <div class="fondo-imagen" ></div>
                                    <h2 class="nombre-pokemon-2" >${pokemonEncontrado.name}</h2>
                                    <h2 class="nombre-pokemon-1" >${pokemonEncontrado.name}</h2>
                                    `
                       $fragment.appendChild($div);
            }
            $contenedor.innerHTML = "";
            $contenedor.appendChild($fragment)
            
            
            


        }else{
            console.log(res.statusText)
        }
    }catch(e){

    }

}






export async function buscarPokemon(url){
    try{
        let res = await fetch(`${url}`)
        if(res.ok){
            let datos = await res.json();
            let $carousel = document.querySelector("section.carousel")
            let $modal = document.getElementById("modal")
            
            let imagenes = $carousel.querySelectorAll("img.img-carousel");
            for (var i = 0; i < imagenes.length; i++) {
               imagenes[i].remove();
              }

            let $img_front = document.createElement("img");
            let $img_back = document.createElement("img");
            $img_front.src= datos.sprites.front_default;
            $img_back.src= datos.sprites.back_default;
            $img_front.classList.add("img-carousel","active-image");
            $img_back.classList.add("img-carousel");

            $carousel.appendChild($img_front);
            $carousel.appendChild($img_back);

            let $tipo = document.getElementById("modal-tipo-pokemon");
            $tipo.textContent="";
            datos.types.forEach(element => {
                $tipo.textContent +=` ${tipos.get(element.type.name)}`;
            });
            document.getElementById("modal-nombre-pokemon").textContent = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);


            document.getElementById("modal-vida-pokemon").textContent = datos.stats[0].base_stat;
            document.getElementById("modal-ataque-pokemon").textContent = datos.stats[1].base_stat;
            document.getElementById("modal-defensa-pokemon").textContent = datos.stats[2].base_stat;
            document.getElementById("modal-velocidad-pokemon").textContent = datos.stats[5].base_stat;

            $modal.classList.contains("modal-active")? console.log("")  : $modal.classList.toggle("modal-active");

        }else{

            setTimeout(()=>{
            $alert.style.visibility = "hidden";
            },4000)
            let $alert = document.querySelector("div.alertas");
            $alert.lastElementChild.textContent = `Pokemon no encontrado`;
            $alert.style.visibility = "visible";

        }
    }catch(e){

    }
   

 
}


export async function pantallaDeCarga(f,...argf){
    let $maskLoading = document.getElementById("mask-load")
    $maskLoading.classList.toggle("mask-load-active")
    await f(argf);
    $maskLoading.classList.toggle("mask-load-active")
    
}