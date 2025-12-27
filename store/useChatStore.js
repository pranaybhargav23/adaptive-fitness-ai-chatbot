import { create } from 'zustand';


export const useChatStore = create((set, get) => ({
    personality: "A",
    usageDays: 2,
    lifestyle: {
        steps: 4200,
        excerciseMinutes: 25,
        sleepHours: 5.5
    },
    messages: [],
    history: [],
    rewardCoins: 0,
    loading: false,


    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    setLoading: (loading) => set(() => ({ loading })),
    clearMessages: () => set(() => ({ messages: [] })),

    fetchChatHistory: async () => {
        try {
            set({ loading: true });
            const response = await fetch("http://10.0.2.2:3000/api/chat/history");
            const data = await response.json();

            set({ history: data.history });

        } catch (error) {
            console.error("Error fetching chat history:", error);
        } finally {
            set({ loading: false });
        }
    },

    fetchCurrentCoinCount: async () => {
        try {
            const response = await fetch("http://10.0.2.2:3000/api/chat/coins");
            const data = await response.json();
            console.log("Fetched coin count:", data);
            set({ rewardCoins: data.coinCount });

        } catch (error) {
            console.error("Error fetching coin count:", error);
        }
    }


}));