var quiztimeEl = document.querySelector(".quiztime");
var startButton = document.querySelector(".start-button");
var startagainButton = document.querySelector(".start-again-button");
var correct = document.querySelector(".correct");
var questionEl = document.querySelector(".question");
var answerEl = document.querySelector(".answer");
var viewscoreEl = document.querySelector(".score");

var timer;
var timeCount;

var questionList = [
    {
        question: `How do you write "Hello World" in an alert box?`,
        answer: [
            `A. msgBox("Hello World")`,
            `B. alert("Hello World")`,
            `C. msg("Hello World")`,
            `D. alertBox("Hello World")`
        ],
        correctAnswer: `B. alert("Hello World")`
    },
    {
        question: `How does a FOR loop start?`,
        answer: [
            `A. for i = 1 to 5`,
            `B. for (i <= 5; i++)`,
            `C. for (i = 0; i <= 5; i++)`,
            `D. for (i = 0; i <= 5)`
        ],
        correctAnswer: `C. for (i = 0; i <= 5; i++)`
    },
    {
        question: `JavaScript is the same as Java.`,
        answer: [
            `A. False`,
            `B. True`,
        ],
        correctAnswer: `A. False`
    },
    {
        question: `How can you add a comment in a JavaScript?`,
        answer: [
            `A. 'This is a comment`,
            `B. // This is a comment`,
            `C. <!-- This is a comment -->`,
            `D. /* This is a comment */`
        ],
        correctAnswer: `B. // This is a comment`
    },
];



// start timer
function startTimer() {
    timeCount = 90
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

// display the quiz question 
function displayQuestion(){
    var questionCount = 0;
    var score = 0 ;
    if (questionCount < questionList.length) {
        questionEl.innerHTML = questionList[questionCount].question;
        answerEl.textContent = " ";
        //get answers from array
        for (let i = 0; i < questionList[questionCount].answer.length; i++) {
            let element = document.createElement("button"); 
            element.innerText = questionList[questionCount].answer[i];
            element.setAttribute("data-id", i); //create class attribute
            element.addEventListener("click", function(event){
                event.stopPropagation();

                if (element.innerText === questionList[questionCount].correctAnswer) {
                   score += timeCount;
                }
                else {
                    score -= 5;
                    timeCount = timeCount - 1;
                }
                questionEl.innerHTML ="";
                if (questionCount === questionList.length) {
                    return;
                } else {
                    questionCount++;
                    displayQuestion();
                }
            });
            answerEl.append(element);
        }
    }
}
displayQuestion();