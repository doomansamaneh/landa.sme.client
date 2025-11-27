<template>
  <q-header
    bordered
    class="q-px-md"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-toolbar class="row items-center no-padding text-on-dark">
      <div class="col-8 row items-center q-gutter-x-sm">
        <div>
          <a
            href="https://landa-sme.ir"
            target="blank"
            class="row items-center navbar-logo"
          >
            <img
              :class="$q.dark.isActive ? 'logo' : ''"
              src="/landa-sme-logo.png"
              alt="landa-sme"
              width="48"
            />
          </a>
        </div>

        <bread-crumbs class="q-ml-lg" />
      </div>
      <div class="col row items-center q-gutter-x-sm justify-end">
        <switch-theme />
        <q-btn
          no-caps
          unelevated
          rounded
          class="bordered text-on-dark gt-xs"
        >
          <q-icon size="sm" name="o_account_circle" class="q-mr-sm" />
          <div class="text-body2">{{ username }}</div>
          <q-menu
            class="border-radius-lg"
            fit
            transition-show="jump-down"
            transition-hide="jump-up"
            :offset="[10, 28]"
          >
            <q-list dense padding class="user-profile">
              <q-item-label class="text-h6" header>
                <div
                  class="column items-center justify-center q-mt-md"
                >
                  <q-avatar
                    class="profile-pic primary-gradient primary-shadow q-mx-sm"
                    text-color="white"
                  >
                    <div class="text-bold">
                      {{ helper.getFirstChar(username) }}
                    </div>
                  </q-avatar>
                  <div class="q-mt-md">
                    <span class="text-on-dark">{{ username }}</span>
                  </div>
                </div>
              </q-item-label>
              <q-item
                clickable
                v-ripple
                v-close-popup
                class="q-mt-md"
                @click="changePasswordDialog"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar
                      class="bg-on-dark"
                      icon="o_password"
                      size="md"
                    />
                  </q-item-section>
                </div>

                <q-item-section>
                  {{ $t("business-layout.buttons.change-password") }}
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                tabindex="0"
                to="/account/login"
                class="q-py-sm"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar
                      class="bg-on-dark"
                      icon="logout"
                      size="md"
                    />
                  </q-item-section>
                </div>
                <q-item-section>
                  {{ $t("business-layout.buttons.logout") }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useQuasar } from "quasar";
  import { useAuthStore } from "src/stores";

  import SwitchTheme from "src/components/shared/SwitchTheme.vue";
  import BreadCrumbs from "src/components/shared/BreadCrumbs.vue";
  import ChangePasswordDialog from "src/components/areas/scr/users/ChangePasswordDialog.vue";

  const authStore = useAuthStore();
  const $q = useQuasar();

  const username = computed(() => {
    if (authStore.currentUser) return authStore.currentUser.fullName;
    return "";
  });

  function changePasswordDialog() {
    $q.dialog({
      component: ChangePasswordDialog,
    });
  }
</script>
