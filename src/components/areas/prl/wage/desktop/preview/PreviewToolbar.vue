<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <menu-button-edit
        class="primary-gradient primary-shadow text-white"
        :to="`/${baseRoute}/edit/${model?.id}`"
      />

      <menu-button
        icon="more_horiz"
        :title="$t('shared.labels.more')"
      />

      <q-menu class="border-radius-lg" cover>
        <q-list style="min-width: 200px" padding>
          <menu-item-copy :to="`/${baseRoute}/copy/${model?.id}`" />
          <menu-item-print @click="openPreview" />
          <q-separator size="1px" />
          <menu-item
            :title="$t('shared.labels.exportExcel')"
            icon="o_download"
            @click="exportAll()"
          />
          <menu-item
            icon="o_save"
            :title="$t('shared.labels.downloadInsurrance')"
            @click="emits('export-insurance')"
          />

          <menu-item
            icon="o_save"
            :title="$t('shared.labels.downloadTax')"
            @click="emits('export-tax')"
          />
          <q-separator size="1px" />
          <menu-item-delete @click="emits('delete-by-id')" />
        </q-list>
      </q-menu>

      <!-- <menu-button-copy :to="`/${baseRoute}/copy/${model?.id}`" />

      <menu-button-delete @click="emits('delete-by-id')" />
      <menu-button-print @click="openPreview" />
      <menu-button
        :title="$t('shared.labels.exportExcel')"
        icon="o_download"
        @click="exportAll()"
      />

      <menu-button
        icon="o_save"
        :title="$t('shared.labels.downloadInsurrance')"
        @click="emits('export-insurance')"
      />

      <menu-button
        icon="o_save"
        :title="$t('shared.labels.downloadTax')"
        @click="emits('export-tax')"
      /> -->

      <!-- <menu-button
        @click="printStore.downloadPdf()"
        icon="download"
        :title="$t('shared.labels.downloadPdf')"
      />
      <menu-button
        @click="sendEmail"
        icon="send"
        :title="$t('shared.labels.sendEmail')"
      /> -->
    </template>
  </tool-bar>
</template>

<script setup>
  import { sqlOperator } from "src/constants";
  import { usePreview } from "src/composables/usePreview";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { wageItemColumns } from "../../../_composables/constants";
  import { useDataTable } from "src/composables/useDataTable";
  import { useDataTableExport } from "src/composables/useDataTableExport";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemCopy from "src/components/shared/buttons/MenuItemCopy.vue";
  import MenuItemDelete from "src/components/shared/buttons/MenuItemDelete.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";

  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
  import MenuButtonDelete from "src/components/shared/buttons/MenuButtonDelete.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

  import DataGridPreview from "./printPreview/DataGridPreview.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    baseRoute: String,
  });

  const emits = defineEmits([
    "delete-by-id",
    "export-tax",
    "export-insurance",
  ]);

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

  const openPreview = async () => {
    previewStore.openDialog({
      title: props.title,
      component: DataGridPreview,
      previewProps: {
        title: props.title,
        model: props.model,
        tableStore: tableStore,
      },
    });
  };
</script>
