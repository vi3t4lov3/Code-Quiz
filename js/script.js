var quiztimeEl = document.querySelector(".quiztime");
var startButton = document.querySelector(".start-button");
var startagainButton = document.querySelector(".start-again-button");
var correct = document.querySelector(".correct");
var questionEl = document.querySelector(".question");
var answerEl = document.querySelector(".anwser");
var viewscoreEl = document.querySelector(".score");



var timer;
var timeCount;
var questionCount = 0;
var score = 0 ;

var questionList = [
    {
        question: "what is your name 1?",
        answer: [".test 1", ".test 2", ".test 3", ".test 4"],
        correctAnswer: ".test 1"
    },
    {
        question: "what is your name 2?",
        answer: [".test 1d", ".test d2", ".test d3", ".test d4"],
        correctAnswer: ".test 4"
    }
];



// start timer
function startTimer() {
    timeCount = 500
    startButton.disabled = true;
    startQuiz();

}
//add vent listener to start button to start the timer to bigin the quiz
startButton.addEventListener("click", startTimer);
// startagainButton.addEventListener("click", startQuiz)

function startQuiz() {
  
    //set timers
    timer = setInterval(function () {
        timeCount --;
        quiztimeEl.textContent = `You have ${timeCount} seconds left`;
        startButton.textContent = `Good Luck`
        if (timeCount === 1) {
            quiztimeEl.textContent = `You have ${timeCount} second left`;
        }
        else if (timeCount === 0) {
            clearInterval(timer);
            quiztimeEl.textContent = `Quiz Completed`;
            startButton.hidden = true;
            // startagainButton.textContent = `Try Again`;
        } 
    }, 1000)
}
// view score funtion
// function viewScore() {
//     viewscoreEl.addEventListener("click", function(event) {
//         event.preventDefault();
//         displayScore();
//         goback();
//     })
// }

// display question
function displayQuestion(){
    if (questionCount < questionList.length) {
        questionEl.innerHTML = questionList[questionCount].question;
        answerEl.textContent = questionList.answer[0]

        // for (let i = 0; i < questionList[questionCount].answer.length; i++) {
        //     let element = document.createElement("button");
        //     element.innerText = questionList[questionCount].answer[i];
        //     element.setAttribute("data-id", i);
        //     element.addEventListener("click", function(event){
        //         event.stopPropagation();

        //         if (element.innerText === questionList[questionCount].answer) {
        //            score += timeCount;
        //         }
        //         else {
        //             score -= 10;
        //             timeCount = timeCount - 15;
        //         }
        //         questionEl.innerHTML ="";
        //         if (questionCount === questionList.length) {
        //             return;
        //         } else {
        //             questionCount++;
        //             displayQuestion();
        //         }
        //     });
        //     answerEl.append(element);
        // }
    }
}
displayQuestion();