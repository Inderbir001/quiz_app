const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language",
    ],
    answer: 1,
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyper>"],
    answer: 1,
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: 2,
  },
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: 2,
  },
  {
    question: "Which CSS property is used to change background color?",
    options: ["color", "bgcolor", "background-color", "background-style"],
    answer: 2,
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["styles", "class", "font", "style"],
    answer: 3,
  },
  {
    question: "How do you select an element with id 'main' in CSS?",
    options: [".main", "#main", "*main", "main"],
    answer: 1,
  },
  {
    question: "Which property is used to make text bold in CSS?",
    options: ["font-weight", "text-bold", "font-style", "bold"],
    answer: 0,
  },
  {
    question: "Which HTML tag is used to insert an image?",
    options: ["<image>", "<img>", "<pic>", "<src>"],
    answer: 1,
  },
  {
    question: "Which CSS property controls the spacing between elements?",
    options: ["padding", "margin", "spacing", "border-spacing"],
    answer: 1,
  },
];

let questionEl = document.getElementById("question");
let optionsEl = document.querySelectorAll(".option-btn");
let nxtbtn = document.getElementById("next-btn");
let prvbtn = document.getElementById("prev-btn");
let progressEl = document.getElementById("progress-text");
let infoEl = document.getElementById("info-text");

const waitForOptionClick = function (options) {
  return new Promise((resolve) => {
    const handler = (index) => {
      options.forEach((btn, i) => {
        btn.removeEventListener("click", btn._handler);
      });
      resolve(index);
    };

    options.forEach((option, index) => {
      option._handler = () => handler(index);
      option.addEventListener("click", option._handler);
    });
  });
};

async function userChoseOption() {
  console.log("waiting for user to click");
  const clickedOption = await waitForOptionClick(optionsEl);
  console.log("user chose: ", clickedOption);
  return clickedOption;
}
let isAnswered = false;
async function displayQuesAndCheckCorrectAnswer(index = 0) {
  isAnswered = false;
  questionEl.innerText = questions[index].question;

  optionsEl[0].innerText = questions[index].options[0];
  optionsEl[1].innerText = questions[index].options[1];
  optionsEl[2].innerText = questions[index].options[2];
  optionsEl[3].innerText = questions[index].options[3];

  const correctAnswer = questions[index].answer;
  console.log(correctAnswer);
  progressEl.textContent = `Question: ${index + 1} / ${questions.length}`;
  infoEl.textContent = `Please Choose a Option`;

  const userAnswer = await userChoseOption();
  isAnswered = true;

  if (correctAnswer === userAnswer) {
    infoEl.innerText = "Answer is correct";
  } else {
    infoEl.innerText = "Wrong Answer";
  }

  return { index };
}

let currIndex = 0;

nxtbtn.addEventListener("click", () => {
  if (!isAnswered) return;

  if (currIndex < questions.length - 1) {
    currIndex++;
    displayQuesAndCheckCorrectAnswer(currIndex);
  } else {
    infoEl.textContent = "End of quiz";
  }
});

prvbtn.addEventListener("click", () => {
  if (!isAnswered) return;
  if (currIndex > 0) {
    currIndex--;
    displayQuesAndCheckCorrectAnswer(currIndex);
  } else {
    infoEl.innerText = "This is the first ques..";
  }
});

const startQuiz = function () {
  displayQuesAndCheckCorrectAnswer(currIndex);
};

startQuiz();
