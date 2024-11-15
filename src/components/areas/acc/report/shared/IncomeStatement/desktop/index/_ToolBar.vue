<template>
  <toolbar-desktop
    :title="title"
    :base-route="baseRoute"
    buttons
    margin
  >
    <template #buttons>
      <menu-button-print
        class="primary-gradient primary-shadow text-white text-body2"
      />
    </template>
  </toolbar-desktop>
</template>

<script setup>
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

  const props = defineProps({
    title: String,
    baseRoute: { type: String, default: "acc/report" },
  });
</script>
