<template>
  <lookup-view
    ref="lookup"
    dataSource="org/unit/getlookupData"
    orderByField="code"
    textTemplate="{{ code }} {{ title }}"
    searchField="title"
    columns="code,title"
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
