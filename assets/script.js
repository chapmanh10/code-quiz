var questionAandAnswersPage = document.getElementById("q-and-a")
var highScores = document.getElementById("high-scores")
var introPage = document.getElementById("intro");
var startbtn = document.getElementById("start-btn");
var startTime = 60;


var revealQuestions = function (event) {
    introPage.classList.add("hidden");
    questionAandAnswersPage.classList.remove("hidden");
}

startbtn.addEventListener("click", startHandler);

var startHandler = function(){
    revealQuestions();
    setInterval(intervalTick,1000)
}

var intervalTick = function(){

}