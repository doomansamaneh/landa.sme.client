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
    <toolbar-desktop
      :menu-items="menuItems"
      @menu-item-click="handleMenuItemClick"
      margin
    />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";

  import { useFormActions } from "src/composables/useFormActions";
  import { useOpeningStockDataGridMenu } from "../../../_menus/useOpeningStockDataGridMenu";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";

  import ToolbarMobile from "src/components/shared/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: { type: String, default: "inv/openingStock" },
  });

  const $q = useQuasar();

  const crudStore = useFormActions(props.baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute
  );

  const menuItems = computed(() =>
    useOpeningStockDataGridMenu(context.value)
  );

  const handleMenuItemClick = (item) => {
    // Handle any additional menu item click logic here if needed
  };
</script>
