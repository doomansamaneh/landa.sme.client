<template>
  <toolbar-mobile
    v-if="$q.screen.xs"
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    :base-route="baseRoute"
    :selected-ids="selectedIds"
    :menu-items="menuItems"
    sort-btn
  />
  <toolbar-desktop v-else :menu-items="menuItems" margin />
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDialog } from "src/composables/useDialog";
  import { useDataTable } from "src/composables/useDataTable";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";

  import { useFormActions } from "src/composables/useFormActions";
  import { useProductDataGridMenu } from "../../../_menus/useProductDataGridMenu";

  import EditBatchForm from "../forms/EditBatchForm.vue";
  import EditBatchPriceForm from "../forms/EditBatchPriceForm.vue";
  import ToolbarMobile from "src/components/shared/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const $q = useQuasar();
  const dialogStore = useDialog();
  const crudStore = useFormActions(props.baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute,
    {
      editBatch: () => {
        dialogStore.openDialog({
          title: `shared.labels.editBatch`,
          component: EditBatchForm,
          actionBar: true,
          props: {
            selectedIds: selectedIds?.value,
          },
          okCallback: async (response) => {
            await props.tableStore.reloadData();
          },
        });
      },

      editBatchPrice: () => {
        dialogStore.openDialog({
          title: `shared.labels.editProductPrice`,
          component: EditBatchPriceForm,
          actionBar: true,
          props: {
            selectedIds: selectedIds?.value,
          },
          okCallback: async (response) => {
            await props.tableStore.reloadData();
          },
        });
      },
    }
  );

  const menuItems = computed(() =>
    useProductDataGridMenu(context.value, { crudStore: crudStore })
  );
</script>
