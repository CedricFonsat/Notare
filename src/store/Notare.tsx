import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NotareState = {
    notare: any; // Replace 'any' with a more specific type if possible
    setNotare: (newNotare: any) => Promise<void>; // Use a more specific type for newGroup
    fetchNotare: () => Promise<void>;
}

const useNotare = create<NotareState>((set) => ({
    notare: [],
    setNotare: async (newNotare) => {
        await AsyncStorage.setItem('@notare_list_item_storage', JSON.stringify(newNotare));
        set({ notare: newNotare });
    },
    fetchNotare: async () => {
        try {
            const result = await AsyncStorage.getItem('@notare_list_item_storage');
            if (result) {
                set({ notare: JSON.parse(result) });
            }
        } catch (error) {
            console.error("Error fetching group:", error);
        }
    },
}));

export default useNotare;
