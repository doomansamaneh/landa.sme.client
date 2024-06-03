<template>
  <confetti-animation
    v-if="showCongrat && congratsStore.confetti.value"
  />
  <home />
</template>

<script setup>
  import { onMounted } from "vue";
  import { Dialog } from "quasar";
  import { useCongrats } from "src/composables/useCongrats";

  import Home from "src/components/areas/dashboard/IndexViewV2.vue";
  import ConfettiAnimation from "src/assets/ConfettiAnimation.vue";
  import CongratsDialog from "src/components/shared/CongratsDialog.vue";

  const showCongrat = false;
  const congratsStore = useCongrats();

  onMounted(() => {
    //todo: if user login for first time should show congrats.
    if (showCongrat)
      Dialog.create({
        component: CongratsDialog,
      });
  });
</script>
