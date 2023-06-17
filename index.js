

import { paginacion , buscarPokemon ,pantallaDeCarga } from "./api.js";



document.addEventListener('DOMContentLoaded' , e=>{
    pantallaDeCarga(paginacion,"https://pokeapi.co/api/v2/pokemon?offset=0&limit=12")
})

document.addEventListener('click' , e=>{

    if(e.target.matches('#btn-buscar')){
        
        buscarPokemon();
    }


})


document.addEventListener("click", async e =>{

    const $modal = document.getElementById("modal");
    if(e.target.matches(".card-pokemon") || e.target.matches(`.card-pokemon *`)){
        let target = e.target;
        while(target.classList.contains("card-pokemon")==false){
            target =  target.parentNode;
        }
    let url = target.dataset.urlPokemon;
    await buscarPokemon(url);

    pantallaDeCarga(buscarPokemon,url)
 
    
    }


    if(e.target.matches("button.prev-button") || e.target.matches("button.next-button")){

        let $imagenActiva = document.querySelector("section.carousel img.active-image")
        if(e.target.classList.contains("next-button")){

            if($imagenActiva.nextElementSibling != null){
                $imagenActiva.classList.toggle("active-image");
                let $img = $imagenActiva.nextElementSibling;
                $img.classList.toggle("active-image");
            }
        }

        if(e.target.classList.contains("prev-button")){

            if($imagenActiva.previousElementSibling != null && $imagenActiva.previousElementSibling.tagName.toLowerCase() == "img"){
                $imagenActiva.classList.toggle("active-image");
                let $img = $imagenActiva.previousElementSibling;
                $img.classList.toggle("active-image");
            }   

        }


        
    }

    if(e.target.matches("form.form-busqueda button")){

        const $form = document.querySelector("form.form-busqueda");
        let elementos = $form.elements;
        let input = elementos.busqueda.value.toLowerCase(); 
        let url =  `https://pokeapi.co/api/v2/pokemon/${input}`
        
        pantallaDeCarga(buscarPokemon,url)
      
    }

    if(e.target.matches(".modal button.close")){
        let $modal = document.getElementById("modal");
        $modal.classList.toggle("modal-active");
    }


    if(e.target.matches("a") || e.target.matches("a.next-page")){
        e.preventDefault();
        pantallaDeCarga(paginacion,e.target.href)
       
        }



});