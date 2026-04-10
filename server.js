const {
  ERROR_MESSAGES,
  buildClassifyResponse,
  getRawNameFromSearchParams,
  sendNodeResponse
} = require("./src/classify-service");

async function handleRequest(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);

  if (requestUrl.pathname !== "/api/classify") {
    return sendNodeResponse(
      res,
      {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          status: "error",
          message: ERROR_MESSAGES.notFound
        })
      }
    );
  }

  const response = await buildClassifyResponse({
    method: req.method,
    rawName: getRawNameFromSearchParams(requestUrl.searchParams)
  });

  return sendNodeResponse(res, response);
}

module.exports = handleRequest;
