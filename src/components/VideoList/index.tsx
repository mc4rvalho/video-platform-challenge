import { IVideo } from '@/types/video';
import { VideoCard } from '../VideoCard';

interface VideoListProps {
  videos: IVideo[];
}

export function VideoList({ videos }: VideoListProps) {
  if (!videos || videos.length === 0) {
    return <p className="text-zinc-400">Nenhum vídeo encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}