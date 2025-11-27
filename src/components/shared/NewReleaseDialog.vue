<template>
  <q-dialog
    transition-duration="600"
    :transition-show="$q.screen.xs ? 'slide-up' : 'slide-down'"
    :transition-hide="$q.screen.xs ? 'slide-down' : 'slide-up'"
    :maximized="$q.screen.xs"
    no-backdrop-dismiss
  >
    <q-card
      :style="$q.screen.xs ? '' : 'width: 720px; max-width: 95vw'"
    >
      <q-card-section class="q-pt-xl">
        <div class="text-center q-pb-lg">
          <div class="rocket-symbol q-mb-md">🚀</div>
          <div
            v-if="latest?.version"
            class="text-body2 text-weight-700 q-mb-xs"
          >
            {{ releaseMessageParts.before }}
            <q-badge
              rounded
              class="bordered text-h6 text-weight-700"
              color="white"
              text-color="dark"
              style="padding: 0px 8px"
            >
              {{ latest.version }}
              <img
                src="/favicon.png"
                width="20px"
                height="20px"
                class="q-ml-xs"
              />
            </q-badge>
            {{ releaseMessageParts.after }}
          </div>

          <div class="text-body2">
            {{ $t("shared.labels.newReleaseDescription") }}
          </div>
        </div>

        <div
          v-if="latest?.items?.length"
          class="text-body2 text-weight-700 q-mt-lg"
        >
          <q-icon name="list" size="20px" />
          {{ $t("shared.labels.latestChangesList") }}
        </div>
      </q-card-section>

      <q-card-section
        v-if="latest?.items?.length"
        :style="
          $q.screen.xs
            ? 'max-height: calc(100vh - 310px)'
            : 'max-height: 35vh'
        "
        class="scroll q-pt-none q-px-none"
        :class="$q.screen.xs ? 'hide-scrollbar q-pb-xl' : ''"
      >
        <div>
          <q-list separator>
            <q-item
              v-for="(item, index) in latest.items"
              :key="index"
            >
              <q-item-section avatar top>
                <q-avatar
                  color="primary"
                  size="20px"
                  text-color="white"
                  style="margin-top: 5px"
                >
                  <q-icon name="check" size="16px" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-body2">
                  {{ item }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-actions
        align="center"
        class="q-pa-md"
        :class="
          $q.screen.gt.xs
            ? 'bg-on-dark'
            : 'absolute-bottom bg-main q-pa-lg'
        "
      >
        <q-btn
          no-caps
          unelevated
          :label="$t('shared.labels.refresh')"
          class="text-h6"
          color="primary"
          rounded
          dense
          padding="6px 16px"
          @click="reload"
        />
        <q-btn
          no-caps
          :label="$t('shared.labels.cancel')"
          class="text-h6"
          dense
          rounded
          padding="6px 16px"
          flat
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import {
    ref,
    computed,
    onMounted,
    watch,
    getCurrentInstance,
  } from "vue";
  import { useI18n } from "vue-i18n";
  import { i18nInstance } from "src/boot/i18n";
  import messages from "src/i18n";
  import packageJson from "../../../package.json";

  const getLocale = () => {
    try {
      const i18n = useI18n();
      return i18n.locale;
    } catch (e) {
      return ref(localStorage.getItem("selectedLanguage") || "fa-IR");
    }
  };

  const locale = getLocale();

  const getT = () => {
    if (i18nInstance?.global) {
      return (key) => i18nInstance.global.t(key);
    }
    try {
      const i18n = useI18n();
      return i18n.t;
    } catch (e) {
      return (key) => key;
    }
  };

  const t = getT();

  const reload = () => {
    location.reload();
  };

  const RELEASE_NOTES_URL = "/release-notes.json";

  const currentVersion = ref(packageJson.version || "0.0.1");
  const releaseNotes = ref({});
  const latest = ref({
    version: null,
    items: [],
  });

  const releaseMessageParts = computed(() => {
    if (!latest.value?.version) return { before: "", after: "" };

    let message = "shared.labels.newReleaseMessage";
    try {
      if (i18nInstance?.global) {
        message = i18nInstance.global.t(
          "shared.labels.newReleaseMessage"
        );
      } else if (t) {
        message = t("shared.labels.newReleaseMessage");
      } else {
        const currentLocale =
          typeof locale === "object" && "value" in locale
            ? locale.value
            : typeof locale === "string"
            ? locale
            : localStorage.getItem("selectedLanguage") || "fa-IR";
        const localeMessages =
          messages[currentLocale] ||
          messages["fa-IR"] ||
          messages["en-US"];
        message =
          localeMessages?.shared?.labels?.newReleaseMessage ||
          message;
      }
    } catch (e) {
      console.error("Error getting translation:", e);
      try {
        const currentLocale =
          localStorage.getItem("selectedLanguage") || "fa-IR";
        const localeMessages =
          messages[currentLocale] ||
          messages["fa-IR"] ||
          messages["en-US"];
        message =
          localeMessages?.shared?.labels?.newReleaseMessage ||
          message;
      } catch (err) {
        console.error("Error in fallback translation:", err);
      }
    }

    const parts = message.split("{version}");
    return {
      before: parts[0] || "",
      after: parts[1] || "",
    };
  });

  const getNotesForCurrentLocale = (versionNotes) => {
    if (!versionNotes) return [];

    if (Array.isArray(versionNotes)) {
      return versionNotes;
    }

    const currentLocaleValue =
      typeof locale === "object" && locale.value
        ? locale.value
        : typeof locale === "string"
        ? locale
        : localStorage.getItem("selectedLanguage") || "fa-IR";

    return (
      versionNotes[currentLocaleValue] ||
      versionNotes["fa-IR"] ||
      versionNotes["en-US"] ||
      []
    );
  };

  const updateLatestNotes = () => {
    if (currentVersion.value) {
      const versionNotes = releaseNotes.value[currentVersion.value];
      latest.value = {
        version: currentVersion.value,
        items: versionNotes
          ? getNotesForCurrentLocale(versionNotes)
          : [],
      };
    }
  };

  const loadReleaseNotes = async () => {
    try {
      const response = await fetch(RELEASE_NOTES_URL);
      if (!response.ok) {
        throw new Error("Failed to load release notes");
      }
      const data = await response.json();

      releaseNotes.value = data.notes || {};

      if (data.version) {
        currentVersion.value = data.version;
      }

      updateLatestNotes();
    } catch (error) {
      console.error("Error loading release notes:", error);
      latest.value = {
        version: currentVersion.value,
        items: [],
      };
    }
  };

  watch(
    () =>
      typeof locale === "object" && "value" in locale
        ? locale.value
        : locale,
    () => {
      updateLatestNotes();
    }
  );

  onMounted(() => {
    loadReleaseNotes();
  });
</script>

<style lang="scss">
  .new-release-card {
    width: 700px;
  }

  .animated-img {
    animation: pulseAnimation 2s infinite;
  }

  @keyframes pulseAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.025);
    }
    100% {
      transform: scale(1);
    }
  }

  .rocket-symbol {
    font-size: 72px;
    line-height: 1;
    animation: rocketFloat 3s ease-in-out infinite;
  }

  @keyframes rocketFloat {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-8px) rotate(-5deg);
    }
    75% {
      transform: translateY(-8px) rotate(5deg);
    }
  }
</style>
