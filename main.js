$(document).ready(function () {
    /*() => {} */
    var availableLetters, words, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters, lives, currentWord, numLettersMatched, messages;

    function setup() {

        availableLetters = "abcdefghijklmnopqrstuvwxyz";
        lives = 5;
        words = ["cat", "dog", "cow", "reindeer"];
        messages = {
            win: 'You win!',
            lose: 'Game over!',
            guessed: ' already guessed, please try again...',
            validLetter: 'Please enter a letter from A-Z'
        };

        lettersGuessed = '';
        lettersMatched = '';
        numLettersMatched = 0;

        //choose word
        currentWord = words[Math.floor(Math.random() * words.length)];

        //output
        guessButton = document.getElementById("guess");
        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");
        man.innerHTML = 'You have ' + lives + ' lives remaining';
        output.innerHTML = '';
        guessInput.value = '';

        //display letters 
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">Current word:</li>';

        var letter
        for (let i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);//?
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }
        guessInput.value = '';
    }

    // Start game
    window.onload = setup();


    var restartButton = document.getElementById("restart")
    restartButton.onclick = setup;

    //reset letter to "guess" on click
    guessInput.onclick = function () {
        this.value = '';
    };

    //main guess function when user clicks #guess
    var hangman = document.getElementById('hangman');
    hangman.onsubmit = function (e) {
        e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        //does guess have a value?
        if (guess) {
            //is guess a valid letter?
            if (availableLetters.indexOf(guess) > -1) {//?
                // has it been guessed?
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                }
                // does guess exist in current word
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {

                    }

                    //check if letter appears multiple times 
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                //guess doesn't exist in current word and hasn't guessed before
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'You have ' + lives + ' lives remaining';
                    if (lives === 0) gameOver();
                }
            }
            //not a valid letter
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        //no letter entered
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };

});