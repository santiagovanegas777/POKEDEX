// 1ª: selecciono mi elemento contenedor que he creado en html.
const main$$ = document.querySelector("main");
const ol$$ = document.querySelector("#pokedex")

//1ª: Creo un array vacio para pushear mis pokemons(respuesta de la llamada a la api)
let arr= [];

//3ª: Hago la peticion a la api mediante fecth, para ello creo una variable asyncrona, creo un bucle dentro para controlar el ultimo valor de la url de la api y asi poder hacer tantos llamados como necesite, luego creo una constante (res) que me devuelve en formato json mi peticion a la api  y por ultimo lo pusheo a mi array que me habia creado desde el inicio.
const pokeSearch = async () => {
  for (let i = 1; i < 151; i++){
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
   const res = await response.json();
   arr.push(res);
   console.log(res)
   

}
return arr;
  
};


// 4ª: Creo la funcion (mapResults) para enviarle luego mi arr y mapear los datos que quieto obtener  de mi arr. los selecciono y les asigno el nombre que yo quiero en este caso nombre = (arr.name(i)),id = (arr.id(i)),imagen= (arr.sprites(i)).
const mapResults = (characters) => {
    return characters.map((character) => ({
        nombre: character.name,
       imagen: character.sprites['front_default'],
        tipo: character.types.map((type)=> type.type.name),
        id: character.id,

    }));
};

//5ª: Despues de tener mi arr mapeado creo una funcion para dibujar mi arr en mi html, para ello creo un bucle for of  que me seleciona cada objeto de mi arr y le asiga los valores de html que yo le he asignado todo esto lo hago atravez del metodo innerHTML y antes del bucle inicializo mi elemento contenedor(main$$) para que en cada iteacion se me resetie y no carge los valores anteriores.
 const draw = (characters) => {
    ol$$.innerHTML = "";
    for (const character of characters) {
        const liCard$$ = document.createElement("li");
       ol$$.appendChild(liCard$$);
       liCard$$.className = "card";


       for(let tipo of character.tipo) {
        if (character.tipo[0] === "grass"){
            liCard$$.style.backgroundColor = "green";
        }
        if (character.tipo[0] === "fire"){
            liCard$$.style.backgroundColor = "rgb(245,99,25";
        }
        if (character.tipo[0] === "water"){
            liCard$$.style.backgroundColor = "#81b0e2";
        }
        if (character.tipo[0] === "bug"){
            liCard$$.style.backgroundColor = "rgb(125,179,16)";
        }
        if (character.tipo[0] === "poison"){
            liCard$$.style.backgroundColor = "rgba(0,252,172,0.75)";
        }
        if (character.tipo[0] === "electric"){
            liCard$$.style.backgroundColor = "yellow";
        }
        if (character.tipo[0] === "ground"){
            liCard$$.style.backgroundColor = "rgba(100,36,36,0.65)";
        }
        if (character.tipo[0] === "fairy"){
            liCard$$.style.backgroundColor = "rgb(243,194,194)";
        }
        if (character.tipo[0] === "fighting"){
            liCard$$.style.backgroundColor = "rgba(255,0,0,0.5)";
        }
        if (character.tipo[0] === "psychic"){
            liCard$$.style.backgroundColor = "rgb(254,59,254)";
        }
        if (character.tipo[0] === "rock"){
            liCard$$.style.backgroundColor = "rgb(99,99,99)";
        }
        if (character.tipo[0] === "ghost"){
            liCard$$.style.backgroundColor = "rgba(255,255,255,0.75)";
        }
        if (character.tipo[0] === "ice"){
            liCard$$.style.backgroundColor = "rgb(179,240,251)";
        }
        if (character.tipo[0] === "dragon"){
            liCard$$.style.backgroundColor = "rgb(255,183,0)";
        }
        if (character.tipo[0] === "normal"){
            liCard$$.style.backgroundColor = "black";
        }
       
       }

       const h2Id$$ = document.createElement("h2");
       h2Id$$.textContent = character.id;
       liCard$$.appendChild(h2Id$$);
       h2Id$$.className = "card-id";

       const img$$ = document.createElement("img");
       img$$.setAttribute("src", character.imagen);
       liCard$$.appendChild(img$$);
       img$$.className = "card-img";

       const h2Name$$ = document.createElement("h2");
       h2Name$$.textContent = character.nombre;
       liCard$$.appendChild(h2Name$$);
       h2Name$$.className = "card-name";

       const ulTipo$$ = document.createElement("ul");
       ulTipo$$.className = "ul_card-tipo";
       ulTipo$$.textContent = character.tipo[0];
       liCard$$.appendChild(ulTipo$$);


    }
};

const takeInput = (characters) =>{
    const input$$ = document.querySelector("input");
    input$$.addEventListener("input", () =>
    searchCharacter(characters, input$$.value)
    
    );
    console.log(input$$.value);
};

const searchCharacter = (arrayCharacters, filtro) => {
 let filteredCharacters = arrayCharacters.filter((character) => 
 character.nombre.toLowerCase().includes(filtro.toLowerCase())
 );
 draw(filteredCharacters);
}


// 2ª: Creo una variable para inicializar mi programa aqui enviare todas las funciones globales que cree para inicializarlas desde aca.

const init = async () => {
    //3ª: creo esta constante para hacer la peticion a la api.
   const pokemonsDate = await pokeSearch();
   //4ª: creo una constante y le asigno la funcion mapResults para enviarle mi arr.
  const mapedResults =mapResults(pokemonsDate);
 //5º Inicializo mi funcion de dibujar y le envio mi array mapeado(mapedResults)
  draw(mapedResults);
  takeInput(mapedResults);


};
init();

//Lo siento, os debo el buscador pero prometo modificarla y mejorarla encuanto pueda. gracias.