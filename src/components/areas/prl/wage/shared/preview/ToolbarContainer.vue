<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :title="title"
    :inside="inside"
    :menu-items="menuItems"
    margin
    back-button
  />
  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :base-route="baseRoute"
    :menu-items="menuItems"
    back-button
  />
</template>

<script setup>
  import { computed } from "vue";
  import { downloadManager } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { sqlOperator } from "src/constants";
  import { usePreview } from "src/composables/usePreview";
  import { useWageState } from "../../../_composables/useWageState";
  import { wageItemColumns } from "../../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTableExport } from "src/composables/useDataTableExport";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useWagePreviewMenu } from "src/components/areas/prl/_menus/useWagePreviewMenu.js";

  import DataGridPreview from "./printPreview/DataGridPreview.vue";
  import ToolBarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import ToolBarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

  const props = defineProps({
    model: {
      type: Object,
      required: true,
    },
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const wageStore = useWageState();
  const previewStore = usePreview();

  const gridStore = useBaseInfoGrid({
    columns: wageItemColumns,
    sortColumn: "rowNo",
    filterExpression: [
      {
        fieldName: "i.wageId",
        operator: sqlOperator.equal,
        value: props.model?.id,
      },
    ],
  });

  const tableStore = useDataTable({
    dataSource: "prl/wageItem/getGridData",
    store: gridStore,
  });

  const { exportAll } = useDataTableExport(tableStore);

  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => wageStore.reset(),

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

      print: async () => {
        previewStore.openDialog({
          title: props.title,
          component: DataGridPreview,
          previewProps: {
            title: props.title,
            model: props.model,
            tableStore: tableStore,
          },
        });
      },

      exportAll,
    }
  );

  const menuItems = computed(() => useWagePreviewMenu(context.value));
</script>
