<template>
  <div class="row">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <div class="row q-col-gutter-md">
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

        <div class="col row items-end">
          <q-btn
            v-if="$q.screen.gt.xs"
            :text-color="$q.dark.isActive ? 'white' : 'grey-9'"
            dense
            round
            icon="o_info"
            unelevated
            class="text-body2 no-letter-spacing"
            @click="toggleMoreInfo"
          />

          <q-btn
            padding="4px 12px"
            v-if="$q.screen.xs"
            color="primary"
            rounded
            unelevated
            label="جزئیات بیشتر"
            @click="toggleMoreInfo"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-10 col-sm-12 col-xs-12">
          <q-slide-transition>
            <div class="q-mt-md q-mb-md" v-show="moreInfo">
              <div class="row q-col-gutter-x-md">
                <div class="col-md-6 col-sm-12 col-xs-12 q-mt-md">
                  <q-item-label caption class="q-mb-sm">قرارداد</q-item-label>
                  <contract-lookup
                    v-model:selectedId="localFormStore.model.value.contractId"
                    v-model:selectedText="
                      localFormStore.model.value.contractTitle
                    "
                  />
                </div>

                <div class="col-md-6 col-sm-12 col-xs-12 q-mt-md">
                  <q-item-label caption class="q-mb-sm">بازاریاب</q-item-label>
                  <customer-lookup
                    v-model:selectedId="localFormStore.model.value.contactId"
                    v-model:selectedText="
                      localFormStore.model.value.contactName
                    "
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-md-6 col-sm-12 col-xs-12 q-mt-md">
                  <q-item-label caption class="q-mb-sm">انبار</q-item-label>
                  <inventory-lookup
                    v-model:selectedId="localFormStore.model.value.inventoryId"
                    v-model:selectedText="
                      localFormStore.model.value.inventoryTitle
                    "
                  />
                </div>
              </div>
            </div>
          </q-slide-transition>

          <div class="row q-mt-md">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-item-label caption class="q-mb-sm">شرح</q-item-label>
              <custom-input
                hide-bottom-space
                v-model="localFormStore.model.value.summary"
                type="textarea"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4 col-sm-12 col-xs-12">
      <div class="row justify-end" :class="{ 'q-mt-md': $q.screen.xs }">
        <div class="col-md-6 col-sm-12 col-xs-12">
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
      <div class="row justify-end q-mt-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
          <date-time v-model="localFormStore.model.value.date" />
        </div>
      </div>
      <div class="row justify-end q-mt-md">
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
import { sqlOperator, vatType } from "src/constants";

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
const moreInfo = ref(false);

const filterExpression = [
  { fieldName: "isForSale", operator: sqlOperator.equal, value: vatType.sale },
];

const toggleInvocieNo = () => {
  invoiceNo.value = !invoiceNo.value;
};

const isInputDisabled = computed(() => !invoiceNo.value);
const localFormStore = computed(() => props.formStore);

const toggleMoreInfo = () => {
  moreInfo.value = !moreInfo.value;
};
</script>
