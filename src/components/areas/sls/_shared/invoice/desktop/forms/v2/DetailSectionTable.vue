<template>
  <q-markup-table bordered flat separator="horizontal">
    <thead>
      <tr>
        <th style="width: 1%">#</th>
        <th style="width: 45%">کالا/خدمت</th>
        <th style="width: 1%">تعداد/مقدار</th>
        <th style="width: 20%">واحد سنجش</th>
        <th style="width: 12%">مبلغ واحد</th>
        <th style="width: 20%">ارزش افزوده</th>
        <th style="width: 12%">
          مبلغ کل
          <q-icon
            name="o_info"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-tooltip
              :delay="600"
              class="absolute custom-tooltip"
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
          <q-input
            input-class="text-body3 no-letter-spacing"
            outlined
            dense
            v-model="row.productCodeTitle"
          />
        </td>
        <td>
          <custom-input-number
            ref="quantityInput"
            input-class="text-body3 no-letter-spacing"
            v-model="row.quantity"
            placeholder="مقدار"
            type_="number"
            step_="0.01"
            min="0"
          />
        </td>
        <td>
          <product-unit-lookup
            placeholder="واحد سنجش"
            input-class="text-body3 no-letter-spacing"
            v-model:selectedId="row.productUnitId"
            v-model:selectedText="row.productUnitTitle"
          />
        </td>
        <td>
          <custom-input-number
            input-class="text-body3 no-letter-spacing"
            v-model="row.price"
            placeholder="مبلغ واحد"
          />
        </td>
        <td>
          <vat-lookup
            input-class="text-body3 no-letter-spacing"
            placeholder="مالیات بر ارزش افزوده"
            v-model:selectedId="row.vatId"
            v-model:selectedText="row.vatTitle"
            :filterExpression="vatFilter"
            @rowSelected="vatChanged($event, row)"
          />
        </td>
        <td>
          <q-field outlined dense disable>
            <template #control>
              <div
                class="text-body3 no-letter-spacing text-weight-500"
                tabindex="0"
              >
                {{ helper.formatNumber(row.totalPrice) }}
              </div>
            </template>
          </q-field>
        </td>
        <td class="text-center q-gutter-x-xs">
          <q-btn
            color="red"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
            @click="formStore.deleteRow(index)"
          />
          <q-btn unelevated round class="text-on-dark" size="sm">
            <q-icon size="20px" name="o_more_horiz" />
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
                      تخفیف
                    </q-item-label>
                    <custom-input-number
                      hide-bottom-space
                      v-model="row.discount"
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

  <footer-section
    class="q-pt-xl"
    v-if="formStore.model.value.invoiceItems?.length"
    :form-store="formStore"
  />
</template>

<script setup>
  import { ref, watch } from "vue";
  import { helper } from "src/helpers";
  import {
    sqlOperator,
    vatType,
    invoiceFormType,
  } from "src/constants";

  import FooterSection from "../v1/FooterSection.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
  import VatLookup from "src/components/shared/lookups/VatLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import NoProductSelected from "../NoProductSelected.vue";

  const props = defineProps({
    formStore: Object,
    formType: invoiceFormType,
  });

  const prevQuantities = ref(new Map());

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

  const quantityInput = ref([]); // Array to hold the refs for each input

  const focusInput = (index) => {
    if (
      quantityInput.value[index] &&
      typeof quantityInput.value[index].focus === "function"
    ) {
      quantityInput.value[index].focus(); // Call the focus method defined in custom-input-number
    }
  };

  watch(
    () => props.formStore.model.value.invoiceItems,
    (newItems) => {
      newItems.forEach((item, index) => {
        const prevQuantity = prevQuantities.value.get(item.productId);

        if (prevQuantity === undefined) {
          prevQuantities.value.set(item.productId, item.quantity);
          item.blink = false;
        } else {
          if (item.quantity > prevQuantity) {
            item.blink = true;
            focusInput(index);
            setTimeout(() => {
              item.blink = false;
            }, 300);
          }

          prevQuantities.value.set(item.productId, item.quantity);
        }
      });
    },
    { deep: true }
  );

  const vatChanged = (vat, row) => {
    row.vatPercent = vat?.rate ?? 0;
  };
</script>

<style scoped>
  td,
  th {
    padding: 6px 2px !important;
  }

  .q-markup-table.padding-table {
    padding: 24px !important;
  }

  .q-markup-table th {
    font-size: 12px !important;
    font-weight: 600 !important;
  }
</style>
