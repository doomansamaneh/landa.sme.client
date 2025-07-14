<template>
  <q-card bordered class="no-shadow">
    <data-grid
      ref="dataGrid"
      :grid-store="gridStore"
      separator="horizontal"
      multiSelect
      numbered
      flat
      wrapCells_
      @selected-rows-changed="selectedRowChanged"
      no-fullscreen
    >
      <template #title>
        <div class="q-pa-lg">
          <div class="text-body1 text-weight-700">
            {{ $t("shared.labels.salesInvoices") }}
            {{ $t("shared.labels.hasRemain") }}
          </div>
          <div class="text-body2 q-mt-xs caption-on-dark">
            {{ $t("shared.labels.selectInvoicesForReceiptPayment") }}
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
            <q-tooltip class="custom-tooltip text-body1">
              {{ $t("shared.labels.contract") }}
            </q-tooltip>
          </q-badge>
        </div>
      </template>

      <template #cell-amount="{ item }">
        {{ helper.formatNumber(item.amount) }}
      </template>

      <template #cell-payedAmount="{ item }">
        {{ helper.formatNumber(item.payedAmount) }}
      </template>

      <template #cell-remainedAmount="{ item }">
        <span class="text-weight-600">
          {{ helper.formatNumber(item.remainedAmount) }}
        </span>
      </template>

      <template #footer-subtotal="{ selectedRows }">
        <td colspan="7" class="text-right">
          {{ $t("shared.labels.selectedRows") }}
        </td>
        <td>
          <b>
            {{
              helper.formatNumber(
                helper.getSubtotal(selectedRows, "remainedAmount")
              )
            }}
          </b>
        </td>
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import { helper } from "src/helpers";
  import {
    documentType,
    sortOrder,
    sqlOperator,
  } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { invoiceRemainedColumns } from "src/components/areas/sls/_composables/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

  const { t } = useI18n();

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
