// VideoBlock.jsx

function VideoBlock({ block, videoUrl, isEnriched }) {

  // CASE 1: No video yet
  if (!videoUrl) {
    return (
      <div className="border border-dashed border-gray-300 rounded-xl p-6 mb-5 bg-gray-50 text-center">
        <p className="text-gray-500 font-medium">
          🎬 Video is being prepared...
        </p>
        {block.query && (
          <p className="text-sm text-gray-400 mt-2">
            Topic: {block.query}
          </p>
        )}
      </div>
    );
  }

  // Helper function: converts a normal YouTube link into an "embed" link
  function getEmbedUrl(url) {
    let videoId = "";

    if (url.includes("youtu.be/")) {
      // short link case: https://youtu.be/abc123
      videoId = url.split("youtu.be/")[1];
    } else if (url.includes("watch?v=")) {
      // normal link case: https://www.youtube.com/watch?v=abc123
      videoId = url.split("watch?v=")[1];
    } else if (url.includes("/embed/")) {
      // already an embed link — just use it as-is
      return url;
    }

    // Remove anything after the video id (like &t=30s timestamps)
    if (videoId) {
      videoId = videoId.split("&")[0];
      videoId = videoId.split("?")[0]; // just in case there's a stray "?"
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  const embedUrl = getEmbedUrl(videoUrl);

  // CASE 2: videoUrl exists, but we couldn't figure out a valid video ID from it
  // (this protects against bad/malformed links saved by the backend)
  if (!embedUrl) {
    return (
      <div className="border border-dashed border-red-300 rounded-xl p-6 mb-5 bg-red-50 text-center">
        <p className="text-red-500 font-medium">
          ⚠️ This video link looks invalid.
        </p>
        <p className="text-sm text-red-400 mt-2 break-all">
          {videoUrl}
        </p>
      </div>
    );
  }

  // CASE 3: Video is ready and the link is valid — show YouTube embed
  return (
    <div className="mb-5">
      <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden border border-gray-200">
        {/* pb-[56.25%] creates a 16:9 aspect ratio box (standard video shape) */}
        <iframe
          src={embedUrl}
          title={block.query || "Lesson video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}

export default VideoBlock;