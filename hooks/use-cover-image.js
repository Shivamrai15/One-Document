import { create } from "zustand";

export const useCoverImage = create((set)=>({
    url : undefined,
    isOpen : false,
    onOpen : () => set({isOpen : true, url : undefined}),
    onClose : () => set({isOpen : false, url : undefined}),
    onReplace : (url) => set({isOpen : true, url})
}));