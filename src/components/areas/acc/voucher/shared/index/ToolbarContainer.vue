<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      :menu-items="menuItems"
      search-btn
      sort-btn
      advanced-search
    >
      <template #advanced-search>
        <advanced-search :grid-store="tableStore" />
      </template>

      <template #search-btn-icon>
        <q-icon
          v-if="searchStore.isFiltered.value"
          name="filter_alt"
        />
        <q-icon v-else name="o_filter_alt" />
      </template>
    </toolbar-mobile>
  </template>
  <template v-else>
    <toolbar-desktop :menu-items="menuItems" margin />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDialog } from "src/composables/useDialog";
  import { useDataTable } from "src/composables/useDataTable";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";

  import { useFormActions } from "src/composables/useFormActions";
  import { useVoucherDataGridMenu } from "../../../_menus/useVoucherDataGridMenu";
  import { useVoucherSearch } from "../../../_composables/useVoucherSearch";

  import ToolbarMobile from "src/components/shared/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";
  import ReorderForm from "../forms/ReorderForm.vue";
  import AdvancedSearch from "../../mobile/index/AdvancedSearch.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const $q = useQuasar();
  const searchStore = useVoucherSearch();
  const dialogStore = useDialog();
  const crudStore = useFormActions(props.baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute,
    {
      reorder: () => {
        dialogStore.openDialog({
          title: "shared.labels.reorder",
          component: ReorderForm,
          actionBar: true,
          okCallback: async () => {
            await props.tableStore.reloadData();
          },
        });
      },
    }
  );

  const menuItems = computed(() =>
    useVoucherDataGridMenu(context.value)
  );
</script>
