<template>
  <component
    :is="toolbarComponent"
    :title="title"
    :show-save-and-new="showSaveAndNew"
    :buttons="true"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { defineAsyncComponent } from "vue";

  const ToolbarDesktop = defineAsyncComponent(() =>
    import("src/components/shared/toolbars/FormToolbarDesktop.vue")
  );

  const ToolbarMobile = defineAsyncComponent(() =>
    import("src/components/shared/toolbars/FormToolbarMobile.vue")
  );

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    showSaveAndNew: Boolean,
  });

  const $q = useQuasar();

  const toolbarComponent = computed(() =>
    $q.screen.xs ? ToolbarMobile : ToolbarDesktop
  );
</script>
