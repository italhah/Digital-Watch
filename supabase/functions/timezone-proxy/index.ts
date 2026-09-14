Deno.serve(async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const tz = url.searchParams.get("tz");

    if (!tz) {
      return new Response(
        JSON.stringify({ error: "Missing 'tz' query parameter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("IPGEOLOCATION_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured on server" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&tz=${encodeURIComponent(tz)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `Upstream API error: ${response.status}`, detail: errorText }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        timezone: data.timezone,
        date_time_txt: data.date_time_txt,
        date_time: data.date_time,
        utc_offset: data.utc_offset,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
