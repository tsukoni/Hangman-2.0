//takes in a word as an argument and displays it as a string of dashes
letterDisplay = function(word) {
    this.wordArray = word.split(''),
        this.arrayOfDashes = [],
        this.updated,
        this.displayLetters = function() {
            for (i = 0; i < this.wordArray.length; i++) {
                if (this.wordArray[i] === ' ') {
                    x = ' ';
                    this.arrayOfDashes.push(x);
                    //keeps spaces in phrases as spaces instead of removing them
                } else {
                    x = '-';
                    this.arrayOfDashes.push(x);
                    //fills out letter characters with -
                }
            }
            console.log(this.arrayOfDashes.join(''));
            //converts array to string to display
        },
        this.updateLetters = function(letter) {
            for (i = 0; i < this.wordArray.length; i++) {
                if (letter == this.wordArray[i]) {
                    this.arrayOfDashes.splice(i, 1, letter);
                    //at position i, removes 1 item in the array (the - symbol) and inserts the chosen letter there
                }
            }
            this.updated = this.arrayOfDashes.join('');
            console.log(this.updated);
        },
        this.checkForWin = function() {
            // console.log('victory check complete')
            // console.log('entered word = ' + this.arrayOfDashes.join(''));
            // console.log(word);
            // if(this.arrayOfDashes.join('') == word){
            //  victory = true;
            //  return victory;

        }
}