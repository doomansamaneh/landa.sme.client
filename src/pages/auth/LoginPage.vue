<!-- <template>
    <div class="fullscreen bg-blue text-white text-center flex flex-center">
        <q-card square class="shadow-24">
            <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h4 text-white">Landa SME</h4>
                <div v-if="showRegister" class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
                    <q-btn fab icon="add" color="purple-4" />
                </div>
            </q-card-section>
            <q-card-section>
                <q-form class="q-pt-md" style="width: 320px;">
                    <q-input square clearable v-model="username" type="username" label="Email">
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                    <q-input class="q-mt-md" square clearable v-model="password" type="password" label="Password">
                        <template v-slot:prepend>
                            <q-icon name="lock" />
                        </template>
                    </q-input>
                </q-form>
            </q-card-section>
            <q-card-actions>
                <q-btn unelevated color="blue" class="q-mx-sm full-width_text-white" label="Sign In"
                    @click="authenticate" />
            </q-card-actions>
            <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Forgot your password?</p>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useAuthStore } from '../../stores';

    const showRegister = 0
    const username = ref('')
    const password = ref('')

    async function authenticate() {
        const authStore = useAuthStore();
        await authStore.login(username.value, password.value);
    }
</script> -->

<template>
  <q-page
    class="fullscreen row justify-center items-center"
    style="background-color: #f5f6f9"
  >
    <q-header
      style="height: 80px; background-color: #f5f6f9"
      class="flex text-dark"
    >
      <q-toolbar>
        <q-toolbar-title
          class="text-h5 flex justify-start q-ml-lg text-weight-bold text-dark"
          >Log in</q-toolbar-title
        >
        <div class="flex q-pr-lg q-gutter-sm">
          <q-btn
            unelevated
            no-caps
            color="blue-6"
            label="Sign up"
            class="text-weight-bold"
          />
          <q-btn-dropdown
            outline
            push
            no-caps
            color="grey-9"
            icon="language"
            label="en"
            @click="onMainClick"
            class="text-dark shadow-1"
            style="height: 42px"
          >
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>fa</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>ar</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <div class="login-form q-mt-xl">
      <div class="logo flex justify-center">
        <q-img
          src="/src/assets/about-us-header.png"
          class="q-mb-md"
          style="width: 270px"
        />
      </div>
      <q-card class="form no-shadow" style="background-color: #f5f6f9">
        <q-card-section>
          <q-form class="q-gutter-md">
            <div class="username-input">
              <q-input
                outlined
                v-model="username"
                placeholder="Username (Mobile/Email)"
                dense
                class="noen-border text-body bg-white"
                color="blue-5"
                required
              />
            </div>
            <div class="password-input">
              <q-input
                outlined
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                placeholder="Password"
                dense
                class="text-body bg-white"
                color="blue-5"
                required
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    size="xs"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="row justify-between items-center">
              <div class="flex">
                <q-btn
                  unelevated
                  color="grey-6"
                  label="65 + 8"
                  dense
                  class="q-px-md text-h6"
                />
              </div>
              <div class="q-pr-md">
                <q-btn round flat color="blue-6" icon="refresh" dense />
              </div>

              <div class="col-5">
                <q-input
                  outlined
                  v-model="ph"
                  placeholder="1234"
                  dense
                  class="text-body bg-white"
                  color="blue-5"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            unelevated
            type="submit"
            color="light-blue-6"
            size="md"
            class="full-width text-weight-bold"
            no-caps
            label="Log in"
            style="height: 40px"
            @click="authenticate"

          />
        </q-card-actions>
        <q-card-section class="text-center q-pa-none">
          <p class="forgot-password text-blue-7 q-mt-lg">
            <a href="#">Forgot your password?</a>
          </p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "../../stores"

const showRegister = 0
const username = ref("")
const usernameClass = ref("")
const password = ref("")

const isPwd = ref(true)

async function authenticate() {
  const authStore = useAuthStore()
  await authStore.login(username.value, password.value)
}
</script>

<style>
.q-card {
  width: 300px;
}

.forgot-password a {
  text-decoration: none;
  color: #0087f6;
}

@media only screen and (max-width: 360px) {
  .q-toolbar {
    padding: 0;
  }
}

.q-field--focused {
  outline: none;
  box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 5px rgb(147, 214, 255),
    0 0 5px rgb(147, 214, 255), 0 0 2px rgb(147, 214, 255),
    0 0 3px rgb(147, 214, 255);
  transition: box-shadow 0.3s ease-in-out;
}
</style>
