<template>
  <toolbar-desktop :inside="inside" :menu-items="menuItems" />

  <preview :item="item" :title="title" ref="dataGrid" v-if="item" />
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useDialog } from "src/composables/useDialog";
  import { useDataTableExport } from "src/composables/useDataTableExport";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useProductStockPreviewMenu } from "src/components/areas/inv/_menus/useProductStockPreviewMenu.js";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";
  import Preview from "./_ProductStockPreview.vue";
  import ModifyStockForm from "src/components/areas/inv/modifyStock/shared/forms/ModifyStockForm.vue";

  const props = defineProps({
    inside: Boolean,
    item: Object,
    title: String,
  });

  const dialogStore = useDialog();
  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  const { exportAll } = useDataTableExport(tableStore.value);

  const context = usePreviewMenuContext(
    tableStore.value,
    null,
    props.item?.id,
    {
      props: props,
      exportToExcel: async () => {
        await exportAll();
      },
    }
  );

  const menuItems = computed(() =>
    useProductStockPreviewMenu(context.value)
  );
</script>
