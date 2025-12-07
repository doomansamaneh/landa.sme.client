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
  import { computed, ref, onMounted } from "vue";
  import { useMeta, useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useAuthStore } from "src/stores";
  import { useServiceWorker } from "src/composables/useServiceWorker";
  import packageJson from "../../../../../../package.json";

  import SettingsCard from "./SettingsCard.vue";
  import UserProfileSection from "./UserProfileSection.vue";
  import SettingsMenuItem from "./SettingsMenuItem.vue";

  const VERSION_STORAGE_KEY = "app_version";
  const currentVersion = packageJson.version;

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const setCookie = (name, value, days = 365) => {
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + days * 24 * 60 * 60 * 1000
    );
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  const storedVersion = getCookie(VERSION_STORAGE_KEY);
  const version = ref(storedVersion || currentVersion);

  const { t } = useI18n();
  const $q = useQuasar();
  const authStore = useAuthStore();
  const { getVersion } = useServiceWorker();

  onMounted(async () => {
    let swVersion = currentVersion;
    try {
      const versionResponse = await getVersion();
      if (versionResponse?.version) {
        swVersion = versionResponse.version;
      }
    } catch (error) {
      swVersion = currentVersion;
    }

    if (swVersion && swVersion !== storedVersion) {
      setCookie(VERSION_STORAGE_KEY, swVersion);
      version.value = swVersion;
    } else if (!storedVersion) {
      setCookie(VERSION_STORAGE_KEY, swVersion);
      version.value = swVersion;
    } else {
      version.value = storedVersion;
    }
  });

  const metaData = {
    title: "لاندا",
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
