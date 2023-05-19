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
          class="flex justify-start q-ml-lg text-weight-bold text-h5 text-dark"
          ><span class="ellipsis">Password reset</span></q-toolbar-title
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
            <div class="old-password-input">
              <q-input
                outlined
                v-model="oldPassword"
                :type="isPwd ? 'password' : 'text'"
                placeholder="Old Password"
                dense
                class="text-body bg-white #"
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
            <div class="new-password-input">
              <q-input
                outlined
                v-model="newPassword"
                :type="isPwd ? 'password' : 'text'"
                placeholder="New Password"
                dense
                class="text-body bg-white"
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
            <div class="confirm-new-password-input">
              <q-input
                outlined
                v-model="confirmNewPassword"
                :type="isPwd ? 'password' : 'text'"
                placeholder="Confirm New Password"
                dense
                class="text-body bg-white"
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
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            unelevated
            color="light-blue-6"
            size="md"
            class="full-width text-weight-bold"
            no-caps
            label="Change Password"
            style="height: 40px"
            @click="authenticate"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");

const isPwd = ref(true);
</script>

<style>
.q-card {
  width: 300px;
}
</style>
