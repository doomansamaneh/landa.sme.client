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
  import { invoiceFormType } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";
  import { useInvoiceModel } from "../../../_composables/useInvoiceModel";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";
  import { usePurchaseDataGridMenu } from "../../../_menus/usePurchaseDataGridMenu";

  import ToolbarMobile from "src/components/shared/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";

  import EditBatchForm from "../../../_shared/invoice/shared/forms/EditBatchForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const dialogStore = useDialog();
  const baseRoute = "sls/purchase";

  const formStore = useInvoiceModel({ baseRoute: baseRoute });

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  const context = useDataGridMenuContext(
    props.tableStore,
    baseRoute,
    {
      editBatch: () => {
        dialogStore.openDialog({
          title: `shared.labels.editBatch`,
          component: EditBatchForm,
          actionBar: true,
          props: {
            selectedIds: selectedIds?.value,
            formType: invoiceFormType.purchase,
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
    usePurchaseDataGridMenu(context.value)
  );
</script>
