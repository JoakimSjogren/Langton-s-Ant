const container = document.querySelector('.container');
const score = document.querySelector(".score");
const start = document.querySelector('.start');
const speedText = document.querySelector('.speed');
const atomaticBtn = document.querySelector('.atomatic');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');


let boxes;
let playing = false;
let speed = 1000;
let atomatic = true;
let prevColor = 0;
let steps = 0;
let antInt = 0;
let dir = 0;
let mouseIsDown = false;

const maxSpeed = 0;
const minSpeed = 2500;

const rowSize = 61;
const size = rowSize * rowSize;

//Create Container
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
    if (steps === 10628) {
        return;
    }
    if (!playing && atomatic) {
        return;
    }

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

    //Move ant
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

    //Check square color
    if (boxes[antInt].classList.contains('black')) {
        prevColor = 1;
    }
    else {
        prevColor = 0;
    }

    //change color of square
    boxes[antInt].classList.add('ant');
    steps += 1;
    score.textContent = steps;
    if (atomatic) {
        loop();
    }
    if (mouseIsDown) {
        mouseDownLoop();
    }
}

function mouseDownLoop() {
    setTimeout(function () {
        moveAnt();
    }, 1);
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
        start.classList.add('pressed')
    }
    else {
        start.textContent = "Start";
        start.classList.remove('pressed')
    }
}
//adjust stepping speed
function adjustSpeed(speedAmount) {
    if (speed <= minSpeed && speed >= maxSpeed) {
        playing = false;
        speed += speedAmount;
        if (speed > minSpeed) {
            speed = minSpeed;
        }
        else if (speed < maxSpeed) {
            speed = maxSpeed;
        }
    }
    else {
        if (speed <= minSpeed) {
            speed = minSpeed;
        }
        else if (speed >= maxSpeed) {
            speed = maxSpeed;
        }
    }
    if (speed === 0) {
        speedText.textContent = 'A lot of steps per second';
    }
    else {
        let speedtxtInt = 1 / (speed / 1000);
        speedtxtInt = parseFloat(speedtxtInt).toFixed(1);
        speedText.textContent = speedtxtInt + ' steps per second';
    }
    updateStartText();
    loop();
    return;
}

initialize();
calculateAnt();

//Start/Pause
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

container.addEventListener('mousedown', () => {
    if (!atomatic) {
        mouseIsDown = true;
        setTimeout(function () {
            if (mouseIsDown)
                moveAnt();
        }, 1000);
    }
});

document.addEventListener('mouseup', () => {
    mouseIsDown = false;
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

//Detect mouse wheel to change speed value
document.addEventListener('wheel', (e) => {
    adjustSpeed(e.deltaY);
});
leftArrow.addEventListener('click', () => {
    adjustSpeed(100);
});
rightArrow.addEventListener('click', () => {
    adjustSpeed(-100);
});