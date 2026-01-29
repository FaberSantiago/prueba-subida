const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const resultOverlay = document.getElementById("resultOverlay");
const finalScoreText = document.getElementById("finalScore");
const hitSound = new Audio("assets/pelota.wav");
hitSound.volume = 0.5; // volumen (0 a 1)

const TARGET_SIZE = 100;

let score = 0;
let time = 30;
let timer;
let target;

startBtn.addEventListener("click", startGame);

function startGame() {
    resultOverlay.classList.remove("show");

    score = 0;
    time = 30;
    scoreText.textContent = score;
    timeText.textContent = time;
    game.innerHTML = "";

    clearInterval(timer);

    // Pantalla completa real
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }

    createTarget();

    timer = setInterval(() => {
        time--;
        timeText.textContent = time;

    if (time <= 0) {
        clearInterval(timer);
        game.innerHTML = "";

        finalScoreText.textContent = score;
        resultOverlay.classList.add("show");
    }

    }, 1000);
}

function createTarget() {
    target = document.createElement("div");
    target.classList.add("target", "enter");
    game.appendChild(target);

    moveTarget();

    target.addEventListener("click", (e) => {
        e.stopPropagation();
        score++;
        scoreText.textContent = score;

        if (hitSound) {
        hitSound.currentTime = 0;
        hitSound.play();
        }

        scoreText.classList.add("score-anim");
        setTimeout(() => scoreText.classList.remove("score-anim"), 200);

        moveTarget();
    });
}

function moveTarget() {
    // 1️⃣ Quitar respiración
    target.classList.remove("idle");

    // 2️⃣ Quitar animaciones previas
    target.classList.remove("enter", "exit");

    // 3️⃣ FORZAR REFLUJO (CLAVE 🔑)
    void target.offsetWidth;

    // 4️⃣ Animación de salida
    target.classList.add("exit");

    setTimeout(() => {
        const maxX = game.clientWidth - TARGET_SIZE;
        const maxY = game.clientHeight - TARGET_SIZE;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        target.style.left = x + "px";
        target.style.top = y + "px";

        // 5️⃣ Preparar entrada
        target.classList.remove("exit");
        void target.offsetWidth; // 🔑 reset animación

        target.classList.add("enter");

        // 6️⃣ Volver a respiración cuando termine la entrada
        setTimeout(() => {
            target.classList.add("idle");
        }, 350); // duración de enter

    }, 250); // duración de exit
}



