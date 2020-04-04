var buttons = document.querySelectorAll('.button');
var display = document.querySelector('#display');
var btnEqual = document.querySelector('.equal');
var btnClear = document.querySelector("#clearAll");
var btnPointer = document.querySelector('#pointer');

var buttons_array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/'];

for (let cont = 0; cont < buttons.length; cont++) {
    buttons[cont].addEventListener('click', function() {
        var elemSearch = buttons_array.indexOf(this.textContent.trim(), 0);
        if ( elemSearch >= 0) setDisplay(this.textContent, display);
    });
}

// Adicionando o evento de click ao botão de igual.
btnEqual.addEventListener('click', () => {
    equal(display)
    .then(result => display.value = result)
    .catch(error => console.log(error));
});

// Adicionando a função que limpa todo o conteúdo do display.
btnClear.addEventListener('click', () => clearAll());

// Adicionando a função addPointer no botão do ponto.
btnPointer.addEventListener('click', () => addPointer(display));

function equal(display) {
    var lastChar = display.value.split('').pop();
    return new Promise((resolve, reject) => {
        try {
            let result = eval(display.value);
            resolve(result);
        } catch (error) {
            reject('Deu treta!');
        }
    });
}

function sum(value) {
}


// Atualiza o conteúdo do display.
function setDisplay(value, display) {
    // Quando o conteúdo do display for diferente de zero.
    if (display.value == '0') {
        display.value = value.trim();
    } else {
        display.value += value.trim();
    };
}

// Limpa todos os dados do display.
function clearAll(){
    display.value = 0;
}

function addPointer(display){
    display.value += '.';
}

function pressKey() {
    var tecla = window.event.key;

    if (buttons_array.indexOf(tecla, 0) >= 0) {
        setDisplay(tecla, display);

    } else if (tecla == 'Enter') {
        equal(display)
        .then(result => display.value = result)
        .catch(error => console.log(error));

    } else {
        console.log(window.event.key);

    }
}

document.body.onkeypress = pressKey; 
