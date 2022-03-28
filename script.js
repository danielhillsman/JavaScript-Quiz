//----creating Vars using let and const-----//
let timer = 90;
let runningTimer;
let score = 0;
let username = "";
let qNumber;
let finalScore;
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const startButton = document.getElementById("startButton");
const qContainer = document.getElementById("questionsContainer");
const qElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const countdown = document.getElementById("timerArea");
const scoreArea = document.getElementById("scoreArea");
const highScoresButton = document.getElementById("showScoresButton");
//-----Click buttons using addEventLister(s)-----//
startButton.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayScores);

//----Start Game----//
function startGame() {

  startButton.classList.add("hide");
  scoreArea.classList.add("hide");
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  scoreArea.innerHTML = "";
  startClock();

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[qNumber]);
}
//----Run timer for quiz----//
function startClock() {

  countdown.innerHTML = timer + " seconds remaining. . .";

  if (timer <= 0) {

    gameOver();

  } else {

    timer -= 1;
    runningTimer = setTimeout(startClock, 1000);
  }
}
//----Clears the quiz after completion or fail and straight to score board----/
function clearQuestion() {
    
  while (answerButtons.firstChild) {

    answerButtons.removeChild(answerButtons.firstChild);
  }
}
//----Function if user get all question wrong,-------------//
//----the score will be set to 0 and the game will end-----//
function gameOver() {

  clearInterval(runningTimer);
  countdown.innerHTML = "Finished";
  clearQuestion();
  showResults();
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
  timer = 90;
  score = 0;
} 
  function showResults() {

    finalScore = timer;

    if (finalScore < 0) {
    finalScore = 0;
  }

  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  answerButtons.classList.add("hide");
  scoreArea.innerHTML = `Your score is ${finalScore}!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
  username = document.getElementById("initials");
  saveButton = document.getElementById("save-btn");

  username.addEventListener("keyup", function() {

    saveButton.disabled = !username.value;
  });
}
//----Function to run answers if true or false----/
function selectAnswer(e) {
    
  const selectedButton = e.target;

  if (!selectedButton.dataset.correct) {
    timer = timer - 18;
    console.log(timer);
  }

  if (qNumber == questions.length - 1) {
    gameOver();

  } else {

    clearQuestion();
    qNumber++;
    showQuestion(questions[qNumber]);
    console.log(score);
  }
}
function showQuestion(question) {

  qElement.innerText = question.question;

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}
//---- 5 Javascript Questions ----//
const questions = [
  {
    question: "Where is the correct place to insert JavaScript?",
    answers: [
      { text: "The Head Section", correct: false },
      { text: "The Body Section", correct: false },
      { text: "In an External File", correct: false },
      { text: "All of the Above", correct: true }
    ]
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'msg("Hello World");', correct: false },
      { text: 'prompt("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false },
      { text: 'alert("Hello World");', correct: true }
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function myFunction()", correct: true },
      { text: "function = myFunction()", correct: false },
      { text: "make.function.myFunction()", correct: false },
      { text: "function:myFunction()", correct: false }
    ]
  },
  {
    question: "!= means what in javascript?",
    answers: [
      { text: "Or", correct: false },
      { text: "And", correct: false },
      { text: "Plus and Equal To", correct: false },
      { text: "Not Equal To", correct: true }
    ]
  },
  {
    question: "What Characters Contains an Array?",
    answers: [
      { text: "< >", correct: false },
      { text: "{ }", correct: false },
      { text: "[ ]", correct: true },
      { text: "# #", correct: false }
    ]
  }
];
//----Function to Display Scores with initals----//
function displayScores() {

  clearInterval(runningTimer);
  countdown.innerHTML = "";
  clearQuestion();
  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  scoreArea.innerHTML = `<h2>High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = highScores

    .map(score => {

      return `<li class="scoresList">${score.name} - ${score.score}</li>`;
    })

    .join("");
  startButton.classList.remove("hide");
  highScoresButton.classList.add("hide");
}
//----Function to Save scores to local storage----//
function submitScores() {

  const score = {

    score: finalScore,
    name: username.value
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScores();
}
//----Function clear entire high score----/
function clearScores() {
  localStorage.clear();

  highScores = [];
  highScoresList.innerHTML =
  "<h3>Scores have been cleared!</h3>";
  document.getElementById("clearScores").classList.add("hide");

}