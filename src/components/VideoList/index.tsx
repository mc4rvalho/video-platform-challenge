import { IVideo } from '@/types/video';
import { VideoCard } from '../VideoCard';

interface VideoListProps {
  videos: IVideo[];
  onVideoSelect: (video: IVideo) => void;
  className?: string;
}

export function VideoList({ videos, onVideoSelect, className }: VideoListProps) {
  if (!videos || videos.length === 0) {
    return <p className="text-zinc-400">Nenhum vídeo encontrado.</p>;
  }

  return (
    <div className={className || "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
      {videos.map((video) => (
        <VideoCard 
          key={video.id} 
          video={video} 
          onSelect={() => onVideoSelect(video)} 
        />
      ))}
    </div>
  );
}