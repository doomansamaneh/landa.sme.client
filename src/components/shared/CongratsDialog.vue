<template>
  <q-dialog
    transition-duration="600"
    transition-show="slide-down"
    transition-hide="slide-up"
    ref="congratsDialog"
  >
    <q-card class="congrats-card border-radius-xl">
      <q-card-section class="text-center q-pa-xl">
        <q-btn
          class="absolute-top-right q-ma-md"
          icon="o_close"
          round
          unelevated
          v-close-popup
          @click="congratsStore.confetti.value = false"
        />

        <q-img
          spinner-color="primary"
          width="150px"
          src="celebration.svg"
          class="sunshine-animation"
          :style="
            $q.dark.isActive
              ? 'filter: drop-shadow(0 0 15px #FFFF0090);'
              : 'filter: drop-shadow(0 0 15px #FFFF00);'
          "
        />
        <div
          class="text-center q-mt-xl text-h6 no-letter-spacing text-weight-700"
        >
          به لاندا خوش آمدید
        </div>

        <div class="text-h6 no-letter-spacing q-mt-sm">
          از حسن انتخاب شما بسیار خشنود و سپاسگذار هستیم
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useCongrats } from "src/composables/useCongrats";

  const congratsStore = useCongrats();
  const route = useRouter();
  const router = useRouter();

  const congratsDialog = ref(null);

</script>

<style lang="scss">
  .congrats-card {
    width: 700px;
  }

  .sunshine-animation {
    animation: sunshine 3s infinite;
  }

  @keyframes sunshine {
    0%,
    100% {
      filter: drop-shadow(0 0 15px #FFFF00);
    }
    50% {
      filter: drop-shadow(0 0 30px #FFFF00);
    }
  }

  .sunshine-animation {
    @keyframes sunshine {
      0%,
      100% {
        filter: drop-shadow(0 0 15px #ffff00e6);
      }
      50% {
        filter: drop-shadow(0 0 30px #FFFF0090);
      }
    }
  }

</style>
