<template>
  <desktop v-if="$q.screen.gt.sm" :action="action" :title="title" />
  <mobile v-else :action="action" :title="title" />
  <!-- <mobile :action="action" :title="title" /> -->
</template>

<script setup>
import Desktop from "src/components/areas/sls/invoice/desktop/forms/CreateForm.vue";
import Mobile from "src/components/areas/sls/invoice/mobile/forms/CreateForm.vue";

const props = defineProps({
  title: String,
  action: String,
});
</script>
