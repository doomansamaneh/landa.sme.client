<template>
  <lookup-view
    dataSource="cmn/productUnit/getlookupData"
    sortColumn="title"
    columns="code,title"
    textTemplate="{{ title }}"
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
