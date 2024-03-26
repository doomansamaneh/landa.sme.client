<template>
  <lookup-view
    dataSource="cmn/productGroup/getlookupData"
    v-model:selectedId="selectedId"
    v-model:selectedText="selectedText"
    orderByField="code"
    columns="code,title"
    textTemplate="{{code}} - {{ title }}"
    searchField="title"
    ref="lookup"
  >
  </lookup-view>
</template>

<script setup>
import { ref } from "vue";

import LookupView from "src/components/shared/dataTables/LookupView.vue";

const lookup = ref(null);

// const selectedId = defineModel("selectedId");
// const selectedText = defineModel("selectedText");

defineExpose({
  lookup,
});
</script>
