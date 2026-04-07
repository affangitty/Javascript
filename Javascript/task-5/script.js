const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

const resultBox = document.getElementById("resultBox");
const quizBox = document.getElementById("quizBox");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let questions = [];
let currentIndex = 0;
let score = 0;
let selected = null;

/* Load JSON */

async function loadQuestions() {
    const res = await fetch("questions.json");
    questions = await res.json();
    showQuestion();
}

/* Show Question */

function showQuestion() {
    selected = null;
    nextBtn.disabled = true;

    const q = questions[currentIndex];
    questionEl.textContent = q.question;

    optionsEl.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("option");

        btn.addEventListener("click", () => selectOption(btn, index));

        optionsEl.appendChild(btn);
    });
}

/* Select */

function selectOption(btn, index) {
    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(o => o.classList.remove("selected"));

    btn.classList.add("selected");
    selected = index;

    nextBtn.disabled = false;
}

/* Next */

nextBtn.addEventListener("click", () => {
    const q = questions[currentIndex];

    const options = document.querySelectorAll(".option");

    options[q.answer].classList.add("correct");

    if (selected === q.answer) {
        score++;
    } else {
        options[selected].classList.add("wrong");
    }

    setTimeout(() => {
        currentIndex++;

        if (currentIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 800);
});

/* Result */

function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    scoreEl.textContent = `${score} / ${questions.length}`;
}

/* Restart */

restartBtn.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    quizBox.classList.remove("hidden");
    resultBox.classList.add("hidden");
    showQuestion();
});

/* Init */

loadQuestions();