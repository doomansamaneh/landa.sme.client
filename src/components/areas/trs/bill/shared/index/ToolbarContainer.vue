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
  // import { downloadManager } from "src/helpers";
  // import { useDataTableExport } from "src/composables/useDataTableExport";

  import { useFormActions } from "src/composables/useFormActions";
  import { useBillDataGridMenu } from "../../../_menus/useBillDataGridMenu";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";

  import ToolbarMobile from "src/components/shared/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: { type: String, default: "trs/bill" },
  });

  const $q = useQuasar();

  const crudStore = useFormActions(props.baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  // function downloadPdf() {
  //   downloadManager.downloadGet(
  //     `${props.baseRoute}/GeneratePdf/${props.tableStore.activeRow.value.id}`,
  //     "landa-bill"
  //   );
  // }

  // function downloadBatchPdf() {
  //   downloadManager.downloadPost(
  //     `${props.baseRoute}/GenerateBatchPdf`,
  //     props.tableStore.pagination.value,
  //     "landa-bill"
  //   );
  // }

  // const { exportAll, exportCurrentPage } = useDataTableExport(
  //   props.tableStore
  // );

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute
    // {
    //   selectedIds: selectedIds.value,
    //   activeRow: props.tableStore?.activeRow?.value,
    //   exportAll,
    //   exportCurrentPage,
    //   print: downloadPdf,
    //   printBatch: downloadBatchPdf,
    //   reloadData: () => props.tableStore?.reloadData,
    //   deleteBatch: () =>
    //     crudStore.deleteBatch(
    //       selectedIds.value,
    //       props.tableStore?.reloadData
    //     ),
    //   deleteById: () =>
    //     crudStore.deleteById(
    //       props.tableStore?.activeRow?.value?.id,
    //       props.tableStore?.reloadData
    //     ),
    // }
  );

  const menuItems = computed(() =>
    useBillDataGridMenu(context.value)
  );

  const handleMenuItemClick = (item) => {
    // Handle any additional menu item click logic here if needed
  };
</script>
