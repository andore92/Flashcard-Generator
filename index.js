var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");
var cardData = require("./cardData.json");
var createCards = require("./createCards.js");

var basicCardsArr = cardData.cards.basic;
var clozeCardsArr = cardData.cards.cloze;



var basicCount = 0;
var clozeCount = 0;



var basicCorrect = 0;
var clozeCorrect = 0;



var playBasicCards = function () {
  if (basicCount === 0) {
    console.log("----------------------------------------");
    console.log("");
    console.log("Type 'quit' at any time to end the game");
    console.log("");
    console.log("----------------------------------------");
  }
  if (basicCount < basicCardsArr.length) {   
      inquirer.prompt([
        {
          name: "question",
          message: basicCardsArr[basicCount].front
        }
        ]).then(function(answers){
          if (answers.question == basicCardsArr[basicCount].back) {
            basicCorrect++;
            console.log("correct");
          } else if (answers.question === "quit"){
            basicCount = basicCardsArr.length;
            
          } else {
            console.log("incorrect");
          }
          basicCount++;
          playBasicCards();
      })
      
     } else {
      console.log("You got " + basicCorrect + " questions correct");
        if (basicCorrect === basicCardsArr.length){
          console.log("Wow, you got them all right, have a gold star!");
        }
      inquirer.prompt([
        {
        name: "retry",
        message: "would you like to play again?"
        }
      ]).then(function(answers){
        if (answers.retry === "yes") {
            basicCount=0;
            playBasicCards();
        } else if (answers.retry === "no") {
          console.log("Goodbye!");
        }
      })
     } 
    }

var playClozeCards = function() {
    if (clozeCount === 0) {
    console.log("----------------------------------------");
    console.log("");
    console.log("Type 'quit' at any time to end the game");
    console.log("");
    console.log("----------------------------------------");
  }
    if (clozeCount < clozeCardsArr.length) { 
      inquirer.prompt([
        {
          name: "question",
          message: " *BLANK* " + clozeCardsArr[clozeCount].partial
        }
        ]).then(function(answers){
          if (answers.question === clozeCardsArr[clozeCount].cloze) {
            clozeCorrect++;
            console.log("correct");
          } else if (answers.question === "quit"){
            clozeCount = clozeCardsArr.length;
            
          } else {
            console.log("incorrect");
          }
          clozeCount++;
          playClozeCards();
      })
    }  else {
      console.log("You got " + clozeCorrect + " questions correct");
        if (clozeCorrect === clozeCardsArr.length){
          console.log("Wow, you got them all right, have a gold star!");
        }
      inquirer.prompt([
        {
        name: "retry",
        message: "would you like to play again?"
        }
      ]).then(function(answers){
        if (answers.retry === "yes") {
            clozeCount=0;
            playClozeCards();
        } else if (answers.retry === "no") {
          console.log("Goodbye!");
        }
      })
     } 
       
    }




var startup = function () {
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
          message: "Would you like to play with basic or cloze cards?"
        }
      ]).then(function(answers){
          var cardTypeSelection = answers.cardTypeSelection
          if(cardTypeSelection === "basic"){
            playBasicCards();

          } if(cardTypeSelection === "cloze" ) {
            playClozeCards();
          } 

      })
      } else if (startUpQuestion = "no") {
       inquirer.prompt([
        {
          name: "cardTypeSelection",
          message: "Would you like to create basic or cloze cards?"
        }
        ]).then(function(answers){
          var cardTypeSelection = answers.cardTypeSelection
          if(cardTypeSelection === "basic"){
            createCards.basicCards();

          } if(cardTypeSelection === "cloze" ) {
            createCards.clozeCards();
          } 

      })
      } 
    })
}
startup();