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
  import { useDataTable } from "src/composables/useDataTable";
  import { useInvoiceSearch } from "../../../_composables/useInvoiceSearch";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";
  import { useQuoteDataGridMenu } from "../../../_menus/useQuoteDataGridMenu";

  import AdvancedSearch from "../../../_shared/invoice/mobile/index/AdvancedSearch.vue";
  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolbarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";

  import EditBatchForm from "../../../_shared/invoice/shared/forms/EditBatchForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const dialogStore = useDialog();
  const baseRoute = "sls/quote";
  const searchStore = useInvoiceSearch();

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
            selectedIds: props.tableStore?.selectedIds?.value,
            formType: invoiceFormType.sales,
          },
          okCallback: async (response) => {
            await props.tableStore?.reloadData();
          },
        });
      },
    }
  );

  const menuItems = computed(() =>
    useQuoteDataGridMenu(context.value)
  );
</script>
