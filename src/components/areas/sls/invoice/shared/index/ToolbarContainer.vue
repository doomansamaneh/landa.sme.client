<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :title="title"
      :table-store="tableStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      :menu-items="menuItems"
      margin
    />
  </template>
  <template v-else>
    <toolbar-desktop :title="title" :menu-items="menuItems" margin />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useDialog } from "src/composables/useDialog";
  import { invoiceFormType } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";
  import { useInvoiceModel } from "../../../_composables/useInvoiceModel";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";
  import { useInvoiceDataGridMenu } from "../../../_menus/useInvoiceDataGridMenu";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";

  import EditBatchForm from "../../../_shared/invoice/shared/forms/EditBatchForm.vue";
  import ReorderForm from "src/components/areas/sls/invoice/shared/forms/ReorderForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const dialogStore = useDialog();
  const baseRoute = "sls/Invoice";

  const formStore = useInvoiceModel({ baseRoute: baseRoute });

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  const context = useDataGridMenuContext(
    props.tableStore,
    baseRoute,
    {
      reorder: () => {
        dialogStore.openDialog({
          title: `shared.labels.reorder`,
          component: ReorderForm,
          actionBar: true,
          okCallback: async (response) => {
            await props.tableStore.reloadData();
          },
        });
      },

      editBatch: () => {
        dialogStore.openDialog({
          title: `shared.labels.editBatch`,
          component: EditBatchForm,
          actionBar: true,
          props: {
            selectedIds: selectedIds?.value,
            formType: invoiceFormType.sales,
          },
          okCallback: async (response) => {
            await props.tableStore.reloadData();
          },
        });
      },

      cancelInvoice: () => {
        formStore.cancelInvoice(
          props.tableStore?.activeRow?.value?.id,
          props.tableStore.reloadData()
        );
      },
    }
  );

  const menuItems = computed(() =>
    useInvoiceDataGridMenu(context.value)
  );
</script>
