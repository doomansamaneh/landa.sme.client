<template>
  <q-card flat class="bordered shadow">
    <div
      class="row justify-between overflow-hidden primary-gradient-1"
    >
      <q-tabs
        v-model="tab"
        :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        inline-label
        narrow-indicator
        content-class="text-on-dark"
      >
        <q-tab
          name="received"
          class="q-mr-xs text-h6 text-weight-700"
        >
          <template #default>
            <div class="row items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_arrow_downward"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                چکهای دریافتی
              </div>
            </div>
          </template>
        </q-tab>
        <q-tab name="payed" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_arrow_upward"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                چکهای پرداختی
              </div>
            </div>
          </template>
        </q-tab>
      </q-tabs>

      <data-grid-toolbar class="q-pa-md" :table-store="tableStore" />
    </div>

    <q-separator size="1px" />

    <data-grid
      v-if="tab === 'received'"
      :filter-expression="receiveFilter"
      toolbar_
    />
    <data-grid v-else :filter-expression="payedFilter" toolbar_ />
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator, documentType } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import { checkItemColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import DataGrid from "../desktop/_CheckItemDataGrid.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

  const props = defineProps({ customerId: String });

  const dataGrid = ref(null);
  const tab = ref("received");

  const receiveFilter = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.equal,
      value: documentType.receipt,
    },
  ];

  const payedFilter = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.equal,
      value: documentType.payment,
    },
  ];

  if (props.customerId) {
    const customerFilter = {
      fieldName: "p.CustomerId",
      operator: sqlOperator.equal,
      value: props.customerId,
    };

    payedFilter.push(customerFilter);
    receiveFilter.push(customerFilter);
  }

  const gridStore = useBaseInfoGrid({
    columns: checkItemColumns,
    sortColumn: "itemDate",
    filterExpression: receiveFilter,
  });

  const tableStore = useDataTable({
    dataSource: "trs/report/getCheckItemData",
    gridStore: gridStore,
  });
</script>
