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
                placeholder="Username (Mobile/Email) "
                dense
                class="text-body bg-white"
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
                />
              </div>
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
            label="Log in"
            style="height: 40px"
            @click="authenticate"
          />
        </q-card-actions>
        <q-card-section class="text-center q-pa-none">
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>

</script>

<style>

</style>
