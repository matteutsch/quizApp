let questions = [
  {
    question: "Welches der folgenden Beispiele endet in zwei Zeilen?",
    answer_1: "1 2 3",
    answer_2: "Titel &#92nBeschreibung",
    answer_3: "Eins &#92nZwei &#92nDrei",
    answer_4: "Erste Zeile /Zweite Zeile",
    right_answer: 2,
  },
  {
    question:
      "Das `switch-statement` kann verwendet werden um was zu ersetzen?",
    answer_1: "Zuweisung von Variablen",
    answer_2: "Die For-Schleife",
    answer_3: "Kommentare",
    answer_4: "If-Else Abfragen",
    right_answer: 4,
  },
  {
    question: "Zwei Sternchen ** werden verwendet, als...?",
    answer_1: "Nichts",
    answer_2: "Kurzform für *2",
    answer_3: "Kurzform für Wurzel ziehen",
    answer_4: "Kurzform für Potenzierung ( x**y = x^y )",
    right_answer: 4,
  },
  {
    question:
      "Welches der folgenden Beispiele ist ein gültiges JavaScript Kommentar?",
    answer_1: "// dieses",
    answer_2: "&#92&#92 das hier",
    answer_3: "<&excl;-- vielleicht das hier? -->",
    answer_4: "# oder das ?",
    right_answer: 1,
  },
  {
    question: "Variablen sind...?",
    answer_1: "Werte",
    answer_2: "Container zum Speichern von Werten",
    answer_3: "Funktionen",
    answer_4: "Container für Kommentare",
    right_answer: 2,
  },
  {
    question: "Welches der folgenden Datentypen ist ein Boolean?",
    answer_1: "&quot;true&quot;",
    answer_2: "&quot;string&quot;",
    answer_3: "false",
    answer_4: "31",
    right_answer: 3,
  },
];

let currentQuestion = 0;
let correctQuestions = 0;
let AUDIO_SUCCESS = new Audio("audio/success.mp3");
let AUDIO_FAIL = new Audio("audio/fail.mp3");

function init() {
  document.getElementById("questions-length").innerHTML = questions.length;

  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateNextQuestion();
    updateProgressBar();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndScreen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("questionBody").style = "display:none;";

  document.getElementById("qstn-length").innerHTML = questions.length;
  document.getElementById("correct-answers").innerHTML = correctQuestions;

  document.getElementById("header-img").src = "img/pexels.end.jpg";
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round((percent *= 100));

  document.getElementById("progressBar").innerHTML = `${percent}%`;
  document.getElementById("progressBar").style = `width: ${percent}%;`;
}

function updateNextQuestion() {
  let question = questions[currentQuestion];

  document.getElementById("question-number").innerHTML = currentQuestion + 1;
  document.getElementById("questionText").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (rightAnswerSelected(selectedQuestionNumber)) {
    document.getElementById(selection).classList.add(`bg-success`);
    correctQuestions++;
    console.log("correct");
    AUDIO_SUCCESS.play();
  } else {
    console.log("wrong");
    document.getElementById(selection).classList.add(`bg-danger`);
    document.getElementById(idOfRightAnswer).classList.add(`bg-success`);
    AUDIO_FAIL.play();
  }
  document.getElementById("next-btn").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
  let question = questions[currentQuestion];
  return selectedQuestionNumber == question["right_answer"];
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-btn").disabled = true;
  resetEffects();
  showQuestion();
}

function resetEffects() {
  document.getElementById("answer_1").classList.remove(`bg-success`);
  document.getElementById("answer_1").classList.remove(`bg-danger`);
  document.getElementById("answer_2").classList.remove(`bg-success`);
  document.getElementById("answer_2").classList.remove(`bg-danger`);
  document.getElementById("answer_3").classList.remove(`bg-success`);
  document.getElementById("answer_3").classList.remove(`bg-danger`);
  document.getElementById("answer_4").classList.remove(`bg-success`);
  document.getElementById("answer_4").classList.remove(`bg-danger`);
}

function restartQuiz() {
  document.getElementById("header-img").src = "img/triangles.png";
  document.getElementById("endScreen").style = "display: none"; //endscreen ausblenden
  document.getElementById("questionBody").style = ""; //questionbody wieder anzeigen
  currentQuestion = 0; //arrays zurücksetzen
  correctQuestions = 0; //arrays zurücksetzen

  init();
}
