let intentos = 6;
let palabra = '';
apiUrl = 'https://random-word-api.herokuapp.com/word?length=5'

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    palabra = data[0].toUpperCase();
  })
  .catch(error => {
    console.error('Error:', error);
  });

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

const input = document.getElementById("guess-input");
const valor = input.value;

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    if (intento.length != 5) {
        error("<h1>Debes ingresar exactamente 5 letras</h1>")
        return
    }
    if (intento.includes(' ')) {
        error("<h1>El intento no puede contener espacios!</h1>")
        return
    }
    error('')
    intento = intento.toUpperCase();
    return intento;
}


function intentar() {
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    const INTENTO = leerIntento();
    if (intentos==0){
        terminar("<h1>PERDISTE!😖, la palabra era " + palabra + "</h1>")
    }
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) { //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    }
    intentos--
    GRID.appendChild(ROW)
    if (INTENTO === palabra ) {
        terminar("<h1>GANASTE!😀</h1>")
        return
    }
}
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function error(mensaje) {
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}