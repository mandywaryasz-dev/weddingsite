export type AudioStartupStatus = "idle" | "starting" | "playing" | "silent" | "failed";

export type AudioState = {
  isAudioEnabled: boolean;
  volume: number;
  isReady: boolean;
  hasActivatedAudio: boolean;
  hasEnteredExperience: boolean;
  isPlaying: boolean;
  pendingStart: boolean;
  startupStatus: AudioStartupStatus;
};

export type AudioContextValue = AudioState & {
  prepareAudio: () => void;
  play: () => Promise<void>;
  pause: () => void;
  activateAudioFromGesture: () => Promise<void>;
  enterSilently: () => void;
  setAudioEnabled: (nextEnabled: boolean) => void;
  fadeTo: (targetVolume: number, durationMs: number) => Promise<void>;
  duckAmbient: (lowVolume?: number) => Promise<void>;
  restoreAmbient: (normalVolume?: number) => Promise<void>;
};
