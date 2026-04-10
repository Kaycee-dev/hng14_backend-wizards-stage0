const test = require("node:test");
const assert = require("node:assert/strict");

const { buildClassifyResponse } = require("../src/classify-service");

function createJsonResponse(payload, ok = true) {
  return {
    ok,
    async json() {
      return payload;
    }
  };
}

function parseBody(response) {
  return JSON.parse(response.body);
}

test("returns 400 when name is missing", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: undefined
  });

  assert.equal(response.statusCode, 400);
  assert.deepEqual(parseBody(response), {
    status: "error",
    message: "Missing or empty name parameter"
  });
  assert.equal(response.headers["Access-Control-Allow-Origin"], "*");
});

test("returns 400 when name is empty after trimming", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: "   "
  });

  assert.equal(response.statusCode, 400);
  assert.deepEqual(parseBody(response), {
    status: "error",
    message: "Missing or empty name parameter"
  });
});

test("returns 422 when name is repeated and surfaces as an array", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: ["john", "jane"]
  });

  assert.equal(response.statusCode, 422);
  assert.deepEqual(parseBody(response), {
    status: "error",
    message: "name must be a string"
  });
});

test("returns a confident success payload", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: "john",
    fetchImpl: async () =>
      createJsonResponse({
        name: "john",
        gender: "male",
        probability: 0.99,
        count: 1234
      }),
    now: () => new Date("2026-04-01T12:00:00.000Z")
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(parseBody(response), {
    status: "success",
    data: {
      name: "john",
      gender: "male",
      probability: 0.99,
      sample_size: 1234,
      is_confident: true,
      processed_at: "2026-04-01T12:00:00Z"
    }
  });
});

test("returns a not-confident success payload when probability is too low", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: "alex",
    fetchImpl: async () =>
      createJsonResponse({
        name: "alex",
        gender: "male",
        probability: 0.52,
        count: 250
      }),
    now: () => new Date("2026-04-01T12:00:00.000Z")
  });

  assert.equal(response.statusCode, 200);
  assert.equal(parseBody(response).data.is_confident, false);
});

test("returns a not-confident success payload when sample size is too low", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: "aria",
    fetchImpl: async () =>
      createJsonResponse({
        name: "aria",
        gender: "female",
        probability: 0.91,
        count: 22
      }),
    now: () => new Date("2026-04-01T12:00:00.000Z")
  });

  assert.equal(response.statusCode, 200);
  assert.equal(parseBody(response).data.is_confident, false);
});

test("returns 422 when Genderize provides no prediction", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: "qwerty",
    fetchImpl: async () =>
      createJsonResponse({
        name: "qwerty",
        gender: null,
        probability: 0,
        count: 0
      })
  });

  assert.equal(response.statusCode, 422);
  assert.deepEqual(parseBody(response), {
    status: "error",
    message: "No prediction available for the provided name"
  });
});

test("returns 502 when the upstream request fails", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: "john",
    fetchImpl: async () => {
      throw new Error("socket hang up");
    }
  });

  assert.equal(response.statusCode, 502);
  assert.deepEqual(parseBody(response), {
    status: "error",
    message: "Failed to fetch classification data from Genderize"
  });
});

test("returns 502 when the upstream payload is malformed", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: "john",
    fetchImpl: async () =>
      createJsonResponse({
        name: "john",
        gender: "male",
        probability: "not-a-number",
        count: 123
      })
  });

  assert.equal(response.statusCode, 502);
  assert.deepEqual(parseBody(response), {
    status: "error",
    message: "Failed to fetch classification data from Genderize"
  });
});

test("returns 500 when an unexpected local error occurs", async () => {
  const response = await buildClassifyResponse({
    method: "GET",
    rawName: "john",
    fetchImpl: async () =>
      createJsonResponse({
        name: "john",
        gender: "male",
        probability: 0.91,
        count: 123
      }),
    now: () => {
      throw new Error("clock broke");
    }
  });

  assert.equal(response.statusCode, 500);
  assert.deepEqual(parseBody(response), {
    status: "error",
    message: "Internal server error"
  });
});

test("returns 204 for preflight requests with CORS headers", async () => {
  const response = await buildClassifyResponse({
    method: "OPTIONS"
  });

  assert.equal(response.statusCode, 204);
  assert.equal(response.body, "");
  assert.equal(response.headers["Access-Control-Allow-Origin"], "*");
});
