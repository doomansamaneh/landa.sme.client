<template>
  <div class="row justify-between overflow-hidden primary-gradient-1">
    <q-tabs
      v-model="tab"
      class="text-h6 no-letter-spacing text-weight-700"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
    >
      <q-tab name="main-info">
        <template #default>
          <div class="row q-py-sm q-my-xs items-center">
            <q-avatar
              rounded
              text-color="white"
              icon="o_arrow_downward"
              size="md"
              class="primary-gradient primary-shadow q-mr-md"
            />
            <div class="text-h6 no-letter-spacing">ریز گردش حساب</div>
          </div>
        </template>
      </q-tab>
      <q-tab name="log">
        <template #default>
          <div class="row q-py-sm q-my-xs items-center">
            <q-avatar
              rounded
              text-color="white"
              icon="o_history"
              size="md"
              class="primary-gradient primary-shadow q-mr-md"
            />
            <div class="text-h6 no-letter-spacing">تاریخچه</div>
          </div>
        </template>
      </q-tab>
    </q-tabs>
  </div>

  <q-separator />

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
