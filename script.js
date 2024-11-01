const board = document.querySelector("[data-board]");
const cellElements = document.querySelectorAll("[data-cell]");
const mensagemganhartextoelement = document.querySelector('[data-mensagem-ganhar-texto]');
const mensagemganhar = document.querySelector('[data-mensagem-ganhar]');
const botaorestart = document.querySelector('[data-botao-restart]');
const contadorcirculo = document.querySelector('[data-contador-circulo]'); 
const contadorx =document.querySelector('[data-contador-x]');
const numeroxdata = document.querySelector('[data-numero-contador-x]');
const numerocirculodata = document.querySelector('[data-numero-contador-circulo]')
const botaozerar = document.querySelector('[data-botao-zerar]');

let VezCirculo;

//adquirir valor do placar do x//
var numerox = parseInt(numeroxdata.innerText);

var numerocirculo = parseInt(numerocirculodata.innerText);

const combinacoesvitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startgame = () => {
    VezCirculo = false;
    
    for (const cell of cellElements) {
        cell.classList.remove("circulo");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }
    qualhover();
    board.classList.add('x');
    mensagemganhar.classList.remove('show-mensagem-ganhar');
}

const endgame =(empate) =>{
    if (empate){
        mensagemganhartextoelement.innerText = 'Empate!';
    } else {
        if(VezCirculo){
            console.log('pontuação circulo é:')
            numerocirculo++;
            console.log(numerocirculo)
            numerocirculodata.innerText = numerocirculo;
        } else {
            console.log('pontuação x é:')
            numerox++;
            console.log(numerox);
            numeroxdata.innerText = numerox;
        }
        mensagemganhartextoelement.innerText = VezCirculo 
        ? 'Ponto do Azul!' 
        : 'Ponto do Vermelho!';
    }
    mensagemganhar.classList.add('show-mensagem-ganhar')
    return
}

const verificarvitoria = (currentplayer) =>{
    return combinacoesvitoria.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentplayer)
        })
    })
}

const verificarempate = () => {
    return [...cellElements].every(cell =>{
       return cell.classList.contains('x') || cell.classList.contains('circulo');
    })
}

const placeMark = (cell,classToAdd) => {
    cell.classList.add(classToAdd);
}

const qualhover = () => {
    board.classList.remove("x");
    board.classList.remove("circulo");

    if (VezCirculo) {
        board.classList.add("circulo");
    }
    else {
        board.classList.add("x");
    }
}

const Swapturns = () => {
    VezCirculo = !VezCirculo;
    qualhover();
}

const handleClick = (e) => {
    
    //colocar circulo ou x

    const cell = e.target;
    const classToAdd = VezCirculo ? 'circulo' : 'x';
    placeMark(cell,classToAdd);

    //verificar vitória
    const vitoria = verificarvitoria(classToAdd);
   
    //verificar empate
    const empate = verificarempate();

    if (vitoria){
        endgame(false);
    } else if (empate){
        endgame(true);
    } else {
        Swapturns();
    }
    //mudar simbolo do ghost
}

const zerarpontos = () => {
    numerocirculo = 0;
    numerox = 0;
    numeroxdata.innerText = numerox;
    numerocirculodata.innerText = numerocirculo;
}

startgame();
botaorestart.addEventListener('click', startgame);
botaozerar.addEventListener('click', zerarpontos);