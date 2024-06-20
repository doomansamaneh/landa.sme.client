<template>
  <q-tabs
    v-model="tab"
    class="text-h6 text-weight-700 primary-tabs q-mt-lg"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    align="left"
    inline-label
    narrow-indicator
  >
    <q-tab name="main-info" class="q-py-sm">
      <template #default>
        <q-icon name="o_arrow_downward" size="xs" class="q-mr-sm" />
        <div class="text-body3 text-bold">ریز گردش حساب</div>
      </template>
    </q-tab>
    <q-tab name="log" class="q-py-sm">
      <template #default>
        <q-icon name="o_history" size="xs" class="q-mr-sm" />
        <div class="text-body3 text-bold">تاریخچه</div>
      </template>
    </q-tab>
  </q-tabs>

  <q-tab-panels v-model="tab" animated keep-alive class="transparent">
    <q-tab-panel name="main-info" class="no-padding_">
      <account-item :filter-expression="filterExpression" />
    </q-tab-panel>

    <q-tab-panel name="log" class="no-padding_">
      <detail-log />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator } from "src/constants";

  import DetailLog from "./_DetailLog.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";

  const props = defineProps({
    model: Object,
  });

  const tab = ref("main-info");
  const filterExpression = [
    {
      fieldName: "fiscalYearId",
      operator: sqlOperator.isNotNull,
      value: null,
    },
    {
      fieldName: "d.ContractId",
      operator: sqlOperator.equal,
      value: props.model?.id,
    },
  ];
</script>
