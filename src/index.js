export default {
  async fetch(request) {
    const url = new URL(request.url);
    const format = url.searchParams.get("format");

    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For") ||
      "0.0.0.0";

    if (format === "json") {
      return new Response(JSON.stringify({ ip }), {
        headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*"},
      });
    }

    // plain text
    return new Response(ip, {
      headers: { "content-type": "text/plain", "Access-Control-Allow-Origin": "*"},
    });
  },
};
