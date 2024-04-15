<template>
  <lookup-view
    ref="lookup"
    dataSource="org/unitType/getlookupData"
    sortColumn="title"
    textTemplate="{{ title }}"
    searchField="title"
    columns="title"
  />
</template>

<script setup>
import { ref } from "vue";

import LookupView from "src/components/shared/dataTables/LookupView.vue";

const lookup = ref(null);

defineExpose({
  lookup,
});
</script>
