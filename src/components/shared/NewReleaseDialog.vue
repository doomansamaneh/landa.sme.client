<template>
  <q-dialog
    transition-duration="600"
    transition-show="slide-down"
    transition-hide="slide-up"
  >
    <q-card class="new-release-card border-radius-xl">
      <q-card-section class="text-center q-pa-xl">
        <q-btn
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
        <div
          class="q-mt-lg text-dark text-h6 text-weight-700 no-letter-spacing"
        >
          درود بر شما، نسخه جدید در دسترس است
        </div>
        <div class="q-mt-sm text-body1 no-letter-spacing text-grey-7">
          برای دریافت نسخه جدید بر روی تازه‌سازی کلیک کنید
        </div>
      </q-card-section>
      <q-card-actions align="center" class="bg-grey-3 q-pa-md">
        <q-btn
          unelevated
          label="تازه‌سازی"
          class="text-h6 no-letter-spacing"
          color="primary"
          rounded
          dense
          padding="6px 16px"
          @click="reload"
        />
        <q-btn
          label="انصراف"
          class="text-h6 no-letter-spacing"
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
  const reload = () => {
    location.reload();
  };
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
