<template>
  <template v-if="$q.screen.xs">
    <mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
    />
  </template>
  <template v-else>
    <desktop
      :table-store="tableStore"
      :title="title"
      advanced-search
      :no-fullscreen="noFullscreen"
    />
  </template>
</template>

<script setup>
  import Desktop from "../../desktop/index/DataGridContainer.vue";
  import Mobile from "../../mobile/index/DataGrid.vue";

  const props = defineProps({
    title: String,
    gridStore: Object,
    tableStore: Object,
    crudStore: Object,
    noFullscreen: Boolean
  });
</script>
