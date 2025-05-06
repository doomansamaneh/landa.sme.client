<template>
  <lookup-view
    ref="lookup"
    dataSource="trs/bankAccount/getlookupData"
    sortColumn="no"
    textTemplate="{{ bankTitle }} / {{ title }} / {{ no }}"
    columns="no,bankTitle,amount"
    :filterExpression="filterExpression"
    show-add_
    :create-form="CreateForm"
  >
    <template #thead-cols>
      <div class="col">
        <header-column
          field-name="no"
          :title="$t('shared.labels.no')"
          :table-store="lookup.tableStore"
        />
      </div>
      <div class="col-4">
        <header-column
          field-name="bankTitle"
          :title="$t('shared.labels.bankTitle')"
          :table-store="lookup.tableStore"
        />
      </div>
      <div class="col">
        <header-column
          field-name="amount"
          :title="$t('shared.labels.amount')"
          :table-store="lookup.tableStore"
        />
      </div>
    </template>

    <template #tbody-cols="{ item }">
      <div class="col text-body3">
        {{ item.no }}
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          :delay="700"
          class="custom-tooltip text-body3"
        >
          {{ item.no }}
        </q-tooltip>
      </div>
      <div class="col-4 text-body3">
        {{ item.bankTitle }} - {{ item.title }}
      </div>
      <div class="col text-body3">
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
  import CreateForm from "src/components/areas/trs/bankAccount/shared/forms/CreateForm.vue";

  const props = defineProps({
    filterExpression: Array,
  });

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
