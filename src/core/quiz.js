import { questions } from '../data/questions.js';
import { questionEl, optionsEl, nxtbtn, prvbtn, progressEl, infoEl, scoreEl, hintEl, skipEl, submitBtn, navItems } from '../utils/dom.js';

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
  optionsEl[clickedOption].classList.toggle('active');
  console.log('user chose: ', clickedOption);
  return clickedOption;
}

export async function displayQuesAndCheckCorrectAnswer(index = 0) {
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

  return { index };
}

let currIndex = 0;

export function initQuiz() {
  displayQuesAndCheckCorrectAnswer(currIndex);

  nxtbtn.addEventListener('click', () => {
    if (currIndex < questions.length - 1) {
      currIndex++;
      optionsEl.forEach((btn) => btn.classList.remove('active'));
      displayQuesAndCheckCorrectAnswer(currIndex);
    } else {
      infoEl.textContent = 'End of quiz';
    }
  });

  prvbtn.addEventListener('click', () => {
    if (currIndex > 0) {
      currIndex--;
      optionsEl.forEach((btn) => btn.classList.remove('active'));
      displayQuesAndCheckCorrectAnswer(currIndex);
    } else {
      infoEl.innerText = 'This is the first ques..';
    }
  });
}
