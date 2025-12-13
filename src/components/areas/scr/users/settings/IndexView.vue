<template>
  <div :class="containerClass">
    <div>
      <div>
        <div class="text-h6 text-weight-700 q-mb-md">
          {{ t("shared.labels.settings") }}
        </div>
        <settings-card :class="cardClass">
          <user-profile-section :user="authStore.currentUser" />
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

      <div class="text-center q-mt-lg">
        <div class="text-caption text-grey">
          {{ t("shared.labels.version") }}: {{ version }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useMeta, useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useAuthStore } from "src/stores";

  import SettingsCard from "./SettingsCard.vue";
  import UserProfileSection from "./UserProfileSection.vue";
  import SettingsMenuItem from "./SettingsMenuItem.vue";

  const version = ref(process.env.APP_VERSION);

  const { t } = useI18n();
  const $q = useQuasar();
  const authStore = useAuthStore();

  // onMounted(async () => {
  //   // let swVersion = currentVersion;
  //   // try {
  //   //   const versionResponse = await getVersion();
  //   //   if (versionResponse?.version) {
  //   //     swVersion = versionResponse.version;
  //   //   }
  //   // } catch (error) {
  //   //   swVersion = currentVersion;
  //   // }
  //   // if (swVersion && swVersion !== storedVersion) {
  //   //   setCookie(VERSION_STORAGE_KEY, swVersion);
  //   //   version.value = swVersion;
  //   // } else if (!storedVersion) {
  //   //   setCookie(VERSION_STORAGE_KEY, swVersion);
  //   //   version.value = swVersion;
  //   // } else {
  //   //   version.value = storedVersion;
  //   // }
  // });

  const metaData = {
    title: "LANDA",
    titleTemplate: (title) => t("shared.labels.settings"),
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
      label: t("shared.labels.themeAndLanguage"),
    },
    {
      to: "/scr/users/settings/changePassword",
      label: t("change-password-page.title"),
    },
  ];

  const businessMenuItems = [
    {
      to: "/business",
      label: t("page.card-title"),
    },
    {
      to: "/account/login",
      label: t("shared.labels.logout"),
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
