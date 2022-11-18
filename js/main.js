let sectionSeleccionarAtaque = document.querySelector('#seleccionar-ataque');
let sectionReiniciar = document.querySelector('#reiniciar');
let btnMascotaJugador = document.querySelector('#btn-mascota');
let btnFuego = document.querySelector('#btn-fuego');
let btnAgua = document.querySelector('#btn-agua');
let btnTierra = document.querySelector('#btn-tierra');
let btnReiniciar = document.querySelector('#btn-reiniciar');

let sectionSeleccionarMascota = document.querySelector('#seleccionar-mascota');
let hipodoge = document.querySelector('#hipodoge');
let capipepo = document.querySelector('#capipepo');
let ratigueya = document.querySelector('#ratigueya');
let mascotaJugador = document.querySelector('#mascota-jugador');

let mascotaEnemigo = document.querySelector('#mascota-enemigo');

let spanVidasJugador = document.querySelector('#vidas-jugador');
let spanVidasEnemigo = document.querySelector('#vidas-enemigo');

let sectionMensajes = document.querySelector('#resultado');
let ataquesJugador = document.querySelector('#ataques-del-jugador');
let ataquesEnemigo = document.querySelector('#ataques-del-enemigo');

let ataqueJugador = '';
let ataqueEnemigo = '';
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego(){    
    sectionSeleccionarAtaque.style.display = 'none';    
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