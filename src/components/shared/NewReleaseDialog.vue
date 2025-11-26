<template>
  <template v-if="isSameVersion">
    <q-dialog
      transition-duration="600"
      transition-show="slide-down"
      transition-hide="slide-up"
    >
      <q-card class="new-release-card border-radius-xl">
        <q-card-section class="text-center q-pa-xl">
          <q-img
            width="150px"
            spinner-color="primary"
            src="/favicon.png"
            class="animated-img pulse"
          />
          <div class="q-mt-lg text-on-dark text-h6 text-weight-700">
            {{ $t("shared.labels.newChangesAvailableTitle") }}
          </div>
          <div class="q-mt-sm text-body1 caption-on-dark">
            {{ $t("shared.labels.newChangesAvailableDescription") }}
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pa-md bg-on-dark">
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

  <template v-else>
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
            <div class="text-body2 text-weight-700 q-mb-xs">
              <i18n-t keypath="shared.labels.newReleaseMessage">
                <template #version>
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
                </template>
              </i18n-t>
            </div>

            <div class="text-body2">
              {{ $t("shared.labels.newReleaseDescription") }}
            </div>
          </div>

          <div class="text-body2 text-weight-700 q-mt-lg">
            <q-icon name="list" size="20px" />
            {{ $t("shared.labels.latestChangesList") }}
          </div>
        </q-card-section>

        <q-card-section
          :style="
            $q.screen.xs
              ? 'max-height: calc(100vh - 310px)'
              : 'max-height: 35vh'
          "
          class="scroll q-pt-none q-px-none"
          :class="$q.screen.xs ? 'hide-scrollbar q-pb-xl' : ''"
        >
          <div v-if="latest?.items?.length">
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
          <div v-else class="text-caption text-grey">—</div>
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
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import packageJson from "../../../package.json";

  const { locale } = useI18n();

  const reload = () => {
    location.reload();
  };

  const RELEASE_NOTES_URL = "/release-notes.json";

  const currentVersion = ref(null);
  const latestVersion = ref(null);
  const releaseNotes = ref({});
  const latest = ref({
    version: null,
    items: [],
  });

  const isSameVersion = computed(
    () =>
      Boolean(currentVersion.value) &&
      Boolean(latestVersion.value) &&
      String(currentVersion.value) === String(latestVersion.value)
  );

  const getNotesForCurrentLocale = (versionNotes) => {
    if (!versionNotes) return [];

    if (Array.isArray(versionNotes)) {
      return versionNotes;
    }

    const currentLocale = locale.value || "fa-IR";
    return (
      versionNotes[currentLocale] ||
      versionNotes["fa-IR"] ||
      versionNotes["en-US"] ||
      []
    );
  };

  const updateLatestNotes = () => {
    if (
      latestVersion.value &&
      releaseNotes.value[latestVersion.value]
    ) {
      const versionNotes = releaseNotes.value[latestVersion.value];
      latest.value = {
        version: latestVersion.value,
        items: getNotesForCurrentLocale(versionNotes),
      };
    }
  };

  const loadReleaseNotes = async () => {
    try {
      currentVersion.value = packageJson.version;

      const response = await fetch(RELEASE_NOTES_URL);
      if (!response.ok) {
        throw new Error("Failed to load release notes");
      }
      const data = await response.json();

      releaseNotes.value = data.notes || {};
      latestVersion.value = data.latestVersion;

      updateLatestNotes();
    } catch (error) {
      console.error("Error loading release notes:", error);
      currentVersion.value = packageJson.version || "0.0.1";
      latestVersion.value = "0.0.1";
      latest.value = {
        version: latestVersion.value,
        items: [],
      };
    }
  };

  watch(locale, () => {
    updateLatestNotes();
  });

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
