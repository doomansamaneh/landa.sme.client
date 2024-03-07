<template>
  <div class="row justify-between">
    <div class="col-6">
      <div class="row q-gutter-md">
        <div class="col">
          <div class="q-gutter-md">
            <div>
              <q-item-label caption class="q-mb-sm"> مشتری </q-item-label>
              <customer-lookup
                v-model:selectedId="localFormStore.model.value.customerId"
                v-model:selectedText="localFormStore.model.value.customerName"
              />
            </div>
            <div>
              <q-item-label caption class="q-mb-sm">قرارداد</q-item-label>
              <contract-lookup
                v-model:selectedId="localFormStore.model.value.contractId"
                v-model:selectedText="localFormStore.model.value.contractTitle"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="q-gutter-md">
            <div>
              <q-item-label caption class="q-mb-sm">بازایاب</q-item-label>
              <customer-lookup
                v-model:selectedId="localFormStore.model.value.contactId"
                v-model:selectedText="localFormStore.model.value.contactName"
              />
            </div>
            <div>
              <q-item-label caption class="q-mb-sm">نوع فروش</q-item-label>
              <sale-type-lookup
                v-model:selectedId="localFormStore.model.value.typeId"
                v-model:selectedText="localFormStore.model.value.typeTitle"
                :filterExpression="filterExpression"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="q-mt-md">
        <q-item-label caption class="q-mb-sm">شرح</q-item-label>
        <custom-input
          hide-bottom-space
          v-model="localFormStore.model.value.comment"
          type="textarea"
        />
      </div>
    </div>
    <div class="col-2">
      <div class="column items-end q-gutter-md">
        <div>
          <q-item-label caption class="q-mb-sm">شماره فاکتور</q-item-label>
          <q-input
            type="number"
            hide-bottom-space
            v-model="localFormStore.model.value.no"
            outlined
            dense
            :disable="isInputDisabled"
            style="width: 180px"
          >
            <template #append>
              <q-icon
                size="sm"
                :name="invoiceNo ? 'o_no_encryption' : 'o_lock'"
                class="cursor-pointer all-pointer-events"
                @click="toggleInvocieNo"
              />
            </template>
          </q-input>
        </div>
        <div>
          <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
          <date-time
            v-model="localFormStore.model.value.date"
            style="width: 180px"
          />
        </div>
        <div>
          <q-item-label caption class="q-mb-sm">سررسید</q-item-label>
          <date-time
            v-model="localFormStore.model.value.dueDate"
            style="width: 180px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
import DateTime from "src/components/shared/forms/DateTimePicker.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import { sqlOperator } from "src/constants";

const props = defineProps({
  formStore: Object,
});

const invoiceNo = ref(false);
const filterExpression = [
  { fieldName: "isForSale", operator: sqlOperator.equal, value: "1" },
];

const toggleInvocieNo = () => {
  invoiceNo.value = !invoiceNo.value;
};

const isInputDisabled = computed(() => !invoiceNo.value);
const localFormStore = computed(() => props.formStore);
</script>

<style lang="scss" scoped>
/*.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}*/
</style>
