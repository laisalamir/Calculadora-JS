onload = () => {
    document.querySelector('#num1').onclick = () => digito(1);
    document.querySelector('#num2').onclick = () => digito(2);
    document.querySelector('#num3').onclick = () => digito(3);
    document.querySelector('#num4').onclick = () => digito(4);
    document.querySelector('#num5').onclick = () => digito(5);
    document.querySelector('#num6').onclick = () => digito(6);
    document.querySelector('#num7').onclick = () => digito(7);
    document.querySelector('#num8').onclick = () => digito(8);
    document.querySelector('#num9').onclick = () => digito(9);
    document.querySelector('#num0').onclick = () => digito(0);
    document.querySelector('#comma').onclick = virgula;
    document.querySelector('#ac').onclick = limpa;
    document.querySelector('#numdiv').onclick = () => operador('/');
    document.querySelector('#nummult').onclick = () => operador('*');
    document.querySelector('#nummais').onclick = () => operador('+');
    document.querySelector('#nummenos').onclick = () => operador('-');
    document.querySelector('#equals').onclick = calcula;
};

let sValor = '0';
let ehNovoNumero = true;
let valorAnterior = 0;
let operacaoPendente = null;

// atualização do visor
const atualizaVisor = () => {
    let [parteInteira, parteDecimal] = sValor.split(',');
    if (parteInteira.length > 10) {
        document.querySelector('#mostrar').innerText = 'ERRO!';
        return;
    }
    let v = '';
    c = 0;
    for (let i = parteInteira.length - 1; i >= 0; i--) {
        if (++c > 3) {
            v = '.' + v;
            c = 1;
        }
        v = parteInteira[i] + v;
    }
    v = v + (parteDecimal ? ',' + parteDecimal.substr(0, 10 - v.length) : '');
    document.querySelector('#mostrar').innerText = v;
};


const digito = (n) => {
    if (ehNovoNumero) {
        sValor = '' + n;
        ehNovoNumero = false;
    } else sValor += n;
    atualizaVisor();
};

// virgula
const virgula = () => {
    if (ehNovoNumero) {
        sValor = '0,';
        ehNovoNumero = false;
    } else if (sValor.indexOf(',') == -1)
        sValor += ',';
    atualizaVisor();
};

//botao Ac

const limpa = () => {
    ehNovoNumero = true;
    valorAnterior = 0;
    sValor = '0';
    operacaoPendente = null;
    atualizaVisor();
};



const valorAtual = () => parseFloat(sValor.replace(',', '.'));

// operadores
const operador = (op) => {
    calcula();
    valorAnterior = valorAtual();
    operacaoPendente = op;
    ehNovoNumero = true;
};

// calcular a operaçao

const calcula = () => {
    if (operacaoPendente != null) {
        let resultado;
        switch (operacaoPendente) {
            case '+':

                resultado = valorAnterior + valorAtual();
                break;
            case '-':
                resultado = valorAnterior - valorAtual();
                break;
            case '*':
                resultado = valorAnterior * valorAtual();
                break;
            case '/':
                resultado = valorAnterior / valorAtual();
                break;
        }
        sValor = resultado.toString().replace('.', ',');
    }
    ehNovoNumero = true;
    operacaoPendente = null;
    valorAnterior = 0;
    atualizaVisor();
};