<template>
  <div :class="containerClass">
    <div>
      <div>
        <div class="text-h6 text-weight-700 q-mb-md">
          {{ pageTitle }}
        </div>
        <settings-card :class="cardClass">
          <user-profile-section :user="authStore.user" />
          <settings-menu-item
            v-for="item in settingsMenuItems"
            :key="item.to"
            v-bind="item"
          />
        </settings-card>
      </div>

      <settings-card :class="cardClass" class="q-mt-xl">
        <settings-menu-item
          v-for="item in businessMenuItems"
          :key="item.to"
          v-bind="item"
        />
      </settings-card>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useMeta, useQuasar } from "quasar";
  import { useAuthStore } from "src/stores";

  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";
  import SettingsCard from "./SettingsCard.vue";
  import UserProfileSection from "./UserProfileSection.vue";
  import SettingsMenuItem from "./SettingsMenuItem.vue";

  const pageTitle = "تنظیمات";

  const $q = useQuasar();
  const authStore = useAuthStore();

  const metaData = {
    title: "لاندا",
    titleTemplate: (title) => pageTitle,
  };

  useMeta(metaData);

  const containerClass = computed(() =>
    $q.screen.gt.sm ? "flex items-center justify-center" : ""
  );

  const cardClass = computed(() =>
    $q.screen.gt.sm ? "settings-card" : "full-width"
  );

  const settingsMenuItems = [
    {
      to: "/scr/users/settings/theme",
      label: "رنگ تم و زبان",
    },
    {
      to: "/scr/users/settings/changePassword",
      label: "تغییر رمز عبور",
    },
  ];

  const businessMenuItems = [
    {
      to: "/business",
      label: "کسب و کارهای من",
    },
    {
      to: "/account/login",
      label: "خروج از حساب",
      icon: "o_logout",
      iconClass: "mirror",
    },
  ];
</script>

<style lang="scss">
  .settings-card {
    width: 900px;
  }
</style>
