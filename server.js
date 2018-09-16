const net = require('net');
const port = 8124;

var i = 0; //уникальный идентификатор для клиента

const server = net.createServer((client) => {
  console.log('Connected client: ' + (++i));
  client.setEncoding('utf8');

  client.on('data', (data) => {
    console.log(data + ': client' + i);
    client.write('Hello i server');
  });
});

server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});
