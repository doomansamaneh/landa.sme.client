import { defineStore } from "pinia"

import { fetchWrapper, encryptor } from "../helpers"
//import { router } from "../router"
import { useAlertStore } from "../stores/alert-store"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null
  }),

  actions: {
    async login(username, password) {
      try {
        const response = await fetchWrapper.post(`account/login`, {
          loginName: encryptor.encrypt(username),
          password: encryptor.encrypt(password)
        })

        const data = response.data;
        if (data.code == 0) 
        {
          //todo: 
          alert(data.message);
        }
        else 
        {
          // update pinia state
          this.user = data
          // store user details and jwt in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(this.user))
          // redirect to previous url or default to home page
          this.router.push(this.returnUrl || "/business")
        }
      } catch (error) {
        alert("login error: " + error)
        // const alertStore = useAlertStore()
        // alertStore.error(error)
      }
    },
    clearUser() {
      this.user = null
      localStorage.removeItem("user")
    },
    logout() {
      this.clearUser()
      this.router.push("/account/login")
    },
    redirect(url) {
      this.router.push(url)
    }
  }
})
