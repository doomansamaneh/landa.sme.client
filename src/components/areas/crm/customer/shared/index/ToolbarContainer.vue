<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :title="title"
      :table-store="tableStore"
      :base-route="baseRoute"
      :menu-items="menuItems"
      sort-btn
    />
  </template>
  <template v-else>
    <toolbar-desktop :menu-items="menuItems" margin />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { useDialog } from "src/composables/useDialog";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";
  import { useCustomerDataGridMenu } from "../../../_menus/useCustomerDataGridMenu";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolbarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import EditBatchForm from "../forms/EditBatchForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const $q = useQuasar();
  const dialogStore = useDialog();

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
            selectedIds: props.tableStore.selectedIds?.value,
          },
          okCallback: async (response) => {
            await props.tableStore?.reloadData();
          },
        });
      },
    }
  );

  const menuItems = computed(() =>
    useCustomerDataGridMenu(context.value)
  );
</script>
