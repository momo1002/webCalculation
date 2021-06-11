// 電卓
let state = "start";
const BTN = document.querySelector('input');
let symbol;

function update(value) {
    BTN.value = value;
    numberDisplay();
}

function pressNumber(value) {
    afterCalc(value);
    append(value);
    colorCircle();
    plusColorCircle();
    numberDisplay();
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
    BTN.value += value;
    state = "calc";
}

function zero() {
    const zero = BTN.value;
    if (zero === "0") {
        update('');
    }
}

function headSymbol() {
    const symbol = BTN.value;
    if (symbol === "+" || symbol === "-" || symbol === "*" || symbol === "/") {
        update('');
    }
}

function doubleSymbol() {
    const v = BTN.value;
    const last_letter = v.slice(-1);
    if (last_letter === "+" || last_letter === "-" || last_letter === "*" || last_letter === "/") {
        const delete_last_letter = v.slice(0, -1);
        update(delete_last_letter);
    }

    // last_letterが＋だったら20が押されたら「80以下の数字を入力しよう」とアラート入れたい。
}

function calc() {
    const v = BTN.value;
    if (v == '') {
        update('');
        state = "start";
        numberDisplay();
    } else {
        try {
            const f = eval(v);
            update(v + "=" + f.toString());
            numberDisplay();
        } catch (_error) {
            update(_error)
        }
        state = "done";
    }
}

function numberDisplay() {
    let numbersInDisplay = BTN.value;
    if (numbersInDisplay.includes('*')) {
        numbersInDisplay = numbersInDisplay.replace('*', '×');
    }
    document.getElementById('number-display').innerHTML = numbersInDisplay;
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
    document.getElementById('circle').innerHTML = circle_base_array.join('');
}

function colorCircle() {
    const firstPressedNmb = BTN.value;
    try {
        for (var i = 0; i < firstPressedNmb; i++) {
            var targetNmb = "c" + (i + 1);
            document.getElementById(targetNmb).textContent = "●";
            document.getElementById(targetNmb).classList.add("first-pressed-circle");
        }
    } catch (e) {
        alert("◯が100コまでしか塗れないので、100以下の数字を入力してください。")
        update('');
        baseCircle();
        console.log(e);
    }
}

function plusColorCircle() {
    if (BTN.value.includes("+")) {
        const currentInput = BTN.value;
        const plusLocation = currentInput.indexOf("+");
        const firstNumber = Number(currentInput.slice(0, plusLocation));
        const secondNumber = currentInput.slice(plusLocation + 1);
        let targetNumber;

        for (let j = 0; j < secondNumber; j++) {
            targetNumber = "c" + (firstNumber + 1 + j);
            document.getElementById(targetNumber).textContent = "●"
            document.getElementById(targetNumber).classList.add("second-pressed-circle");
        }
    }
}

function multiColorCircle() {
    if (symbol == "*") {
        const currentInput = BTN.value;
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
                        document.getElementById(targetNmb).textContent = "●";
                        document.getElementById(targetNmb).classList.add("multi-pressed-circle");
                    } else {

                        targetNmb = "c" + (k + 1) + (l + 1);
                        document.getElementById(targetNmb).textContent = "●";
                        document.getElementById(targetNmb).classList.add("multi-pressed-circle");
                    }
                }
            }
        }
    }
}
