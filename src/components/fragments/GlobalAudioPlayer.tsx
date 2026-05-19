import { useEffect, useRef, useState } from "react";
import { useGlobalAudio } from "../../stores/TypeHooks";
import { Play, Pause, X } from "lucide-react";

export const GlobalAudioPlayer = () => {
  const { audioUrl, setAudio, playNext } = useGlobalAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else if (!audioUrl && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [audioUrl]);

  if (!audioUrl) return null;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-slate-900/90 px-6 py-3 text-white shadow-xl backdrop-blur-md transition-all">
      <button
        onClick={togglePlay}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white transition-colors hover:bg-emerald-400"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
      </button>
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Murottal
        </span>
        <span className="text-sm font-medium">Sedang Diputar...</span>
      </div>
      <button
        onClick={() => setAudio(null, [])}
        className="ml-2 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        aria-label="Tutup pemutar audio"
      >
        <X size={18} />
      </button>

      <audio
        ref={audioRef}
        onEnded={playNext}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        className="hidden"
      />
    </div>
  );
};
