const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

let loadedText = ''; // Store the loaded text in memory

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      // Read data from data.json and serve the HTML page
      fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, jsonData) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          // Parse the JSON data
          const data = JSON.parse(jsonData);

          // Store the loaded text in memory
          loadedText = data.text;

          // Serve the HTML page with the loaded data
          const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
          const modifiedHtml = html.replace('Double click me to edit', loadedText);

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(modifiedHtml);
        }
      });
    }
  } else if (req.method === 'POST' && req.url === '/update-text') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const postData = parse(body);
      const text = postData.text;

      // Update the loaded text and save it to data.json
      loadedText = text;
      saveTextToJson(text, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Text saved to JSON file');
        }
      });
    });
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Rest of your code remains the same


function saveTextToJson(text, callback) {
  const data = { text: text };

  fs.writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
      callback(err);
    } else {
      console.log('Text saved to JSON file');
      callback(null);
    }
  });
}
