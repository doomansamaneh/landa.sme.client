<template>
  <div class="row justify-between overflow-hidden primary-gradient-1">
    <card-tabs
      v-model="tab"
      class="text-h6 no-letter-spacing text-weight-700"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
    >
      <card-tab
        name="main-info"
        title="ریز گردش حساب"
        icon="o_arrow_downward"
      />
      <card-tab name="log" title="تاریخچه" icon="o_history" />
    </card-tabs>
  </div>
  <q-tab-panels
    class="transparent q-pa-lg"
    v-model="tab"
    animated
    keep-alive
  >
    <q-tab-panel name="main-info" class="no-padding">
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

  import CardTab from "src/components/shared/CardTab.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
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
