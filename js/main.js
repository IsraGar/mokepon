const sectionSeleccionarAtaque = document.querySelector('#seleccionar-ataque');
const sectionReiniciar = document.querySelector('#reiniciar');
const btnMascotaJugador = document.querySelector('#btn-mascota');
const btnReiniciar = document.querySelector('#btn-reiniciar');

const sectionSeleccionarMascota = document.querySelector('#seleccionar-mascota');
const mascotaJugador = document.querySelector('#mascota-jugador');

const mascotaEnemigo = document.querySelector('#mascota-enemigo');

const spanVidasJugador = document.querySelector('#vidas-jugador');
const spanVidasEnemigo = document.querySelector('#vidas-enemigo');

const sectionMensajes = document.querySelector('#resultado');
const ataquesJugador = document.querySelector('#ataques-del-jugador');
const ataquesEnemigo = document.querySelector('#ataques-del-enemigo');

const contenedorTarjetas = document.querySelector('#contenedor-tarjetas');

const contenedorAtaques = document.querySelector('#contenedor-ataques');

let mokepones = [];
let ataqueJugador = '';
let ataqueEnemigo = [];
let opcionDeMokepones;
let hipodoge;
let capipepo;
let ratigueya;
let mascotaJugadorN;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let btnFuego;
let btnAgua;
let btnTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let ataqueJugadorArr = [];
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
        hipodoge = document.querySelector('#Hipodoge');
        capipepo = document.querySelector('#Capipepo');
        ratigueya = document.querySelector('#Ratigueya');
    });

    sectionReiniciar.style.display = 'none';    
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador);  
        
    btnReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador(){    
    sectionSeleccionarMascota.style.display = 'none';    
    sectionSeleccionarAtaque.style.display = 'flex';    
    if(hipodoge.checked){
        mascotaJugador.innerHTML = hipodoge.id;
        mascotaJugadorN = hipodoge.id;
    }else if(capipepo.checked){
        mascotaJugador.innerHTML = capipepo.id;
        mascotaJugadorN = capipepo.id;
    }else if(ratigueya.checked){
        mascotaJugador.innerHTML = ratigueya.id;
        mascotaJugadorN = ratigueya.id;
    }else{
        console.log('Selecciona una mascota');
    }

    extraerAtaques(mascotaJugadorN);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugadorN){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugadorN == mokepones[i].nombre){
            ataques = mokepones[i].ataques;
        }        
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id="${ataque.id}" class="btn-ataque BAtaque">${ataque.nombre}</button>
        `;
        contenedorAtaques.innerHTML += ataquesMokepon;        
    });
    btnFuego = document.querySelector('#btn-fuego');
    btnAgua = document.querySelector('#btn-agua');
    btnTierra = document.querySelector('#btn-tierra');

    botones = document.querySelectorAll('.BAtaque');
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.innerText == '🔥'){
                ataqueJugadorArr.push('FUEGO');
                boton.style.background = '#112F58';
                boton.disabled = true; 
            }else if(e.target.innerText == '💧'){
                ataqueJugadorArr.push('AGUA');
                boton.style.background = '#112F58';
                boton.disabled = true; 
            }else{
                ataqueJugadorArr.push('TIERRA');
                boton.style.background = '#112F58';
                boton.disabled = true; 
            }
            ataqueAleatorioEnemigo();
        });
    });    
}

function seleccionarMascotaEnemigo(){    
    let ataqueAleatorio = aleatorio(0,mokepones.length-1);    
    mascotaEnemigo.innerHTML = mokepones[ataqueAleatorio].nombre;
    ataquesMokeponEnemigo = mokepones[ataqueAleatorio].ataques;
    secuenciaAtaque();
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1);
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO');
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA');
    }else{
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea(){
    if(ataqueJugadorArr.length == 5){
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugadorArr[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate(){
    for (let index = 0; index < ataqueJugadorArr.length; index++) {
        if(ataqueJugadorArr[index] == ataqueEnemigo[index]){
            indexAmbosOponentes(index, index);
            crearMensaje('EMPATE');
        }else if(ataqueJugadorArr[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA'){
            indexAmbosOponentes(index, index);
            crearMensaje('GANASTE');
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }else if(ataqueJugadorArr[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO'){
            indexAmbosOponentes(index, index);
            crearMensaje('GANASTE');
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }else if(ataqueJugadorArr[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA'){
            indexAmbosOponentes(index, index);
            crearMensaje('GANASTE');
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }else{
            indexAmbosOponentes(index, index);
            crearMensaje('PERDISTE');
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
    revisarVictorias();
}

function revisarVictorias(){
    if(victoriasJugador == victoriasEnemigo){
        crearMensajeFinal('ESTO FUE UN EMPATE');
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('FELICIDADES, GANASTE!');
    }else{
        crearMensajeFinal('LO SIENTO, PERDISTE!');
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    ataquesJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = `${resultadoFinal}`;   
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

window.addEventListener('load', iniciarJuego);