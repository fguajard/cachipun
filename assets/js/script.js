//crea jugadas random
const createRandomPlay = () => {
  let random = Math.floor(Math.random() * 3);
  const options = ["piedra", "papel", "tijera"];
  play = options[random];
  return play;
};

const player1 = {
  namePlayer1: "",
  playPlayer1: "",
  winGames: 0,
};

const player2 = {
  namePlayer2: "Computador",
  playPlayer2: "",
  winGames: 0,
};

const validationNumber = (option) => {
  if (!option) {
    return false;
  } else {
    return true;
  }
};

//Funcion para definir el ganador
const defineWinner = (
  { namePlayer1, playPlayer1 },
  { namePlayer2, playPlayer2 }
) => {
  const comprobationVictory =
    (playPlayer1 == "papel" && playPlayer2 == "piedra") ||
    (playPlayer1 == "piedra" && playPlayer2 == "tijera") ||
    (playPlayer1 == "tijera" && playPlayer2 == "papel");
  if (playPlayer1 == playPlayer2) return "Empate";
  if (comprobationVictory) {
    player1.winGames += 1;
    return ` Gano ${namePlayer1}`;
  } else {
    player2.winGames += 1;
    return ` Gano ${namePlayer2}`;
  }
};

//datos
const datosArea = document.getElementById("datos-area");
const gamesInput = document.getElementById("games");
const textArea = document.getElementsByClassName("text-area")[0];
const nameInput = document.getElementById("name");
const formulario = document.getElementsByTagName("form")[0];
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
});
let radioOptions = document.getElementsByClassName("form-check-input");
let button = document.getElementById("btn-cool");
let resultado = document.getElementById("resultado");
const selection = document.getElementsByClassName("selection")[0];
let button2 = document.getElementById("btn-2");
//asignacion multiple de todos los hijos del div "resultado" con destructuring
const {children:[anuncioGanador,{children:[{children:[tituloPlayer1,divImagePlayer1]},{children:[p]},{children:[tituloPlayer2,divImagePlayer2]}]}]} = resultado

//muestra "por pantalla" el ganador de cada ronda
function showWinner() {
  player2.playPlayer2 = createRandomPlay();
  const ganador = defineWinner(player1, player2);
  anuncioGanador.innerHTML = `${ganador}`;
  tituloPlayer1.innerHTML = `${player1.namePlayer1}`;
  tituloPlayer2.innerHTML = `${player2.namePlayer2}`;
  p.innerHTML = `VS`;
  divImagePlayer1.style.background = `url(assets/img/${player1.playPlayer1}.jpg)`;
  divImagePlayer2.style.background = `url(assets/img/${player2.playPlayer2}.jpg)`;
}

//imprime los resultados finales creando cada elemento a medida que se necesita
const showFinalResult = () => {
  datosArea.innerHTML = "";
  datosArea.innerHTML += `<h3 class="text-center p-2">Resultados Finales</h3>`;
  datosArea.innerHTML += `<h4 class="text-center p-2">Partidas ganadas por ${player1.namePlayer1} : ${player1.winGames} </h4>`;
  datosArea.innerHTML += `<h4 class="text-center p-2">Partidas ganadas por ${player2.namePlayer2} : ${player2.winGames}  </h4>`;
  if (player2.winGames > player1.winGames)
    datosArea.innerHTML += `<h2 class="text-center p-2">El ganador es ${player2.namePlayer2}</h2>`;
  else if (player2.winGames < player1.winGames)
    datosArea.innerHTML += `<h2 class="text-center p-2">El ganador es ${player1.namePlayer1}</h2>`;
  else datosArea.innerHTML += `<h2 class="text-center p-2">Empate</h2>`;
  datosArea.innerHTML += `<button id="button3" class="btn btn-secondary p-2 d-block m-auto">Play Again!</button>`;
  const button3 = document.getElementById("button3");
  button3.addEventListener("click", () => {
    //recargar la pagina para eliminar posibles datos vestiagiales
    location.reload();
  });
};

//botton para iniciar el juego
button.addEventListener("click", (e) => {  
  let contadorJuegos = 0;  
  if (!validationNumber(+gamesInput.value)) {
    alert("N° de Juegos es invalido, intente nuevamente");
    return false;
  }
  player1.namePlayer1 = nameInput.value;
  //desaparece el div de entrada de datos y lo reemplaza por el div de seleccion de jugada
  textArea.classList.add("d-none");
  selection.classList.add("d-block");

  button2.addEventListener("click", () => {
    contadorJuegos += 1;
    for (let { checked, value } of radioOptions) {
      if (checked) player1.playPlayer1 = value;
    }
    showWinner();
    if (contadorJuegos == +gamesInput.value) {
         
      selection.classList.remove("d-block");
      textArea.classList.remove("d-none");
      showFinalResult();
    }
  });
});

//El codigo se podria mejorar creando cada elemento a mostrar, a medida que son necesarios, en vez de tener una plantilla estatica
//y hacer que aparescan y desaparescan componentes del DOM, eso evitaria tener que recargar la pagina, pero ya lo empece asi y tengo que hacer mas desafios xd
