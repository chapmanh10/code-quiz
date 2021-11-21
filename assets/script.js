var questionAandAnswersPage = document.getElementById("q-and-a");
var highScoresPage = document.getElementById("high-scores");
var introPage = document.getElementById("intro");
var allDonePage = document.getElementById("all-done");
var startbtn = document.getElementById("start-btn");
var startTime = 5;
var timer = document.querySelector("#timer span");
var timerInterval = null;

var revealQuestions = function () {
    introPage.classList.add("hidden");
    questionAandAnswersPage.classList.remove("hidden");
};

var revealAllDone = function () {
    allDonePage.classList.remove("hidden");
    questionAandAnswersPage.classList.add("hidden");
}

var revealHighScores = function () {

}

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
startbtn.addEventListener("click", startHandler);