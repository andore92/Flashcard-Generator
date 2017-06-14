var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");
var cardData = require("./cardData.json");
var createCards = require("./createCards.js");
var playCards = require("./playCards.js");



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
            playCards.basicCards();

          } if(cardTypeSelection === "cloze" ) {
            playCards.clozeCards();
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