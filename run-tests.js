const express = require('express')
const app = express()
const port = process.env.PORT_NUMBER || 8000;
const spawn = require('child_process').spawn;

app.use(express.static(__dirname))

app.get('/', (request, response) => {
  response.render('index.html')
})

const server = app.listen(port, async (err) => {
  if (err) {
    return console.log('Could not serve application', err)
  }

  console.log(`Server is listening on http://localhost:${port}`)

  const tests = spawn('mocha', ['tests'], {
    stdio: "inherit",
    detached: true,
    cwd: __dirname,
    windowsVerbatimArguments: true
  });

  tests.on('close', () => {
    console.log(`Tests finished! Closing server http://localhost:${port}`);
    server.close();
  });
})
