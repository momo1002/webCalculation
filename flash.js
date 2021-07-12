const input  = document.querySelector('input[name="answer-input"]');
const button = document.querySelector('button');
const result = document.querySelector('#result');
const formId = document.getElementById('setting-form');
const randomNumberDisplay = document.querySelector('#number-display');
const randomNumberDisplayClass = document.querySelector('.number-flash-container__display');
const correctAnswerDisplayTable = document.querySelector('.correct-answer-rate__display tbody');
const radio = document.querySelectorAll('.radio');

const radioDigit = document.getElementsByName("radio-digit");
const radioTime = document.getElementsByName("radio-time");
const radioColor = document.getElementsByName("radio-color");

let radioDigitValue = 5;
let radioTimeValue = 500;
let radioColorValue = 'white';
let answer = [];

let randomNumber;
let textLength;

const form = document.querySelector('#setting-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    run();
}, false);

function run(){
    input.value = "";
    input.focus();

    radioDigitValue  = getSetting('radio-digit');
    radioTimeValue = getSetting('radio-time');
    radioColorValue = getSetting('radio-color');

    setColor();
    new Promise((resolve) => {
        showRandomNumber(radioDigitValue);
        resolve();
    }).then(() => {
        setDisplayNone(radioTimeValue);
        input.focus();
    });
}

window.onload = function() {
    formId.onchange = realTimeRadioChange;
}

const realTimeRadioChange = () => {
    changeDigitNow();
    changeColorNow();
}

function changeDigitNow(){
    let value;
    let radios = formId.elements['radio-digit'];

    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            value = radios[i].value; 
        }
    }

    if(value == '5'){
        randomNumberDisplay.textContent = '12345';
    } else if (value == '6'){
        randomNumberDisplay.textContent = '123456';
    } else if (value == '7'){
        randomNumberDisplay.textContent = '1234567';
    } else {
        console.error('something happend');
    }
}

function changeColorNow(){
    let value;
    let radios = formId.elements['radio-color'];

    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            value = radios[i].value; 
        }
    }

    if(value == 'white'){
        randomNumberDisplayClass.style.color = value;
    } else if (value == '#0FEB40'){
        randomNumberDisplayClass.style.color = value;
    } else if (value == '#F00ED7'){
        randomNumberDisplayClass.style.color = value;
    } else {
        console.error('something happend');
    }
}

function setDisplayNone(){
    setTimeout(() => {
        randomNumberDisplay.textContent = '';
    }, parseInt(radioTimeValue));
}

function getSetting(radioName){
    let value;
    let radios = formId.elements[radioName];

    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            value = radios[i].value; 
        }
    }
    return value;
}
function setColor(){
    randomNumberDisplayClass.style.color = radioColorValue;
}

function showRandomNumber(v){
    let minNumber = 0;
    let maxNumber = 0;
    switch (parseInt(v)) {
        case 5:
            minNumber = 10000;
            maxNumber = 99999;
            break;
    
        case 6:
            minNumber = 100000;
            maxNumber = 999999;
            break;
    
        case 7:
            minNumber = 1000000;
            maxNumber = 9999999;
            break;
    
        default:
            break;
    }

    randomNumber = Math.floor( Math.random() * (maxNumber - minNumber) + minNumber );
    randomNumberDisplay.innerHTML = randomNumber;
    result.innerHTML = '';
} 


function inputCheck() {
    let inputValue = input.value;
    textLength = inputValue.length;

    if(textLength == radioDigitValue){
        if(typeof randomNumber == 'undefined'){
            result.textContent = "「Start」ボタンを押してください。";
            input.blur();
        } else if(inputValue == randomNumber){
            result.textContent = "Excellent！！";
            input.blur();
            button.textContent = "Try again";
            correctAnswerDisplayTable.innerHTML += "<tr><td>☆</td><td>" + randomNumber + "</td></tr>";

            setTimeout(() => { run(); }, 2000);
        } else {
            result.innerHTML = "答えは" + randomNumber + "でした。" ;
            input.blur();
            button.textContent = "Try again";
            correctAnswerDisplayTable.innerHTML += "<tr><td>×</td><td>" + randomNumber + "</td></tr>";

            setTimeout(() => { run(); }, 2000);
        }
    } else {
        result.innerHTML = radioDigitValue + "ケタ入力すると結果がでます。";
    }
}
