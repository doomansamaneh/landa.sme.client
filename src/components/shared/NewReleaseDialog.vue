<template>
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
          {{ $t("shared.labels.newReleaseTitle") }}
        </div>
        <div class="q-mt-sm text-body1 caption-on-dark">
          {{ $t("shared.labels.newReleaseDescription") }}
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
