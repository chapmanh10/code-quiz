var questionAandAnswersPage = document.getElementById("q-and-a");
var highScoresPage = document.getElementById("high-scores");
var introPage = document.getElementById("intro");
var allDonePage = document.getElementById("all-done");
var startBtn = document.getElementById("start-btn");
var startTime = 5;
var timer = document.querySelector("#timer span");
var timerInterval = null;
var initialsForm = document.getElementById("initials");
var goBackBtn = document.getElementById("go-back");
var questionsArray = [
    //QUESTION 1
    {
        question:"Commonly used data types do NOT include:",
        answers: [
            "strings", "boolean", "alerts", "numbers"
        ],
        correctAnswer: 2
    },
    // QUESTION 2
    {
        question:"The condition in an if / else statement is enclosed with _______",
        answers: [
            "quotes", "curley braces", "parenthesis", "square brackets",
        ],
        correctAnswer: 2
    },
    // QUESTION 3
    {
        question:"Arrays in JavaScript can be used to store _______",
        answers: [
            "numbers and strings", "booleans", "other arrays", "all of the above"
        ],
        correctAnswer: 3
    },
    // QUESTION 4
    {
        question:"A very useful tool used during development for debugging and printing content to the debugger is:",
        answers: [
            "JavaScript", "terminal/gitBash", "for loops", "console log",
        ],
        correctAnswer: 3
    },
    // QUESTION 5
    {
        question:"String values must be enclosed within _______ when being assigned variables",
        answers: [
            "commas", "quotes", "curly braces", "square brackets",
        ],
        correctAnswer: 1
    }
]



// REVEAL DIFFERENT PAGES
var revealQuestions = function () {
    introPage.classList.add("hidden");
    questionAandAnswersPage.classList.remove("hidden");
};

var revealAllDone = function () {
    allDonePage.classList.remove("hidden");
    questionAandAnswersPage.classList.add("hidden");
}

var revealHighScores = function (event) {
    event.preventDefault()
    allDonePage.classList.add("hidden");
    introPage.classList.add("hidden");
    highScoresPage.classList.remove("hidden");
}

// TIMER
var startHandler = function () {
    revealQuestions();
    timerInterval = setInterval(intervalTick, 1000)
};

var intervalTick = function () {
    startTime--;
    timer.textContent = startTime;
    if (startTime <= 0) {
        clearInterval(timerInterval)
        revealAllDone();
    }
};

var goBack = function () {
    questionAandAnswersPage.classList.add("hidden");
    highScoresPage.classList.add("hidden");
    allDonePage.classList.add("hidden");
    introPage.classList.remove("hidden");
    startTime = 5;
    timer.textContent = startTime;
}

startBtn.addEventListener("click", startHandler);
initialsForm.addEventListener("submit", revealHighScores);
goBackBtn.addEventListener("click", goBack);

