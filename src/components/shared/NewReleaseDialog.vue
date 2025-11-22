<template>
  <template v-if="isSameVersion">
    <q-dialog
      transition-duration="600"
      transition-show="slide-down"
      transition-hide="slide-up"
    >
      <q-card class="new-release-card border-radius-xl">
        <q-card-section class="text-center q-pa-xl">
          <q-btn
            no-caps
            class="absolute-top-right q-ma-md"
            icon="o_close"
            round
            unelevated
            v-close-popup
          />
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
        <q-card-section class="flex justify-between">
          <div class="col">
            <div class="text-weight-700 text-body2 q-mb-xs">
              {{ $t("shared.labels.newReleaseTitle") }}
            </div>
            <div :class="$q.screen.xs ? 'text-body3' : 'text-body2'">
              {{ $t("shared.labels.newReleaseDescription") }}
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              no-caps
              icon="o_close"
              round
              dense
              unelevated
              v-close-popup
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section
          class="scroll"
          :class="$q.screen.xs ? 'hide-scrollbar' : ''"
          :style="
            $q.screen.xs
              ? 'height: calc(100vh - 180px)'
              : 'height: 50vh'
          "
        >
          <div class="text-body2 text-weight-700">
            لیست آخرین تغییرات
          </div>
          <div v-if="latest?.items?.length">
            <q-list separator>
              <q-item
                v-for="(item, index) in latest.items"
                :key="index"
              >
                <q-item-section avatar>
                  <q-icon name="o_new_releases" color="primary" />
                </q-item-section>
                <q-item-section>
                  <div class="text-body2">{{ item }}</div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else class="text-caption text-grey">—</div>
        </q-card-section>

        <q-card-actions
          align="center"
          class="q-pa-md"
          :class="$q.screen.gt.xs ? 'bg-on-dark' : ''"
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
  import { ref, computed } from "vue";

  const reload = () => {
    location.reload();
  };

  const CURRENT_VERSION = "0.0.1";
  const MOCK_LATEST_VERSION = "0.0.1"; // change to "0.0.2" to simulate update
  const MOCK_NOTES_BY_VERSION = {
    "0.0.1": [
      "اضافه شدن قابلیت کپی در سند حسابداری",
      "ایجاد قابلیت افزودن فروشنده در سند حسابداری",
      "نمایش گردش حساب چک در موبایل",
    ],
    "0.0.2": [
      "بهبود عملکرد بارگذاری صفحه داشبورد",
      "رفع چند باگ گزارش شده در چاپ فاکتور",
      "افزودن فیلترهای جدید به لیست چک‌ها",
    ],
  };

  const currentVersion = ref(MOCK_LATEST_VERSION);
  const lastVersion = ref(CURRENT_VERSION);
  const isSameVersion = computed(
    () =>
      Boolean(currentVersion.value) &&
      Boolean(lastVersion.value) &&
      String(currentVersion.value) === String(lastVersion.value)
  );

  const latest = ref({
    version: currentVersion.value,
    items: MOCK_NOTES_BY_VERSION[currentVersion.value] || [],
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
</style>
