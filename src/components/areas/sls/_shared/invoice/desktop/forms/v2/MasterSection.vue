<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-4 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">
        {{ customerTitle }}
      </q-item-label>
      <customer-lookup
        v-model:selectedId="model.value.customerId"
        v-model:selectedText="model.value.customerName"
      />
    </div>

    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">
        {{ saleTypeTitle }}
      </q-item-label>
      <sale-type-lookup
        v-model:selectedId="model.value.typeId"
        v-model:selectedText="model.value.typeTitle"
        :filter-expression="filterExpression"
      />
    </div>

    <div class="col-md-2 col-sm-12 col-xs-12">
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
    <div class="col-md-2 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
      <date-time v-model="model.value.date" />
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

  <q-slide-transition>
    <div v-show="moreInfo">
      <div class="row q-mt-sm q-col-gutter-md">
        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">انبار</q-item-label>
          <inventory-lookup
            v-model:selectedId="model.value.inventoryId"
            v-model:selectedText="model.value.inventoryTitle"
          />
        </div>
        <div class="col-md-3 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">قرارداد</q-item-label>
          <contract-lookup
            v-model:selectedId="model.value.contractId"
            v-model:selectedText="model.value.contractTitle"
          />
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">
            بازاریاب
          </q-item-label>
          <customer-lookup
            v-model:selectedId="model.value.contactId"
            v-model:selectedText="model.value.contactName"
          />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-2 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">سررسید</q-item-label>
          <date-time v-model="model.value.dueDate" />
        </div>
      </div>

      <div v-if="showOriginalDoc" class="row q-mt-md">
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

      <div class="row q-col-gutter-md q-mt-sm">
        <div class="col-md-7 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">شرح</q-item-label>
          <custom-input
            v-model="model.value.summary"
            hide-bottom-space
            type="textarea"
          />
        </div>
      </div>
    </div>
  </q-slide-transition>
</template>

<script setup>
  import { computed, ref } from "vue";

  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  import {
    sqlOperator,
    vatType,
    invoiceFormType,
    documentType,
  } from "src/constants";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";

  const props = defineProps({
    formStore: Object,
    formType: Object,
  });

  const contractLookup = ref(null);
  const invoiceNo = ref(false);
  const invoiceNoField = ref("1");
  const date = ref("");
  const dueDate = ref("");
  const customerLookup = ref(null);
  const detailSection = ref(false);

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

<style lang="scss" scoped>
  .q-item__label--caption {
    font-size: 14px;
    letter-spacing: 0;
    color: #697588;
  }
</style>
