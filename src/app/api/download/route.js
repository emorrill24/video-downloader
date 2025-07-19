import { NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

export async function POST(req) {
  try {
    const { url, quality } = await req.json();

    if (!url || !ytdl.validateURL(url)) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    // Pick quality - fallback to highest audio or video
    const filter = quality === "audio"
      ? "audioonly"
      : "videoandaudio";

    // Get basic info
    const info = await ytdl.getInfo(url);
    const chosenFormat = ytdl.chooseFormat(info.formats, {
      quality: quality === "audio" ? "highestaudio" : "highestvideo",
      filter,
    });

    if (!chosenFormat || !chosenFormat.url) {
      return NextResponse.json({ error: "Format not found" }, { status: 404 });
    }

    // Set headers for download
    const filename = (info.videoDetails.title || "video").replace(/[^\w\s]/gi, "") + 
      (quality === "audio" ? ".mp3" : ".mp4");

    // Use streaming response
    const res = await fetch(chosenFormat.url);

    return new Response(res.body, {
      headers: {
        "Content-Type": quality === "audio" ? "audio/mpeg" : "video/mp4",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });

  } catch (err) {
    console.error("Download API error:", err);
    return NextResponse.json({ error: "Failed to process download" }, { status: 500 });
  }
}
