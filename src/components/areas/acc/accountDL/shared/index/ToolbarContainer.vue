<template>
  <template v-if="$q.screen.lt.sm">
    <toolbar-mobile
      :title="title"
      :menu-items="menuItems"
      :table-store="props.tableStore"
      base-route="acc/accountDL"
      create-url="/acc/accountDl/create"
      sort-btn
    />
  </template>
  <template v-else>
    <toolbar-desktop :menu-items="menuItems" margin />
  </template>
</template>

<script setup>
  import { computed } from "vue";

  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";
  import { useAccountDLDataGridMenu } from "../../../_menus/useAccountDLDataGridMenu";
  import { useDialog } from "src/composables/useDialog";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolbarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import MergeForm from "../forms/MergeForm.vue";

  const props = defineProps({
    title: String,
    tableStore: Object,
  });

  const dialogStore = useDialog();
  const context = useDataGridMenuContext(
    props.tableStore,
    "acc/accountDL",
    {
      merge: () => {
        dialogStore.openDialog({
          title: `shared.labels.merge`,
          component: MergeForm,
          actionBar: true,
          props: {
            selectedIds: props.tableStore?.selectedIds.value,
          },
          okCallback: async (response) => {},
        });
      },
    }
  );

  const menuItems = computed(() =>
    useAccountDLDataGridMenu(context.value)
  );
</script>
