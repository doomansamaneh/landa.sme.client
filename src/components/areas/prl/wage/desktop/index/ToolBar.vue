<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      :menu-items="menuItems"
      sort-btn
      @menu-item-click="handleMenuItemClick"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :menu-items="menuItems"
      @menu-item-click="handleMenuItemClick"
      margin
    />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";
  import { useDataTableExport } from "src/composables/useDataTableExport";

  import { useFormActions } from "src/composables/useFormActions";
  import { useWageDataGridMenu } from "src/components/areas/prl/_menus/useWageDataGridMenu";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";

  import ToolbarMobile from "src/components/shared/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: { type: String, default: "prl/wage" },
  });

  const $q = useQuasar();

  const crudStore = useFormActions(props.baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  const { exportAll, exportCurrentPage } = useDataTableExport(
    props.tableStore
  );

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute,
    {
      selectedIds: selectedIds.value,
      activeRow: props.tableStore?.activeRow?.value,
      exportAll,
      exportCurrentPage,
      print: downloadPdf,
      printBatch: downloadBatchPdf,
      reloadData: () => props.tableStore?.reloadData,
      deleteBatch: () =>
        crudStore.deleteBatch(
          selectedIds.value,
          props.tableStore?.reloadData
        ),
      deleteById: () =>
        crudStore.deleteById(
          props.tableStore?.activeRow?.value?.id,
          props.tableStore?.reloadData
        ),
      exportTax,
      exportInsurance,
    }
  );

  const menuItems = computed(() =>
    useWageDataGridMenu(context.value)
  );

  const handleMenuItemClick = (item) => {
    // Handle any additional menu item click logic here if needed
  };

  function downloadPdf() {
    downloadManager.downloadGet(
      `${props.baseRoute}/GeneratePdf/${props.tableStore.activeRow.value.id}`,
      "landa-wage"
    );
  }

  function downloadBatchPdf() {
    downloadManager.downloadPost(
      `${props.baseRoute}/GenerateBatchPdf`,
      props.tableStore.pagination.value,
      "landa-wage"
    );
  }

  function exportTax() {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportTax/${props.tableStore.activeRow.value.id}`,
      "landa-tax"
    );
  }

  function exportInsurance() {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportInsurance/${props.tableStore.activeRow.value.id}`,
      "landa-insurance"
    );
  }
</script>
