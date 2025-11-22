import {create } from "zustand";

export const useBranstormingStore = create((set) => ({
    title: 'Projeto Sem Título',
    setTitle: (newTitle) => set({ title: newTitle }),
}));
    