import { defineStore } from "pinia";

interface UserState {
  username: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: "",
  }),
  persist: {
    storage: window.sessionStorage,
  },
  actions: {},
});
