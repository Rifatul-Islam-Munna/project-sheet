import { create } from 'zustand'

type State = {
  note: string
}

type Actions = {
  setNoted: (qty: string) => void
 
}

export const useNote = create<State & Actions>((set) => ({
    note: '',
  setNoted: (qty: string) =>set({ note: qty }),
 
}))
