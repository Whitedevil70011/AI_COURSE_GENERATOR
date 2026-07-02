// This file's job: take raw audio data and turn it into a proper .wav file
// Think of it like adding a "label" on top of raw sound so it becomes playable

function pcmToWav(pcmBuffer) {
  // These are fixed settings Gemini uses for its audio
  const sampleRate = 24000; // how many samples per second
  const channels = 1;       // mono audio (not stereo)
  const bitDepth = 16;      // audio quality setting

  // Some math needed to build the wav header (don't worry about understanding this part)
  const byteRate = (sampleRate * channels * bitDepth) / 8;
  const blockAlign = (channels * bitDepth) / 8;
  const dataSize = pcmBuffer.length;

  // Create an empty "header" (44 bytes long) — this tells apps "this is a wav file"
  const header = Buffer.alloc(44);

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  // Join the header + actual audio data together = final playable wav file
  const finalWavFile = Buffer.concat([header, pcmBuffer]);

  return finalWavFile;
}

// Make this function available to other files
module.exports = { pcmToWav };