<template>
  <q-scroll-observer @scroll="onScroll" />
  <div
    :style="
      $q.screen.xs ? 'margin-bottom: 48px' : 'margin-bottom: 30px'
    "
  >
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
  import { useQuasar } from "quasar";
  import { useCheckDialogOpen } from "src/composables/useCheckDialogOpen";

  const $q = useQuasar();
  const checkDialog = useCheckDialogOpen();
  const toolbarClass = ref(null);

  const onScroll = (details) => {
    toolbarClass.value =
      details.position.top || checkDialog.hasScrollbarClass.value
        ? $q.screen.xs
          ? "toolbar-glass-effect"
          : "bg-main"
        : "bg-main";
  };

  defineExpose({
    toolbarClass,
  });
</script>
