<template>
  <desktop v-if="$q.screen.gt.sm" />
  <mobile v-else />
</template>

<script setup>
  import { useQuasar } from "quasar";
  import Desktop from "src/components/areas/trs/bankAccount/desktop/IndexView.vue";
  import Mobile from "src/components/areas/trs/bankAccount/mobile/IndexView.vue";

  const $q = useQuasar();
</script>
