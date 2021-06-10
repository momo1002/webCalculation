// 電卓
var state = "start";

function update(value) {
	document.querySelector('input').value = value;
}

function append(value) {
	document.querySelector('input').value += value;
    state = "calc";
}

function backSpace() {
    const value = document.querySelector('input').value;
    const back_space = value.slice(0, -1);
    update(back_space);
}

function zero() {
    const zero = document.querySelector('input').value;
    if(zero === "0") {
        update('');
    }
}

function headSymbol() {
    const symbol = document.querySelector('input').value;
    if(symbol === "+" || symbol === "-" || symbol === "*" || symbol === "/") {
        update('');
    }
}

function doubleSymbol() {
    const v = document.querySelector('input').value;
    const last_letter = v.slice(-1);
    if(last_letter === "+" || last_letter === "-" || last_letter === "*" || last_letter === "/") {
        const delete_last_letter = v.slice(0, -1);
        update(delete_last_letter);
    }
}

function calc() {
    const v = document.querySelector('input').value;

    if(v == ''){
        update('');
        state = "start";
        console.log(state);
    } else {
        try {
            const f = new Function( 'return ' + v );
            update( f().toString() );
        } catch(_error) {
            update(_error)
        }
        state = "done";
        console.log(state);
    }
}

function afterCalc(_v) {
    if(state == "done") {
        var array = ['1','2','3','4','5','6','7','8','9'];
        if(array.includes(_v)) {
            update('');
            state = "calc";
        } else {
            state = "calc";
        }
    }
}

// ○
function circle() {
    let circle_base_array = [];
    for(let i = 0; i < 100 ; i++) {
        if((i + 1)%10 == 0){
            circle_base_array[i] = "○<br />";
        } else {
            circle_base_array[i] = "○";
        }
    }
    document.getElementById('circle').innerHTML = circle_base_array.join('');
}
