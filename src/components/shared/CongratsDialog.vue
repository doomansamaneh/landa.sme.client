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
        />

        <q-img
          spinner-color="primary"
          width="150px"
          src="celebration.svg"
        />
        <div
          class="text-center q-mt-xl text-h6 no-letter-spacing text-weight-700"
        >
          به لاندا خوش آمدید
        </div>
      </q-card-section>
      <q-card-actions align="center" class="bg-grey-3 q-pa-md">
        <q-btn
          unelevated
          label="برو به داشبورد"
          class="text-h6 no-letter-spacing"
          color="primary"
          rounded
          dense
          padding="6px 16px"
          @click="goToDashboard()"
        />
        <q-btn
          label="انصراف"
          class="text-h6 no-letter-spacing"
          dense
          rounded
          padding="6px 16px"
          flat
          v-close-popup
          @click="congratsStore.confetti.value = false"
        />
      </q-card-actions>
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

  const goToDashboard = () => {
    congratsStore.confetti.value = false;
    if (route.path === "dashboard") {
      congratsDialog.value.hide();
    } else {
      router.push("/dashboard");
    }
  };
</script>

<style lang="scss">
  .congrats-card {
    width: 700px;
  }
</style>
