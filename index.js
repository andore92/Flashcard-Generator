var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var cardData = require("./cardData.json");

var basicCardsArr = cardData.cards.basic;
var clozeCardsArr = cardData.cards.cloze;





var basicCount = 0;
var clozeCount = 0;

var basicCorrect = 0;
var clozeCorrect = 0;

function playBasicCards() {
    
      inquirer.prompt([
        {
          name: "question",
          message: basicCardsArr[1].front
        }
        ]).then(function(answers){
          if (answers.question === basicCardsArr[1].back) {
            basicCorrect++;
            console.log("correct");
          } else {
            console.log("incorrect");
          }
      })
      
       
    }

function playClozeCards() {
    
      inquirer.prompt([
        {
          name: "question",
          message: clozeCardsArr[1].partial
        }
        ]).then(function(answers){
          if (answers.question === clozeCardsArr[1].cloze) {
            basicCorrect++;
            console.log("correct");
          } else {
            console.log("incorrect");
          }
      })
      
       
    }


function createBasicCards() {
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

function createClozeCards() {
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

function startup() {
  inquirer.prompt([
      {
        name: "startupQuestion",
        message: "Have you created flashcards before?"
      }
    ]).then(function(answers){
        var startupQuestion = answers.startupQuestion
        if(startupQuestion === "yes") {
          inquirer.prompt([
        {
          name: "cardTypeSelection",
          message: "Would you like to play with Basic or Cloze cards?"
        }
      ]).then(function(answers){
          var cardTypeSelection = answers.cardTypeSelection
          if(cardTypeSelection === "basic"){
            playBasicCards();
          } if(cardTypeSelection === "cloze" ) {
            playClozeCards();
          } 
      })
      }
    })
}
startup();