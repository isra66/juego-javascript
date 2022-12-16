
import { diccionario } from "https://cdn.jsdelivr.net/gh/fran-dawbaza/spanish-dictionary/diccionario.js";


// Elimina los diacríticos de un texto excepto si es una "ñ" (ES6)
//
function eliminarDiacriticosEs(texto) {
    return texto
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
}

const diccionarioSinTildes = diccionario.map(eliminarDiacriticosEs);

const diccionarioSet = new Set(diccionarioSinTildes);

diccionarioSet.has('palabra'); // Devolverá true si 'palabra' está en el diccionarioSet, eficiencia O(1)


let letra = '';
let listPalabras = [];
let puntos = 0;

//cronometro

function updateClock() {
    document.getElementById('countdown').innerHTML = tiempoTotal;

    if (tiempoTotal === 0) {
        document.getElementById('formulario').innerHTML = "<h1>HAS PERDIDO</h1> <btn type='button' class='btn btn-warning' onclick=location.reload() >Reiniciar</btn>";//para cuando acaba el tiempo te diga que has perdido
    } else {
        tiempoTotal = tiempoTotal - 1;
        setTimeout(updateClock, 1000);
    }


}

window.onload = updateClock;
let tiempoTotal = 15;


function letraAleatoria(num) {//le paso el parametro num que es las letras que quiero que me saque en este caso es siempre 1 

    const caracteres = 'abcdefghijklmnopqrstuvwxyz';

    const lenghtCaracter = caracteres.length;
    for (let i = 0; i < num; i++) {
        letra = caracteres.charAt(Math.floor(Math.random() * lenghtCaracter));//voy machacando para sacar una letra nueva cada vez que actualiza
    }

    return letra;
}

letraAleatoria(1);
//console.log(letra);

function calcularPuntuacion(palabra) {

    let puntuacion = 0;

    // puntuación según la primera letra
    switch (palabra.charCodeAt(0)) {
        case 107: // K
        case 164: // Ñ
        case 113: // Q
        case 119: // W
        case 120: // X
        case 121: // Y
            puntuacion += 5;
            break;
        default:
            puntuacion += 0;
            break;
    }

    // puntuación según la longitud de la palabra
    if (palabra.length == 5 || palabra.length == 15) {
        puntuacion += 3;
    } else if (palabra.length == 6 || palabra.length == 7 || palabra.length == 13 || palabra.length == 14) {
        puntuacion += 2;
    } else if (palabra.length == 4 || palabra.length == 16 || palabra.length == 17) {
        puntuacion += 4;

    } else if (palabra.length <= 12 || palabra.length > 7) {
        puntuacion += 1;
    } else if (palabra.length > 2 || palabra.length == 3 || palabra.length >= 18)
        puntuacion += 5;


    // Sumar puntos por cada letra K, Ñ, Q, W, X, Y
    for (let i = 0; i < palabra.length; i++) {
        switch (palabra.charCodeAt(i)) {
            case 107: // K
            case 164: // Ñ
            case 113: // Q
            case 119: // W
            case 120: // X
            case 121: // Y
                puntuacion += 1;
                break;
        }
    }
    let letraIncial = palabra[0];

    if (letraIncial == "a" || letraIncial == "a" || letraIncial == "a" || letraIncial == "a") {
        puntuacion += 1
    } else if (letraIncial == "m" || letraIncial == "p" || letraIncial == "r" || letraIncial == "s" || letraIncial == "t") {
        puntuacion += 2;

    } else if (letraIncial == "b" || letraIncial == "f" || letraIncial == "g" || letraIncial == "h" || letraIncial == "v" || letraIncial == "i") {
        puntuacion += 3
    } else if (letraIncial == "j" || letraIncial == "l" || letraIncial == "n" || letraIncial == "o" || letraIncial == "z") {
        puntuacion += 4
    } else if (letraIncial == "k" || letraIncial == "ñ" || letraIncial == "q" || letraIncial == "u" || letraIncial == "w" || letraIncial == "x" || letraIncial == "y") {
        puntuacion += 5
    }

    return puntuacion;
}




document.getElementById('letra').innerHTML = "<h3>escribe una letra que empieze por: " + letra + "</h3>";
let contadorAcertadas = 0;
let contadorFalladas = 0;

function comprobarPalabras(palabraBusqueda) {


    if (palabraBusqueda[0] === letra) //si la primera letra es igual a la letra aleatoria
    {


        if (diccionarioSet.has(palabraBusqueda)) {
            if (listPalabras.includes(palabraBusqueda) === false) {
                alert("ACERTASTE");
                contadorAcertadas++;//sumo las acertadas
                document.getElementById('acertadas').innerHTML = "<h3>acertadas: " + contadorAcertadas + "</h3>";
                let letra = letraAleatoria(1);//saco otra aleatoria
                document.getElementById('letra').innerHTML = "<h3>escribe una letra que empieze por: " + letra + "</h3>";


                //lista de palabras acertadas

                listPalabras.push(palabraBusqueda);
                document.getElementById('listasPalabras').innerHTML = "<h3>Lista de palabras acertadas: " + listPalabras + "</h3>";
                //puntuacion 

                puntos = puntos + calcularPuntuacion(palabraBusqueda);//puntos + porque si no me pisa los puntos cada vez que meto palabra
                document.getElementById('puntos').innerHTML = "<h3>Puntos: " + puntos + "</h3>";
                tiempoTotal = 15;

            } else alert("la palabra es repetida :)");



        } else alert("la palabra no es valida");


    } else {

        alert("has perdido");
        contadorFalladas++;
        document.getElementById('falladas').innerHTML = "<h3>falladas: " + contadorFalladas + "</h3>";

    }

}

document.getElementById("formulario").addEventListener("submit", (evento) =>//esto se ejcuta cada vez ue se envia la informacion
{
    evento.preventDefault();
    console.log(evento);
    let palabraBusqueda = document.getElementById("mensaje").value;//metemos la palabra en una variable
    palabraBusqueda = palabraBusqueda.toLowerCase();//convierto toda la palabra a minusculas 
    comprobarPalabras(palabraBusqueda);
    document.getElementById("mensaje").value = "";//borramos la palabra


});

