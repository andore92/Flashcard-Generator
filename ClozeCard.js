var ClozeCard = function(text, cloze) {
	this.fullText = text;
	this.cloze = cloze;
	this.partial = text.split(cloze).pop();
	
	

	this.checkCloze = function () {
		if (fullText.includes(cloze)) {
			console.log("correct!")
		} else {
			console.log("incorrect!")
		}
	}
};

module.exports = ClozeCard;