// 電卓
let state = "start";
let symbol;
let historyArr = new Array;
const KEY_TOP = document.querySelector('input');


function update(value) {
    KEY_TOP.value = value;
    numberDisplay();
}

function pressNumber(value) {
    afterCalc(value);
    append(value);
    colorCircle();
    plusColorCircle();
    numberDisplay();
    makeFirstCircle();
    makeSecondCircle();
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
    if (state == "done") {
        let array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        if (array.includes(_v)) {
            update('');
            baseCircle();
            state = "calc";
        } else {
            update('');
            baseCircle();
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
    const symbol = KEY_TOP.value;
    if (symbol === "+" || symbol === "-" || symbol === "*" || symbol === "/") {
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
        baseCircle();
        state = "start";
        numberDisplay();
    } else {
        try {
            const f = eval(v);
            let result = (v + "=" + f.toString());
            update(result);
            numberDisplay();
            showHistory(historyArr, result);
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
    var circle_base_array = [];
    for (let i = 0; i < 100; i++) {
        if ((i + 1) % 10 == 0) {
            circle_base_array[i] = `<span id='c${ i+1 }'>●</span><br />`;
        } else {
            circle_base_array[i] = `<span id='c${ i+1 }'>●</span>`;
        }
    }
    document.getElementById('circle').innerHTML = circle_base_array.join(''); //#circle
    document.getElementById('circle2').textContent = ""; // #circle2
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
    const TABLE_TITLE = "<th>×</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th>"
    
    let array_99 = array_a.map(function(item1){
        return '<tr><th>' + item1 + 'の段</th>' + array_b.map(function(item2){
            return `<td class = 't${item1.toString()}-${item2.toString()}'>${item1 * item2}</td>`;
        }).join('') + '</tr>';
    }).join('');
    document.getElementById("times-tables").innerHTML = '<table>' + TABLE_TITLE + array_99 + '</table>';
}