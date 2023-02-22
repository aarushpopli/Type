window.addEventListener('load', init);

const currentLevel = 5;

let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
    'stubborn',
    'cocktail',
    'runaway',
    'hero',
    'echo',
    'javascript',
    'siblings',
    'symptom',
    'laughter',
    'magic',
    'space',
    'definition',
    'master',
    'establishment',
    'joke',
    'investigate',
    'horrendous',
    'revolver',
    'nutrition',
    'developer',
    'awaken',
    'flask',
    'lucky',
    'river',
    'generate',
    'statue',
    'hat',
    'good',
    'worse',
    'house',
    'better',
    'worst',
    'best',
    'worse',
    'manager',
    'channel',
    'motherboard',
    'container',
    'medicine',
    'printer'
];

// Initialize Game
function init() {
  // Show number of seconds
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }
  
  // Set high score
  if (typeof localStorage['highscore'] === 'undefined' || score > localStorage['highscore']) {
    localStorage['highscore'] = score;
  } else {
    localStorage['highscore'] = localStorage['highscore'];
  }

  if (localStorage['highscore'] >= 0) {
  highscoreDisplay.innerHTML = localStorage['highscore'];
  }

  // Set score
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match
function matchWords() {
  if (wordInput.value.trim() === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Select random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Timer
function countdown() {
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game over
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
  }
}

const savedHighScore = localStorage.getItem("highscore") || 0;
document.getElementById("highscore").innerHTML = savedHighScore;