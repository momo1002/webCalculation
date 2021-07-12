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

const form = document.querySelector('#setting-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    run();
}, false); // 「this false == action="javascript:void(0)"」action属性を省略している場合、自身のページがリロードされる。false値を返しフォームの送信を中止。

function run(){
    input.value = "";
    input.focus();

    radioTimeValue = getSetting('radio-time');

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
    setDigit();
    setColor();
}

function setDigit(){
    radioDigitValue = getSetting('radio-digit');
    let v = new String();

    for (let d = 1; d < parseInt(radioDigitValue)+1 ; d++) {
        v += d;
        randomNumberDisplay.innerHTML = v;
    }
}

function setColor(){
    radioColorValue = getSetting('radio-color');
    randomNumberDisplayClass.style.color = radioColorValue;
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

function showRandomNumber(v){
    let min = 1;
    let max = 9;

    for(let i = 1; i < parseInt(v); i++){
        min += '0';
        max += '9';
    }
    parseInt(min);
    parseInt(max);
    console.log(min);
    console.log(max);


    randomNumber = Math.floor( Math.random() * (max - min + 1) + min );
    randomNumberDisplay.innerHTML = randomNumber;
    result.innerHTML = '';
} 


function inputCheck() {
    let textLength;
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
