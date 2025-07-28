<template>
  <q-card flat class="tips">
    <q-card-section>
      <div class="title q-mb-sm">{{ $t("shared.labels.userGuide") }}</div>
      <div class="text-body1">
        <p>
          با ثبت این فرم، مانده صورتحساب انتخاب شده تسویه می‌شود، اما
          هیچ تراکنش مالی در اسناد حسابداری ثبت نمی‌شود.
        </p>
        <p>در غیر اینصورت از فرمهای دریافت، پرداخت استفاده کنید.</p>
      </div>
    </q-card-section>
  </q-card>

  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-my-md">
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        مبلغ
      </q-item-label>
      <custom-input-number
        hide-bottom-space
        v-model="formStore.model.value.amount"
        :rules="[(val) => val !== null && val !== '']"
      />
    </div>

    <div class="q-mb-md">
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        شرح
      </q-item-label>
      <custom-input
        hide-bottom-space
        type="textarea"
        v-model="formStore.model.value.comment"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { usePaymentInvoiceModel } from "../../../_composables/usePaymentInvoiceModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    invoiceId: String,
  });

  const formStore = usePaymentInvoiceModel();
  const form = ref(null);

  onMounted(() => {
    formStore.getCreateModel(props.invoiceId);
  });

  async function submitForm(callback) {
    return await formStore.submitForm(form.value, callback);
  }

  defineExpose({
    submitForm,
  });
</script>
