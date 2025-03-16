<template>
  <data-grid
    :data-table-store="tableStore"
    class="border-radius-lg"
    expandable
    flat
    toolbar
    :title="title"
  >
    <template #filter-statusId="{ item }">
      <custom-select
        v-model="item.value"
        :options="
          helper.getEnumOptions(paymentStatus, 'paymentStatus')
        "
        @update:model-value="tableStore.reloadData()"
      />
    </template>

    <template #cell-statusId="{ item }">
      {{
        $t(
          `shared.paymentStatus.${helper.getEnumType(
            item.statusId,
            paymentStatus
          )}`
        )
      }}
      <q-icon
        v-if="item.notifyCheck"
        size="24px"
        name="o_warning"
        color="warning"
      />
    </template>

    <template #expand="{ item }">
      <check-preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { paymentStatus } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import { checkItemColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import CheckPreview from "../../paymentItemCheck/shared/preview/IndexView.vue";

  const props = defineProps({
    filterExpression: Array,
    title: String,
  });

  const tableStore = useDataTable({
    dataSource: "trs/report/getCheckItemData",
    store: useBaseInfoGrid({
      columns: checkItemColumns,
      sortColumn: "itemDate",
      filterExpression: props.filterExpression,
    }),
  });
</script>
