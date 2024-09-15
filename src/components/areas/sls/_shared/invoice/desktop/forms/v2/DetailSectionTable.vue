<template>
  <q-markup-table bordered flat dense separator="horizontal">
    <thead>
      <tr>
        <th style="width: 1%">#</th>
        <th>کالا/خدمت</th>
        <th style="width: 10%">تعداد/مقدار</th>
        <th style="width: 15%">واحد سنجش</th>
        <th style="width: 15%">مبلغ واحد</th>
        <th style="width: 12%">ارزش افزوده</th>
        <th style="width: 15%">
          مبلغ کل
          <q-icon
            name="o_info"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-tooltip
              :delay="600"
              class="custom-tooltip"
              anchor="top right"
              self="bottom middle"
              :offset="[50, 10]"
            >
              <span class="text-body2">
                مبلغ کل = (تعداد * مبلغ) - تخفیف + مالیات بر ارزش
                افزوده
              </span>
            </q-tooltip>
          </q-icon>
        </th>
        <th style="width: 1%"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in formStore.model.value.invoiceItems"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <product-lookup
            :autofocus="index === formStore.newAddedItemIndex.value"
            placeholder="انتخاب کالا/خدمت"
            v-model:selectedId="row.productId"
            v-model:selectedText="row.productTitle"
            :filterExpression="productFilter"
            @rowSelected="productChanged($event, row)"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.quantity"
            placeholder="مقدار"
          />
        </td>
        <td>
          <product-unit-lookup
            placeholder="واحد سنجش"
            v-model:selectedId="row.productUnitId"
            v-model:selectedText="row.productUnitTitle"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.price"
            placeholder="مبلغ واحد"
          />
        </td>
        <td>
          <vat-lookup
            placeholder="مالیات بر ارزش افزوده"
            v-model:selectedId="row.vatId"
            v-model:selectedText="row.vatTitle"
            :filterExpression="vatFilter"
            @rowSelected="vatChanged($event, row)"
          />
        </td>
        <td>
          <q-field outlined dense disable>
            <template v-slot:control>
              <div class="text-weight-500" tabindex="0">
                {{ helper.formatNumber(row.totalPrice) }}
              </div>
            </template>
          </q-field>
        </td>
        <td class="text-center q-gutter-x-sm">
          <q-btn
            color="red"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
            @click="formStore.deleteRow(index)"
          />
          <q-btn
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_more_horiz"
          >
            <q-menu
              style="width: 500px"
              :offset="[0, 20]"
              fit
              class="border-radius-lg"
            >
              <q-card class="bordered">
                <q-card-section class="q-pb-none">
                  <div
                    class="text-h6 text-weight-700 no-letter-spacing"
                  >
                    اطلاعات تکمیلی
                  </div>
                  {{ row.productTitle }}
                </q-card-section>
                <q-card-section>
                  <div class="">
                    <q-item-label caption class="q-mb-sm">
                      شرح ردیف
                    </q-item-label>
                    <custom-input
                      hide-bottom-space
                      v-model="row.comment"
                      autogrow
                    />
                  </div>
                  <div class="q-mt-md">
                    <q-item-label caption class="q-mb-sm">
                      شرح تخفیف
                    </q-item-label>
                    <custom-input
                      hide-bottom-space
                      v-model="row.discountComment"
                      autogrow
                    />
                  </div>
                </q-card-section>
              </q-card>
            </q-menu>
          </q-btn>
        </td>
      </tr>
    </tbody>
    <tbody v-if="!formStore.model.value.invoiceItems?.length">
      <tr>
        <td colspan="100%">
          <no-product-selected />
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <footer-section :form-store="formStore" />
</template>

<script setup>
  import {
    sqlOperator,
    vatType,
    invoiceFormType,
  } from "src/constants";

  import FooterSection from "../v1/FooterSection.vue";
  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
  import VatLookup from "src/components/shared/lookups/VatLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import NoProductSelected from "../NoProductSelected.vue";
  import { helper } from "src/helpers";

  const props = defineProps({
    formStore: Object,
    formType: invoiceFormType,
  });

  const vatFilter =
    props.formType == invoiceFormType.sales
      ? [
          {
            fieldName: "isForSale",
            operator: sqlOperator.in,
            value: `${vatType.sale},${vatType.purchaseAndSale}`,
          },
        ]
      : [
          {
            fieldName: "isForSale",
            operator: sqlOperator.in,
            value: `${vatType.purchase},${vatType.purchaseAndSale}`,
          },
        ];

  const vatChanged = (vat, row) => {
    row.vatPercent = vat?.rate ?? 0;
  };
</script>

<style scoped>
  td,
  th {
    padding: 8px 2px !important;
  }

  .q-markup-table.padding-table {
    padding: 24px !important;
  }

  .q-markup-table th {
    font-size: 14px !important;
  }
</style>
