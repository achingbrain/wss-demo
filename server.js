var https = require("https"),
  http = require("http"),
  WebSocketServer = require("ws").Server,
  fs = require("fs");

/* Run ./certs/generate_certificate and paste the output below here */
const PASSPHRASE = "SERVER_KEY";
const SERVER_KEY = "SERVER_KEY_PATH";
const SERVER_CERT = "SERVER_CERTIFICATE";
/* Run ./certs/generate_certificate and paste the output above here */

const PORT = 8443;

// Web Server - does SSL termination for us
var server = https.createServer({
    passphrase: PASSPHRASE,
    key: fs.readFileSync(SERVER_KEY),
    cert: fs.readFileSync(SERVER_CERT)
}, function(req, res) {
  // pipe the client.html file into the response
  res.writeHead(200, "text/html");
  fs.createReadStream("./client.html").pipe(res);
});
server.listen(PORT, function() {
  console.info("Server listening, open https://localhost:" + PORT, "in a web browser");
});


// WebSocketServer - what you came for
var wss = new WebSocketServer({
  server: server,
  path: "/ws"
});
wss.on("connection", function(client) {

  // set up a listener for client messages
  client.on("message", function(message) {

    // just echo what the client sent back to them
    client.send(message);
  });
});
