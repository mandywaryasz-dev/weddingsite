export type AudioState = {
  isMuted: boolean;
  volume: number;
  isReady: boolean;
  hasUserInteracted: boolean;
};

export type AudioContextValue = AudioState & {
  play: () => Promise<void>;
  pause: () => void;
  setMuted: (nextMuted: boolean) => void;
  fadeTo: (targetVolume: number, durationMs: number) => Promise<void>;
  duckAmbient: (lowVolume?: number) => Promise<void>;
  restoreAmbient: (normalVolume?: number) => Promise<void>;
};
