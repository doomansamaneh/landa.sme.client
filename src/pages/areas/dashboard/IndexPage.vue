<template>
  <confetti-animation v-if="congratsStore.confetti.value" />
  <home />
</template>

<script setup>
  import { onMounted } from "vue";
  import { useMeta, Dialog } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useCongrats } from "src/composables/useCongrats";

  import Home from "src/components/areas/dashboard/IndexViewV2.vue";
  import ConfettiAnimation from "src/assets/ConfettiAnimation.vue";
  import CongratsDialog from "src/components/shared/CongratsDialog.vue";

  const { t } = useI18n();
  const congratsStore = useCongrats();

  const metaData = {
    title: t("pages.dashboard"),
  };

  useMeta(metaData);

  onMounted(() => {
    //todo: if user login for first time should show congrats.
    if (congratsStore.firstUsage.value)
      Dialog.create({
        component: CongratsDialog,
      });
  });
</script>
