<template>
  <div class="text-h6 text-weight-600 q-py-lg no-letter-spacing">
    اقلام ارزش افزوده
  </div>
  <q-card class="q-my-sm" flat bordered v-for="(row, index) in model.value.vatDeductionItems" :key="index">
    <div class="row q-pa-md q-col-gutter-sm">
      <div class="col-md-3 col-sm-12 col-xs-12">
        <custom-input placeholder="عنوان" v-model="row.title" />
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <sl-lookup placeholder="حساب معین" v-model:selectedId="row.slId" v-model:selectedText="row.slTitle"
          :filter-expression="slFilter" />
      </div>
      <div class="col-md-2 col-sm-12 col-xs-12">
        <custom-input
          type="number"
          hide-bottom-space
          v-model="row.rate"
          :rules="[(val) => val !== null && val !== '']"
        >
          <template v-slot:append>
            <q-icon name="percent" />
          </template>
        </custom-input>
      </div>
      <div class="col-md-2 col-sm-12 col-xs-12">
        <div class="q-pt-xs q-gutter-md">
          <q-btn color="primary" unelevated round class="text-on-dark" size="sm" icon="o_add"
            @click="formStore.addNewRow(index, row)" />
          <q-btn color="red" unelevated round class="text-on-dark" size="sm" icon="o_delete"
            @click="formStore.deleteRow(index)" />
        </div>
      </div>
    </div>
  </q-card>

  <q-card class="q-my-md" flat bordered v-if="model.value.vatDeductionItems.length === 0">
    <q-card-section class="text-center">
      <no-item-selected />
      <q-btn class="primary-shadow" rounded unelevated color="primary" @click="formStore.pushNewRow()">
        <q-icon name="o_add" size="20px" />
        افزودن ردیف
      </q-btn>
    </q-card-section>
  </q-card>

  <!-- Danger -->
  <q-card class="warning q-my-md">
    <q-card-section>
      <div>
        <div class="title">هشدار</div>
        <div class="q-mt-md">
          <p>
            <strong>عنوان: </strong>
            عنوانی که در سند حسابداری برای این قلم نشان داده می‌شود، مانند
            مالیات بر ارزش افزوده پرداختنی
          </p>
          <p>
            <strong>حساب معین: </strong>
            حسابهای معین پیشفرض:
            <strong> 30501: </strong>
            مالیات بر ارزش افزوده پرداختنی و 30502: عوارض ارزش افزوده پرداختنی
          </p>
          <p>
            <strong>نرخ: </strong>
            نرخ مالیات بر ارزش افزوده براساس اقلام ارزش افزوده، در سند حسابداری
            که به صورت خودکار از روی فاکتور، خرید، و... ایجاد می‌شود، شکسته
            می‌شود.
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <!-- Danger -->
  <q-card class="danger q-my-md">
    <q-card-section>
      <div>
        <div class="title">اخطار</div>
        <div class="q-mt-md">
          <p>
            <strong>عنوان: </strong>
            عنوانی که در سند حسابداری برای این قلم نشان داده می‌شود، مانند
            مالیات بر ارزش افزوده پرداختنی
          </p>
          <p>
            <strong>حساب معین: </strong>
            حسابهای معین پیشفرض:
            <strong> 30501: </strong>
            مالیات بر ارزش افزوده پرداختنی و 30502: عوارض ارزش افزوده پرداختنی
          </p>
          <p>
            <strong>نرخ: </strong>
            نرخ مالیات بر ارزش افزوده براساس اقلام ارزش افزوده، در سند حسابداری
            که به صورت خودکار از روی فاکتور، خرید، و... ایجاد می‌شود، شکسته
            می‌شود.
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <!-- Tips -->
  <q-card class="tips q-my-md">
    <q-card-section>
      <div>
        <div class="title">راهنما</div>
        <div class="q-mt-md">
          <p>
            <strong>عنوان: </strong>
            عنوانی که در سند حسابداری برای این قلم نشان داده می‌شود، مانند
            مالیات بر ارزش افزوده پرداختنی
          </p>
          <p>
            <strong>حساب معین: </strong>
            حسابهای معین پیشفرض:
            <strong> 30501: </strong>
            مالیات بر ارزش افزوده پرداختنی و 30502: عوارض ارزش افزوده پرداختنی
          </p>
          <p>
            <strong>نرخ: </strong>
            نرخ مالیات بر ارزش افزوده براساس اقلام ارزش افزوده، در سند حسابداری
            که به صورت خودکار از روی فاکتور، خرید، و... ایجاد می‌شود، شکسته
            می‌شود.
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<script setup>
import { computed } from "vue";
import { accountCurrentLiability, sqlOperator } from "src/constants";

import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
import NoItemSelected from "src/components/shared/dataTables/NoItemSelected.vue";

const props = defineProps({
  formStore: Object,
});

const slFilter = [
  {
    fieldName: "clId",
    operator: sqlOperator.equal,
    value: accountCurrentLiability,
  },
];
const model = computed(() => props.formStore.model);
</script>
