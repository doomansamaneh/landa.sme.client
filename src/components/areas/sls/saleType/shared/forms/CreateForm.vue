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
            <custom-input
              label="عنوان"
              v-model="formStore.model.value.title"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <custom-select
              v-model="formStore.model.value.paymentTypeId"
              :options="
                helper.getEnumOptions(paymentType, 'paymentType')
              "
              label="روش تسویه"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <sl-lookup
              v-model:selectedId="formStore.model.value.slId"
              v-model:selectedText="formStore.model.value.slDisplay"
              :filter-expression="filterSL"
              label="حساب معین"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <sl-lookup
              v-model:selectedId="formStore.model.value.discountSLId"
              v-model:selectedText="
                formStore.model.value.discountSLDisplay
              "
              :filter-expression="filterProduct"
              label="حساب تخفیف"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <sl-lookup
              v-model:selectedId="formStore.model.value.productSLId"
              v-model:selectedText="
                formStore.model.value.productSLDisplay
              "
              :filter-expression="filterProduct"
              label="حساب کالا"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <sl-lookup
              v-model:selectedId="formStore.model.value.serviceSLId"
              v-model:selectedText="
                formStore.model.value.serviceSLDisplay
              "
              :filter-expression="filterProduct"
              label="حساب خدمات"
              required
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
                برای ارسال به سامانه مودیان استفاده می‌شود
              </li>
              <li>
                <strong>حساب معین:</strong>
                حسابهای دریافتنی تجاری با کد 10301
              </li>
              <li>
                <strong>حساب تخفیف:</strong>
                برگشت از فروش و تخفیفها با کد 60103
              </li>
              <li>
                <strong>حساب کالا:</strong>
                فروش کالا و خدمات با کد 60101
              </li>
              <li>
                <strong>حساب خدمات:</strong>
                فروش کالا و خدمات با کد 60101. همچنین می‌توانید یک
                حساب معین جداگانه برای خدمات ایجاد کنید
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

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "sls/saleType",
    getCreateModel: true,
  });

  const filterSL = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: accountCLType.currentAsset,
    },
  ];
  const filterProduct = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: accountCLType.revenue,
    },
  ];
</script>
