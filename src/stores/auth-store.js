import { defineStore } from "pinia"
import { fetchWrapper, encryptor } from "../helpers"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
    isLoggingIn: false,
  }),

  actions: {
    async login(username, password) {

      this.isLoggingIn = true
      const response = await fetchWrapper.post("account/login", {
        loginName: encryptor.encrypt(username),
        password: encryptor.encrypt(password)
      }).finally(() => {
        this.isLoggingIn = false
      })

      this.setUser(response)
      this.redirect(this.returnUrl || "/business")
    },

    setUser(response) {
      this.user = response.data
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(this.user))
    },
    clearUser() {
      this.user = null
      localStorage.removeItem("user")
    },
    logout() {
      this.clearUser()
      this.redirect("/account/login")
    },
    redirect(url) {
      this.router.push(url)
    },
  },
})
