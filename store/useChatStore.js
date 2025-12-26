import { create } from 'zustand';


export const useChatStore = create((set) => ({
    personality:"A",
    usageDays:2,
    lifestyle:{
        steps:4200,
        excerciseMinutes:25,
        sleepHours:5.5
    },
    messages:[],
    loading:false,
    

    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    setLoading: (loading) => set(() => ({ loading }))
   

}));