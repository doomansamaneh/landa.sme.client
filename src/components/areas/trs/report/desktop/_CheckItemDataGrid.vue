<template>
  <data-grid
    ref="dataGrid"
    class="border-radius-lg"
    data-source="trs/report/getCheckItemData"
    :grid-store="gridStore"
    expandable
    flat
    bordered_
  >
    <template #filter-statusId="{ item }">
      <custom-select
        v-model="item.value"
        :options="
          helper.getEnumOptions(paymentStatus, 'paymentStatus')
        "
        @update:model-value="dataGrid?.reloadData()"
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
    </template>

    <template #cell-paymentDate="{ item }">
      {{ item.paymentDate?.substring(0, 10) }}
    </template>

    <template #cell-itemDate="{ item }">
      {{ item.itemDate?.substring(0, 10) }}
    </template>

    <template #expand="{ item }">
      <check-preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { paymentStatus } from "src/constants";

  import { checkItemColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  //import DataGrid from "src/components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import CheckPreview from "../../paymentItemCheck/shared/preview/IndexView.vue";
  //import { useCustomerAcccountState } from "src/components/areas/acc/_composables/useCustomerAcccountState";

  const props = defineProps({
    filterExpression: Array,
    title: String,
  });

  //const accountStore = useCustomerAcccountState();
  const dataGrid = ref(null);

  const gridStore = useBaseInfoGrid({
    columns: checkItemColumns,
    sortColumn: "itemDate",
    filterExpression: props.filterExpression,
  });
</script>
