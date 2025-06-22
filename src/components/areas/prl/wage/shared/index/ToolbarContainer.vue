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
    <toolbar-desktop :menu-items="menuItems" margin />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { downloadManager } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { useFormActions } from "src/composables/useFormActions";
  import { useWageDataGridMenu } from "src/components/areas/prl/_menus/useWageDataGridMenu";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const $q = useQuasar();

  const crudStore = useFormActions(props.baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute,
    {
      exportTax: async () => {
        await downloadManager.downloadGet(
          `${props.baseRoute}/exportTax/${props.model?.id}`,
          "landa-tax"
        );
      },

      exportInsurance: async () => {
        await downloadManager.downloadGet(
          `${props.baseRoute}/exportInsurance/${props.model?.id}`,
          "landa-insurance"
        );
      },
    }
  );

  const menuItems = computed(() =>
    useWageDataGridMenu(context.value)
  );
</script>
