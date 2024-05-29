const hint = document.getElementById("hint");
const hint2 = document.getElementById("hint2");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");
const bar = document.getElementById('bar');
const sad = document.getElementById('sad');
const help = document.getElementById('help');
const close = document.getElementById('close');
const modal = document.getElementById('modal');
const confetti = document.getElementById('confetti');

let answer, noOfGuesses, guessedNumsArr;

const play = () => {
  const userGuess = guessInput.value;
  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }
  noOfGuesses -= 1;
  // guessing bar
  if(noOfGuesses === 2){
    bar.style.width = '40%';
  }else if(noOfGuesses === 1){
    bar.style.width = '80%';
  }
  else{
    bar.style.width = '100%';
    hint2.innerHTML = `Game Over<br>You finished your guess.<br>`;
    hint2.classList.add("err");
    game.style.display = "none";
    restartButton.style.display = "block";
    restartButton.innerHTML = "Try Again"
    sad.style.display = 'block'
    confetti.style.display = 'none';
  }
  if (userGuess != answer) {
    if (userGuess < answer) {
      hint.innerHTML = "Too low. Try Again!";
    } else {
      hint.innerHTML = "Too high. Try Again!";
    }
    noOfGuessesRef.innerHTML = `${noOfGuesses} `;
    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);
  } else {
    hint2.innerHTML = `Congratulations!<br>The number was <span>${answer}</span>.`;
    hint2.classList.add("success");
    game.style.display = "none";
    restartButton.style.display = "block";
    restartButton.innerHTML = "Restart";
    sad.style.display = 'none'
    confetti.style.display = 'block';
    setTimeout(() =>{
      confetti.style.display = 'none';
    }, 4500)
  }
};

const init = () => {
  console.log("Game Started");
  answer = Math.floor(Math.random() * 100) + 1;
  console.log(answer);
  noOfGuesses = 3;
  bar.style.width = '0%';
  // noOfGuesses = 0;
  noOfGuessesRef.innerHTML = "3";
  guessInput.value = "";
  hint.classList.remove("success", "error");
  hint2.classList.remove("success", "error");
};

guessInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    play();
  }
  if(['e', 'E'].includes(event.key)){
    event.preventDefault()
  }
});

restartButton.addEventListener("click", () => {
  game.style.display = "flex";
  restartButton.style.display = "none";
  hint.innerHTML = "";
  hint.classList.remove("success", "error");
  hint2.innerHTML = "";
  hint2.classList.remove("success");
  sad.style.display = 'none'
  confetti.style.display = 'none';
  init();
});

checkButton.addEventListener("click", play);
window.addEventListener("load", init);

// modal
help.addEventListener('click', () =>{
  modal.style.display = 'flex'
})
close.addEventListener('click', () =>{
  modal.style.display = 'none'
})