const DEFAULT_GENDERIZE_BASE_URL = "https://api.genderize.io";
const DEFAULT_UPSTREAM_TIMEOUT_MS = 2500;

const JSON_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json; charset=utf-8"
};

const ERROR_MESSAGES = {
  missingName: "Missing or empty name parameter",
  invalidName: "name must be a string",
  noPrediction: "No prediction available for the provided name",
  upstreamFailure: "Failed to fetch classification data from Genderize",
  internalFailure: "Internal server error",
  methodNotAllowed: "Method not allowed",
  notFound: "Not found"
};

class UpstreamError extends Error {
  constructor(message = ERROR_MESSAGES.upstreamFailure) {
    super(message);
    this.name = "UpstreamError";
  }
}

function jsonResponse(statusCode, payload, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      ...JSON_HEADERS,
      ...extraHeaders
    },
    body: JSON.stringify(payload)
  };
}

function emptyResponse(statusCode, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      ...JSON_HEADERS,
      ...extraHeaders
    },
    body: ""
  };
}

function getTimeoutMs(env) {
  const configuredValue = Number.parseInt(env.UPSTREAM_TIMEOUT_MS ?? "", 10);
  if (Number.isInteger(configuredValue) && configuredValue > 0) {
    return configuredValue;
  }

  return DEFAULT_UPSTREAM_TIMEOUT_MS;
}

function getGenderizeBaseUrl(env) {
  return env.GENDERIZE_BASE_URL || DEFAULT_GENDERIZE_BASE_URL;
}

function formatProcessedAt(value) {
  return value.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function normalizeName(rawName) {
  if (typeof rawName === "undefined") {
    return {
      ok: false,
      statusCode: 400,
      message: ERROR_MESSAGES.missingName
    };
  }

  if (Array.isArray(rawName) || typeof rawName !== "string") {
    return {
      ok: false,
      statusCode: 422,
      message: ERROR_MESSAGES.invalidName
    };
  }

  const trimmedName = rawName.trim();

  if (!trimmedName) {
    return {
      ok: false,
      statusCode: 400,
      message: ERROR_MESSAGES.missingName
    };
  }

  return {
    ok: true,
    value: trimmedName
  };
}

async function fetchGenderizePayload(name, { fetchImpl, env }) {
  const targetUrl = new URL(getGenderizeBaseUrl(env));
  targetUrl.searchParams.set("name", name);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), getTimeoutMs(env));

  let response;
  try {
    response = await fetchImpl(targetUrl, {
      headers: {
        Accept: "application/json"
      },
      signal: controller.signal
    });
  } catch (error) {
    throw new UpstreamError(error?.message);
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response || !response.ok) {
    throw new UpstreamError();
  }

  try {
    return await response.json();
  } catch (error) {
    throw new UpstreamError(error?.message);
  }
}

function parseGenderizePayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new UpstreamError();
  }

  const sampleSize = Number(payload.count);

  if (payload.gender === null || sampleSize === 0) {
    return {
      noPrediction: true
    };
  }

  const probability = Number(payload.probability);

  if (
    typeof payload.gender !== "string" ||
    !Number.isFinite(probability) ||
    !Number.isFinite(sampleSize)
  ) {
    throw new UpstreamError();
  }

  return {
    noPrediction: false,
    name: typeof payload.name === "string" && payload.name ? payload.name : null,
    gender: payload.gender,
    probability,
    sampleSize
  };
}

async function buildClassifyResponse({
  method,
  rawName,
  fetchImpl = global.fetch,
  now = () => new Date(),
  env = process.env
}) {
  if (method === "OPTIONS") {
    return emptyResponse(204);
  }

  if (method !== "GET") {
    return jsonResponse(405, {
      status: "error",
      message: ERROR_MESSAGES.methodNotAllowed
    });
  }

  const normalizedName = normalizeName(rawName);
  if (!normalizedName.ok) {
    return jsonResponse(normalizedName.statusCode, {
      status: "error",
      message: normalizedName.message
    });
  }

  try {
    const upstreamPayload = await fetchGenderizePayload(normalizedName.value, {
      fetchImpl,
      env
    });

    const parsedPayload = parseGenderizePayload(upstreamPayload);

    if (parsedPayload.noPrediction) {
      return jsonResponse(422, {
        status: "error",
        message: ERROR_MESSAGES.noPrediction
      });
    }

    return jsonResponse(200, {
      status: "success",
      data: {
        name: parsedPayload.name || normalizedName.value,
        gender: parsedPayload.gender,
        probability: parsedPayload.probability,
        sample_size: parsedPayload.sampleSize,
        is_confident:
          parsedPayload.probability >= 0.7 && parsedPayload.sampleSize >= 100,
        processed_at: formatProcessedAt(now())
      }
    });
  } catch (error) {
    if (error instanceof UpstreamError) {
      return jsonResponse(502, {
        status: "error",
        message: ERROR_MESSAGES.upstreamFailure
      });
    }

    return jsonResponse(500, {
      status: "error",
      message: ERROR_MESSAGES.internalFailure
    });
  }
}

function getRawNameFromSearchParams(searchParams) {
  const values = searchParams.getAll("name");

  if (values.length === 0) {
    return undefined;
  }

  if (values.length === 1) {
    return values[0];
  }

  return values;
}

function sendNodeResponse(res, response) {
  res.statusCode = response.statusCode;

  for (const [headerName, headerValue] of Object.entries(response.headers)) {
    res.setHeader(headerName, headerValue);
  }

  res.end(response.body);
}

module.exports = {
  ERROR_MESSAGES,
  buildClassifyResponse,
  getRawNameFromSearchParams,
  sendNodeResponse
};
