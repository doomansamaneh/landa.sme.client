<template>
  <confetti-animation
    v-if="showCongrat && congratsStore.confetti.value"
  />
  <toolbar-container />
  <home />
</template>

<script setup>
  import { onMounted } from "vue";
  import { Dialog } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useCongrats } from "src/composables/useCongrats";

  import Home from "src/components/areas/dashboard/IndexViewV2.vue";
  import ConfettiAnimation from "src/assets/ConfettiAnimation.vue";
  import CongratsDialog from "src/components/shared/CongratsDialog.vue";
  import ToolbarContainer from "src/components/areas/dashboard/toolbar/ToolbarContainer.vue";

  const { t } = useI18n();
  const congratsStore = useCongrats();

  const showCongrat = false;

  onMounted(() => {
    //todo: if user login for first time should show congrats.
    if (showCongrat)
      Dialog.create({
        component: CongratsDialog,
      });
  });
</script>
