/**
 * Web Audio API synthesized gentle outdoor chime / singing bowl.
 * Creates clean acoustic frequencies without external audio files.
 */
export function playStepChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Harmonic frequencies for a calming warm chime (F major chord: F5, A5, C6)
    const frequencies = [698.46, 880.00, 1046.50];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      // Envelope: quick attack, slow gentle decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.25 / (idx + 1), now + 0.05 + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5 + idx * 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + 3.0);
    });
  } catch (err) {
    console.warn('Audio chime could not play due to browser policy:', err);
  }
}
