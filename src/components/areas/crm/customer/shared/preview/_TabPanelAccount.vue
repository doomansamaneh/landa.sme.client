<template>
  <account-item
    class="border-radius-lg"
    flat
    bordered
    multi-select
    no-fullscreen
    data-source="acc/report/getItemAllData"
    :grid-store="gridStore"
    :title="$t('shared.labels.accountItem')"
    :sub-title="item.name"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sortOrder, sqlOperator, voucherType } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";

  const props = defineProps({
    item: Object,
  });

  const searchModel = ref({
    voucherTypeIds: [
      voucherType.general,
      voucherType.modificationVoucher,
    ],
  });

  const gridStore = useBaseInfoGrid({
    sortColumn: "voucherDate,rowNo",
    sortOrder: sortOrder.descending,
    columns: accountItemDLColumns,
    searchModel: searchModel,
    filterExpression: [
      {
        fieldName: "vi.dlId",
        operator: sqlOperator.equal,
        value: props.item.dlId,
      },
    ],
  });
</script>
