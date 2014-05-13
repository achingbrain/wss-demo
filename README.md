# Secure web sockets demo

A simple echo server that runs over SSL.

Instructions:

1. Install dependencies.  From the root of the repo, run `npm install`
2. cd into certs directory and run generate_certificate.sh
3. paste the output into the top of server.js
4. run the server from the root of the repo: `node server.js`
5. Open https://localhost:8443 in a web browser
6. Type something into the input box
