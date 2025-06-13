<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :title="title"
      :table-store="tableStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      margin
      :menu-items="menuItems"
    />
  </template>
  <template v-else>
    <toolbar-desktop :title="title" :menu-items="menuItems" margin />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useDialog } from "src/composables/useDialog";
  import { downloadManager } from "src/helpers";
  import { invoiceFormType } from "src/constants";
  import { useDataTableExport } from "src/composables/useDataTableExport";
  import { useDataTable } from "src/composables/useDataTable";
  import { useFormActions } from "src/composables/useFormActions";
  import { useQuoteDataGridMenu } from "../../../_menus/useQuoteDataGridMenu";

  import ToolbarMobile from "src/components/shared/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";

  import EditBatch from "../../../_shared/invoice/shared/forms/EditBatchForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const dialogStore = useDialog();
  const baseRoute = "sls/quote";
  const crudStore = useFormActions({ baseRoute: baseRoute });
  const { exportAll, exportCurrentPage } = useDataTableExport(
    props.tableStore
  );

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  function print() {
    downloadManager.downloadGet(
      `${baseRoute}/generatePdf/${props.tableStore?.activeRow?.value?.id}`,
      "landa-quote"
    );
  }

  function editBatch() {
    dialogStore.openDialog({
      title: `shared.labels.editBatch`,
      component: EditBatch,
      actionBar: true,
      props: {
        selectedIds: selectedIds?.value,
        formType: invoiceFormType.sales,
      },
      okCallback: async (response) => {
        await props.tableStore.reloadData();
      },
    });
  }

  function reloadData() {
    props.tableStore.reloadData();
  }

  const context = computed(() => ({
    selectedIds: selectedIds.value,
    activeRow: props.tableStore?.activeRow?.value,
    exportAll,
    exportCurrentPage,
    editBatch,
    reloadData,
    print,
    deleteBatch: () =>
      crudStore.deleteBatch(selectedIds.value, reloadData),
    deleteById: () =>
      crudStore.deleteById(
        props.tableStore?.activeRow?.value?.id,
        reloadData
      ),
  }));

  const menuItems = computed(() =>
    useQuoteDataGridMenu(context.value)
  );
</script>
