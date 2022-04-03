var quiztimeEl = document.querySelector(".quiztime");
var headercontainerEl = document.querySelector(".header-container");
var startButton = document.querySelector(".start-button");
var startagainButton = document.querySelector(".start-again-button");
var correct = document.querySelector(".correct");
var questionEl = document.querySelector(".question");
var answerEl = document.querySelector(".answer");
var commentEl = document.querySelector(".comment");
var viewscoresEl = document.querySelector(".view-scores");
var displayresultsEl = document.querySelector(".quiz-result")
var quizcontainerEl = document.querySelector(".quiz-container");
var nameEl = document.querySelector(".name");
var scoreEl = document.querySelector(".score");
var saveEl = document.querySelector(".save-record");
var resetEl = document.querySelector(".reset");
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
    ,
    {
        question: `Properties in a JavaScript oject are often refferred to as what?`,
        answer: [
            `A. dot walking`,
            `B. key-value pairs`,
            `C. nested properties`,
            `D. undefined`
        ],
        correctAnswer: `B. key-value pairs`
    }
];

function init() {
    viewRecord();
}

// start timer
function startTimer() {
    timeCount = 90;
    startButton.disabled = true;
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
                event.preventDefault();

                if (element.innerText === questionList[questionCount].correctAnswer) {
                   score += 30; //+ 30 points for correct answer
                   commentEl.textContent = "Correct"
                }
                else {
                    score -= 15; // - 15 points for incorrect answer plus - 15 seconds to the timecount
                    timeCount = timeCount - 15;
                    commentEl.textContent = "InCorrect"
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
    quizcontainerEl.remove(); 
    saveRecord()
    goBack()

};
// save record
function saveRecord() {
    scoreEl.innerHTML = `You got ${score} points! Please enter your name to save: `;
    var nameInput = document.createElement('input');
    var saveBtn = document.createElement('input');
    nameInput.setAttribute("type", "text");
    saveBtn.setAttribute("type", "button");
    saveBtn.setAttribute("value", "Save");
    saveBtn.addEventListener("click", function(event) {
        event.preventDefault();
        var user = {
            yourName: nameInput.value,
            yourScores: score
        }
        localStorage.setItem("user", JSON.stringify(user));
        // console.log(user.yourName);
        // console.log(user.yourScores);
    })
    
    saveEl.append(saveBtn);
    scoreEl.append(nameInput);
    
}
// get the data from local saving
function renderRecord (){
    var lastScore = JSON.parse(localStorage.getItem("user"))
    if (localStorage.getItem("user") !== null) {
        nameEl.innerHTML =  `Your Name: ${lastScore.yourName}`;
        scoreEl.innerHTML = `Your Score: ${lastScore.yourScores}`;
    }
    else {
        resetEl.remove();
        nameEl.innerHTML =  `You have no recorded, please go back and start the quiz`;
        scoreEl.innerHTML = ``; 
    }
    goBack()
}
//display the score form local
function viewRecord (){
        viewscoresEl.addEventListener("click", function(event){
        event.preventDefault();
        headercontainerEl.remove();
        renderRecord ()
        clearRecord()
        })
}
//reset clear the score
function clearRecord () {
    var resetBtn = document.createElement('input');
    resetBtn.setAttribute("type", "button");
    resetBtn.setAttribute("value", "Reset");
    resetBtn.addEventListener("click", function(event) {
        event.preventDefault();
        nameEl.remove();
        scoreEl.remove();
        window.localStorage.removeItem("user");
    })
    resetEl.append(resetBtn)
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

init()