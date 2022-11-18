const sectionSeleccionarAtaque = document.querySelector('#seleccionar-ataque');
const sectionReiniciar = document.querySelector('#reiniciar');
const btnMascotaJugador = document.querySelector('#btn-mascota');
const btnFuego = document.querySelector('#btn-fuego');
const btnAgua = document.querySelector('#btn-agua');
const btnTierra = document.querySelector('#btn-tierra');
const btnReiniciar = document.querySelector('#btn-reiniciar');

const sectionSeleccionarMascota = document.querySelector('#seleccionar-mascota');
const hipodoge = document.querySelector('#hipodoge');
const capipepo = document.querySelector('#capipepo');
const ratigueya = document.querySelector('#ratigueya');
const mascotaJugador = document.querySelector('#mascota-jugador');

const mascotaEnemigo = document.querySelector('#mascota-enemigo');

const spanVidasJugador = document.querySelector('#vidas-jugador');
const spanVidasEnemigo = document.querySelector('#vidas-enemigo');

const sectionMensajes = document.querySelector('#resultado');
const ataquesJugador = document.querySelector('#ataques-del-jugador');
const ataquesEnemigo = document.querySelector('#ataques-del-enemigo');

const contenedorTarjetas = document.querySelector('#contenedor-tarjetas');

let mokepones = [];
let ataqueJugador = '';
let ataqueEnemigo = '';
let opcionDeMokepones;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }    
}

let hipodogeM = new Mokepon('Hipodoge', './assets/hipodoge_attack.png',5);
let capipepoM = new Mokepon('Capipepo', './assets/capipepo_attack.png',5);
let ratigueyaM = new Mokepon('Ratigueya', './assets/ratigueya_attack.png',5);

hipodogeM.ataques.push(
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🔥', id: 'btn-fuego'}
);

capipepoM.ataques.push(
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'}
);

ratigueyaM.ataques.push(
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🌱', id: 'btn-tierra'}
);

mokepones.push(hipodogeM,capipepoM,ratigueyaM);

function iniciarJuego(){    
    sectionSeleccionarAtaque.style.display = 'none';
    
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}" />
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
          <p>${mokepon.nombre}</p>
          <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `;
        contenedorTarjetas.innerHTML += opcionDeMokepones;
    });

    sectionReiniciar.style.display = 'none';    
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador);    
    btnFuego.addEventListener('click', ataqueFuego);    
    btnAgua.addEventListener('click', ataqueAgua);    
    btnTierra.addEventListener('click', ataqueTierra);    
    btnReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador(){    
    sectionSeleccionarMascota.style.display = 'none';    
    sectionSeleccionarAtaque.style.display = 'flex';    
    if(hipodoge.checked){
        mascotaJugador.innerHTML = 'Hipodoge';
    }else if(capipepo.checked){
        mascotaJugador.innerHTML = 'Capipepo';
    }else if(ratigueya.checked){
        mascotaJugador.innerHTML = 'Ratigueya';
    }else{
        console.log('Selecciona una mascota');
    }
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo(){    
    let ataqueAleatorio = aleatorio(1,3);
    
    if(ataqueAleatorio == 1){
        mascotaEnemigo.innerHTML = 'Hipodoge';
    }else if(ataqueAleatorio == 2){
        mascotaEnemigo.innerHTML = 'Capipepo';
    }else {
        mascotaEnemigo.innerHTML = 'Ratigueya';
    }
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}

function ataqueAgua(){
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3);
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO';
    }else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA';
    }else{
        ataqueEnemigo = 'TIERRA';
    }
    combate();
}

function combate(){    
    if(ataqueJugador == ataqueEnemigo){
        crearMensaje('EMPATE');
    }else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA'){
        crearMensaje('GANASTE');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = 'Vidas ' + vidasEnemigo;
    }else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO'){
        crearMensaje('GANASTE');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = 'Vidas ' + vidasEnemigo;
    }else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
        crearMensaje('GANASTE');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = 'Vidas ' + vidasEnemigo;
    }else{
        crearMensaje('PERDISTE');
        vidasJugador--;
        spanVidasJugador.innerHTML = 'Vidas ' + vidasJugador;
    }
    revisarVidas();
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal('FELICITACIONES!! GANASTE.');
    }else if(vidasJugador == 0){
        crearMensajeFinal('LO SIENTO, PERDISTE');
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    ataquesJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = `${resultadoFinal}`;    
    btnFuego.disabled = true;    
    btnAgua.disabled = true;    
    btnTierra.disabled = true;    
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

window.addEventListener('load', iniciarJuego);