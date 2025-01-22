<template>
  <div class="flex items-center justify-between q-pa-md">
    <div class="flex items-center q-gutter-xs">
      <reload-button :table-store="tableStore" />
      <slot name="print-button">
        <print-button :table-store="tableStore" :title="title" />
      </slot>
      <separator-toggle-button :table-store="tableStore" />
      <export-button :table-store="tableStore" />
    </div>
    <div class="flex items-center">
      <fullscreen-button :table-store="tableStore" />
    </div>
  </div>
</template>

<script setup>
  import ReloadButton from "../../buttons/ReloadButton.vue";
  import SeparatorToggleButton from "../../buttons/SeparatorToggleButton.vue";
  import PrintButton from "../../buttons/PrintButton.vue";
  import ExportButton from "../../buttons/ExportButton.vue";
  import FullscreenButton from "../../buttons/FullscreenButton.vue";

  const props = defineProps({
    tableStore: Object,
    title: String,
  });
</script>
