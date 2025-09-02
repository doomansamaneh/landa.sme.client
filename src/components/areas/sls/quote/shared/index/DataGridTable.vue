<template>
  <template v-if="$q.screen.xs">
    <mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="subTitle ? `${title} / ${subTitle}` : title"
    />
  </template>
  <template v-else>
    <desktop
      :table-store="tableStore"
      :no-fullscreen="noFullscreen"
      :title="subTitle ? `${title} / ${subTitle}` : title"
      advanced-search
    />
  </template>
</template>

<script setup>
  import Desktop from "../../desktop/index/DataGridContainer.vue";
  import Mobile from "../../mobile/index/DataGrid.vue";

  const props = defineProps({
    title: String,
    subTitle: String,
    tableStore: Object,
    noFullscreen: Boolean,
    crudStore: Object,
  });
</script>
