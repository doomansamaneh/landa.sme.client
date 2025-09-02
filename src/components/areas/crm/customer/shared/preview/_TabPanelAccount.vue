<template>
  <account-item
    class="border-radius-lg"
    flat
    bordered
    toolbar_
    multi-select
    data-source="acc/report/getItemAllData"
    :columns="accountItemColumns"
    :filter-expression="filterExpression"
    :no-fullscreen="true"
    :title="$t('shared.labels.accountItem')"
    :sub-title="item.name"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";

  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";

  const props = defineProps({
    item: Object,
  });

  const accountItemColumns = accountItemDLColumns;
  const filterExpression = computed(() => [
    {
      fieldName: "vi.dlId",
      operator: sqlOperator.equal,
      value: props.item.dlId,
    },
  ]);
</script>
