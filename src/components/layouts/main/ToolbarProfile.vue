<template>
  <q-btn
    no-caps
    flat
    round
    dense
    icon="o_account_circle"
    size="14px"
    class="btn-icon text-on-dark"
  >
    <q-menu
      class="border-radius-lg z-max"
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="[5, 24]"
    >
      <q-list dense padding style="min-width: 240px">
        <q-item-label class="text-h6" header>
          <div class="column items-center justify-center q-mt-md">
            <customer-avatar
              size="72px"
              text-color="white"
              :item="authStore.currentUser?.id"
              :text-holder="authStore.currentUser?.fullName"
              text-holder-class="text-h3 text-bold q-pb-sm"
              :avatar="avatar"
            />
            <div class="q-mt-md">
              <span class="text-on-dark">{{ username }}</span>
            </div>
          </div>
        </q-item-label>
        <q-item
          clickable
          v-close-popup
          tabindex="0"
          class="q-py-sm"
          to="/scr/users/settings"
        >
          <div class="q-py-sm">
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark"
                icon="o_settings"
                size="lg"
              />
            </q-item-section>
          </div>
          <q-item-section>
            <div class="text-body2">
              {{ $t("shared.labels.personalSettings") }}
            </div>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable v-close-popup tabindex="0" class="q-py-sm" @click="openPasswordDialog">
          <div class="q-py-sm">
            <q-item-section avatar>
              <q-avatar class="bg-on-dark" icon="password" size="md" />
            </q-item-section>
          </div>
          <q-item-section>
            {{ $t("business-layout.buttons.change-password") }}
          </q-item-section>
        </q-item> -->
        <q-item
          clickable
          v-close-popup
          tabindex="0"
          class="q-py-sm"
          to="/business"
        >
          <div class="q-py-sm">
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark"
                icon="o_business"
                size="lg"
              />
            </q-item-section>
          </div>
          <q-item-section>
            <div class="text-body2">
              {{ $t("pages.business") }}
            </div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          tabindex="0"
          class="q-py-sm"
          @click="authStore.logout()"
        >
          <div class="q-py-sm">
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark"
                icon="o_logout"
                size="lg"
              />
            </q-item-section>
          </div>
          <q-item-section>
            <div class="text-body2">
              {{ $t("business-layout.buttons.logout") }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useAuthStore } from "src/stores";
  import { helper } from "src/helpers";
  import { useQuasar } from "quasar";

  import ChangePasswordDialog from "src/components/areas/scr/users/ChangePasswordDialog.vue";
  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";

  const authStore = useAuthStore();
  const $q = useQuasar();

  function openPasswordDialog() {
    $q.dialog({
      component: ChangePasswordDialog,
    });
  }

  const username = computed(() => {
    if (authStore.currentUser) return authStore.currentUser.fullName;
    return "";
  });
</script>

<style>
  .profile-pic {
    width: 72px;
    height: 72px;
  }
</style>
