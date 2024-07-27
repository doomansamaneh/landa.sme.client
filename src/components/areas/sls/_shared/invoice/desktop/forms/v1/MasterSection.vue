<template>
  <div class="row">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <div class="row q-col-gutter-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">
            {{ customerTitle }}
          </q-item-label>
          <customer-lookup
            v-model:selectedId="model.value.customerId"
            v-model:selectedText="model.value.customerName"
          />
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">
            {{ saleTypeTitle }}
          </q-item-label>
          <sale-type-lookup
            v-model:selectedId="model.value.typeId"
            v-model:selectedText="model.value.typeTitle"
            :filter-expression="filterExpression"
          />
        </div>

        <div class="col row items-end">
          <q-btn
            v-if="$q.screen.gt.xs"
            :text-color="$q.dark.isActive ? 'white' : 'grey-9'"
            dense
            round
            icon="o_more_horiz"
            unelevated
            class="text-body2 no-letter-spacing"
            @click="toggleMoreInfo"
          />

          <q-btn
            v-if="$q.screen.xs"
            round
            size="11px"
            unelevated
            @click="toggleMoreInfo"
          >
            <q-icon size="20px" name="o_more_horiz" />
          </q-btn>
        </div>
      </div>

      <div class="row">
        <div class="col-md-10 col-sm-12 col-xs-12">
          <q-slide-transition>
            <div class="q-mb-md" v-show="moreInfo">
              <div class="row q-col-gutter-x-md">
                <div class="col-md-6 col-sm-12 col-xs-12 q-mt-md">
                  <q-item-label caption class="q-mb-sm">
                    قرارداد
                  </q-item-label>
                  <contract-lookup
                    v-model:selectedId="model.value.contractId"
                    v-model:selectedText="model.value.contractTitle"
                  />
                </div>

                <div class="col-md-6 col-sm-12 col-xs-12 q-mt-md">
                  <q-item-label caption class="q-mb-sm">
                    بازاریاب
                  </q-item-label>
                  <customer-lookup
                    v-model:selectedId="model.value.contactId"
                    v-model:selectedText="model.value.contactName"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-md-6 col-sm-12 col-xs-12 q-mt-md">
                  <q-item-label caption class="q-mb-sm">
                    انبار
                  </q-item-label>
                  <inventory-lookup
                    v-model:selectedId="model.value.inventoryId"
                    v-model:selectedText="model.value.inventoryTitle"
                  />
                </div>
              </div>
            </div>
          </q-slide-transition>

          <div class="row q-mt-md">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <q-item-label caption class="q-mb-sm">شرح</q-item-label>
              <custom-input
                v-model="model.value.summary"
                hide-bottom-space
                type="textarea"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4 col-sm-12 col-xs-12">
      <div
        class="row justify-end"
        :class="{ 'q-mt-md': $q.screen.xs }"
      >
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">
            شماره فاکتور
          </q-item-label>
          <q-input
            type="number"
            hide-bottom-space
            v-model="model.value.no"
            outlined
            dense
            :disable="!model.value.manualNo"
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
      <div v-if="showOriginalDoc" class="row justify-end q-mt-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">
            سند مرجع
          </q-item-label>
          <pre>{{ model.value.originalDocument }}</pre>
          <invoice-lookup
            v-model:selectedId="model.value.originalDocument.parentId"
            v-model:selectedText="model.value.originalDocument.no"
            :filter-expression="originalFilterExpression"
          />
        </div>
      </div>
      <div class="row justify-end q-mt-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
          <date-time v-model="model.value.date" />
        </div>
      </div>
      <div class="row justify-end q-mt-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">سررسید</q-item-label>
          <date-time v-model="model.value.dueDate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from "vue";
  import {
    sqlOperator,
    vatType,
    invoiceFormType,
    documentType,
  } from "src/constants";

  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import InvoiceLookup from "src/components/shared/lookups/InvoiceLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    formStore: Object,
    formType: Object,
  });

  const moreInfo = ref(false);

  const customerTitle =
    props.formType == invoiceFormType.sales ? "مشتری" : "فروشنده";

  const saleTypeTitle =
    props.formType == invoiceFormType.sales ? "نوع فروش" : "نوع خرید";

  const originalFilterExpression = [
    {
      fieldName: "d.typeId",
      operator: sqlOperator.in,
      value: `${documentType.invoice},${documentType.salesReturn}`,
    },
  ];

  const filterExpression =
    props.formType == invoiceFormType.sales
      ? [
          {
            fieldName: "isForSale",
            operator: sqlOperator.equal,
            value: vatType.sale,
          },
        ]
      : [
          {
            fieldName: "isForSale",
            operator: sqlOperator.equal,
            value: vatType.purchase,
          },
        ];

  const toggleInvocieNo = () => {
    localFormStore.value.model.value.manualNo =
      !localFormStore.value.model.value.manualNo;
  };

  const localFormStore = computed(() => props.formStore);
  const model = computed(() => props.formStore.model);
  const showOriginalDoc = computed(
    () =>
      //todo: activate original document
      model?.value.originalDocument &&
      (props.formType === invoiceFormType.sales ||
        props.formType === invoiceFormType.salesReturn)
  );

  const toggleMoreInfo = () => {
    moreInfo.value = !moreInfo.value;
  };
</script>
