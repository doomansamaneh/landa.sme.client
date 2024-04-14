<template>
  <lookup-view
    dataSource="inv/inventory/getlookupData"
    v-model:selectedId="selectedId"
    v-model:selectedText="selectedText"
    sortColumn="code"
    columns="code,title"
    textTemplate="{{code}} - {{ title }}"
    ref="lookup"
  >
  </lookup-view>
</template>

<script setup>
import { ref } from "vue";

import LookupView from "src/components/shared/dataTables/LookupView.vue";

const lookup = ref(null);

defineExpose({
  lookup,
});
</script>
