<template>
  <div
    class="row q-gutter-sm"
    :class="$q.screen.gt.xs ? 'q-pb-md' : 'q-py-md'"
  >
    <template v-if="remainedAmount">
      <q-btn
        v-if="showReceipt"
        class="primary-shadow"
        rounded
        color="primary"
        padding="4px 12px"
        unelevated
        :to="`/trs/receipt/createFromInvoice/${model.id}`"
      >
        <q-icon name="o_add" size="xs" />
        <span>دریافت</span>
      </q-btn>
      <q-btn
        v-else
        class="primary-shadow q-mr-xs"
        rounded
        color="primary"
        padding="4px 12px"
        unelevated
        :to="`/trs/payment/createFromInvoice/${model.id}`"
      >
        <q-icon name="o_add" size="xs" />
        <span>پرداخت</span>
      </q-btn>

      <q-btn
        class="primary-shadow"
        rounded
        color="primary"
        padding="4px 12px"
        unelevated
        @click="settlement"
      >
        <q-icon name="o_done_all" size="xs" class="q-mr-xs" />
        <span>
          {{ $t("shared.labels.settlement") }}
        </span>
      </q-btn>
    </template>
  </div>

  <div class="border-radius-sm bordered overflow-hidden">
    <div class="text-body1 text-weight-500 text-center q-pa-md">
      فهرست دریافت، پرداخت
    </div>
    <invoice-payment
      ref="paymentsGrid"
      :detail-url="detailUrl"
      :invoice-id="model.id"
    />

    <q-separator size="2px" />

    <table class="q-table data-table">
      <tbody>
        <tr>
          <td><span class="text-body3">جمع کل:</span></td>
          <td>
            <div class="text-body3 text-bold" style="text-align: end">
              {{ helper.formatNumber(model.amount) }}
            </div>
          </td>
        </tr>

        <tr>
          <td><span class="text-body3">جمع دریافتی:</span></td>
          <td>
            <div class="text-body3 text-bold" style="text-align: end">
              {{ helper.formatNumber(payedAmount) }}
            </div>
          </td>
        </tr>

        <tr>
          <td><span class="text-body3 text-bold">مانده:</span></td>
          <td>
            <div class="text-body2 text-bold" style="text-align: end">
              {{ helper.formatNumber(remainedAmount) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";

  import InvoicePayment from "src/components/areas/trs/paymentInvoice/shared/index/InvoicePayment.vue";
  import PaymentInvoiceDialog from "src/components/areas/trs/paymentInvoice/shared/forms/PaymentInvoiceDialog.vue";
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
    detailUrl: String,
    showReceipt: Boolean,
  });

  const $q = useQuasar();
  const paymentsGrid = ref(null);

  const reloadData = async () => {
    paymentsGrid.value.reloadData();
  };

  const payedAmount = computed(
    () =>
      paymentsGrid?.value?.dataGrid.tableStore.summaryData?.value
        ?.amount ?? 0
  );

  const remainedAmount = computed(
    () => props.model.amount - payedAmount.value
  );

  function settlement() {
    $q.dialog({
      component: PaymentInvoiceDialog,
      componentProps: {
        invoiceId: props.model.id,
      },
    }).onOk(async () => {
      await reloadData();
    });
  }
</script>
