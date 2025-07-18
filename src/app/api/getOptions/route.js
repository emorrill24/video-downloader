// src/app/api/getOptions/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get("url");

  // Basic validation
  if (!videoUrl || (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be"))) {
    return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400 });
  }

  // Mock download options (replace with real logic later)
  const options = ["MP4 720p", "MP4 1080p", "Audio Only"];

  return new Response(JSON.stringify({ options }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
