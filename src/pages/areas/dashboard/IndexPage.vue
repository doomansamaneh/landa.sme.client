<template>
  <confetti-animation v-if="congratsStore.firstLogin.value" />
  <home />
</template>

<script setup>
  import { onMounted } from "vue";
  import { useMeta, Dialog } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useFirstUsageWizard } from "src/composables/useFirstUsageWizard";

  import Home from "src/components/areas/dashboard/IndexViewV2.vue";
  import ConfettiAnimation from "src/assets/ConfettiAnimation.vue";
  import CongratsDialog from "src/components/shared/CongratsDialog.vue";

  const { t } = useI18n();
  const congratsStore = useFirstUsageWizard();

  const metaData = {
    title: t("pages.dashboard"),
  };

  useMeta(metaData);

  onMounted(() => {
    if (congratsStore.firstLogin.value) {
      Dialog.create({ component: CongratsDialog });
    }
  });
</script>
