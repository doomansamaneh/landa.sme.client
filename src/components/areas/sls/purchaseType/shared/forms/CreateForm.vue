<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              عنوان
            </q-item-label>
            <custom-input
              hide-bottom-space
              v-model="formStore.model.value.title"
              :rules="[(val) => val !== null && val !== '']"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              روش تسویه
            </q-item-label>
            <custom-select
              :options="
                helper.getEnumOptions(paymentType, 'paymentType')
              "
              v-model="formStore.model.value.paymentTypeId"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              حساب معین
            </q-item-label>
            <sl-lookup
              v-model:selectedId="formStore.model.value.slId"
              v-model:selectedText="formStore.model.value.slTitle"
              :filter-expression="filterSL"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              حساب تخفیف
            </q-item-label>
            <sl-lookup
              v-model:selectedId="formStore.model.value.discountSLId"
              v-model:selectedText="
                formStore.model.value.discountSLTitle
              "
              :filter-expression="filterDiscount"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              حساب کالا
            </q-item-label>
            <sl-lookup
              v-model:selectedId="formStore.model.value.productSLId"
              v-model:selectedText="
                formStore.model.value.productSLTitle
              "
              :filter-expression="filterProduct"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              حساب خدمات
            </q-item-label>
            <sl-lookup
              v-model:selectedId="formStore.model.value.serviceSLId"
              v-model:selectedText="
                formStore.model.value.serviceSLTitle
              "
              :filter-expression="filterService"
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <q-checkbox
            dense
            size="48px"
            v-model="formStore.model.value.isActive"
            label="فعال"
          />
        </div>
      </q-form>
      <q-card flat class="tips">
        <q-card-section>
          <div class="title q-mb-sm">راهنما</div>
          <div class="text-body1">
            <ul class="q-gutter-y-sm">
              <li>
                <strong>روش تسویه:</strong>
                برای ارسال به سامانه مودیان در صورت نیاز استفاده
                می‌شود
              </li>
              <li>
                <strong>حساب معین:</strong>
                حسابهای پرداختنی تجاری با کد 30103
              </li>
              <li>
                <strong>حساب تخفیف:</strong>
                برگشت از خرید و تخفیفها با کد 81002
              </li>
              <li>
                <strong>حساب کالا:</strong>
                خرید کالا با کد 81001 یا موجودی مواد اولیه با کد 10501
              </li>
              <li>
                <strong>حساب خدمات:</strong>
                خرید کالا و خدمات با کد 81001. همچنین می‌توانید یک
                حساب معین هزینه جداگانه ایجاد کنید
              </li>
            </ul>
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import {
    sqlOperator,
    paymentType,
    accountCLType,
  } from "src/constants";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "sls/purchaseType",
    getCreateModel: true,
  });

  const filterSL = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: accountCLType.currentLiability,
    },
  ];
  const filterDiscount = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: accountCLType.expense,
    },
  ];

  const filterProduct = [
    {
      fieldName: "clId",
      operator: sqlOperator.in,
      value: `${accountCLType.expense},${accountCLType.currentAsset},${accountCLType.fixedAsset}`,
    },
  ];

  const filterService = [
    {
      fieldName: "clId",
      operator: sqlOperator.in,
      value: `${accountCLType.expense},${accountCLType.currentAsset}`,
    },
  ];
</script>
