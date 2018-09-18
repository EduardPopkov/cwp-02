const fs = require('fs');
const net = require('net');
const port = 8124;

//var arrQues = [];

var rigth = 0;
var quest;


var arrQuestion = [];

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function () {
  console.log('Connected');
  sendQA(client);

  var formJSON = fs.readFileSync('./qa.json', 'utf8');

  let str = JSON.parse(formJSON, function (key, value) {
    let quest = new question(key, value);
    arrQuestion.push(quest);
  });
  arrQuestion.pop();





  //client.write('DEC');
});

client.on('data', function (data) {
  console.log('data: ' + data);
  if(data == 'ACK'){
    console.log('----------start test----------');

    sendMessageToServer(client, arrQuestion);
  }
  else if(data == 'DEC'){
    console.log(data);
    client.destroy();
  }
  else if(data.indexOf('answer') == 0){
    let answer = data.substring(6);
    for(let i = 0; i < arrQuestion.length; i++){
      if(arrQuestion[i].ask == quest && arrQuestion[i].answer == answer){
        console.log('OK');
      }
    }

    client.destroy();
  }
  /*
  else if(Array.isArray([])){
    console.log('before' + count);

    count = count + 1;

    console.log('after' + count);

    console.log('вопрос: ' + q + ' ' + 'Ответ: ' + data);

    var str = fs.readFileSync('./qa.json', 'utf8');
    //console.log(str);
    var newStr = JSON.parse(str, function (ask, answer) {
      var quest = new question(ask, answer);
      arrAnswers.push(quest);
    });

    for(var i = 0; i < arrAnswers.length; i++){

      if(arrAnswers[i].ask == q && arrAnswers[i].answer == data){
        rigth++;
      }
    }


    console.log('Кол правильных ответов: ' + rigth);

    if(count == 2){
      client.destroy();
    }
  }
  else{

  }
  */
});



function sendQA(client) {
  console.log('func: sendQA');
  client.write('QA');
};

function sendMessageToServer(client, arrQuestion) {
  //let arrQuestion = [];
  console.log('func: sendMessageToServer');

  console.log(arrQuestion);

  arrQuestion.sort(compareRandom);
  max = arrQuestion.length;

  var rand = max * Math.random();
  rand = Math.floor(rand);

  quest = arrQuestion[rand].ask;
  client.write('ask' + arrQuestion[rand].ask);

  //client.write('DEC');
};

var question = function(ask, answer) {
  this.ask = ask;
  this.answer = answer;
};

function compareRandom(){
  return Math.random() - 0.5;
};

client.on('close', function () {
  console.log('Connection closed');
});
