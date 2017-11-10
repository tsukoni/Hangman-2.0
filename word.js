//creates arrays for current word and guessed letters
wordStorage = function(word) {
    this.currentWord = word,
        this.currentWordArray = word.split(''),
        this.lettersGuessed = []
}