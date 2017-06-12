var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");


// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 

// var firstPresidentCloze = new ClozeCard(
//     "George Washington was the first president of the United States.", "George Washington");

// // "George Washington"
// console.log(firstPresidentCloze.cloze); 

// // " ... was the first president of the United States.
// console.log(firstPresidentCloze.partial); 

// // "George Washington was the first president of the United States.
// console.log(firstPresidentCloze.fullText); 

// // Should throw or log an error because "oops" doesn't appear in "This doesn't work"
// var brokenCloze = new ClozeCard("This doesn't work", "oops");


var basicCardArr = [];
var clozeCardArr = [];

var basicCount = 0;
var clozeCount = 0;

BasicCard.prototype.printInfo = function() {
  console.log("Front: " + this.front + "\nBack: " + this.back);
  console.log("---------------");
};

ClozeCard.prototype.printInfo = function() {
  console.log("Full Text: " + this.fullText + "\nCloze: " + this.cloze + "\nPartial: " + this.partial);
  console.log("---------------");
};

var createBasicCards = function () {
  // if statement to ensure that our questions are only asked five times
  if (basicCount < 5) {
    console.log("Create new flashcard");
    inquirer.prompt([
      {
        name: "front",
        message: "What is the question on the front of the card?"
      }, {
        name: "back",
        message: "What is the answer on the back of the card?"
      }
    ]).then(function(answers){
      var newBasicCard = new BasicCard(
        answers.front,
        answers.back);
      // pushes newguy object into our array
      basicCardArr.push(newBasicCard);
      // add one to count to increment our recursive loop by one
      basicCount++;
      // run the askquestion function again so as to either end the loop or ask the questions again
      createBasicCards();
    })
  } else {
    for (var x = 0; x <basicCardArr.length; x++) {
      basicCardArr[x].printInfo();
    }
  }
};

var createClozeCards = function () {
  // if statement to ensure that our questions are only asked five times
  if (clozeCount < 5) {
    console.log("Create new cloze flashcard");
    inquirer.prompt([
      {
        name: "fullText",
        message: "What is full text of the question?"
      }, {
        name: "cloze",
        message: "What is the text that will be hidden?"
      }
    ]).then(function(answers){
      var newClozeCard = new ClozeCard(
        answers.fullText,
        answers.cloze);
      // pushes newguy object into our array
      clozeCardArr.push(newClozeCard);
      // add one to count to increment our recursive loop by one
      clozeCount++;
      // run the askquestion function again so as to either end the loop or ask the questions again
      createClozeCards();
    })
  } else {
    for (var x = 0; x <clozeCardArr.length; x++) {
       clozeCardArr[x].printInfo();
    }
  }
};
createClozeCards();