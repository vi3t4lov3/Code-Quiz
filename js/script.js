var quiztimeEl = document.querySelector('.time');

// countdownEl.textContent = "test";

function quizTime() {
    var timeLeft = 50;
    var timeInterval = setInterval(function(){
        timeLeft--;
        quiztimeEl.textContent = `Quiz Time: ${timeLeft} seconds`;
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            gameOver(); // call function to create the message when time up
        }
    }, 1000);   
}
// game over message
function gameOver() {
    quiztimeEl.textContent ="";

}
quizTime();