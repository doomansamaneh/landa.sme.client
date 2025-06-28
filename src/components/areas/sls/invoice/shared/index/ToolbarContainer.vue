<template>
  <toolbar-mobile
    v-if="$q.screen.xs"
    :title="title"
    :table-store="tableStore"
    :base-route="baseRoute"
    :menu-items="menuItems"
    search-btn
    sort-btn
    advanced-search
  >
    <template #advanced-search>
      <advanced-search :grid-store="tableStore" />
    </template>

    <template #search-btn-icon>
      <q-icon v-if="searchStore.isFiltered.value" name="filter_alt" />
      <q-icon v-else name="o_filter_alt" />
    </template>
  </toolbar-mobile>
  <toolbar-desktop
    v-else
    :title="title"
    :menu-items="menuItems"
    margin
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useDialog } from "src/composables/useDialog";
  import { invoiceFormType } from "src/constants";
  import { useInvoiceSearch } from "../../../_composables/useInvoiceSearch";
  import { useDataTable } from "src/composables/useDataTable";
  import { useInvoiceModel } from "../../../_composables/useInvoiceModel";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";
  import { useInvoiceDataGridMenu } from "../../../_menus/useInvoiceDataGridMenu";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolbarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";

  import AdvancedSearch from "../../../_shared/invoice/mobile/index/AdvancedSearch.vue";
  import EditBatchForm from "../../../_shared/invoice/shared/forms/EditBatchForm.vue";
  import ReorderForm from "src/components/areas/sls/invoice/shared/forms/ReorderForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const dialogStore = useDialog();
  const baseRoute = "sls/Invoice";
  const searchStore = useInvoiceSearch();
  const formStore = useInvoiceModel({ baseRoute: baseRoute });

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
            selectedIds: props.tableStore?.selectedIds.value,
            formType: invoiceFormType.sales,
          },
          okCallback: async (response) => {
            //await props.tableStore.reloadData();
          },
        });
      },

      cancelInvoice: () => {
        formStore.cancelInvoice(
          props.tableStore?.activeRow?.value?.id,
          props.tableStore.reloadData
        );
      },
    }
  );

  const menuItems = computed(() =>
    useInvoiceDataGridMenu(context.value)
  );
</script>
