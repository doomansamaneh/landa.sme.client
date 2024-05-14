<template>
  <lookup-view
    dataSource="trs/bankAccount/getlookupData"
    sortColumn="no"
    textTemplate="{{ bankTitle }} / {{ title }} / {{ no }}"
    columns="no,bankTitle,amount"
    :filterExpression="filterExpression"
    ref="lookup"
  >
    <template #thead>
      <div class="row items-center q-gutter-x-md">
        <div style="width: 16px">#</div>
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
      </div>

      <div class="row items-center">
        <q-btn
          dense
          unelevated
          color="primary"
          class="primary-shadow absolute-top-right q-py-xs q-px-sm q-mr-sm"
          style="margin-top: 12px"
          rounded
          size="12px"
        >
          <q-icon name="o_add" size="14px" style="margin-left: 2px" />
          <span class="text-body3 no-letter-spacing">ایجاد</span>
        </q-btn>
      </div>
    </template>

    <template #td="{ row, index }">
      <div class="row items-center q-pa-md q-gutter-x-md">
        <div style="width: 16px" class="text-body3 no-letter-spacing">
          {{ index }}
        </div>
        <div class="col-3 text-body3 no-letter-spacing">
          <div class="ellipsis">
            {{ row.no }}
            <q-tooltip
              transition-show="scale"
              transition-hide="scale"
              :delay="700"
              class="custom-tooltip text-body3 no-letter-spacing"
            >
              {{ row.no }}
            </q-tooltip>
          </div>
        </div>
        <div class="col-4 text-body3 no-letter-spacing">
          {{ row.bankTitle }} - {{ row.title }}
        </div>
        <div class="col text-body3 no-letter-spacing">
          {{ row.amount?.toLocaleString() }}
        </div>
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";

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
