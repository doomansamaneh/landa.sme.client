<template>
  <lookup-view
    ref="lookup"
    dataSource="trs/payment/getChecklookupData"
    sortColumn="itemDate"
    textTemplate="{{ itemNo }} / {{bankTitle}} / {{ accountNo }}"
    columns="itemNo,itemDate,customerName,bankTitle,amount"
    :filterExpression="filterExpression"
  >
    <template #thead-cols>
      <div class="col-3_">
        <header-column
          field-name="itemNo"
          :title="$t('shared.labels.no')"
          :table-store="lookup.tableStore"
        />
      </div>
      <div class="col-3_">
        <header-column
          field-name="itemDate"
          :title="$t('shared.labels.date')"
          :table-store="lookup.tableStore"
        />
      </div>
      <div class="col-4_">
        <header-column
          field-name="customerName"
          :title="$t('shared.labels.customerName')"
          :table-store="lookup.tableStore"
        />
      </div>
      <div class="col-4_">
        <header-column
          field-name="bankTitle"
          :title="$t('shared.labels.bankTitle')"
          :table-store="lookup.tableStore"
        />
      </div>
      <div class="col_">
        <header-column
          field-name="amount"
          :title="$t('shared.labels.price')"
          :table-store="lookup.tableStore"
        />
      </div>
    </template>

    <template #td="{ row, index }">
      <div class="row items-center q-pa-md q-gutter-x-md">
        <div style="width: 16px" class="col_ text-body3">
          {{ index }}
        </div>
        <div class="col-3_ text-body3">
          {{ row.itemNo }}
        </div>
        <div class="col-3_ text-body3">
          {{ row.itemDate?.substring(0, 10) }}
        </div>
        <div class="col-4_ text-body3">
          {{ row.customerName }}
        </div>
        <div class="col-4_ text-body3">
          {{ row.bankTitle }}
        </div>
        <div class="col_ text-body3">
          {{ helper.formatNumber(row.amount) }}
        </div>
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";
  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";

  const props = defineProps({
    filterExpression: Array,
  });

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
