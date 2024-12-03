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
        <custom-tab
          name="received"
          icon="o_arrow_downward"
          title="چکهای دریافتی"
        />
        <custom-tab
          name="payed"
          icon="o_arrow_upward"
          title="چکهای پرداختی"
        />
      </q-tabs>
    </div>

    <q-separator size="0.5px" />

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

  import { checkItemColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import DataGrid from "../desktop/_CheckItemDataGrid.vue";
  import CustomTab from "src/components/shared/CustomTab.vue";

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
</script>
