// LessonAudioPlayer.jsx
import React, { useState, useRef } from "react";
import { Volume2, Loader2, Pause } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function LessonAudioPlayer({ lessonContent, lessonTitle }) {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  function getLessonPlainText() {
    if (!Array.isArray(lessonContent)) return lessonTitle || "";

    const text = lessonContent
      .map((block) => block.text || block.content || "")
      .filter(Boolean)
      .join(". ");

    return `${lessonTitle}. ${text}`;
  }

  async function handlePlayAudio() {
    if (playing && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const lessonText = getLessonPlainText();

      const res = await fetch(`${BASE_URL}/lessons/audio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonText,
          autoTranslateToHindi: true,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate audio");
      }

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => setPlaying(false);
      audio.play();

      setPlaying(true);
    } catch (err) {
      console.error("Audio generation failed:", err);
      setError(err.message || "Could not generate audio");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-sm">
      {/* Icon badge */}
      <div
        className={`flex items-center justify-center w-9 h-9 rounded-xl text-white flex-shrink-0 transition-colors ${
          playing ? "bg-emerald-600" : "bg-indigo-600"
        }`}
      >
        <Volume2 className="w-4 h-4" />
      </div>

      {/* Label + status */}
      <div className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold text-indigo-950">
          Hinglish Audio
        </span>
        <span className="text-[11px] text-indigo-500">
          {playing ? "Now playing..." : "Listen to this lesson"}
        </span>
        {error && (
          <span className="text-[11px] text-red-600 mt-0.5">{error}</span>
        )}
      </div>

      {/* Play / Pause button */}
      <button
        onClick={handlePlayAudio}
        disabled={loading}
        className={`ml-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed ${
          playing
            ? "bg-emerald-600 hover:bg-emerald-700"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating
          </>
        ) : playing ? (
          <>
            <Pause className="w-4 h-4" />
            Pause
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            Play
          </>
        )}
      </button>
    </div>
  );
}

export default LessonAudioPlayer;