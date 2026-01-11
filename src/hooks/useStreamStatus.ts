import { create } from 'zustand';

export type StreamStatus = 'offline' | 'connecting' | 'live' | 'error';

interface StreamState {
  status: StreamStatus;
  errorMessage: string | null;
  setStatus: (status: StreamStatus, errorMessage?: string) => void;
}

export const useStreamStatus = create<StreamState>((set) => ({
  status: 'offline',
  errorMessage: null,
  setStatus: (status, errorMessage = null) => set({ status, errorMessage }),
}));
