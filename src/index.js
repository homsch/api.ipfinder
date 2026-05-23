export default {
  async fetch(request) {
    const url = new URL(request.url);
    const format = url.searchParams.get("format");

    const xff = request.headers.get("X-Forwarded-For");
    const ip =
      request.headers.get("CF-Connecting-IP") ||
      xff ||
      "0.0.0.0";

    if (format === "json") {
      const proxies = xff
        ? xff
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s && s !== ip)
        : [];
      return new Response(JSON.stringify({ ip, proxies }), {
        headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*"},
      });
    }

    // plain text
    return new Response(ip, {
      headers: { "content-type": "text/plain", "Access-Control-Allow-Origin": "*"},
    });
  },
};
