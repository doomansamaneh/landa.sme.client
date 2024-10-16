<template>
  <q-scroll-observer @scroll="onScroll" />
  <div class="q-mb-xl">
    <q-page-sticky
      :class="toolbarClass"
      class="z-1"
      position="top"
      expand
    >
      <slot></slot>
    </q-page-sticky>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useCheckDialogOpen } from "src/composables/useCheckDialogOpen";

  const checkDialog = useCheckDialogOpen();
  const toolbarClass = ref(null);

  const onScroll = (details) => {
    toolbarClass.value =
      details.position.top || checkDialog.hasScrollbarClass.value
        ? "toolbar-glass-effect"
        : "bg-main";
  };

  defineExpose({
    toolbarClass,
  });
</script>
