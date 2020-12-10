const container = document.querySelector('.container');
const score = document.querySelector(".score");
const start = document.querySelector('.start');

let boxes;

let playing = false;

let rowSize = 59;
let size = rowSize * rowSize;

let prevColor = 0;
let steps = 0;
let antInt = 0;
let dir = 0;

function initialize() {
    container.style.gridTemplateRows = `repeat(${rowSize}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${rowSize}, 1fr)`;
    createBoxes();
}

function createBoxes() {
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        const newDiv = document.createElement('div');
        container.appendChild(newDiv);
        newDiv.style.height = `${container.offsetWidth / rowSize}`;
        newDiv.style.width = `${container.offsetWidth / rowSize}`;
    }
    boxes = container.querySelectorAll('div');
}

function calculateAnt() {
    if (steps <= 0) {

        if (Number.isInteger(size / 2)) {
            antInt = size / 2;
        }
        else {
            antInt = (size / 2) - .5;
        }

        boxes[antInt].classList.add('ant');
    }
}
function moveAnt() {

    boxes[antInt].classList.remove('ant');
    boxes[antInt].classList.toggle('black');



    //white square
    if (prevColor === 0) {
        if (dir === 0) {
            dir = 1;
        }
        else if (dir === 1) {
            dir = 2;
        }
        else if (dir === 2) {
            dir = 3;
        }
        else {
            dir = 0;
        }
    }
    //black square
    else {
        if (dir === 0) {
            dir = 4;
        }
        else if (dir === 1) {
            dir = 0;
        }
        else if (dir === 2) {
            dir = 1;
        }
        else {
            dir = 2;
        }
    }
    if (dir === 0) {
        antInt -= rowSize;
    }
    else if (dir === 1) {
        antInt += 1;
    }
    else if (dir === 2) {
        antInt += rowSize;
    }
    else {
        antInt -= 1;
    }

    if (boxes[antInt].classList.contains('black')) {
        prevColor = 1;
    }
    else {
        prevColor = 0;
    }
    boxes[antInt].classList.add('ant');
    steps += 1;
    score.textContent = steps;
    loop();
}
function loop() {
    if (playing !== false) {
        setTimeout(function () {
            moveAnt();
        }, 1);
    }
}

initialize();
calculateAnt();


start.addEventListener('click', () => {
    playing = !playing;
    if (playing) {
        start.textContent = "Pause";

    }
    else {
        start.textContent = "Start";
    }
    loop();
});



