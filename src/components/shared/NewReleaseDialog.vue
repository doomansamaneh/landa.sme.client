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
  import { ref, computed } from "vue";

  const reload = () => {
    location.reload();
  };

  const CURRENT_VERSION = "0.0.1";
  const MOCK_LATEST_VERSION = "0.0.2"; // change to "0.0.2" to simulate update
  const MOCK_NOTES_BY_VERSION = {
    "0.0.1": [
      "اضافه شدن قابلیت کپی در سند حسابداری",
      "ایجاد قابلیت افزودن فروشنده در سند حسابداری",
      "نمایش گردش حساب چک در موبایل",
    ],
    "0.0.2": [
      "بهبود عملکرد بارگذاری صفحه داشبورد و این یک متن تستی تولید شده توسط من است که هیچ ارزشی ندارد و صرفا از آن برای تست در نرم‌افزار استفاده می‌کنم. این متن می‌تواند برای دیگر افراد تنبل همچون من هم مفید واقع شود تا سرعت کارشان را افزایش دهند.",
      "رفع چند باگ گزارش شده در چاپ فاکتور",
      "افزودن فیلترهای جدید به لیست چک‌ها",
      "بهبود عملکرد بارگذاری صفحه داشبورد",
      "رفع چند باگ گزارش شده در چاپ فاکتور",
      "افزودن فیلترهای جدید به لیست چک‌ها",
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
