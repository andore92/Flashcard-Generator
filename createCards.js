var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");
var cardData = require("./cardData.json");

var basicCreateCount = 0;
var clozeCreateCount = 0;

var cards = {


basicCards: function() {
  if (basicCreateCount === 0) {
    console.log("----------------------------------------");
    console.log("");
    console.log("Create 5 new cards");
    console.log("");
    console.log("----------------------------------------");
  }
  if (basicCreateCount < 5) {
    console.log("Card Number " + basicCreateCount + 1);
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
        
        })
      })
      
      basicCreateCount++;
      
      cards.basicCards();
    })
  } else {
    for (var x = 0; x <basicCardArr.length; x++) {
      console.log("done");
    }
  }
},

clozeCards: function () {
  if (clozeCreateCount === 0) {
    console.log("----------------------------------------");
    console.log("");
    console.log("Create 5 new cards");
    console.log("");
    console.log("----------------------------------------");
  }
  
  if (clozeCreateCount < 5) {
    console.log("Card Number " + clozeCreateCount + 1);
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
     
      cards.clozeCards();
    })
  } else {
    console.log("All cards created!");
  }
}
};

module.exports = cards