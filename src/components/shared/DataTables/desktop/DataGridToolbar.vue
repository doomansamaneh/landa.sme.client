<template>
  <div class="flex items-center justify-between">
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
  import ReloadButton from "../../Buttons/ReloadButton.vue";
  import SeparatorToggleButton from "../../Buttons/SeparatorToggleButton.vue";
  import PrintButton from "../../Buttons/PrintButtonMaster.vue";
  import ExportButton from "../../Buttons/ExportButton.vue";
  import FullscreenButton from "../../Buttons/FullscreenButton.vue";

  const props = defineProps({
    tableStore: Object,
    title: String,
  });
</script>
