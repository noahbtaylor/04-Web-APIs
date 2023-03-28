let header = document.querySelector("header"); //here I selected my header element
let home = document.getElementsByClassName("start-container"); //here I selected my start container
let questionContainer = document.getElementById("question-container"); // here I selected my question container
let startBtn = document.getElementById("start-button"); //here I selected my start button element
let nextBtn = document.getElementById("next-btn");
let questionEL = document.getElementById("question"); //selected my question div
let answerBtnEL = document.getElementById("answer-buttons"); //selected my answer buttons
// let submitButton = document.getElementById("submit"); //select my submit button
let timer = document.querySelector(".time"); //here I selected my time element
let body = document.querySelector("body");
let title = document.querySelector("h1"); //here I selected my h1
let rules = document.querySelector("p"); //here I selected my p
let container = document.querySelector(".container");

let answerButtons = document.querySelectorAll("btn");

let shuffledQuestions, currentQuestionsIndex;
var time = 60;
let playerScore = 0; //start my score with 0

let countdown = function () {
  //here is my countdown function that sets my time
  var timeInterval = setInterval(function () {
    if (time >= 0) {
      timer.textContent = time;
      time--;
    } else {
      timer.textContent = "Game is Over, Try Again";
      clearInterval(timeInterval);
    }
  }, 1000);
};

function startQuiz() {
  //.here I have my start quiz function
  startBtn.classList.add("hide"); //I add the hide class to my start Btn, to have it not show once the quiz starts
  title.classList.add("hide"); // Do the same for my h1 tag
  rules.classList.add("hide"); //Do the same for my p tag
  questionContainer.classList.remove("hide"); //I remove the hide class for my question container so it can show
  shuffledQuestions = questions.sort(() => Math.random() - 0.5); //here I selected my shuffled Questions Array and sorted them to be random so when prompt they are not in one order
  currentQuestionsIndex = 0; //starting at the first question in our shuffledQuestionsArray
  setNextQuestion(); //calls the function that displays my next question
  countdown(); //call my timer to execute
  setForm();
}

function setNextQuestion() {
  //here is my function that sets mny next question
  resetState();
  showQuestion(shuffledQuestions[currentQuestionsIndex]); //grabs my showQuestion function and sets the shuffled questions at [0]
}

function showQuestion(question) {
  //takes in a question in
  questionEL.innerText = question.question; //adds the question text to my question div
  question.answers.forEach((answer) => {
    //here I loop through each of my answers
    const button = document.createElement("button"); //create a button for however many answers there is
    button.innerText = answer.text; //here I add the answer text to each button
    button.classList.add("btn"); //here i add the btn class to each button created
    if (answer.correct) {
      //here I check if the answer is correct
      button.dataset.correct = answer.correct; //and if it is, it will change the dataset of the button to correct
    }
    button.addEventListener("click", selectAnswer); //add an Event listener to the correct button which
    answerBtnEL.appendChild(button); //add it to my answer element div
  });
}

function selectAnswer(e) {
  //this function helps me select my answer
  const selectedButton = e.target; //targets whatever we click on
  const correct = selectedButton.dataset.correct; //variable called correct that contains our button with a data set of correct
  setStatusClass(document.body, correct);
  Array.from(answerBtnEL.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  console.log(currentQuestionsIndex);
  if (currentQuestionsIndex + 1 < shuffledQuestions.length) {
    //checks if we have more questions than the one we are on
    nextBtn.classList.remove("hide"); //if so show the next Btn
  } else {
    //if not than change the startBtn to restart and remove the hide class which makes it appear
    // startBtn.innerText = "Submit";
    // startBtn.classList.remove("hide");
    time = 0;
    questionContainer.classList.add("hide");
    document.querySelector("#form-container").classList.remove("hide");
    console.log("Hello");
  }

  if (!correct) {
    //if the answer clicked that is not correct than it decreases the time by ten seconds on the countdown
    time -= 10;
    timer.textContent = time;
  } else {
    playerScore += 10;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function resetState() {
  nextBtn.classList.add("hide"); //adds the hide class to my next button
  while (answerBtnEL.firstChild) {
    //a while loop that checks if there is a child inside the answer elements than remove the first child for it (clears the previous amount of buttons)
    answerBtnEL.removeChild(answerBtnEL.firstChild);
  }
}

function handleAnswerClick(event) {
  // Get the correct answer string
  let correctAnswer = getCorrectAnswer(currentQ);
  // Compare to user click
  if (event.target.textContent === correctAnswer) {
    currentScore += 10;
    // color indicates correct choice
    event.target.classList.add("correct");
  } else {
    secondsLeft -= 10;
    // color indicates wrong choice
    event.target.classList.add("wrong");
  }
  // Wait 0.5 sec, reset btn color, go to next question
  setTimeout(() => {
    event.target.className = "btn";
    nextQuestion();
  }, 500);
}

var br = document.createElement("br");
let score = document.createElement("span");

let setForm = function () {
  console.log("setForm");
  let newDiv = document.createElement("div");

  newDiv.setAttribute("id", "formDiv");

  let highScore = document.createElement("h1");
  highScore.setAttribute("id", "score-text");
  //this is where I will get my score to show up when I find a way to keep score

  newDiv.append(highScore);
  newDiv.append(br.cloneNode());
  newDiv.append(score);
  newDiv.append(br.cloneNode());
  highScore.textContent = "Your score was:";
  score.setAttribute("id", "score-span");
  score.textContent = playerScore;

  let form = document.createElement("form");
  form.setAttribute("id", "form-input");
  newDiv.append(form);

  let nameInput = document.createElement("label");
  let type = document.createElement("input");
  let submitButton = document.createElement("input");

  form.append(nameInput);
  form.append(type);
  newDiv.append(br.cloneNode());
  form.append(submitButton);

  nameInput.setAttribute("for", "initials");

  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Submit");
  type.setAttribute("for", "text");
  type.setAttribute("id", "initials");

  nameInput.textContent = "Enter Your Initials ";
  document.querySelector("#form-container").append(newDiv);
};

//Setting up local storage

const form = document.getElementById("form-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const initials = document.getElementById("initials").value;
  const playerScore = document.getElementById("score-span").textContent;
  const scoreObj = { initials, playerScore };
  console.log(scoreObj);
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  scores.push(scoreObj);

  localStorage.setItem("scores", JSON.stringify(scores));

  scores.forEach((score) => {
    const scoreList = document.createElement("ul");
    scoreList.setAttribute("id", "score-list");
    scoreList.textContent = `${score.initials}: ${score.playerScore}`;
    document.getElementById("scores-list").appendChild(scoreList);
    document.getElementById("scores-list").classList.remove("hide");
  });
  form.classList.add("hide");
});

let restartBtn = document.createElement("button");
document.getElementById("scores-list").appendChild(restartBtn);
restartBtn.textContent = "Restart Quiz";
restartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetQuiz();
});

function resetQuiz() {
  shuffledQuestions = null;
  currentQuestionsIndex = 0;
  playerScore = 0;
  time = 60;
  // clearInterval(timeInterval);
  startBtn.classList.remove("hide"); //I add the hide class to my start Btn, to have it not show once the quiz starts
  title.classList.remove("hide"); // Do the same for my h1 tag
  rules.classList.remove("hide"); //Do the same for my p tag
  document.getElementById("scores-list").textContent = "";
  document.getElementById("formDiv").remove();
  resetState();
}

let highScores = document.getElementById("high-scores");

highScores.addEventListener("click", function () {
  startBtn.classList.add("hide"); //I add the hide class to my start Btn, to have it not show once the quiz starts
  title.classList.add("hide"); // Do the same for my h1 tag
  rules.classList.add("hide"); //Do the same for my p tag
  document.getElementById("scores-list").classList.remove("hide");
  console.log("HighScores was clicked");
});

const questions = [
  //my questions array with objects for each index, did this to be able to seperate my questions and answer choices, I add a boolean value to each answer choice to know which one is right or wrong
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<javascript>", correct: false },
      { text: "<js>", correct: false },
      { text: "<scripting>", correct: false },
    ],
  },

  {
    question: "Where is the correct place to insert a JavaScript file?",
    answers: [
      { text: "The <body> section", correct: true },
      { text: "the <head> section", correct: false },
    ],
  },
  {
    question: "The external JavaScript file must contain the <script> tag",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "How does a WHILE loop start?",
    answers: [
      { text: "while i= 1 to 10", correct: false },
      { text: "while (i<=10)", correct: true },
      { text: "while(i<+10; i++)", correct: false },
    ],
  },
  {
    question: "How can you add a comment in a JavaScript?",
    answers: [
      { text: "<!--This is a comment -->", correct: false },
      { text: "//This is a comment", correct: true },
      { text: "This is a comment", correct: false },
    ],
  },
];

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestionsIndex++; //increments to next question
  score.textContent = playerScore;
  setNextQuestion(); //also sets the next question
});