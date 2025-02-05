<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :title="title"
      :table-store="tableStore"
      :base-route="baseRoute"
      buttons
      margin
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :title="title"
      :table-store="tableStore"
      buttons
      margin
    >
      <template #buttons>
        <menu-button-print
          class="primary-gradient primary-shadow text-white"
          @click="openPreview(tableStore)"
        />
      </template>
    </toolbar-desktop>
  </template>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { usePreview } from "src/composables/usePreview";

  import ToolbarDesktop from "src/components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "src/components/shared/ToolBarMobile.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";
  import DataGridPreview from "./printPreview/DataGridPreview.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const baseRoute = "sls/Invoice";
  const previewStore = usePreview();
  const $q = useQuasar();

  const openPreview = async () => {
    previewStore.openDialog({
      title: props.title,
      component: DataGridPreview,
      previewProps: {
        tableStore: props.tableStore,
        title: props.title,
      },
    });
  };
</script>
