<template>
  <template v-if="$q.screen.lt.sm">
    <toolbar-mobile
      :title="title"
      :menu-items="menuItems"
      :create-url="createUrl"
      :table-store="tableStore"
      :base-route="baseRoute"
      sort-btn
    />
  </template>
  <template v-else>
    <toolbar-desktop :menu-items="menuItems" margin />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useFormActions } from "src/composables/useFormActions";
  import { useDataTable } from "src/composables/useDataTable";
  import { useDataGridMenuContext } from "../../../menus/useDataGridMenuContext";
  import { useBaseInfoDataGridMenu } from "../../../_menus/useBaseInfoDataGridMenu";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolbarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";

  const props = defineProps({
    title: String,
    baseRoute: String,
    crudStore: useFormActions,
    tableStore: useDataTable,
    permissionPrefix: String,
    createUrl: String,
  });

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute
  );

  const menuItems = computed(() =>
    useBaseInfoDataGridMenu(context.value, {
      permissionPrefix: props.permissionPrefix,
      crudStore: props.crudStore,
    })
  );
</script>
