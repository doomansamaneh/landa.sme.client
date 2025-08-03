import { defineStore } from "pinia";
import { fetchWrapper, encryptor } from "../helpers";

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

export const useAuthStore_ = defineStore("auth", {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
    isLoggingIn: false,
    captcha: null,
    captchaToken: null,
  }),

  actions: {
    async login(username, password, captchaAnswer) {
      this.isLoggingIn = true;
      const response = await fetchWrapper
        .post("account/login", {
          loginName: encryptor.encrypt(username),
          password: encryptor.encrypt(password),
          captcha: captchaAnswer,
          captchaToken: this.captchaToken.jwt,
        })
        .finally(() => {
          //this.getCaptcha();
          this.isLoggingIn = false;
        });

      this.setUser(response);
      this.redirect("/business");
    },

    async getCaptcha() {
      try {
        const response = await fetchWrapper.get("captcha/getCaptcha");
        this.captchaToken = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    setUser(response) {
      this.currentUser = response.data.data;
      localStorage.setItem("user", JSON.stringify(this.currentUser));
    },

    clearUser() {
      this.currentUser = null;
      localStorage.removeItem("user");
    },

    async logout() {
      this.clearUser();
      await fetchWrapper.post("account/logoff");
      this.redirect("/account/login");
    },

    redirect(url) {
      this.router.push(url);
    },

    checkUser() {
      const user = localStorage.getItem("user");

      if (!user) {
        this.redirect("/account/login");
      }
    },
  },
});
