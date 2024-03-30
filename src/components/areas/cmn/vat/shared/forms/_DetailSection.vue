<template>
  <q-markup-table flat dense separator="horizontal">
    <thead>
      <tr>
        <th style="width: 1%">#</th>
        <th style="width: 40%">عنوان</th>
        <th style="width: 40%">حساب معین</th>
        <th style="width: 10%">نرخ</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model.value.vatDeductionItems"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <custom-input placeholder="عنوان" v-model="row.title" />
        </td>
        <td>
          <sl-lookup
            placeholder="حساب معین"
            v-model:selectedId="row.slId"
            v-model:selectedText="row.slTitle"
          />
        </td>
        <td>
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
        </td>
        <td class="text-center_ q-gutter-x-sm">
          <q-btn
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewRow(index, row)"
          />
          <q-btn
            color="red"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
            @click="formStore.deleteRow(index)"
          />
        </td>
      </tr>
    </tbody>
    <tbody v-if="model.value.vatDeductionItems.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <no-product-selected class="q-mt-md" />
          <q-btn
            class="primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewRow()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            افزودن ردیف
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>

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
            نرخ مالیات بر ارزش افزوده به ردیفهای زیر در سند حسابداری که به صورت
            خودکار از روی فاکتور، خرید، و... ایجاد می‌شود، شکسته می‌شود.
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from "vue";

import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
import NoProductSelected from "src/components/areas/sls/invoice/desktop/forms/NoProductSelected.vue";

const props = defineProps({
  formStore: Object,
});

const model = computed(() => props.formStore.model);
</script>
