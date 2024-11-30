let debug = false;

window.onload = function() {
    const depurandoDiv = document.getElementById('depurando');
    depurandoDiv.style.display = debug ? 'flex' : 'none';
    updateColor("inicio");
};

const palos = ['Oros', 'Copas', 'Espadas', 'Bastos'];

const cartas = ['As', '2', '3', '4', '5', '6', '7', 'Sota', 'Caballo', 'Rey'];

const table = document.getElementById('deckTable');

for (let i = 0; i < palos.length; i++) {
    const row = document.createElement('tr');

    

    row.classList.add('suit-row');
    row.setAttribute('data-suit', palos[i]);

    const paloCell = document.createElement('td');
    paloCell.innerHTML = `<img src="imagenes/${palos[i]}.png" alt="${palos[i]}">`;
    paloCell.classList.add('palo-image');
    row.appendChild(paloCell);

        for (let j = 0; j < cartas.length; j++) {
            const cardCell = document.createElement('td');
            const button = document.createElement('button');
            const textSpan = document.createElement('span');
            textSpan.classList.add('text');
            let cardText = cartas[j];
            if (cardText === 'As' && palos[i] === 'Oros') {
                cardText = 'Trebol';
            } else if (cardText === 'As' && palos[i] === 'Copas') {
                cardText = 'Diamante';
            } else if (cardText === 'As' && palos[i] === 'Bastos') {
                cardText = 'Corazones';
            } else if (cardText === 'As' && palos[i] === 'Espadas') {
                cardText = 'Espadilla';
            }
            textSpan.innerHTML = cardText.toUpperCase() + '<span style="display: none;">de ' + palos[i] + '</span>';
            button.appendChild(textSpan);

        
            button.value = getValue(cartas[j]);
            cardCell.setAttribute('data-label', palos[i]);

            const paloDiv = document.createElement('div');
            paloDiv.classList.add('palo-img-fondo');
            paloDiv.style.backgroundImage = `url('imagenes/${palos[i]}.png')`;
            button.appendChild(paloDiv);

            cardCell.appendChild(button);
            row.appendChild(cardCell);
        }

        table.appendChild(row);
    }

const sumElement = document.getElementById('sum');
const countElement = document.getElementById('count');
const numOrosElement = document.getElementById('numOros');
const numCopasElement = document.getElementById('numCopas');
const numEspadasElement = document.getElementById('numEspadas');
const numBastosElement = document.getElementById('numBastos');
const minOrosElement = document.getElementById('minOros');
const minCopasElement = document.getElementById('minCopas');
const minEspadasElement = document.getElementById('minEspadas');
const minBastosElement = document.getElementById('minBastos');
const probabilityElement = document.getElementById('probability');
const probabilityLoseElement = document.getElementById('probabilityLose');
const probabilityTotalElement = document.getElementById('probabilityTotal');
const debugElement = document.getElementById('debug');
const debug2Element = document.getElementById('debug2');
const orosSuperioresElement = document.getElementById('orosSuperiores');
const copasSuperioresElement = document.getElementById('copasSuperiores');
const espadasSuperioresElement = document.getElementById('espadasSuperiores');
const bastosSuperioresElement = document.getElementById('bastosSuperiores');
const orosInferioresElement = document.getElementById('orosInferiores');
const copasInferioresElement = document.getElementById('copasInferiores');
const espadasInferioresElement = document.getElementById('espadasInferiores');
const bastosInferioresElement = document.getElementById('bastosInferiores');
const funcionElement = document.getElementById('funcion');


let sum = 0;
let count = 0;
let countOros = 0;
let countCopas = 0;
let countEspadas = 0;
let countBastos = 0;

let numOros = 0
let numCopas = 0
let numEspadas = 0
let numBastos = 0

let minOros = 10
let minCopas = 10
let minEspadas = 10
let minBastos = 10

const valoresMano = {
    Oros: [],
    Copas: [],
    Espadas: [],
    Bastos: []
};

const valoresJuego = {
    Oros: [],
    Copas: [],
    Espadas: [],
    Bastos: []
};

function getValue(cardValue) {
    switch (cardValue) {
        case 'As':
            return 0;
        case '3':
            return 1;
        case 'Rey':
            return 2;
        case 'Caballo':
            return 3;
        case 'Sota':
            return 4;
        case '7':
            return 5;
        case '6':
            return 6;
        case '5':
            return 7;
        case '4':
            return 8;
        case '2':
            return 9;
        default:
            return -1;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {

        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            sum -= parseInt(button.value);
            count--;
            if (count <= 2) {
                if (button.textContent.includes('Oros') && countOros > 0) {
                    countOros--;
                    const index = valoresMano.Oros.indexOf(button.value);
                    if (index > -1) {
                        valoresMano.Oros.splice(index, 1);
                    }
                } else if (button.textContent.includes('Copas') && countCopas > 0) {
                    countCopas--;
                    const index = valoresMano.Copas.indexOf(button.value);
                    if (index > -1) {
                        valoresMano.Copas.splice(index, 1);
                    }
                } else if (button.textContent.includes('Espadas') && countEspadas > 0) {
                    countEspadas--;
                    const index = valoresMano.Espadas.indexOf(button.value);
                    if (index > -1) {
                        valoresMano.Espadas.splice(index, 1);
                    }
                } else if (button.textContent.includes('Bastos') && countBastos > 0) {
                    countBastos--;
                    const index = valoresMano.Bastos.indexOf(button.value);
                    if (index > -1) {
                        valoresMano.Bastos.splice(index, 1);
                    }
                }
            } else {
                if(button.textContent.includes('Oros')) {
                    const index = valoresJuego.Oros.indexOf(button.value);
                    if (index > -1) {
                        valoresJuego.Oros.splice(index, 1);
                    }
                } else if (button.textContent.includes('Copas')) {
                    const index = valoresJuego.Copas.indexOf(button.value);
                    if (index > -1) {
                        valoresJuego.Copas.splice(index, 1);
                    }
                } else if (button.textContent.includes('Espadas')) {
                    const index = valoresJuego.Espadas.indexOf(button.value);
                    if (index > -1) {
                        valoresJuego.Espadas.splice(index, 1);
                    }
                } else if (button.textContent.includes('Bastos')) {
                    const index = valoresJuego.Bastos.indexOf(button.value);
                    if (index > -1) {
                        valoresJuego.Bastos.splice(index, 1);
                    }
                }
            }
        } else {
            button.classList.add('selected');
            sum += parseInt(button.value);
            count++;
            if (count <= 3) {
                if (button.textContent.includes('Oros')) {
                    countOros++;
                    valoresMano.Oros.push(button.value);
                } else if (button.textContent.includes('Copas')) {
                    countCopas++;
                    valoresMano.Copas.push(button.value);
                } else if (button.textContent.includes('Espadas')) {
                    countEspadas++;
                    valoresMano.Espadas.push(button.value);
                } else if (button.textContent.includes('Bastos')) {
                    countBastos++;
                    valoresMano.Bastos.push(button.value);
                }
            } else {
                if(button.textContent.includes('Oros')) {
                    valoresJuego.Oros.push(button.value);
                } else if (button.textContent.includes('Copas')) {
                    valoresJuego.Copas.push(button.value);
                } else if (button.textContent.includes('Espadas')) {
                    valoresJuego.Espadas.push(button.value);
                } else if (button.textContent.includes('Bastos')) {
                    valoresJuego.Bastos.push(button.value);
                }
            }
        }

        sumElement.textContent = 'Suma: ' + sum;
        countElement.textContent = 'Cartas pulsadas: ' + count;
        numOrosElement.textContent = 'Oros: ' + countOros;
        numCopasElement.textContent = 'Copas: ' + countCopas;
        numEspadasElement.textContent = 'Espadas: ' + countEspadas;
        numBastosElement.textContent = 'Bastos: ' + countBastos;

        if (count > 3) {
            button.classList.add('red');
        } else {
            button.classList.remove('red');
        }

        if (count <= 3) {
            minOros = 10;
            minCopas = 10;
            minEspadas = 10;
            minBastos = 10;
            buttons.forEach(btn => {
                if (btn.classList.contains('selected')) {
                    const btnValue = parseInt(btn.value);
                    if (btn.textContent.includes('Oros') && btnValue < minOros) {
                        minOros = btnValue;
                    } else if (btn.textContent.includes('Copas') && btnValue < minCopas) {
                        minCopas = btnValue;
                    } else if (btn.textContent.includes('Espadas') && btnValue < minEspadas) {
                        minEspadas = btnValue;
                    } else if (btn.textContent.includes('Bastos') && btnValue < minBastos) {
                        minBastos = btnValue;
                    }
                }
            });
        }

        minOrosElement.textContent = 'Min Oros: ' + minOros;
        minCopasElement.textContent = 'Min Copas: ' + minCopas;
        minEspadasElement.textContent = 'Min Espadas: ' + minEspadas;
        minBastosElement.textContent = 'Min Bastos: ' + minBastos;

        const minOrosMano = valoresMano.Oros ? Math.min.apply(null, valoresMano.Oros) : 10;
        const minCopasMano = valoresMano.Copas ? Math.min.apply(null, valoresMano.Copas) : 10;
        const minEspadasMano = valoresMano.Espadas ? Math.min.apply(null, valoresMano.Espadas) : 10;
        const minBastosMano = valoresMano.Bastos ? Math.min.apply(null, valoresMano.Bastos) : 10;

        const numInfOros = valoresJuego.Oros.filter(value => value < minOrosMano).length;
        const numInfCopas = valoresJuego.Copas.filter(value => value < minCopasMano).length;
        const numInfEspadas = valoresJuego.Espadas.filter(value => value < minEspadasMano).length;
        const numInfBastos = valoresJuego.Bastos.filter(value => value < minBastosMano).length;

        const resultadoElement = document.getElementById('resultado');

        orosInferioresElement.textContent = 'Oros inferiores: ' + numInfOros;
        copasInferioresElement.textContent = 'Copas inferiores: ' + numInfCopas;
        espadasInferioresElement.textContent = 'Espadas inferiores: ' + numInfEspadas;
        bastosInferioresElement.textContent = 'Bastos inferiores: ' + numInfBastos;


        const numSupOros = valoresJuego.Oros.filter(value => value > minOrosMano).length;
        const numSupCopas = valoresJuego.Copas.filter(value => value > minCopasMano).length;
        const numSupEspadas = valoresJuego.Espadas.filter(value => value > minEspadasMano).length;
        const numSupBastos = valoresJuego.Bastos.filter(value => value > minBastosMano).length;

        orosSuperioresElement.textContent = 'Oros superiores: ' + numSupOros;
        copasSuperioresElement.textContent = 'Copas superiores: ' + numSupCopas;
        espadasSuperioresElement.textContent = 'Espadas superiores: ' + numSupEspadas;
        bastosSuperioresElement.textContent = 'Bastos superiores: ' + numSupBastos;


        
        cartasSuperiores = numSupOros + numSupCopas + numSupEspadas + numSupBastos;
        cartasInferiores = numInfOros + numInfCopas + numInfEspadas + numInfBastos;

        const probabilityLose = ((minOros + minCopas + minEspadas + minBastos-cartasInferiores) / (40-count))*100;

        funcionElement.textContent = 'Función: ' + '(' + minOros + '+' + minCopas + '+' + minEspadas + '+' + minBastos + "-" + cartasInferiores + ')' + '/' + '(' + '40' + '-' + count + ')' + '*' + '100';

        probabilityLoseElement.textContent = 'Probabilidad de perder: ' + probabilityLose.toFixed(2) + '%';
        const probability = 100 - probabilityLose;
        probabilityElement.textContent = 'Probabilidad de ganar: ' + probability.toFixed(2) + '%';


        resultadoElement.textContent = probability.toFixed(2) + '%';
        updateColor(probability);


        const probabilityTotal = probability + probabilityLose;
        probabilityTotalElement.textContent = 'Probabilidad total: ' + probabilityTotal.toFixed(2) + '%'; 

        debugElement.textContent = 'Oros: ' + valoresMano.Oros + ' Copas: ' + valoresMano.Copas + ' Espadas: ' + valoresMano.Espadas + ' Bastos: ' + valoresMano.Bastos;
        
        debug2Element.textContent = 'Oros: ' + valoresJuego.Oros + ' Copas: ' + valoresJuego.Copas + ' Espadas: ' + valoresJuego.Espadas + ' Bastos: ' + valoresJuego.Bastos;
    });
});

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function() {
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    sum = 0;
    count = 0;
    countOros = 0;
    countCopas = 0;
    countEspadas = 0;
    countBastos = 0;
    minOros = 10;
    minCopas = 10;
    minEspadas = 10;
    minBastos = 10;

    cartasInferiores = 0;
    cartasSuperiores = 0;

    valoresMano.Oros = [];
    valoresMano.Copas = [];
    valoresMano.Espadas = [];
    valoresMano.Bastos = [];

    valoresJuego.Oros = [];
    valoresJuego.Copas = [];
    valoresJuego.Espadas = [];
    valoresJuego.Bastos = [];

    sumElement.textContent = 'Suma: ' + sum;
    countElement.textContent = 'Cartas pulsadas: ' + count;
    numOrosElement.textContent = 'Oros: ' + countOros;
    numCopasElement.textContent = 'Copas: ' + countCopas;
    numEspadasElement.textContent = 'Espadas: ' + countEspadas;
    numBastosElement.textContent = 'Bastos: ' + countBastos;
    minOrosElement.textContent = 'Min Oros: ' + minOros;
    minCopasElement.textContent = 'Min Copas: ' + minCopas;
    minEspadasElement.textContent = 'Min Espadas: ' + minEspadas;
    minBastosElement.textContent = 'Min Bastos: ' + minBastos;
    probabilityElement.textContent = 'Probabilidad de ganar: ';
    probabilityLoseElement.textContent = 'Probabilidad de perder: ';
    probabilityTotalElement.textContent = 'Probabilidad total: ';
    debugElement.textContent = 'Oros: ' + valoresMano.Oros + ' Copas: ' + valoresMano.Copas + ' Espadas: ' + valoresMano.Espadas + ' Bastos: ' + valoresMano.Bastos;
    debug2Element.textContent = 'Oros: ' + valoresJuego.Oros + ' Copas: ' + valoresJuego.Copas + ' Espadas: ' + valoresJuego.Espadas + ' Bastos: ' + valoresJuego.Bastos;
    orosSuperioresElement.textContent = 'Oros superiores: ';
    copasSuperioresElement.textContent = 'Copas superiores: ';
    espadasSuperioresElement.textContent = 'Espadas superiores: ';
    bastosSuperioresElement.textContent = 'Bastos superiores: ';
    orosInferioresElement.textContent = 'Oros inferiores: ';
    copasInferioresElement.textContent = 'Copas inferiores: ';
    espadasInferioresElement.textContent = 'Espadas inferiores: ';
    bastosInferioresElement.textContent = 'Bastos inferiores: ';
    funcionElement.textContent = 'Función: ';
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = 'Selecciona tus cartas'
    updateColor("reset");

    
});

function updateColor(probability) {
    if (typeof probability !== 'number') {
        const resultadoElement = document.getElementById('resultado');
        resultadoElement.style.backgroundColor = 'white';
        return;
    }

    let hue = (120 * probability) / 100;

    let color = `hsla(${hue}, 100%, 50%, 0.7)`;

    const resultadoElement = document.getElementById('resultado');
    resultadoElement.style.backgroundColor = color;


}