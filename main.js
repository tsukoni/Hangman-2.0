//executes game and contains all the user inputs
var inquirer = require('inquirer');
var words = require('./songs.js');
var display = require('./letter.js');
var storage = require('./word.js');
var currentWord;
var remainingGuesses = 12;
var wins = 0;
var losses = 0;
var showPlayer = [];
var checkLetter = [];
var wordsPlayed = [];

function selectRandomWord() {
    var x = Math.floor(Math.random() * words.length)
    currentWord = words[x];
    //only allows words which have not been played in the current session
    if (wordsPlayed.includes(currentWord)) {
        selectRandomWord();
    } else {
        showPlayer = new letterDisplay(currentWord);
        checkLetter = new wordStorage(currentWord);
    }
    wordsPlayed.push(currentWord);
    console.log('');
    console.log(currentWord);
    //comment out when actually playing or cheat
    console.log('');
    showPlayer.displayLetters();
    console.log('');
}

var guessLetters = function() {
    if (remainingGuesses > 0) {
        inquirer.prompt([{
            name: 'currentGuess',
            message: 'Guess a letter'
        }]).then(function(answer) {
            var letter = answer.currentGuess.toLowerCase();
            var letters = /^[a-z]+$/;
            //checks if answer is actually a letter
            if (letter.match(letters)) {
                //uses match which returns first matching instance as an array
                if (checkLetter.lettersGuessed.includes(letter)) {
                    //uses includes to check if letter has already been guessed
                    console.log('');
                    console.log('================================');
                    console.log('');
                    console.log('You have already guessed ' + letter);
                    console.log('');
                    showPlayer.updateLetters(letter);
                    console.log('');
                    console.log('Letters Guessed: ' + checkLetter.lettersGuessed);
                    console.log('');
                    console.log('Guesses Remaining: ' + remainingGuesses);
                    console.log('');
                    console.log('================================');
                    console.log('');
                    guessLetters();
                } else {
                    checkLetter.lettersGuessed.push(letter);
                    if (checkLetter.currentWordArray.includes(letter)) {
                        console.log('');
                        console.log('================================');
                        console.log('');
                        console.log('Good guess');
                        console.log('');
                        showPlayer.updateLetters(letter);
                        if (showPlayer.updated == currentWord) {
                            wins++;
                            console.log('');
                            console.log('You Win!');
                            console.log('');
                            console.log('Number of wins: ' + wins);
                            console.log('');
                            console.log('Number of losses: ' + losses);
                            console.log('');
                            restartGame();
                        } else {
                            console.log('');
                            console.log('Letters Guessed: ' + checkLetter.lettersGuessed);
                            console.log('');
                            console.log('Guesses Remaining: ' + remainingGuesses);
                            console.log('');
                            console.log('================================');
                            console.log('');
                            guessLetters();
                        }
                    } else {
                        console.log('');
                        console.log('================================');
                        console.log('');
                        console.log('Bad guess');
                        console.log('');
                        showPlayer.updateLetters(letter);
                        remainingGuesses--;
                        console.log('');
                        console.log('Letters Guessed: ' + checkLetter.lettersGuessed);
                        console.log('');
                        console.log('Guesses Remaining: ' + remainingGuesses);
                        console.log('');
                        console.log('================================');
                        console.log('');
                        guessLetters();
                    }
                }
            } else {
                console.log('');
                console.log('Please select an alphabetic character');
                console.log('');
                guessLetters();
                //resets function if not a letter
            }
        });
    } else {
        losses++;
        console.log('');
        console.log('You Lose!');
        console.log('The song type you wanted was: ' + currentWord);
        console.log('');
        console.log('Number of wins: ' + wins);
        console.log('Number of losses: ' + losses);
        console.log('');
        restartGame();
    }
}

function restartGame() {
    inquirer.prompt([{
        name: 'play',
        message: 'Play Again? (y or n)'
    }]).then(function(answer) {
        var confirm = answer.play.toLowerCase();
        if (confirm == 'y') {
            remainingGuesses = 12;
            currentWord = '';
            checkLetter.lettersGuessed = [];      
            checkLetter.currentWordArray = [];
            selectRandomWord();
            showPlayer.arrayOfDashes = [];
            showPlayer.displayLetters();
            guessLetters();
        } else if (confirm == 'n') {
            console.log('');

            console.log('Thanks for playing!');
            console.log('');

        } else {

            console.log('');
            console.log('Please select \'y\' or \'n\'');
            console.log('');

            restartGame();
        }
    })
};

selectRandomWord();
//initializes first word of game

guessLetters();
//starts the game