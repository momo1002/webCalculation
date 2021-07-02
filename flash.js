const input  = document.querySelector('input[name="answer-input"]');
let   inputValue;
const button = document.querySelector('button');
const result = document.querySelector('#result');
const radioDigit = document.querySelector('input[name=radio-digit]:checked');
const radioTime  = document.querySelector('input[name=radio-time]:checked');
const radioDigitValue = parseInt(radioDigit.value);
const radioTimeValue  = parseFloat(radioTime.value);

const randomNumberDisplay = document.querySelector('.number-flash');

let randomNumber;
let textLength;
let count = 0;

window.onload = () => {
    input.focus();
}

try {
    button.onclick = showRandomNumber(radioDigitValue);
    // input.onkeyup = inputCheck();
} catch (e) {
    console.error(e);
}

function setDisplayNone(){
    setTimeout(() => {
        randomNumberDisplay.textContent = '';
    }, 500);
}

function showRandomNumber(v){
    let minNumber = 0;
    let maxNumber = 0;
    switch (v) {
        case 5:
            minNumber = 10000;
            maxNumber = 100000-1;
            break;
    
        case 6:
            minNumber = 100000;
            maxNumber = 1000000-1;
            break;
    
        case 7:
            minNumber = 1000000;
            maxNumber = 10000000-1;
            break;
    
        default:
            break;
    }

    randomNumber = Math.floor( Math.random() * (maxNumber - minNumber) + minNumber );
    randomNumberDisplay.textContent = parseInt(randomNumber);

    setDisplayNone();
} 


function inputCheck() {
    inputValue = input.value;
    textLength = inputValue.length;
    console.log(radioDigitValue);

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