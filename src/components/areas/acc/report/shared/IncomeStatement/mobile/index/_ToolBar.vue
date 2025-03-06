<template>
  <toolbar-mobile
    :base-route="baseRoute"
    :title="title"
    buttons
    margin
  >
    <template #default>
      <menu-button-print
        class="primary-gradient primary-shadow text-white text-body2"
        @click="openPreview"
      />
    </template>
  </toolbar-mobile>
</template>

<script setup>
  import { usePreview } from "src/composables/usePreview";
  import { useIncomeStatement } from "src/components/areas/acc/_composables/useIncomeStatement";

  import ToolbarMobile from "components/shared/ToolbarMobile.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";
  import DataGridPreview from "src/components/areas/acc/report/shared/IncomeStatement/printPreview/DataGridPreview.vue";

  const props = defineProps({
    baseRoute: String,
    title: String,
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
