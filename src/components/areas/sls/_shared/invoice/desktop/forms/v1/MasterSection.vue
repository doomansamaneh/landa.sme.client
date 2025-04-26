<template>
  <div class="row">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <div class="row q-col-gutter-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <customer-lookup
            ref="customerLookup"
            v-model:selectedId="model.customerId"
            v-model:selectedText="model.customerName"
            :label="customerTitle"
            required
            dl-balance
          />
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <sale-type-lookup
            v-model:selectedId="model.typeId"
            v-model:selectedText="model.typeTitle"
            :filter-expression="saleTypeFilterExpression"
            :label="saleTypeTitle"
            required
          />
        </div>

        <div class="col">
          <div v-if="$q.screen.gt.sm" class="q-pb-xs q-mb-lg"></div>
          <div>
            <q-btn
              v-if="$q.screen.gt.xs"
              :text-color="$q.dark.isActive ? 'white' : 'grey-9'"
              dense
              round
              unelevated
              class="text-body2"
              @click="toggleMoreInfo"
            >
              <q-icon size="24px" name="keyboard_arrow_down" />
            </q-btn>

            <q-btn
              v-if="$q.screen.xs"
              round
              size="11px"
              unelevated
              @click="toggleMoreInfo"
            >
              <q-icon size="20px" name="keyboard_arrow_down" />
            </q-btn>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-10 col-sm-12 col-xs-12">
          <q-slide-transition>
            <div class="q-mb-md" v-show="moreInfo">
              <div class="row q-col-gutter-x-md">
                <div class="col-md-6 col-sm-12 col-xs-12 q-mt-md">
                  <contract-lookup
                    v-model:selectedId="model.contractId"
                    v-model:selectedText="model.contractTitle"
                    label="قرارداد"
                  />
                </div>

                <div class="col-md-6 col-sm-12 col-xs-12 q-mt-md">
                  <customer-lookup
                    v-model:selectedId="model.contactId"
                    v-model:selectedText="model.contactName"
                    label="بازاریاب"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-md-6 col-sm-12 col-xs-12 q-mt-md">
                  <inventory-lookup
                    v-model:selectedId="model.inventoryId"
                    v-model:selectedText="model.inventoryTitle"
                    label="انبار"
                    required
                  />
                </div>

                <div
                  v-if="showOriginalDoc"
                  class="col-md-6 col-sm-12 col-xs-12 q-mt-md"
                >
                  <invoice-lookup
                    v-model:selectedId="
                      model.originalDocument.parentId
                    "
                    v-model:selectedText="model.originalDocument.no"
                    :filter-expression="originalFilterExpression"
                    label="سند مرجع"
                  />
                </div>
              </div>
            </div>
          </q-slide-transition>

          <div class="row q-mt-md">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <custom-input
                v-model="model.summary"
                type="textarea"
                label="شرح"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4 col-sm-12 col-xs-12">
      <div
        class="row justify-end"
        :class="{ 'q-mt-md': $q.screen.lt.md }"
      >
        <div class="col-md-6 col-sm-12 col-xs-12">
          <custom-input
            v-model="model.no"
            label="شماره فاکتور"
            type="number"
            :disable="!model.manualNo"
          >
            <template #append>
              <q-icon
                size="sm"
                :name="invoiceNo ? 'o_no_encryption' : 'o_lock'"
                class="cursor-pointer all-pointer-events"
                @click="toggleInvoiceNo"
              />
            </template>
          </custom-input>
        </div>
      </div>
      <div class="row justify-end q-mt-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <custom-input v-model="model.docNo" label="ش رهگیری" />
        </div>
      </div>
      <div class="row justify-end q-mt-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <date-time v-model="model.date" label="تاریخ" required />
        </div>
      </div>
      <div class="row justify-end q-mt-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <date-time
            v-model="model.dueDate"
            label="سررسید"
            required
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import {
    sqlOperator,
    vatType,
    invoiceFormType,
    documentType,
  } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import InvoiceLookup from "src/components/shared/lookups/InvoiceLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    formStore: useInvoiceModel,
    formType: invoiceFormType,
    model: invoiceModel,
  });

  const customerLookup = ref(null);

  // Watch for model changes to reset balance
  watch(
    () => props.model,
    () => {
      customerLookup.value?.resetBalance();
    }
  );

  const moreInfo = ref(false);

  const customerTitle = computed(() =>
    props.formType === invoiceFormType.sales ||
    props.formType === invoiceFormType.salesReturn
      ? "مشتری"
      : "فروشنده"
  );

  const saleTypeTitle = computed(() =>
    props.formType === invoiceFormType.sales ||
    props.formType === invoiceFormType.salesReturn
      ? "نوع فروش"
      : "نوع خرید"
  );

  const showOriginalDoc = computed(
    () =>
      props.model?.originalDocument &&
      (props.formType === invoiceFormType.sales ||
        props.formType === invoiceFormType.salesReturn)
  );

  const originalFilterExpression = [
    {
      fieldName: "d.typeId",
      operator: sqlOperator.in,
      value: `${documentType.invoice},${documentType.salesReturn}`,
    },
  ];

  const saleTypeFilterExpression = computed(() => {
    return props.formType === invoiceFormType.sales ||
      props.formType === invoiceFormType.salesReturn
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
  });

  const toggleInvoiceNo = () => {
    props.model.manualNo = !props.model.manualNo;
  };

  const toggleMoreInfo = () => {
    moreInfo.value = !moreInfo.value;
  };
</script>
