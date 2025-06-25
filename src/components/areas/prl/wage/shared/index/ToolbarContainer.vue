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
  import { downloadManager } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { useWageDataGridMenu } from "src/components/areas/prl/_menus/useWageDataGridMenu";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolbarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const $q = useQuasar();

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute,
    {
      exportTax: async () => {
        await downloadManager.downloadGet(
          `${props.baseRoute}/exportTax/${props.tableStore?.activeRow?.value.id}`,
          "landa-tax"
        );
      },

      exportInsurance: async () => {
        await downloadManager.downloadGet(
          `${props.baseRoute}/exportInsurance/${props.tableStore?.activeRow?.value.id}`,
          "landa-insurance"
        );
      },
    }
  );

  const menuItems = computed(() =>
    useWageDataGridMenu(context.value)
  );
</script>
