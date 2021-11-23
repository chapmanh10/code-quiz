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
var currentQuestion = 0;
var currentScore = 0;
var winners = document.getElementById("winners");
var viewHighScores = document.getElementById("view-high-scores");
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
            "1. quotes", "2. curley braces", "3. parenthesis", "4. square brackets",
        ],
        correctAnswer: 2
    },
    // QUESTION 3
    {
        text: "Arrays in JavaScript can be used to store _______",
        answers: [
            "1. numbers and strings", "2. booleans", "3. other arrays", "4. all of the above"
        ],
        correctAnswer: 3
    },
    // QUESTION 4
    {
        text: "A very useful tool used during development for debugging and printing content to the debugger is:",
        answers: [
            "1. JavaScript", "2. terminal/gitBash", "3. for loops", "4. console log",
        ],
        correctAnswer: 3
    },
    // QUESTION 5
    {
        text: "String values must be enclosed within _______ when being assigned variables",
        answers: [
            "1. commas", "2. quotes", "3. curly braces", "4. square brackets",
        ],
        correctAnswer: 1
    }
];

var displayQuestions = function () {
    var question = questionsArray[currentQuestion]
    var questionHeader = document.getElementById("question");
    questionHeader.textContent = question.text;

    var answerButtonHolder = document.getElementById("answer-btns");
    answerButtonHolder.innerHTML = " ";
    winners.textContent = "";
    for (var i = 0; i < question.answers.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = question.answers[i];
        answerButton.setAttribute("data-answer-id", i)
        answerButton.addEventListener("click", evaluate);
        answerButtonHolder.appendChild(answerButton);
    }

}

var evaluate = function (event) {
    var selectedAnswer = event.target.getAttribute("data-answer-id");
    var correctAnswer = questionsArray[currentQuestion].correctAnswer;
    currentQuestion++;
    var result = document.getElementById("result");
    var isLastQestion = questionsArray.length === currentQuestion + 1;
    result.classList.remove("hidden");

    if (parseInt(selectedAnswer) === correctAnswer) {
        result.textContent = "correct!"
        currentScore += 10;
        if (isLastQestion) {
            startTime = 1;
            revealAllDone();

        }
        else {
            displayQuestions();
        }

    }
    else {
        startTime -= 10
        result.textContent = "incorrect!"
        if (isLastQestion) {
            startTime = 1;
            revealAllDone();
        }
        else {
            displayQuestions();
        }
    }
};

// REVEAL DIFFERENT PAGES
var revealQuestions = function () {
    introPage.classList.add("hidden");
    questionAandAnswersPage.classList.remove("hidden");
    displayQuestions();
};

var revealAllDone = function () {
    allDonePage.classList.remove("hidden");
    questionAandAnswersPage.classList.add("hidden");
    var yourScore = document.getElementById("your-score");
    yourScore.textContent = currentScore;
}

var revealHighScores = function (highScores) {
    var clearBtn = document.getElementById("clear-hs");
    clearBtn.addEventListener("click", clearHighScoresDOM);
    allDonePage.classList.add("hidden");
    introPage.classList.add("hidden");
    highScoresPage.classList.remove("hidden");

    winners.textContent = "";
    
    for (let index = 0; index < highScores.length; index++) {

        var li = document.createElement('li');

        li.textContent = highScores[index].initials + " " + highScores[index].score;

        winners.appendChild(li);
    }
}

var submitInitialsHandler = function (event) {
    event.preventDefault()
    var winnerInitials = event.target.elements.initials.value;
    var savedWinners = rankScores(winnerInitials);
    revealHighScores(savedWinners);
};

// VIEW HIGH SCORE HANDLER
var viewHighScoresHandler = function () {
    var scores = getScores();
    revealHighScores(scores);
};

// CLEAR SCORES DOM
var clearHighScoresDOM = function () {
    winners.textContent = "";
    clearScores();
};

// CLEAR SCORES
var clearScores = function () {
    localStorage.clear()
};

// SET VALUE TO LOCAL STORAGE
var saveScores = function (winners) {
    localStorage.setItem("winners", JSON.stringify(winners))
};

// GET VALUE FROM LOCAL STORAGE
var getScores = function () {
    var winners = localStorage.getItem("winners")
    if (winners === null) {
        return [];
    }
    else {
        return JSON.parse(winners);
    }

}

// RANK SCORE LIST
var rankScores = function (initials) {
    var savedScores = getScores();
    var scoreObject = {
        initials,
        score: currentScore
    }

    if (savedScores.length === 0) {
        saveScores([scoreObject])
        return [scoreObject]
    }
    else {
        savedScores.push(scoreObject);
        saveScores(savedScores);
        return savedScores;
    }
}

// TIMER
var startHandler = function () {
    revealQuestions();
    timerInterval = setInterval(intervalTick, 1000)
};

var intervalTick = function () {
    startTime--;
    timer.textContent = startTime;
    if (startTime <= 0 || currentQuestion >= questionsArray.length) {
        clearInterval(timerInterval)
        revealAllDone();
    }
};

var goBack = function () {
    questionAandAnswersPage.classList.add("hidden");
    highScoresPage.classList.add("hidden");
    allDonePage.classList.add("hidden");
    introPage.classList.remove("hidden");
    startTime = 60;
    timer.textContent = startTime;
    currentQuestion = 0;
    currentScore = 0;
}

startBtn.addEventListener("click", startHandler);
initialsForm.addEventListener("submit", submitInitialsHandler);
goBackBtn.addEventListener("click", goBack);
viewHighScores.addEventListener("click", viewHighScoresHandler);
