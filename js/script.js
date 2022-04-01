var quiztimeEl = document.querySelector(".quiztime");
var headercontainerEl = document.querySelector(".header-container");
var startButton = document.querySelector(".start-button");
var startagainButton = document.querySelector(".start-again-button");
var correct = document.querySelector(".correct");
var questionEl = document.querySelector(".question");
var answerEl = document.querySelector(".answer");
var viewscoresEl = document.querySelector(".view-scores");
var displayresultsEl = document.querySelector(".quiz-result")
var quizcontainerEl = document.querySelector(".quiz-container");
var nameEl = document.querySelector(".name");
var scoreEl = document.querySelector(".score");
var saveEl = document.querySelector(".save-record");

var timer;
var timeCount;
var questionCount = 0;
var score = 0 ;
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
    }
];

// init function when the page loads
function init() {

}
// start timer
function startTimer() {
    timeCount = 2;
    // startButton.disabled = true;
    startQuiz();

}
//add vent listener to start button to start the timer to bigin the quiz
startButton.addEventListener("click", startTimer);
// startagainButton.addEventListener("click", startQuiz)

function startQuiz() {
    headercontainerEl.remove();
    displayQuestion();
    //set timers
    timer = setInterval(function () {
        timeCount --;
        quiztimeEl.textContent = `You have ${timeCount} seconds left`;
        if (timeCount === 1) {
            quiztimeEl.textContent = `You have ${timeCount} second left`;
        }
        else if (timeCount <= 0) {
            clearInterval(timer);
            quiztimeEl.textContent = `Quiz Completed`;
            displayResults();
        } 
    }, 1000)
}

// display the quiz question 
function displayQuestion(){
    if (questionCount < questionList.length) {
        questionEl.innerHTML = questionList[questionCount].question;
        answerEl.textContent = "";
        //get answers from array
        for (let i = 0; i < questionList[questionCount].answer.length; i++) {
            let element = document.createElement("button"); 
            element.innerText = questionList[questionCount].answer[i];
            element.setAttribute("data-id", i); //create class attribute
            element.addEventListener("click", function(event){
                event.stopPropagation();

                if (element.innerText === questionList[questionCount].correctAnswer) {
                   score += 30; //+ 30 points for correct answer
                }
                else {
                    score -= 15; // - 15 points for incorrect answer plus - 15 seconds to the timecount
                    timeCount = timeCount - 15;
                }
                // console.log(score);
                // console.log(timeCount);
                if (questionCount === questionList.length-1) {
                    displayResults()
                    quiztimeEl.remove();
                } else {
                    questionCount++;
                    displayQuestion();
                }
            });
            answerEl.append(element);
        }
    }
}



//display the results
function displayResults() {
    // viewscoresEl.remove();
    viewscoresEl.textContent = `Clear Score`;
    quizcontainerEl.remove(); 
    if (score === 0) {
        scoreEl.innerHTML = `Your score: ${score} point`;
    }
    else
    scoreEl.innerHTML = `Your score: ${score} points`;
    saveRecord()
    goBack()

};
// save record
function saveRecord() {
    scoreEl.innerHTML = `You scored ${score} points! Enter your name: `;
    var nameInput = document.createElement('input');
    var saveBtn = document.createElement('input');
    nameInput.setAttribute("type", "text");
    saveBtn.setAttribute("type", "button");
    saveBtn.setAttribute("value", "Save");
    saveBtn.addEventListener("click", function(event) {
        event.preventDefault();
        // scoreEl = score;
        var user = {
            yourName: nameInput.value,
            yourScores: score
        }
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user.yourName);
        console.log(user.yourScores);
    })
    
    saveEl.append(saveBtn);
    scoreEl.append(nameInput);
    // scoreEl.append(saveBtn)
}

//go back button 
var backButtonEl = document.querySelector(".back-button");
function goBack() {
    var backbtn = document.createElement("input");
    backbtn.setAttribute("type", "button");
    backbtn.setAttribute("value", "Go Back");
    backbtn.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.reload(); //reload page
    })
    backButtonEl.append(backbtn);
}