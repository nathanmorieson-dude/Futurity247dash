# Billie demo audio

Drop a recorded MP3 sample at this exact path:

    /public/audio/billie-sample.mp3

When that file is present, the "Hear Billie" button on the marketing page
and the "Hear sample" button on `/billie` will play the recording.

When it's absent, the demo dialog falls back to the browser's built-in
SpeechSynthesis API and reads the same scripted emergency-call flow aloud
with a sensible pair of male/female voices. That way the button works
with zero asset dependencies today, and upgrading to a real recording is
a single `git add`.

## How to produce the recording

1. Record a ~45-second mock emergency call through Retell's web-call
   playback, or synthesize one with the production ElevenLabs voice ID
   (`11labs-Adrian` / whichever voice is configured in
   `config/retell_agent_config.json`) from the demo script in
   `components/marketing/BillieDemoDialog.tsx`.
2. Encode to MP3, 128 kbps, mono, 16 kHz. Target ≤ 500 KB.
3. Place the file at `public/audio/billie-sample.mp3` and commit it.

Nothing else needs to change — the dialog probes for the file at runtime
and switches modes automatically.
