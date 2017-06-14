var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var cardData = require("./cardData.json");



var basicCardArr = [];
var clozeCardArr = [];

var basicCount = 0;
var clozeCount = 0;



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
      console.log("done");
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
       console.log("done")
    }
  }
};

var startup = function () {
  inquirer.prompt([
      {
        name: "startupQuestion",
        message: "Have you created flashcards before?"
      }
    ]).then(function(answers){
        var startupQuestion = answers.startupQuestion
        if(startupQuestion === "no") {
          inquirer.prompt([
        {
          name: "cardTypeSelection",
          message: "Would you like to create Basic or Cloze cards?"
        }
      ]).then(function(answers){
          var cardTypeSelection = answers.cardTypeSelection
          if(cardTypeSelection === "basic"){
            createBasicCards();
          } if(ClozeCard === "cloze" ) {
            createClozeCards();
          } 
      })
      }
    })
}
