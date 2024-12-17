import { defineStore } from "pinia";
import { fetchWrapper, encryptor } from "../helpers";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
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
      //this.redirect(this.returnUrl || "/business")
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
      this.user = response.data.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem("user");
    },

    logout() {
      this.clearUser();
      this.redirect("/account/login");
    },

    redirect(url) {
      this.router.push(url);
    },
  },
});
