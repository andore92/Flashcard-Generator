var ClozeCard = function(text, cloze) {
	this.partial = partial;
	this.cloze = cloze;
	this.fullText = partial + cloze;

	this.checkCloze = function () {
		if (fullText.includes(cloze)) {
			console.log("correct!")
		} else {
			console.log("incorrect!")
		}
	}
}

module.exports = ClozeCard;