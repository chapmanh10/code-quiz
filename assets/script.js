var questionAandAnswersPage = document.getElementById("q-and-a");
var highScoresPage = document.getElementById("high-scores");
var introPage = document.getElementById("intro");
var allDonePage = document.getElementById("all-done");
var startBtn = document.getElementById("start-btn");
var startTime = 60;
var timer = document.querySelector("#timer span");
var timerInterval = null;
var initialsForm = document.getElementById("initials");
var goBackBtn = document.getElementById("go-back");
var questionsArray = [
    //QUESTION 1
    {
        text: "Commonly used data types do NOT include:",
        answers: [
            "1. strings", "2. boolean", "3. alerts", "4. numbers"
        ],
        correctAnswer: 2
    },
    // QUESTION 2
    {
        text: "The condition in an if / else statement is enclosed with _______",
        answers: [
            "quotes", "curley braces", "parenthesis", "square brackets",
        ],
        correctAnswer: 2
    },
    // QUESTION 3
    {
        text: "Arrays in JavaScript can be used to store _______",
        answers: [
            "numbers and strings", "booleans", "other arrays", "all of the above"
        ],
        correctAnswer: 3
    },
    // QUESTION 4
    {
        text: "A very useful tool used during development for debugging and printing content to the debugger is:",
        answers: [
            "JavaScript", "terminal/gitBash", "for loops", "console log",
        ],
        correctAnswer: 3
    },
    // QUESTION 5
    {
        text: "String values must be enclosed within _______ when being assigned variables",
        answers: [
            "commas", "quotes", "curly braces", "square brackets",
        ],
        correctAnswer: 1
    }
];

var displayQuestions = function () {
    var question = questionsArray[0]
    var questionHeader = document.getElementById("question");
    questionHeader.textContent = question.text;

    var answerButtonHolder = document.getElementById("answer-btns");

    for (var i = 0; i < question.answers.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = question.answers[i];
        answerButtonHolder.appendChild(answerButton);
    }

}



// REVEAL DIFFERENT PAGES
var revealQuestions = function () {
    introPage.classList.add("hidden");
    questionAandAnswersPage.classList.remove("hidden");
    displayQuestions();
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

