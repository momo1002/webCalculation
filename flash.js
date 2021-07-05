const input  = document.querySelector('input[name="answer-input"]');
const button = document.querySelector('button');
const result = document.querySelector('#result');
const formElementById = document.getElementById('setting-form');
const randomNumberDisplay = document.querySelector('#number-display');
const randomNumberDisplayClass = document.querySelector('.number-flash-container__display');
const radio = document.querySelectorAll('.radio');

const radioDigit = document.getElementsByName("radio-digit");
const radioTime = document.getElementsByName("radio-time");
const radioColor = document.getElementsByName("radio-color");

let radioDigitValue = 5;
let radioTimeValue = 500;
let radioColorValue = 'white';


let randomNumber;
let textLength;

window.addEventListener( "DOMContentLoaded" , ()=> {
    radioDigit.forEach(
        r => r.addEventListener("change" ,
                 e => {
                    radioDigitValue = e.target.value;
                    result.innerHTML = radioDigitValue + "ケタ入力すると結果がでます。";
                 }
            )
    );


    radioTime.forEach(
        r => r.addEventListener("change" ,
                 e => radioTimeValue = e.target.value
            )
    );


    radioColor.forEach(
        r => r.addEventListener("change" ,
                 e => {
                    radioColorValue = e.target.value;
                    randomNumberDisplayClass.style.color = radioColorValue;
                 }
            )
    );

});

window.onload = () => {
    input.focus();
}

let form = document.querySelector('#setting-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    input.value = "";

    radioDigitValue  = getSetting('radio-digit');
    radioTimeValue = getSetting('radio-time');
    radioColorValue = getSetting('radio-color');
    new Promise((resolve) => {
        showRandomNumber(radioDigitValue);
        resolve();
    }).then(() => {
        setDisplayNone(radioTimeValue);
    });

}, false);


function setDisplayNone(){
    setTimeout(() => {
        randomNumberDisplay.textContent = '';
    }, parseInt(radioTimeValue));
}


function getSetting(radioName){
    let value;
    let radios = formElementById.elements[radioName];

    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            value = radios[i].value; 
        }
    }
    return value;
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
    console.log(randomNumber);
} 


function inputCheck() {
    let inputValue = input.value;
    textLength = inputValue.length;

    if(textLength == radioDigitValue){

        if(inputValue == randomNumber){
            result.textContent = "大正解！！";
            input.blur();
            button.textContent = "もう一度やる";
        } else {
            result.innerHTML = "答えは" + randomNumber + "でした。" ;
            input.blur();
            button.textContent = "もう一度やる";
        }
    } else {
        result.innerHTML = radioDigitValue + "ケタ入力すると結果がでます。";
    }
}