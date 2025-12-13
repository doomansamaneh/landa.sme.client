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
            class="text-body1 text-weight-700 q-mb-xs"
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
            {{ t("shared.labels.newReleaseDescription") }}
          </div>
        </div>

        <div
          v-if="latest?.items?.length"
          class="text-body2 text-weight-700 q-mt-lg"
        >
          <q-icon name="list" size="20px" />
          {{ t("shared.labels.latestChangesList") }}
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
          :label="t('shared.labels.refresh')"
          class="text-h6"
          color="primary"
          rounded
          dense
          padding="6px 16px"
          @click="reload"
        />
        <q-btn
          no-caps
          :label="t('shared.labels.cancel')"
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
  import { ref, computed, onMounted, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import { useQuasar } from "quasar";

  const props = defineProps({
    swVersion: {
      type: String,
      default: null,
    },
  });

  const { t, locale } = useI18n();
  const $q = useQuasar();

  const CURRENT_VERSION = process.env.APP_VERSION || "1.0.0";
  const latestVersion = computed(
    () => props.swVersion || CURRENT_VERSION
  );

  const RELEASE_NOTES_URL = "/release-notes.json";
  const releaseNotes = ref({});
  const latest = ref({
    version: latestVersion.value,
    items: [],
  });

  const releaseMessageParts = computed(() => {
    const template =
      t("shared.labels.newReleaseMessage") ||
      "New version {version} is available";

    const [before, after] = template.split("{version}");
    return { before, after };
  });

  const loadReleaseNotes = async () => {
    try {
      const res = await fetch(RELEASE_NOTES_URL, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load release notes");

      releaseNotes.value = await res.json();
      updateLatestNotes();
    } catch {
      updateLatestNotes();
    }
  };

  const getLocalizedNotes = (notes) => {
    if (!notes) return [];
    if (Array.isArray(notes)) return notes;

    return (
      notes[locale.value] || notes["fa-IR"] || notes["en-US"] || []
    );
  };

  const updateLatestNotes = () => {
    const notes = releaseNotes.value[latestVersion.value];
    latest.value = {
      version: latestVersion.value,
      items: getLocalizedNotes(notes),
    };
  };

  const reload = async () => {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      reg?.waiting?.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  };

  watch([locale, () => props.swVersion], updateLatestNotes);

  onMounted(loadReleaseNotes);
</script>

<style lang="scss">
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
