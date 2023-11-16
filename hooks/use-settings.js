import { create } from "zustand";

export const useSetting = create((set)=>({
    isOpen : false,
    onOpen : () => set({ isOpen : true}),
    onClose : () => set({ isOpen : false })
}));