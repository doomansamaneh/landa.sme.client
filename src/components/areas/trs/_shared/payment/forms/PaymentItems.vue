<template>
  <div class="q-mt-lg">
    <!-- <div class="text-h6 q-mb-md">
      <span
        :class="$q.dark.isActive ? 'text-yellow' : 'text-primary'"
      >
        {{
          $route.path.includes("payment")
            ? "روش‌های پرداخت"
            : "روش‌های دریافت"
        }}
      </span>
    </div> -->

    <div class="row items-center q-gutter-md q-mb-lg">
      <template
        v-for="(item, index) in helper.getEnumOptions(
          paymentMethod,
          'paymentMethod'
        )"
        :key="index"
      >
        <q-btn
          no-caps
          v-if="
            (item.value.id === paymentMethod.checkSpent.id &&
              paymentReceiptType === paymentOrReceipt.payment) ||
            item.value.id !== paymentMethod.checkSpent.id
          "
          :class="`${item.value.color}-shadow ${item.value.color}-gradient payment-method-btn`"
          text-color="white"
          rounded
          unelevated
          :loading="formStore.isAddingItem"
          :disable="formStore.isAddingItem"
          @click="handleAddItem(item)"
        >
          <q-icon name="o_add" size="20px" class="q-mr-sm" />
          {{ item.label }}
        </q-btn>
      </template>
    </div>

    <!-- <q-separator class="q-mb-lg" /> -->

    <template v-if="formStore.model?.value?.paymentItems?.length">
      <payment-item
        v-for="(item, index) in formStore.model?.value?.paymentItems"
        :key="item.id || index"
        :item="item"
        :index="index"
        :form-store="formStore"
        class="q-mb-md"
      />
    </template>
    <q-card v-else>
      <q-card-section>
        <no-data-found />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { paymentMethod, paymentOrReceipt } from "src/constants";
  import { useDialog } from "src/composables/useDialog";

  import PaymentItem from "./PaymentItem.vue";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  import PaymentItemDialog from "./PaymentItemDialog.vue";

  const dialogStore = useDialog();

  const props = defineProps({
    formStore: Object,
    paymentReceiptType: paymentOrReceipt,
    okIcon: String,
  });

  const getPaymentMethodName = (paymentTypeId) => {
    for (const [key, value] of Object.entries(paymentMethod)) {
      if (value.id === paymentTypeId) {
        return key;
      }
    }
    return "cash"; // fallback
  };

  const handleAddItem = async (item) => {
    const paymentItem = {
      typeId: item.value.id,
      amount: props.formStore.remainedAmount?.value,
      fee: 0,
    };
    dialogStore.openDialog({
      title: `shared.paymentMethod.${getPaymentMethodName(
        item.value.id
      )}`,
      component: PaymentItemDialog,
      actionBar: true,
      props: {
        item: paymentItem,
      },
      width: "800px",
      okCallback: async (item) => {
        props.formStore.addRow(item);
      },
      okLabel: "shared.labels.add",
      okIcon: "o_add",
    });
  };
</script>
