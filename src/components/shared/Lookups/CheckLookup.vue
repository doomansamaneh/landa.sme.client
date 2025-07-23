<template>
  <lookup-view
    ref="lookup"
    auto-focus
    dataSource="trs/payment/getChecklookupData"
    sortColumn="itemDate"
    textTemplate="{{ itemNo }} / {{bankTitle}} / {{ accountNo }}"
    columns="itemNo,itemDate,customerName,bankTitle,amount"
    :filterExpression="filterExpression"
  >
    <template #thead-index>
      <div>#</div>
    </template>

    <template #thead-cols="{ tableStore }">
      <div class="col">
        <header-column
          fieldName="itemNo"
          :title="$t('shared.labels.no')"
          :table-store="tableStore"
        />
      </div>
      <div class="col">
        <header-column
          fieldName="itemDate"
          :title="$t('shared.labels.date')"
          :table-store="tableStore"
        />
      </div>
      <div class="col">
        <header-column
          fieldName="customerName"
          :title="$t('shared.labels.customerName')"
          :table-store="tableStore"
        />
      </div>
      <div class="col">
        <header-column
          fieldName="bankTitle"
          :title="$t('shared.labels.bankTitle')"
          :table-store="tableStore"
        />
      </div>
      <div class="col">
        <header-column
          fieldName="amount"
          :title="$t('shared.labels.price')"
          :table-store="tableStore"
        />
      </div>
    </template>

    <template #tbody-index="{ index }">
      <div>{{ index + 1 }}</div>
    </template>

    <template #tbody-cols="{ item }">
      <div class="col">{{ item.itemNo }}</div>
      <div class="col">
        {{ item.itemDate?.substring(0, 10) }}
      </div>
      <div class="col">
        {{ item.customerName }}
      </div>
      <div class="col">
        {{ item.bankTitle }}
      </div>
      <div class="col">
        {{ helper.formatNumber(item.amount) }}
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
