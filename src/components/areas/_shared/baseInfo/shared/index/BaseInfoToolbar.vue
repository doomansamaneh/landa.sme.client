<template>
  <template v-if="$q.screen.lt.sm">
    <toolbar-mobile
      :title="title"
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      buttons
      activation
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :title_="title"
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :activation="activation"
      buttons
      margin
    />
  </template>
</template>

<script setup>
  import { ref } from "vue";

  import { useFormActions } from "src/composables/useFormActions";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "components/shared/ToolBarMobile.vue";

  const props = defineProps({
    title: String,
    baseRoute: String,
    createUrl: String,
    activation: Boolean,
  });

  const crudStore = useFormActions(props.baseRoute);
  const desktopGrid = ref(null);
  const mobileGrid = ref(null);
</script>
