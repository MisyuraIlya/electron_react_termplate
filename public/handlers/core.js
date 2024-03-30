const { exec } = require('child_process');

function handleTodoFormSubmission(event, args) {
  console.log(args);
  exec('cd .. && ls', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    console.log(`Command output: ${stdout}`);
    event.sender.send('submit:todoForm:response', stdout); // Send the response back to the renderer process
  });
}

module.exports = { handleTodoFormSubmission };