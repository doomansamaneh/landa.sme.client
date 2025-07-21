<template>
  <q-form ref="form">
    <div class="row q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <check-lookup
          ref="lookup"
          v-model:selectedId="paymentItem.checkId"
          v-model:selectedText="paymentItem.checkSpentDisplay"
          :label="$t('shared.labels.check')"
          required
          @row-selected="checkSelected"
          autofocus
        />
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input-number
          v-model="paymentItem.amount"
          disable
          readonly
          :label="$t('shared.labels.price')"
        />
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input-number
          v-model="paymentItem.fee"
          :label="$t('shared.labels.fee')"
        />
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12">
        <custom-input
          v-model="paymentItem.comment"
          type="textarea"
          :label="$t('shared.labels.comment')"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted, nextTick } from "vue";
  import { paymentMethod } from "src/constants";

  import CheckLookup from "src/components/shared/Lookups/CheckLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const form = ref(null);
  const lookup = ref(null);

  const props = defineProps({
    item: Object,
  });

  const paymentItem = ref({
    typeId: paymentMethod.checkSpent.id,
    checkId: null,
    checkSpentDisplay: "",
    amount: 0,
    fee: 0,
    comment: "",
  });

  const checkSelected = (row) => {
    paymentItem.value.amount = 0;
    if (row) paymentItem.value.amount = row.amount;
  };

  async function submitForm(callback) {
    try {
      const isValid = await form.value.validate();
      if (isValid) {
        callback(paymentItem.value);
      }
    } catch (error) {
      console.error("Form validation error:", error);
    }
  }

  onMounted(() => {
    if (props.item) {
      paymentItem.value = { ...props.item };
    }
    nextTick(() => {
      lookup.value?.lookup?.focus();
    });
  });

  defineExpose({
    submitForm,
  });
</script>
