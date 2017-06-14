var ClozeCard = function(text, cloze) {
	this.fullText = text;
	this.cloze = cloze;
	this.partial = text.split(cloze).pop();
};

module.exports = ClozeCard;