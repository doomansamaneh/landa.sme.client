<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile :title="title" :item="item" buttons margin />
  </template>
  <template v-else>
    <toolbar-desktop
      :inside="inside"
      :margin="!inside"
      :title="title"
      buttons
    />
  </template>
</template>

<script setup>
  import ToolbarDesktop from "../../desktop/preview/PreviewToolbar.vue";
  import ToolbarMobile from "../../mobile/preview/PreviewToolbar.vue";

  const props = defineProps({
    toolbar: Boolean,
    inside: Boolean,
    title: String,
  });
</script>
