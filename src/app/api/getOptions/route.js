import ytdl from '@distube/ytdl-core';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get('url');

  console.log('URL received:', videoUrl);

  if (!videoUrl) {
    return new Response('Missing URL parameter', { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);

    // Filter progressive formats (video + audio together)
    const progressive = ytdl.filterFormats(info.formats, 'videoandaudio');

    // Pick only mp4 formats with video & audio
    const mp4Formats = progressive.filter(
      (f) => f.container === 'mp4' && f.hasAudio && f.hasVideo
    );

    // For MVP: just grab a 360p if available
    const lowRes = mp4Formats.find((f) => f.qualityLabel === '360p');

    // Also find an audio-only format
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    const audio = audioFormats.length > 0 ? audioFormats[0] : null;

    // Build response
    const options = [];
    if (lowRes) {
      options.push({ label: lowRes.qualityLabel, url: lowRes.url });
    }
    if (audio) {
      options.push({ label: 'Audio Only', url: audio.url });
    }

    console.log('Options prepared:', options);

    return new Response(JSON.stringify({ options }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('API Error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
