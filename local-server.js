const http = require("node:http");
const handleRequest = require("./server");

const PORT = Number.parseInt(process.env.PORT ?? "3000", 10);

const server = http.createServer(handleRequest);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Stage 0 server listening on http://127.0.0.1:${PORT}`);
  });
}

module.exports = {
  server
};
