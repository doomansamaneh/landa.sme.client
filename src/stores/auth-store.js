import { defineStore } from "pinia";
import { fetchWrapper, encryptor, helper } from "../helpers";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: getUserFromStorage(),
    returnUrl: null,
    isLoggingIn: false,
    captcha: null,
    captchaToken: null,
  }),

  actions: {
    async login(username, password, captchaAnswer) {
      this.isLoggingIn = true;

      try {
        const response = await fetchWrapper.post("account/login", {
          loginName: encryptor.encrypt(username),
          password: encryptor.encrypt(password),
          captcha: captchaAnswer,
          captchaToken: this.captchaToken?.jwt,
        });

        this.setUser(response.data.data);
        this.redirect("/business");
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      } finally {
        this.isLoggingIn = false;
      }
    },

    async getCaptcha() {
      try {
        const response = await fetchWrapper.get("captcha/getCaptcha");
        this.captchaToken = response.data;
      } catch (error) {
        console.error("Captcha error:", error);
      }
    },

    async logout() {
      this.clearUser();
      await fetchWrapper.post("account/logoff");
      this.redirect("/account/login");
      helper.clearCookies();
    },

    setUser(user) {
      this.currentUser = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    clearUser() {
      this.currentUser = null;
      localStorage.removeItem("user");
    },

    checkUser() {
      if (!this.currentUser) {
        this.redirect("/account/login");
      }
    },

    redirect(url) {
      this.router.push(url);
    },

    updateLastLoginDate(date) {
      if (this.currentUser) {
        this.currentUser.lastLoginDate = date;
        localStorage.setItem(
          "user",
          JSON.stringify(this.currentUser)
        );
      }
    },

    updateAnniversaryShown(date) {
      if (this.currentUser) {
        this.currentUser.anniversaryShown = date;
        localStorage.setItem(
          "user",
          JSON.stringify(this.currentUser)
        );
      }
    },
  },
});

// --- Utility ---
function getUserFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}
