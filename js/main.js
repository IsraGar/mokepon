let ataqueJugador = '';
let ataqueEnemigo = '';
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego(){
    let sectionSeleccionarAtaque = document.querySelector('#seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';

    let sectionReiniciar = document.querySelector('#reiniciar');
    sectionReiniciar.style.display = 'none';

    let btnMascotaJugador = document.querySelector('#btn-mascota');
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    let btnFuego = document.querySelector('#btn-fuego');
    btnFuego.addEventListener('click', ataqueFuego);
    let btnAgua = document.querySelector('#btn-agua');
    btnAgua.addEventListener('click', ataqueAgua);
    let btnTierra = document.querySelector('#btn-tierra');
    btnTierra.addEventListener('click', ataqueTierra);
    let btnReiniciar = document.querySelector('#btn-reiniciar');
    btnReiniciar.addEventListener('click', reiniciarJuego);
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
    let spanVidasJugador = document.querySelector('#vidas-jugador');
    let spanVidasEnemigo = document.querySelector('#vidas-enemigo');
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

function crearMensajeFinal(resultadoFinal){
    let sectionMensajes = document.querySelector('#resultado');
    // let parrafo = document.createElement('p');
    sectionMensajes.innerHTML = `${resultadoFinal}`;
    // sectionMensajes.append(parrafo);

    let btnFuego = document.querySelector('#btn-fuego');
    btnFuego.disabled = true;
    let btnAgua = document.querySelector('#btn-agua');
    btnAgua.disabled = true;
    let btnTierra = document.querySelector('#btn-tierra');
    btnTierra.disabled = true;
    let sectionReiniciar = document.querySelector('#reiniciar');
    sectionReiniciar.style.display = 'block';
}

function crearMensaje(resultado){
    let sectionMensajes = document.querySelector('#resultado');
    let ataquesJugador = document.querySelector('#ataques-del-jugador');
    let ataquesEnemigo = document.querySelector('#ataques-del-enemigo');

    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo
    // let parrafo = document.createElement('p');
    // parrafo.innerHTML = `Tu mascota ataco con ${ataqueJugador} y la mascota del enemigo ataco con ${ataqueEnemigo} - ${resultado}`;

    ataquesJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function seleccionarMascotaJugador(){
    let sectionSeleccionarMascota = document.querySelector('#seleccionar-mascota');
    sectionSeleccionarMascota.style.display = 'none';

    let sectionSeleccionarAtaque = document.querySelector('#seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'flex';

    let hipodoge = document.querySelector('#hipodoge');
    let capipepo = document.querySelector('#capipepo');
    let ratigueya = document.querySelector('#ratigueya');
    let mascotaJugador = document.querySelector('#mascota-jugador');
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
    let mascotaEnemigo = document.querySelector('#mascota-enemigo');
    let ataqueAleatorio = aleatorio(1,3);
    
    if(ataqueAleatorio == 1){
        mascotaEnemigo.innerHTML = 'Hipodoge';
    }else if(ataqueAleatorio == 2){
        mascotaEnemigo.innerHTML = 'Capipepo';
    }else {
        mascotaEnemigo.innerHTML = 'Ratigueya';
    }
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

window.addEventListener('load', iniciarJuego);