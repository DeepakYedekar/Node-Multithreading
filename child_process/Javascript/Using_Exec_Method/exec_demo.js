// exec It's used to execute the shell commands.
const { exec } = require('child_process');

exec('pwd', (error, stdout, stderr) => {
  if (error) {  // gives error before execution
    console.log(`error: ${error.message}`);
    return;
  }
  // this error occures after the command has been executed
  // the command is executed but there  is an error in the terminal
  if (stderr) {  // the error occures in between the process
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
