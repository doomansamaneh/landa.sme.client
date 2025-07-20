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
  import { useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useDialog } from "src/composables/useDialog";

  import PaymentItem from "./PaymentItem.vue";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  // Import dialog components
  import PaymentItemCashDialog from "./dialogs/PaymentItemCashDialog.vue";
  import PaymentItemCheckDialog from "./dialogs/PaymentItemCheckDialog.vue";
  import PaymentItemCheckSpentDialog from "./dialogs/PaymentItemCheckSpentDialog.vue";
  import PaymentItemTransferBankDialog from "./dialogs/PaymentItemTransferBankDialog.vue";
  // import PaymentItemPosDialog from "./dialogs/PaymentItemPosDialog.vue";
  import PaymentItemCustomerDialog from "./dialogs/PaymentItemCustomerDialog.vue";

  const $q = useQuasar();
  const { t } = useI18n();
  const dialogStore = useDialog();

  const props = defineProps({
    formStore: Object,
    paymentReceiptType: paymentOrReceipt,
  });

  const getPaymentMethodName = (paymentTypeId) => {
    for (const [key, value] of Object.entries(paymentMethod)) {
      if (value.id === paymentTypeId) {
        return key;
      }
    }
    return "cash"; // fallback
  };

  const getDialogComponent = (paymentType) => {
    const componentMap = {
      [paymentMethod.cash.id]: PaymentItemCashDialog,
      [paymentMethod.check.id]: PaymentItemCheckDialog,
      [paymentMethod.checkSpent.id]: PaymentItemCheckSpentDialog,
      [paymentMethod.bankTransition.id]:
        PaymentItemTransferBankDialog,
      // [paymentMethod.pos.id]: PaymentItemPosDialog,
      [paymentMethod.customer.id]: PaymentItemCustomerDialog,
    };
    return componentMap[paymentType];
  };

  const handleAddItem = async (item) => {
    try {
      const component = getDialogComponent(item.value.id);
      if (!component) {
        throw new Error("Component not found for payment type");
      }

      dialogStore.openDialog({
        title: `shared.paymentMethod.${getPaymentMethodName(
          item.value.id
        )}`,
        component: component,
        actionBar: true,
        width: "800px",
        okCallback: async (paymentItemData) => {
          try {
            // Create a payment method object that addRow expects
            const paymentMethodObj = {
              value: {
                id: item.value.id,
                color: item.value.color,
              },
            };

            await props.formStore.addRow(paymentMethodObj);

            // Update the added item with the form data
            const lastIndex =
              props.formStore.model?.value?.paymentItems?.length - 1;
            if (lastIndex >= 0) {
              Object.assign(
                props.formStore.model.value.paymentItems[lastIndex],
                paymentItemData
              );
            }
          } catch (error) {
            console.error("Error adding payment item:", error);
            $q.notify({
              type: "negative",
              message: t("payment.errors.addItemFailed"),
              position: "top",
            });
          }
        },
      });
    } catch (error) {
      $q.notify({
        type: "negative",
        message: t("payment.errors.addItemFailed"),
        position: "top",
      });
    }
  };
</script>
