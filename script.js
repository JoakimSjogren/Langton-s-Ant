const container = document.querySelector('.container');
const score = document.querySelector(".score");
const start = document.querySelector('.start');
const speedText = document.querySelector('.speed');
const atomaticBtn = document.querySelector('.atomatic');

let boxes;
let playing = false;
let speed = 1000;
let atomatic = true;

let rowSize = 61;
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
        newDiv.style.height = `${container.Width / rowSize}px`;
        newDiv.style.width = `${container.Width / rowSize}px`;
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
    if (atomatic) {
        loop();
    }
}
function loop() {
    if (playing !== false) {
        setTimeout(function () {
            moveAnt();
        }, speed);
    }
}

function updateStartText() {
    if (playing) {
        start.textContent = "Pause";
    }
    else {
        start.textContent = "Start";
    }
}

initialize();
calculateAnt();


start.addEventListener('click', () => {
    playing = !playing;
    updateStartText();
    loop();
    atomatic = true;
    atomaticBtn.textContent = 'Atomatic';
});

container.addEventListener('click', () => {
    if (!atomatic) {
        moveAnt();
    }
});

atomaticBtn.addEventListener('click', () => {
    atomatic = !atomatic;
    if (atomatic) {
        atomaticBtn.textContent = 'Atomatic';
    }
    else {
        atomaticBtn.textContent = 'Manual';
        playing = false;
        updateStartText();
    }
});

document.addEventListener('wheel', (e) => {
    if (speed <= 2500 && speed >= 0) {
        playing = false;
        speed += e.deltaY;

        if (speed > 2500) {
            speed = 2500;
        }
        else if (speed < 0) {
            speed = 0;
        }
    }
    else {
        if (speed <= 2500) {
            speed = 2500;
        }
        else if (speed >= 0) {
            speed = 0;
        }
    }
    if (speed === 0) {
        speedText.textContent = 'A lot of steps per second';
    }
    else {
        let speedtxtInt = 1 / (speed / 1000);
        speedtxtInt = parseFloat(speedtxtInt).toFixed(1);
        // speedtxtInt = speedtxtInt(0, 3);
        speedText.textContent = speedtxtInt + ' steps per second';
        //console.info(str.substring(0,3));
    }
    updateStartText();
    loop();
    return;
});



