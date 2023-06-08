import { defineStore } from "pinia"
import { fetchWrapper, encryptor } from "../helpers"
import { useAlertStore } from "../stores/alert-store"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
    errorCode0: "",
    errorCode0Message: "",
    isLoggingIn: false // new state variable
  }),

  actions: {
    async login(username, password) {
      try {
        this.isLoggingIn = true // Set isLoggingIn to true before sending request

        const response = await fetchWrapper.post("account/login", {
          loginName: encryptor.encrypt(username),
          password: encryptor.encrypt(password)
        })

        const data = response.data

        if (data.code === 0) {
          this.errorCode0 = data.code
          this.errorCode0Message = "Invalid username or password."
          // alert(data.message)
          this.isLoggingIn = false
        } else {
          this.errorCode0 = ""
          this.errorCode0Message = ""
          // update Pinia state
          this.user = data
          // store user details and jwt in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(this.user))
          // Use setTimeout to wait for 2 seconds before redirecting
          setTimeout(() => {
            this.redirect(this.returnUrl || "/business")
          }, 2000)
        }
      } catch (error) {
        useAlertStore().addAlert({
          type: "negative",
          message: "There was an error logging in. Please try again later."
        })
      } finally {
        setTimeout(() => {
          this.isLoggingIn = false // Set isLoggingIn back to false after the request completes
        }, 2000)
      }
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
    }
  },

  // Getter function to show the error 0 banner
  getters: {
    showErrorCode0Banner() {
      return this.errorCode0 === 0
    }
  }
})
