<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile :title="title" @submit-call-back="handleSubmit" />
  </template>
  <template v-else>
    <toolbar-desktop
      :title="title"
      @submit-call-back="handleSubmit"
    />
  </template>
</template>

<script setup>
  import { defineAsyncComponent } from "vue";

  const ToolbarDesktop = defineAsyncComponent(() =>
    import("src/components/shared/FormToolBarDesktop.vue")
  );

  const ToolbarMobile = defineAsyncComponent(() =>
    import("src/components/shared/FormToolBarMobile.vue")
  );

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits(["submit-call-back"]);

  const handleSubmit = () => {
    emit("submit-call-back");
  };
</script>
