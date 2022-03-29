var countdownEl = document.getElementById('countdown');



function countdown() {
    var timeLeft = 500;
    
    var timeInterval = setInterval(function () {
        if (timeLeft < 1) {
            countdownEl.textContent = timeLeft + ' seconds';
            timeLeft--;
        } else {
            countdownEl.textContent = "";
            clearInterval(timeInterval); //stop the timer
        }
    }, 1000);
}