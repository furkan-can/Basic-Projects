const words = ["CSS", "JAVASCRIPT", "HTML", "REACT", "ANGULAR"];
const retryButton = document.querySelector(".retry");

startGame();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function startGame() {
  retryButton.classList.add("not-displayed");
  const word = words[getRandomInt(words.length)];
  const wordArray = word.split("");
  for (let i = 0; i < wordArray.length; i++) {
    const letter = document.createElement("div");
    letter.textContent = wordArray[i];
    letter.classList.add("letter");
    letter.classList.add("hide");
    const phrase = document.querySelector(".word");
    phrase.appendChild(letter);
  }
}

function showLetter(index) {
  const letter = document.querySelectorAll(".letter")[index];
  letter.classList.remove("hide");
  letter.classList.add("show");
}

function checkLetter(letter) {
  const letters = document.querySelectorAll(".letter");
  let correct = false;
  for (let i = 0; i < letters.length; i++) {
    if (letter === letters[i].textContent) {
      showLetter(i);
      correct = true;
    }
  }
  return correct;
}

function checkWin() {
  const hide = document.querySelectorAll(".hide");
  if (hide.length === 0) {
    // overlay.classList.add('win');
    // overlay.style.display = 'flex';
    // title.textContent = 'You Win!';
    alert("You Win!");
    retryButton.classList.remove("not-displayed");
  }
}

function checkLose() {
  const tries = document.querySelectorAll(".dead");
  if (tries.length === 0) {
    // overlay.classList.add('lose');
    // overlay.style.display = 'flex';
    // title.textContent = 'You Lose!';
    alert("You Lose!");
    retryButton.classList.remove("not-displayed");
  }
}

function removeLife() {
  const tries = document.querySelectorAll(".dead");
  const lastTry = tries[0];
  lastTry.classList.remove("not-displayed");
  lastTry.classList.remove("dead");
}

function showWrongLetter(letter) {
  const wrongLetter = document.createElement("span");
  wrongLetter.textContent = letter + ", ";
  wrongLetter.classList.add("wrong-letter");
  const wrongLetters = document.querySelector(".wrong-letter-container");
  wrongLetters.appendChild(wrongLetter);
}

function controlSameLetter(letter) {
  const wrongLetters = document.querySelectorAll(".wrong-letter");
  const correctLetters = document.querySelectorAll(".show");
  const controlLetters = [...wrongLetters, ...correctLetters];
  for (let i = 0; i < controlLetters.length; i++) {
    if (letter === controlLetters[i].textContent.charAt(0)) {
      alert("You already tried this letter!");
      return true;
    }
  }
  return false;
}

document.addEventListener("keydown", (e) => {
  const letter = e.key.toUpperCase();
  if (
    letter.length === 1 &&
    letter.match(/[a-z]/i) &&
    !controlSameLetter(letter)
  ) {
    const correct = checkLetter(letter);
    if (!correct) {
      removeLife();
      showWrongLetter(letter);
    }
    checkWin();
    checkLose();
  }
});

function clearGame() {
  const letters = document.querySelectorAll(".letter");
  for (let i = 0; i < letters.length; i++) {
    letters[i].remove();
  }
  const wrongLetters = document.querySelectorAll(".wrong-letter");
  for (let i = 0; i < wrongLetters.length; i++) {
    wrongLetters[i].remove();
  }
  const tries = document.querySelectorAll(".human");
  for (let i = 0; i < tries.length; i++) {
    tries[i].classList.add("not-displayed");
    tries[i].classList.add("dead");
  }
  console.log(tries);
}

retryButton.addEventListener("click", () => {
  clearGame();
  startGame();
});
