<template>
  <toolbar-desktop
    :title="title"
    :base-route="baseRoute"
    :table-store="tableStore"
    :crud-store="crudStore"
    :inside="inside"
    :margin="margin"
    buttons
    :menu-items="menuItems"
    @menu-item-click="(item) => item.handler?.()"
  />
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { useDataTableExport } from "src/composables/useDataTableExport";
  import ToolbarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "acc/voucher" },
    inside: Boolean,
    margin: Boolean,
  });

  const emits = defineEmits([
    "downloadPdf",
    "download-batch-pdf",
    "reorder",
    "edit-batch",
    "batch-print",
  ]);

  const { exportAll, exportCurrentPage } = useDataTableExport(
    props.tableStore
  );

  const menuItemType = {
    item: 1,
    separator: 2,
    moreItem: 3,
  };

  const selectedIds = computed(() =>
    props.tableStore?.selectedRows?.value.map((item) => item.id)
  );

  const menuItems = ref([
    {
      label: "create",
      icon: "o_add",
      class: "primary-gradient text-white primary-shadow",
      permission: "acc.voucher.create",
      route: "/acc/voucher/create",
      type: menuItemType.item,
    },
    {
      label: "edit",
      icon: "o_edit",
      permission: "acc.voucher.edit",
      route: `/acc/voucher/edit/{{id}}`,
      needId: true,
      type: menuItemType.item,
    },
    {
      label: "copy",
      icon: "o_content_copy",
      needId: true,
      type: menuItemType.item,
      route: `/acc/voucher/copy/{{id}}`,
    },
    {
      label: "delete",
      icon: "o_delete",
      needId: true,
      type: menuItemType.item,
      selectedIds: true,
      handler: () => {
        if (selectedIds.value?.length > 0) {
          props.crudStore?.deleteBatch(
            selectedIds.value,
            props.tableStore?.reloadData
          );
        } else if (props.tableStore?.activeRow?.value) {
          props.crudStore?.deleteById(
            props.tableStore?.activeRow?.value?.id,
            props.tableStore?.reloadData
          );
        }
      },
    },
    {
      label: "more",
      icon: "o_more",
      type: menuItemType.moreItem,
      subItems: [
        {
          label: "refresh",
          icon: "o_refresh",
          type: menuItemType.item,
          handler: () => props.tableStore?.reloadData(),
        },
        {
          label: "reorder",
          icon: "o_cached",
          type: menuItemType.item,
          handler: () => emits("reorder"),
        },
        {
          label: "separator",
          type: menuItemType.separator,
        },
        {
          label: "print",
          icon: "o_print",
          type: menuItemType.item,
          needId: true,
          handler: () =>
            emits(
              "downloadPdf",
              props.tableStore?.activeRow?.value?.id
            ),
        },
        {
          label: "printBatch",
          icon: "o_print",
          type: menuItemType.item,
          handler: () => emits("download-batch-pdf"),
        },
        {
          label: "separator",
          type: menuItemType.separator,
        },
        {
          label: "eportToExcel",
          icon: "o_download",
          type: menuItemType.item,
          handler: () => exportAll(),
        },
        {
          label: "exportExcelCurrentPage",
          icon: "o_download",
          type: menuItemType.item,
          handler: () => exportCurrentPage(),
        },
      ],
    },
  ]);
</script>
