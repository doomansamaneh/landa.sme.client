<template>
  <q-card-section class="q-pb-none">
    <q-tabs
      v-model="tab"
      class="text-h6 text-weight-700 primary-tabs"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
    >
      <q-tab name="main-info" class="q-mx-xs">
        <template #default>
          <q-icon name="o_arrow_downward" size="xs" class="q-mr-sm" />
          <div class="text-body3 text-bold">ریز گردش حساب</div>
        </template>
      </q-tab>
      <q-tab name="log" class="q-mx-xs">
        <template #default>
          <q-icon name="o_history" size="xs" class="q-mr-sm" />
          <div class="text-body3 text-bold">تاریخچه</div>
        </template>
      </q-tab>
    </q-tabs>
  </q-card-section>

  <q-separator></q-separator>

  <q-tab-panels v-model="tab" animated keep-alive class="transparent">
    <q-tab-panel
      name="main-info"
      class="no-padding_ q-mx-none q-px-none"
    >
      <account-item flat :filter-expression="filterExpression" />
    </q-tab-panel>

    <q-tab-panel name="log" class="no-padding_ q-mx-none q-px-none">
      <log :entity-id="model.id" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator } from "src/constants";

  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import Log from "src/components/areas/_shared/log/PreviewLog.vue";

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
