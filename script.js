import { questions } from './data/questions.js';

let questionEl = document.getElementById('question');
let optionsEl = document.querySelectorAll('.option-btn');
let nxtbtn = document.getElementById('next-btn');
let prvbtn = document.getElementById('prev-btn');
let progressEl = document.getElementById('progress-text');
let infoEl = document.getElementById('info-text');
let scoreEl = document.getElementById('score');
let hintEl = document.getElementById('hint-btn');
let skipEl = document.getElementById('skip-btn');
let submitBtn = document.getElementById('submit-btn');
let navItems = document.querySelectorAll('.nav-item');

const waitForOptionClick = function (options) {
  return new Promise((resolve) => {
    const handler = (index) => {
      options.forEach((btn, i) => {
        btn.removeEventListener('click', btn._handler);
      });
      resolve(index);
    };

    options.forEach((option, index) => {
      option._handler = () => handler(index);
      option.addEventListener('click', option._handler);
    });
  });
};

async function userChoseOption() {
  console.log('waiting for user to click');
  const clickedOption = await waitForOptionClick(optionsEl);
  console.log('user chose: ', clickedOption);
  return clickedOption;
}
// let isAnswered = false;
async function displayQuesAndCheckCorrectAnswer(index = 0) {
  // isAnswered = false;
  questionEl.innerText = questions[index].question;

  optionsEl[0].innerText = questions[index].options[0];
  optionsEl[1].innerText = questions[index].options[1];
  optionsEl[2].innerText = questions[index].options[2];
  optionsEl[3].innerText = questions[index].options[3];

  const correctAnswer = questions[index].answer;
  console.log(correctAnswer);
  progressEl.textContent = `Question: ${index + 1} / ${questions.length}`;
  infoEl.textContent = `Please choose an answer`;
  navItems.forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  const userAnswer = await userChoseOption();
  // isAnswered = true;

  if (correctAnswer === userAnswer) {
    infoEl.innerText = 'Answer is correct';
  } else {
    infoEl.innerText = 'Wrong Answer';
  }

  return { index };
}

let currIndex = 0;

nxtbtn.addEventListener('click', () => {
  // if (!isAnswered) return;

  if (currIndex < questions.length - 1) {
    currIndex++;
    displayQuesAndCheckCorrectAnswer(currIndex);
  } else {
    infoEl.textContent = 'End of quiz';
  }
});

prvbtn.addEventListener('click', () => {
  // if (!isAnswered) return;
  if (currIndex > 0) {
    currIndex--;
    displayQuesAndCheckCorrectAnswer(currIndex);
  } else {
    infoEl.innerText = 'This is the first ques..';
  }
});

const startQuiz = function () {
  displayQuesAndCheckCorrectAnswer(currIndex);
};

startQuiz();
