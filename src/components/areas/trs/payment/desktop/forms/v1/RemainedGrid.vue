<template>
  <q-card class="bordered">
    <data-grid
      ref="dataGrid"
      :grid-store="gridStore"
      separator="horizontal"
      multiSelect
      numbered
      bordered
      flat
      wrapCells_
      @selected-rows-changed="selectedRowChanged"
    >
      <template #title>
        <div class="q-pa-lg">
          <h6 class="text-body1 no-letter-spacing text-weight-700">
            صورتحسابهای دارای مانده
          </h6>
          <div
            class="text-body2 no-letter-spacing q-mt-xs text-on-caption"
          >
            برای دریافت / پرداخت صورتحسابهای مورد نظر را تیک بزنید
          </div>
        </div>
      </template>

      <template #cell-subject="{ item }">
        <div>{{ item.subject }}</div>
        <div v-if="item.summary" class="text-caption-sm">
          {{ item.summary }}
        </div>
        <div class="q-gutter-x-sm">
          <q-badge class="primary-gradient">
            {{ item.typeTitle }}
          </q-badge>
          <q-badge
            text-color="white"
            class="bluegrey-gradient"
            v-if="item.contractTitle"
          >
            {{ item.contractTitle }}
            <q-tooltip
              class="custom-tooltip text-body1 no-letter-spacing"
            >
              قرارداد
            </q-tooltip>
          </q-badge>
        </div>
      </template>

      <template #cell-amount="{ item }">
        {{ item.amount?.toLocaleString() }}
      </template>

      <template #cell-payedAmount="{ item }">
        {{ item.payedAmount?.toLocaleString() }}
      </template>

      <template #cell-remainedAmount="{ item }">
        <span class="text-weight-600">
          {{ item.remainedAmount?.toLocaleString() }}
        </span>
      </template>

      <template #footer-subtotal="{ selectedRows }">
        <td colspan="7" class="text-right">
          {{ $t("shared.labels.selectedRows") }}
        </td>
        <td>
          <b>
            {{
              helper
                .getSubtotal(selectedRows, "remainedAmount")
                .toLocaleString()
            }}
          </b>
        </td>
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import { helper } from "src/helpers";
  import {
    documentType,
    sortOrder,
    sqlOperator,
  } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { invoiceRemainedColumns } from "src/components/areas/sls/_composables/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

  const props = defineProps({
    formStore: Object,
  });

  const dataGrid = ref(null);
  const filterExpression = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.in,
      value: `${documentType.purchase},${documentType.salesReturn}`,
    },
  ];
  const gridStore = useBaseInfoGrid({
    columns: invoiceRemainedColumns,
    sortColumn: "no",
    sortOrder: sortOrder.descending,
    filterExpression: filterExpression,
  });

  const tableStore = computed(() => dataGrid?.value?.tableStore);
  const model = computed(() => props.formStore.model.value);
  const customerId = computed(
    () => props.formStore.model.value.customerId
  );

  const firstLoad = ref(true);
  async function reloadData(customerId) {
    if (customerId) {
      tableStore?.value.setDataSource(
        `sls/invoice/getRemainedData/${customerId}`
      );
      await tableStore?.value.reloadData();
      if (firstLoad.value && model.value.selectedInvoiceId) {
        firstLoad.value = false;
        tableStore.value.selectRowById(
          model.value.selectedInvoiceId,
          true
        );
        selectedRowChanged();
      }
    } else {
      tableStore?.value.setDataSource(null);
      tableStore?.value.clearState();
    }
  }

  function selectedRowChanged(selectedRows) {
    model.value.remainedInvoices =
      tableStore.value.allSelectedIds.value.map((item) => ({
        id: item,
      }));

    model.value.remainedAmount = helper.getSubtotal(
      tableStore.value.selectedRows.value,
      "remainedAmount"
    );
  }

  watch(customerId, async () => {
    await reloadData(customerId.value);
  });

  defineExpose({
    tableStore,
    reloadData,
  });
</script>
