//constructor files
//will contain all the methods which will check the letter guessed vs the random word

Check = function(word){
	this.currentWord = word,
	this.currentWordArray = word.split(''),
	this.lettersGuessed = []
}