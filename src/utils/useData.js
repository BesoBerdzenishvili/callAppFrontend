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
      set((state) => ({ data: (state.data = response.data), loading: false }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
  fetchOne: async (id) => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(`/citizens/${id}`);
      set((state) => ({ data: (state.data = response.data), loading: false }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
  createCitizen: async (newCitizen) => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.post(`/citizens`, newCitizen);
      set((state) => ({ data: (state.data = response.data), loading: false }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
  editCitizen: async (id, editedCitizen) => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.put(`/citizens/${id}`, editedCitizen);
      set((state) => ({ data: (state.data = response.data), loading: false }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
  deleteCitizen: async (id) => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.delete(`/citizens/${id}`);
      set((state) => ({ data: (state.data = response.data), loading: false }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
}));
