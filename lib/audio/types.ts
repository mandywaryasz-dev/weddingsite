export type AudioState = {
  isAudioEnabled: boolean;
  volume: number;
  isReady: boolean;
  hasActivatedAudio: boolean;
  isPlaying: boolean;
  pendingStart: boolean;
};

export type AudioContextValue = AudioState & {
  play: () => Promise<void>;
  pause: () => void;
  activateAudioFromGesture: () => Promise<void>;
  setAudioEnabled: (nextEnabled: boolean) => void;
  fadeTo: (targetVolume: number, durationMs: number) => Promise<void>;
  duckAmbient: (lowVolume?: number) => Promise<void>;
  restoreAmbient: (normalVolume?: number) => Promise<void>;
};
