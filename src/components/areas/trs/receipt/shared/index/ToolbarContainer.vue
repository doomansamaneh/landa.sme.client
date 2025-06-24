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

  import { useReceiptDataGridMenu } from "../../../_menus/useReceiptDataGridMenu";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolBarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: { type: String, default: "trs/receipt" },
  });

  const $q = useQuasar();

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute
  );

  const menuItems = computed(() =>
    useReceiptDataGridMenu(context.value)
  );
</script>
