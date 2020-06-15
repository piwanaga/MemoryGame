const gameContainer = document.getElementById("game");


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter); 
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// CREATE DIVS FOR GAME
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(color, 'card');

    newDiv.addEventListener("click", handleCardClick);
    
    gameContainer.append(newDiv);
  }
}

// CLICKING CARDS
let revealedCards = [];
let cardCount = 0;
let guessCount = 0;
const guesses = document.querySelector('#guesses');



function handleCardClick(event) {
  cardCount ++;
  
  if (cardCount === 1) {
    let clickedCard = event.target;

    if (clickedCard.classList.contains('matched')){
      cardCount = 0;
    }
    
    else {
    clickedCard.style.backgroundColor = event.target.classList[0];
    clickedCard.classList.toggle('clicked');
    revealedCards.push(event.target.className);
    }
  }

  if (cardCount === 2) {
    let clickedCard = event.target;
    guessCount++;
    guesses.innerText = `Number of Guesses: ${guessCount}`;
    
    if (clickedCard.style.backgroundColor !== ''){
      cardCount = 1;
    }
    

    else {
    clickedCard.style.backgroundColor = event.target.classList[0];
    clickedCard.classList.toggle('clicked');
    revealedCards.push(event.target.className);

    if (revealedCards[0] !== revealedCards[1]){      
      setTimeout(function(){
      let clickedCards = document.querySelectorAll('.clicked');
      
      for (let cards of clickedCards){
      cards.style.backgroundColor = '';
      cards.classList.toggle('clicked');
      cardCount = 0;
      revealedCards = [];
      }
    }, 1000)
    }
     
    

    else {
      let clickedCards = document.querySelectorAll('.clicked');
      
      for (let cards of clickedCards){
      cards.classList.toggle('clicked');
      cards.classList.add('matched');
      cardCount = 0;
      revealedCards = [];
      }
    }
  }    
  }
}

// NEW GAME BUTTON
const newGameButton = document.querySelector('#new-game-button');

newGameButton.addEventListener('click',function(){
  revealedCards = [];
  cardCount = 0;
  guessCount = 0;
  guesses.innerText = `Number of Guesses: ${guessCount}`;
  shuffle(COLORS);

  let cards = document.querySelectorAll('.card');
  for (let i=0; i<COLORS.length; i++){
    cards[i].style.backgroundColor='';
    cards[i].className='';
    cards[i].classList.add(COLORS[i], 'card');
  }
})




// when the DOM loads
createDivsForColors(shuffledColors);
