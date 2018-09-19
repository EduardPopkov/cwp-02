const exec = require('child_process');
var spawn = require('child_process').spawn,
    grep  = spawn('grep', ['ssh']);

var threadClient = function startClient(count) {
  for(var i = 0; i < count - 1; i++){
    exec.fork('./client.js');

    grep.on('exit', function (code, signal) {
      console.log('child process terminated due to receipt of signal '+signal);
    })
    grep.kill('SIGHUP');
  }
};

module.exports = threadClient;
