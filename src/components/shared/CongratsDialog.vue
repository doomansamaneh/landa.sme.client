<template>
  <q-dialog
    transition-duration="600"
    transition-show="slide-down"
    transition-hide="slide-up"
    ref="congratsDialog"
  >
    <q-card class="congrats-card border-radius-xl">
      <q-card-section class="text-center q-pa-xl">
        <!-- <q-btn
          class="absolute-top-right q-ma-md"
          icon="o_close"
          round
          unelevated
          v-close-popup
          @click="congratsStore.confetti.value = false"
        /> -->

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
        <div class="text-center q-mt-xl text-h6 text-weight-700">
          به لاندا خوش آمدید
        </div>

        <div class="text-h6 q-mt-sm">
          از حسن انتخاب شما بسیار خشنود و سپاسگزار هستیم
        </div>

        <div class="q-pa-lg">
          <q-btn
            class="primary-shadow"
            color="primary"
            unelevated
            rounded
            label="بسیار خوب"
            icon="o_check"
            @click="handleOk"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useCongrats } from "src/composables/useCongrats";

  const congratsDialog = ref(null);
  const congratsStore = useCongrats();
  const router = useRouter();

  const handleOk = () => {
    congratsStore.confetti.value = false;
    router.push("/");
  };
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
      filter: drop-shadow(0 0 15px #ffff00);
    }
    50% {
      filter: drop-shadow(0 0 30px #ffff00);
    }
  }

  .sunshine-animation {
    @keyframes sunshine {
      0%,
      100% {
        filter: drop-shadow(0 0 15px #ffff00e6);
      }
      50% {
        filter: drop-shadow(0 0 30px #ffff0090);
      }
    }
  }
</style>
