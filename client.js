const fs = require('fs');
const net = require('net');
const port = 8124;

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function () {
  console.log('Connected');

  randQuestions();

  //var event = JSON.parse

  sendQA(client);

  client.on('data', function (data) {
    console.log(data);
    client.destroy();
  });
});

var question = function(ask, answer) {
  this.ask = ask;
  this.asnwer = answer;
};

function randQuestions() {
    var inf;
    var arrQues = [];

    fs.readFile('./qa.json', 'utf8', function(err, file) {
      if(err){
        console.log(err);
      } else {
        inf = JSON.parse(file, function(key, value) {
          var quest = new question(key, value);
          arrQues.push(quest);
        });
        //перемешиваем массив
        console.log(arrQues.sort(compareRandom));
      }
    });
}

function compareRandom(){
  return Math.random() - 0.5;
}

function sendQA(client) {
    client.write('QA');
}

client.on('close', function () {
  console.log('Connection closed');
});
