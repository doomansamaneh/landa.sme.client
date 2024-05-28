<template>
  <transition enter-active-class="animated slideInDown">
    <!-- v-show="headerStore.showHeader.value" -->
    <q-header bordered class="business-header bg-main bg-dark">
      <q-toolbar class="row q-px-lg">
        <div class="col-2 row items-center q-gutter-x-sm">
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
        </div>
        <div class="col row items-center q-gutter-x-sm justify-end">
          <switch-theme />
          <div
            class="flex items-center text-on-dark q-gutter-x-xs cursor-pointer"
          >
            <q-icon size="sm" name="o_account_circle" />
            <div>{{ username }}</div>
            <q-menu
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
                      class="profile-pic primary-shadow primary-gradient q-mx-sm"
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
                    {{
                      $t("business-layout.buttons.change-password")
                    }}
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  @click="authStore.logout()"
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
          </div>
        </div>
      </q-toolbar>
      <q-separator class="business-header" />
      <q-toolbar style="min-height: 40px" class="q-px-lg">
        <bread-crumbs />
      </q-toolbar>
    </q-header>
  </transition>
</template>

<script setup>
  import { computed, onMounted, onUnmounted } from "vue";
  import { helper } from "src/helpers";
  import { useQuasar } from "quasar";
  import { useAuthStore } from "src/stores";
  import { useHeader } from "src/composables/mobile/useHeader";

  import SwitchTheme from "src/components/shared/SwitchTheme.vue";
  import BreadCrumbs from "src/components/shared/BreadCrumbs.vue";
  import ChangePasswordDialog from "src/components/areas/scr/users/ChangePasswordDialog.vue";

  const $q = useQuasar();
  const authStore = useAuthStore();
  const headerStore = useHeader();

  const username = computed(() => {
    if (authStore.user) return authStore.user.fullName;
    return "";
  });

  function changePasswordDialog() {
    $q.dialog({
      component: ChangePasswordDialog,
    });
  }

  // onMounted(() => {
  //   window.addEventListener('scroll', headerStore.handleScroll)
  // })

  // onUnmounted(() => {
  //   window.removeEventListener('scroll', headerStore.handleScroll)
  // })
</script>

<style lang="scss">
  .logo {
    filter: brightness(0) invert(1);
  }

  .q-toolbar__title {
    font-size: 14px;
    font-weight: 600;
  }

  .navbar-logo {
    text-decoration: none;
    color: black;
  }

  .user-profile {
    min-width: 240px;
  }

  .profile-pic {
    width: 72px;
    height: 72px;
  }

  .q-breadcrumbs__el.items-center {
    display: block;
  }
</style>
