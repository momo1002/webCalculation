// 電卓
let state = "start";
let symbol;
let historyArr = new Array;
const KEY_TOP = document.querySelector('input');
const BODY_ID = document.querySelector('body').id;

window.onload = function() {
    switch (BODY_ID) {
        case "multi":
            baseCircle();
            showTimesTables();
            // colorSameNumber();
            break;
    
        case "plus":
            baseCircle();
            break;
    
        default:
            break;
    }

    let timesTablesNumbers = document.getElementsByClassName('tt');
    timesTablesNumbers = Array.from(timesTablesNumbers);
    console.log(timesTablesNumbers);

    // map (xxx === ---.textContent)
    // push()
    // style追加
    timesTablesCell.addEventListener('click', function(){

    });
}

function update(value) {
    KEY_TOP.value = value;
    numberDisplay();
}

function pressNumber(value) {
    afterCalc(value);
    append(value);
    numberDisplay();
    switch (BODY_ID) {
        case "plus":
            colorCircle();
            plusColorCircle();
            makeFirstCircle();
            makeSecondCircle();
            break;
        case "multi":
            colorCircle();
            break;
        default:
            break;
    }
}

function pressSymbol(value) {
    doubleSymbol();
    afterCalc(value);
    append(value);
    headSymbol();
    symbol = value;
    numberDisplay();
}

function afterCalc(_v) {
    if(BODY_ID !== "calc"){
        if (state == "done") {
            update('');
            baseCircle();
            state = "calc";
        }
    } else {
        if(state == "done"){
            update('');
            state = "calc";
        }
    }
}

function append(value) {
    KEY_TOP.value += value;
    state = "calc";
}

function zero() {
    const zero = KEY_TOP.value;
    if (zero === "0") {
        update('');
    }
}

function headSymbol() {
    let SYMBOL = KEY_TOP.value;
    if (SYMBOL === "+" || SYMBOL === "-" || SYMBOL === "*" || SYMBOL === "/") {
        update('');
    }
}

function doubleSymbol() {
    const v = KEY_TOP.value;
    const last_letter = v.slice(-1);
    if (last_letter === "+" || last_letter === "-" || last_letter === "*" || last_letter === "/") {
        const delete_last_letter = v.slice(0, -1);
        update(delete_last_letter);
    }

    // last_letterが＋だったら20が押されたら「80以下の数字を入力しよう」とアラート入れたい。
}

function calc() {
    const v = KEY_TOP.value;
    if (v == '' || state == "done") {
        update('');
        state = "start";
        numberDisplay();
        if(BODY_ID !== "calc"){
            baseCircle();
        }
    } else {
        try {
            const f = eval(v);
            let result = (v + "=" + f.toString());
            update(result);
            numberDisplay();
            if(BODY_ID !== "calc"){
                showHistory(historyArr, result);
            }
        } catch (_error) {
            update(_error)
        }
        state = "done";
    }
}

function numberDisplay() {
    let numbersInDisplay = KEY_TOP.value;
    if (numbersInDisplay.includes('*')) {
        numbersInDisplay = numbersInDisplay.replace('*', '×');
    }
    if (numbersInDisplay.includes('/')) {
        numbersInDisplay = numbersInDisplay.replace('/', '÷');
    }
    document.getElementById('number-display').innerHTML = numbersInDisplay;
}

function showHistory(arr, log) {
    if (log.includes('*')) {
        log = log.replace('*', '×');
    }
    arr.unshift(log);
    if(arr.length == 11){
        arr.pop();
    }
    document.getElementById('history').innerHTML = arr.join('<br />');
}

function baseCircle() {
    let circle_base_array = [];
    for (let i = 0; i < 100; i++) {
        if ((i + 1) % 10 == 0) {
            circle_base_array[i] = `<span id='c${ i+1 }'>●</span><br />`;
        } else {
            circle_base_array[i] = `<span id='c${ i+1 }'>●</span>`;
        }
    }
    document.getElementById('circle').innerHTML = circle_base_array.join('');
    if(BODY_ID == "plus"){
        document.getElementById('circle2').textContent = "";
    }
}

function colorCircle() {
    const firstPressedNmb = KEY_TOP.value;
    try {
        for (var i = 0; i < firstPressedNmb; i++) {
            var targetNmb = "c" + (i + 1);
            document.getElementById(targetNmb).classList.add("first-pressed-circle");
        }
    } catch (e) {
        alert("◯が100コまでしか塗れないので、100以下の数字を入力してください。")
        update('');
        baseCircle();
        console.log(e);
    }
}

function makeFirstCircle() { // for plus
    const firstPressedNmb = KEY_TOP.value;

    if(!firstPressedNmb.includes("+")){
        document.getElementById('circle2').textContent = '';
    } 

    var circle_base_array = [];
    console.log(firstPressedNmb);
    for (let i = 0; i < firstPressedNmb; i++) {
        if ((i + 1) % 10 == 0) {
            circle_base_array[i] = `<span id='cc${ i+1 }' class='first-pressed-circle'>●</span><br />`;
        } else {
            circle_base_array[i] = `<span id='cc${ i+1 }' class='first-pressed-circle'>●</span>`;
        }
    }
    const insert = circle_base_array.join('');
    document.getElementById('circle2').insertAdjacentHTML("afterbegin", insert);
}
function makeSecondCircle() {
    if (KEY_TOP.value.includes("+")) {
        const currentInput = KEY_TOP.value;
        const plusLocation = currentInput.indexOf("+");
        const secondNumber = currentInput.slice(plusLocation + 1);
        var circle_base_array = [];
        for (let i = 0; i < secondNumber; i++) {
            if ((i + 1) % 10 == 0) {
                circle_base_array[i] = `<span id='cc${ i+1 }' class='second-pressed-circle'>●</span><br />`;
            } else {
                circle_base_array[i] = `<span id='cc${ i+1 }' class='second-pressed-circle'>●</span>`;
            }
        }
        const insert = "<br />" + circle_base_array.join('');
        document.getElementById('circle2').insertAdjacentHTML("beforeend", insert);
    }
}

function plusColorCircle() {
    if (KEY_TOP.value.includes("+")) {
        const currentInput = KEY_TOP.value;
        const plusLocation = currentInput.indexOf("+");
        const firstNumber = Number(currentInput.slice(0, plusLocation));
        const secondNumber = currentInput.slice(plusLocation + 1);
        let targetNumber;

        for (let j = 0; j < secondNumber; j++) {
            targetNumber = "c" + (firstNumber + 1 + j);
            document.getElementById(targetNumber).classList.add("second-pressed-circle");
        }
    }
}

function multiColorCircle() {
    if (symbol == "*") {
        const currentInput = KEY_TOP.value;
        const multiLocation = currentInput.indexOf("*");
        const equalLocation = currentInput.indexOf("=");
        const secondNumber = currentInput.slice(multiLocation + 1, equalLocation);
        const total = currentInput.slice(equalLocation + 1);
        const firstNumber = total / secondNumber;
        let targetNmb;

        if(firstNumber > 10){
            alert("かけ算は最初の数字が10以下の場合のみ図が機能します。")
        } else {
            for (let k = 0; k < secondNumber - 1; k++) {
                for (let l = 0; l < firstNumber; l++) {
                    if (l == 9) {
                        targetNmb = "c" + (k + 2) + (l * 0);
                        document.getElementById(targetNmb).classList.add("multi-pressed-circle");
                    } else {

                        targetNmb = "c" + (k + 1) + (l + 1);
                        document.getElementById(targetNmb).classList.add("multi-pressed-circle");
                    }
                }
            }
        }
    }
}
function showTimesTables() {
    const array_a = [1,2,3,4,5,6,7,8,9];
    const array_b = [1,2,3,4,5,6,7,8,9];
    let TABLE_TITLE = array_a.map(function(item){ return `<th>${item}</th>`});
    TABLE_TITLE = '<tr><th>×</th>' + TABLE_TITLE.join('') + '</tr>';

    let array_99 = array_a.map(function(item1){
        return '<tr><th>' + item1 + 'の段</th>' + array_b.map(function(item2){
            return `<td class='tt' id='t${item1.toString()}-${item2.toString()}'>${item1 * item2}</td>`;
        }).join('') + '</tr>';
    }).join('');
    document.getElementById("times-tables").innerHTML = '<table>' + TABLE_TITLE + array_99 + '</table>';
}




    // timesTablesNumbers.addEventListener('click', function(clickedNumber) {
        
    //     let   matchedNumbers = [];
    //     matchedNumbers = TIMES_TABLE_NUMBER_CONTENTS.filter(number => number === clickedNumber);
    //     console.log(matchedNumbers);
    // });


// function colorSameNumber(){
// }

    // 【課題】入力した数値と同じ数字を持つセルに色付け
    // 【課題】クリックしたセルの数字と同じ数字を持つセルに色付け