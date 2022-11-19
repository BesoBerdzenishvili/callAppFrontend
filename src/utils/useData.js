import create from "zustand";
import axios from "axios";

export const useData = create((set) => ({
  data: [],
  loading: false,
  hasErrors: false,
  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get("/citizens");
      set((state) => ({
        data: (state.data = response.data),
        loading: false,
      }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
}));
