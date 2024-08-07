<template>
  <data-grid
    ref="dataTable"
    :dataSource="dataSource"
    :grid-store="gridStore"
    flat_
    bordered_
    multiSelect
    dense_
    toolbar
    numbered
    wrapCells_
    expandable
    @row-dbl-click="gotoPreview"
  >
    <template #filter-statusId="{ item }">
      <custom-select
        v-model="item.value"
        :options="helper.getEnumOptions(quoteStatus, 'quoteStatus')"
        @update:model-value="reloadData"
      />
    </template>
    <template #cell-no="{ item }">
      <span>{{ item.no }}</span>
      <span v-if="item.taxId" class="q-pl-xs">
        <q-icon name="o_check" color="accent" size="xs">
          <q-tooltip class="accent text-body1 no-letter-spacing">
            ارسال به سامانه مودیان
          </q-tooltip>
        </q-icon>
      </span>
      <span v-if="item.notificationCount" class="q-pl-xs">
        <q-icon name="o_email" color="positive" size="xs">
          <q-tooltip class="positive text-body1 no-letter-spacing">
            فرستاده شده: {{ item.notificationCount }}
          </q-tooltip>
        </q-icon>
      </span>
    </template>
    <template #cell-amount="{ item }">
      <q-btn
        v-if="item.statusId === voucherStatus.canceled"
        round
        text-color="white"
        dense
        size="9px"
        unelevated
        icon="clear"
        class="q-mr-xs red-gradient red-shadow no-pointer-events"
      />
      <span>{{ item.amount?.toLocaleString() }}</span>
    </template>
    <template #cell-customerName="{ item }">
      <span v-if="item.customerCode">{{ item.customerCode }} -</span>
      <span>{{ item.customerName }}</span>
    </template>
    <template #cell-payedAmount="{ item }">
      <span>{{ item.payedAmount?.toLocaleString() }}</span>
    </template>
    <template #cell-remainedAmount="{ item }">
      <span>{{ item.remainedAmount?.toLocaleString() }}</span>
    </template>
    <template #cell-discountAmount="{ item }">
      <span>{{ item.discountAmount?.toLocaleString() }}</span>
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
    <template #cell-statusId="{ item }">
      <q-btn
        v-if="item.statusId === quoteStatus.final"
        round
        text-color="white"
        dense
        size="9px"
        unelevated
        icon="o_done"
        class="q-mr-xs green-gradient green-shadow no-pointer-events"
      />
      {{
        $t(
          `shared.quoteStatus.${helper.getEnumType(
            item.statusId,
            quoteStatus
          )}`
        )
      }}
    </template>
    <template #expand="{ item }">
      <div>
        <slot name="expand" :item="item"></slot>
      </div>
    </template>

    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td>
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "amount")
              .toLocaleString()
          }}
        </b>
      </td>
      <td v-if="showDiscount">
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "discountAmount")
              .toLocaleString()
          }}
        </b>
      </td>
      <td v-if="showPayed">
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "payedAmount")
              .toLocaleString()
          }}
        </b>
      </td>
      <td v-if="showRemained">
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "remainedAmount")
              .toLocaleString()
          }}
        </b>
      </td>
      <td colspan="100%"></td>
    </template>

    <template #footer-total="{ summary }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td>
        <b>{{ summary?.amount?.toLocaleString() }}</b>
      </td>
      <td v-if="showDiscount">
        <b>{{ summary?.discountAmount?.toLocaleString() }}</b>
      </td>
      <td v-if="showPayed">
        <b>{{ summary?.payedAmount?.toLocaleString() }}</b>
      </td>
      <td v-if="showRemained">
        <b>{{ summary?.remainedAmount?.toLocaleString() }}</b>
      </td>

      <td colspan="100%"></td>
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { quoteStatus, voucherStatus } from "src/constants";
  import { helper } from "src/helpers";

  import DataGrid from "components/shared/dataTables/desktop/DataGrid.vue";
  import CustomSelect from "components/shared/forms/CustomSelect.vue";
  import InvoicePreview from "components/areas/sls/invoice/shared/preview/IndexView.vue";

  const props = defineProps({
    dataSource: String,
    columns: Array,
    gridStore: Object,
    baseRoute: String,
  });

  const router = useRouter();
  const dataTable = ref(null);

  const colspan = computed(
    () =>
      dataTable.value?.tableStore?.columns.value.findIndex(
        (column) => column.name === "amount"
      ) +
      1 + //numbered column
      1 //multi check column
  );

  const showDiscount = computed(
    () =>
      dataTable.value?.tableStore?.columns.value.findIndex(
        (column) => column.name === "discountAmount"
      ) >= 0
  );

  const showPayed = computed(
    () =>
      dataTable.value?.tableStore?.columns.value.findIndex(
        (column) => column.name === "payedAmount"
      ) >= 0
  );

  const showRemained = computed(
    () =>
      dataTable.value?.tableStore?.columns.value.findIndex(
        (column) => column.name === "remainedAmount"
      ) >= 0
  );

  async function reloadData() {
    await dataTable.value?.tableStore.reloadData();
  }

  function gotoPreview(row) {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
  }

  defineExpose({
    dataTable,
  });
</script>
