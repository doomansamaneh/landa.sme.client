<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-8 col-sm-12 col-xs-12 q-gutter-y-md">
      <div class="row q-col-gutter-x-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">مشتری</q-item-label>
          <customer-lookup
            autofocus
            v-model:selectedId="localFormStore.model.value.customerId"
            v-model:selectedText="localFormStore.model.value.customerName"
          />
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">نوع فروش</q-item-label>
          <sale-type-lookup
            v-model:selectedId="localFormStore.model.value.typeId"
            v-model:selectedText="localFormStore.model.value.typeTitle"
            :filterExpression="filterExpression"
          />
        </div>
      </div>

      <div class="row q-col-gutter-x-md">
        <div class="col-md-10 col-sm-12 col-xs-12">
          <q-expansion-item
            header-class="bordered"
            :label="$t('shared.labels.moreData')"
          >
            <q-card flat class="border-radius-xs">
              <q-card-section class="q-gutter-y-md">
                <div class="row q-col-gutter-x-md">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <q-item-label caption class="q-mb-sm">شرح</q-item-label>
                    <custom-input
                      hide-bottom-space
                      v-model="localFormStore.model.value.comment"
                      type="textarea"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-x-md">
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-item-label caption class="q-mb-sm">قرارداد</q-item-label>
                    <contract-lookup
                      v-model:selectedId="localFormStore.model.value.contractId"
                      v-model:selectedText="
                        localFormStore.model.value.contractTitle
                      "
                    />
                  </div>

                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-item-label caption class="q-mb-sm"
                      >بازاریاب</q-item-label
                    >
                    <customer-lookup
                      v-model:selectedId="localFormStore.model.value.contactId"
                      v-model:selectedText="
                        localFormStore.model.value.contactName
                      "
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-x-md">
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-item-label caption class="q-mb-sm">انبار</q-item-label>
                    <inventory-lookup
                      v-model:selectedId="
                        localFormStore.model.value.inventoryId
                      "
                      v-model:selectedText="
                        localFormStore.model.value.inventoryTitle
                      "
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </div>

    <div class="col-md-4 col-sm-12 col-xs-12 q-gutter-y-md">
      <div class="row justify-end q-col-gutter-x-md">
        <div class="col-12 col-md-6">
          <q-item-label caption class="q-mb-sm">شماره فاکتور</q-item-label>
          <q-input
            type="number"
            hide-bottom-space
            v-model="localFormStore.model.value.no"
            outlined
            dense
            :disable="isInputDisabled"
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
      </div>
      <div class="row justify-end q-col-gutter-x-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
          <date-time v-model="localFormStore.model.value.date" />
        </div>
      </div>
      <div class="row justify-end q-col-gutter-x-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">سررسید</q-item-label>
          <date-time v-model="localFormStore.model.value.dueDate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { sqlOperator } from "src/constants";

import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
import DateTime from "src/components/shared/forms/DateTimePicker.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";

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
