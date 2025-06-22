<template>.
  <!-- <toolbar-desktop :base-route="baseRoute" buttons margin>
    <template #buttons>
      <menu-button-print
        class="primary-gradient primary-shadow text-white text-body2"
        @click="openPreview"
      />
    </template>
  </toolbar-desktop> -->
</template>

<script setup>
  import { usePreview } from "src/composables/usePreview";
  import { useIncomeStatement } from "src/components/areas/acc/_composables/useIncomeStatement";

  // import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";
  import DataGridPreview from "src/components/areas/acc/report/shared/IncomeStatement/printPreview/DataGridPreview.vue";

  const props = defineProps({
    title: String,
    baseRoute: { type: String, default: "acc/report" },
  });

  const previewStore = usePreview();
  const dataStore = useIncomeStatement();

  const openPreview = async () => {
    previewStore.openDialog({
      title: props.title,
      component: DataGridPreview,
      previewProps: {
        tableStore: dataStore,
        title: props.title,
      },
    });
  };
</script>
