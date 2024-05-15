<template>
  <confetti-animation v-if="congratsStore.confetti.value" />
  <home />
</template>

<script setup>
  import { onMounted } from "vue";
  import { Dialog } from "quasar";
  import { useCongrats } from "src/composables/useCongrats";

  import Home from "src/components/areas/dashboard/IndexViewV2.vue";
  import ConfettiAnimation from "src/assets/ConfettiAnimation.vue";
  import CongratsDialog from "src/components/shared/CongratsDialog.vue";

  const congratsStore = useCongrats();

  onMounted(() => {
    Dialog.create({
      component: CongratsDialog,
    });
  });
</script>
