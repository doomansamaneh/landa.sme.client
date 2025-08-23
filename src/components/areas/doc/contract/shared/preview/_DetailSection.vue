<template>
  <card-tabs
    v-model="tab"
    class="text-h6 text-weight-700"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    align="left"
    inline-label
    narrow-indicator
  >
    <card-tab
      name="main-info"
      :title="$t('shared.labels.AccountTransactionDetails')"
      icon="o_arrow_downward"
    />
    <card-tab name="log"  :title="$t('shared.labels.history')" icon="o_history" />
  </card-tabs>
  <q-tab-panels class="transparent" v-model="tab" animated keep-alive>
    <q-tab-panel name="main-info" class="no-padding">
      <account-item flat :filter-expression="filterExpression" />
    </q-tab-panel>

    <q-tab-panel name="log">
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
