const express = require('express');
const { fork } = require('child_process');

const app = express();

app.get('/one', (req, res) => {
  const sum = longComputation();
  res.send({ sum: sum });
});

app.get('/two', async (req, res) => {
  const sum = await longComputePromise();
  res.send({ sum: sum });
});


// this method run using fork method
app.get('/three', (req, res) => {
  const child = fork('./longtask.js');
  child.on('message', (message) => {
    let {event,data}=message;
    if(event==='done')res.send({data});
  });
  child.send({event:'start',data:'Inside the child process'});  // sending the message to the child process
});

app.listen(3000, () => console.log('server on port 3000...'));

function longComputation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  return sum;
}

function longComputePromise() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    }
    resolve(sum);
  });
}
