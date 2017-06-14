var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");
var cardData = require("./cardData.json");

var basicCardsArr = cardData.cards.basic;
var clozeCardsArr = cardData.cards.cloze;



var basicCount = 0;
var clozeCount = 0;

var basicCreateCount = 0;
var clozeCreateCount = 0;

var basicCorrect = 0;
var clozeCorrect = 0;



var playBasicCards = function () {
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
     } 
    }

var playClozeCards = function() {
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
     } 
       
    }


var createBasicCards = function() {
  
  if (basicCreateCount < 5) {
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
     
      fs.readFile('./cardData.json', 'utf-8', function(err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.cards.basic.push(newBasicCard)

  

        fs.writeFile('./cardData.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
        })
      })
      
      basicCount++;
      
      createBasicCards();
    })
  } else {
    for (var x = 0; x <basicCardArr.length; x++) {
      console.log("done");
    }
  }
};

var createClozeCards = function () {
  
  
  if (clozeCreateCount < 5) {
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
    
      fs.readFile('./cardData.json', 'utf-8', function(err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.cards.cloze.push(newClozeCard)

  

        fs.writeFile('./cardData.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
        })
      })
      clozeCreateCount++;
     
      createClozeCards();
    })
  } else {
    console.log("All cards created!");
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
      } if (startUpQuestion = "no") {
       inquirer.prompt([
        {
          name: "cardTypeSelection",
          message: "Would you like to create basic or cloze cards?"
        }
        ]).then(function(answers){
          var cardTypeSelection = answers.cardTypeSelection
          if(cardTypeSelection === "basic"){
            createBasicCards();

          } if(cardTypeSelection === "cloze" ) {
            createClozeCards();
          } 

      })
      }
    })
}
startup();