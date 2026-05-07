import { NextResponse } from "next/server";
import { IVideo } from "../../../types/video";

const videos: IVideo[] = [
  {
    id: "1",
    title: "Next.js 15: O que mudou?",
    description: "Entenda as principais novidades do App Router.",
    thumbnailUrl: "https://img.youtube.com/vi/1_id_do_video/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1_id_do_video",
    channel: "Tech Channel",
  },
];

export async function GET() {
  return NextResponse.json(videos);
}
