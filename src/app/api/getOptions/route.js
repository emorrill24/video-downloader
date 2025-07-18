import ytdl from '@distube/ytdl-core';

export async function GET(req) {
  console.log('API called'); // ✅ debug
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get('url');
    console.log('URL received:', videoUrl); // ✅ debug

    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
      console.error('Invalid URL:', videoUrl);
      return new Response(JSON.stringify({ error: 'Invalid YouTube URL' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const info = await ytdl.getInfo(videoUrl);
    console.log('Fetched info title:', info.videoDetails.title); // ✅ debug

    const formats = ytdl.filterFormats(info.formats, 'audioandvideo');
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    const options = [];
    const mp4Formats = formats.filter((f) => f.container === 'mp4' && f.hasVideo);
    const uniqueQualities = new Set();

    for (const f of mp4Formats) {
      if (!uniqueQualities.has(f.qualityLabel)) {
        uniqueQualities.add(f.qualityLabel);
        options.push(`MP4 ${f.qualityLabel}`);
      }
      if (options.length >= 3) break;
    }

    if (audioFormats.length > 0) {
      options.push('Audio Only');
    }

    console.log('Options ready:', options); // ✅ debug
    return new Response(JSON.stringify({ options }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('API Error:', err); // ✅ debug
    return new Response(JSON.stringify({ error: 'Failed to fetch video info' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
