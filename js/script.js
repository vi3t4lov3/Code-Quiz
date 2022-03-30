var quiztimeEl = document.querySelector(".quiztime");
var startButton = document.querySelector(".start-button");
var correct = document.querySelector(".correct");

var timer;
var timeCount;
// start timer
function startTimer() {
    timeCount = 1000;
    startButton.disabled = true;
    startQuiz();
}
//add vent listener to start button to start the timer to bigin the quiz
startButton.addEventListener("click", startTimer);

function startQuiz() {
    //set timers
    timer = setInterval(function () {
        timeCount --;
        quiztimeEl.textContent = timeCount;
        if (timeCount === 0) {
            clearInterval(timer);
            quiztimeEl.textContent = "Quiz Completed";
        } 
    }, 1000)
}
// game over message
function gameOver() {
    quiztimeEl.textContent ="Game Over";
    // timeLeft = 5000;
}
// playing quiz
function playingQuiz() {
    quiztimeEl.textContent ="Display question here"
}
