const headerEl = document.querySelector("header");
const headerColorText = headerEl.querySelector("#color");
const containerButtons = document.querySelector("#colors");
const playButtonEl = document.querySelector("#random-new-colors");
const feedbackMessageEl = document.querySelector("#message-feedback");

let buttonsEl = 0; // evitar bug do na hora de iniciar o jogo
let difficultyButtonsEl = document.querySelectorAll(".difficult button");
let difficulty = 5; // dificuldade padrão: hard


// mudar a dificuldade do jogo
difficultyButtonsEl.forEach(button => {
  button.addEventListener("click", () => {
    difficulty = button.value;

    difficultyButtonsEl[0].classList.toggle("active");
    difficultyButtonsEl[1].classList.toggle("active");

    return startGame();
  })
});

// Começar o jogo
startGame();
playButtonEl.addEventListener("click", startGame);


function startGame() {
  feedbackMessageEl.innerHTML = "";
  playButtonEl.innerText = "New Colors";

  // deletando todos os quadrados
  if (buttonsEl.length > 0) {
    for (let index = 0; index < buttonsEl.length; index++) {
      containerButtons.removeChild(buttonsEl[index]);
    }
  }

  // recriar os quadrados do zero
  createSquares(difficulty);
  buttonsEl = document.querySelectorAll(".square");

  // 1. seleciona um quadrado
  // 2. pega a cor do quadrado selecionado
  // 3. muda a cor do headerEl para a cor escolhida
  // 4. muda o texto do header para a cor escolhida
  const squareSelected = chosenSquare(difficulty); // retorna um número
  const colorSelected = buttonsEl[squareSelected].style.backgroundColor; // retorna uma cor

  headerEl.style.backgroundColor = colorSelected;
  headerColorText.textContent = colorSelected.toUpperCase();


  // quando é clicado em algum botão
  buttonsEl.forEach(button => {
    button.addEventListener('click', () => {
      if (button.value == squareSelected) {
        buttonsEl.forEach(button => {
          button.style.pointerEvents = "none";
          button.style.backgroundColor = colorSelected;
          button.style.visibility = 'visible';
          button.style.opacity = 1;
        });

        playButtonEl.innerText = "Play Again";
        return feedbackMessageEl.innerHTML = "Yeah! You win.";
      }


      else {
        button.style.pointerEvents = "none";
        button.style.opacity = 0;
        setTimeout(() => {
          button.style.visibility = "hidden";
        }, 250);

        return feedbackMessageEl.innerHTML = "Try Again!";
      }
    });
  });
};


// cria os quadrados
function createSquares(difficulty) {
  for (let index = 0; index <= difficulty; index++) {
    const newSquare = document.createElement("button");
    newSquare.classList.add("square");
    newSquare.value = index;

    newSquare.style.backgroundColor = randomColor();
    newSquare.style.pointerEvents = "auto";
    newSquare.style.visibility = "visible";
    newSquare.style.opacity = 1;

    containerButtons.appendChild(newSquare);
  }
};

// seleciona um quadrado
function chosenSquare(difficulty) {
  const round = Math.round, random = Math.random, s = difficulty;

  return round(random() * s);
}

// randomizando a cor rgb
function randomColor() {
  const round = Math.round; // coloca o número mais perto | ex: 0.7 é 1
  const random = Math.random; // 0 ou 1
  const s = 255;

  // arredondando um número * 255. ex: 0.63*255 = 160.65, arredondando para 161
  return `rgb(${round(random() * s)}, ${round(random() * s)}, ${round(random() * s)})`;
};