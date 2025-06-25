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

  import PaymentItem from "./PaymentItem.vue";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  const $q = useQuasar();
  const { t } = useI18n();
  const props = defineProps({
    formStore: Object,
    paymentReceiptType: paymentOrReceipt,
  });

  const handleAddItem = async (item) => {
    try {
      await props.formStore.addRow(item);
    } catch (error) {
      $q.notify({
        type: "negative",
        message: t("payment.errors.addItemFailed"),
        position: "top",
      });
    }
  };
</script>
