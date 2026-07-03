const axios = require("axios");

async function searchYoutubeVideo(query) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet", 
          q: query,
          type: "video", 
          maxResults: 1,
          key: process.env.YOUTUBE_API_KEY, 
        },
      },
    );
    const video = response.data.items[0];
    if (!video) {
      throw new Error("No video found for query: " + query);
    } else {
      const videoId = video.id.videoId;
      return videoId;
    }
  } catch (error) {
    console.error("YouTube API error:", error.message);
    return null;
  }
}
module.exports = { searchYoutubeVideo };
