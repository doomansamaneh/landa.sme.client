<template>
  <q-markup-table
    bordered
    flat
    separator="horizontal"
    class="q-markup-table--impacted"
  >
    <thead>
      <tr>
        <th style="width: 1%">#</th>
        <th style="width: 28%">کالا/خدمت</th>
        <th style="width: 7%">تعداد/مقدار</th>
        <th style="width: 10%">واحد سنجش</th>
        <th style="width: 10%">مبلغ واحد</th>
        <th style="width: 15%">ارزش افزوده</th>
        <th style="width: 10%">مبلغ مالیات</th>
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
                مبلغ کل = (تعداد * مبلغ) - مالیات بر ارزش + تخفیف +
                افزوده
              </span>
            </q-tooltip>
          </q-icon>
        </th>
        <th style="min-width: 120px" />
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(row, index) in model.invoiceItems"
        :key="index"
      >
        <tr class="standard-row">
          <td class="text-center">{{ index + 1 }}</td>
          <td>
            <product-lookup
              autogrow
              no-error-icon
              :autofocus="index === formStore.newAddedItemIndex.value"
              placeholder="انتخاب کالا/خدمت"
              v-model:selectedId="row.productId"
              v-model:selectedText="row.productDisplay"
              :filterExpression="productFilter"
              required
              @rowSelected="productChanged($event, row)"
            />
          </td>
          <td>
            <custom-input-number
              no-error-icon
              v-model="row.quantity"
              placeholder="مقدار"
              required
            />
          </td>
          <td>
            <product-unit-lookup
              no-error-icon
              placeholder="واحد سنجش"
              v-model:selectedId="row.productUnitId"
              v-model:selectedText="row.productUnitTitle"
              required
            />
          </td>
          <td>
            <custom-input-number
              v-model="row.price"
              placeholder="مبلغ واحد"
              required
            />
          </td>
          <td>
            <vat-lookup
              input-class="text-body3 no-letter-spacing"
              placeholder="ارزش افزوده"
              v-model:selectedId="row.vatId"
              v-model:selectedText="row.vatTitle"
              :filterExpression="vatFilter"
              @rowSelected="vatChanged($event, row)"
            />
          </td>
          <td>
            <custom-input-number
              input-class="text-body2 no-letter-spacing"
              v-model="row.vatAmount"
              placeholder="مبلغ مالیات"
            />
          </td>
          <td>
            <q-field outlined dense disable>
              <template #control>
                <div
                  class="text-body2 self-center full-width no-outline"
                  tabindex="0"
                >
                  {{ helper.formatNumber(row.totalPrice) }}
                </div>
              </template>
            </q-field>
          </td>
          <td class="text-center q-guuter-x-sm">
            <q-btn
              color="primary"
              unelevated
              round
              class="text-on-dark"
              size="sm"
              icon="o_add"
              @click="formStore.addNewRow(index, row)"
            />
            <!-- <q-btn
              color="red"
              unelevated
              round
              class="text-on-dark"
              size="sm"
              icon="o_delete"
              @click="formStore.deleteRow(index)"
            /> -->
            <q-btn
              unelevated
              round
              dense
              class="text-on-dark"
              size="14px"
              @click="formStore.deleteRow(index)"
            >
              <q-icon size="24px" name="o_delete" />
            </q-btn>
            <q-btn
              @click="toggleRowDetails(index)"
              unelevated
              dense
              round
              class="text-on-dark"
              size="14px"
            >
              <q-icon size="24px" name="o_more_horiz" />
            </q-btn>
          </td>
        </tr>

        <tr
          class="expanded-row"
          :style="
            $q.dark.isActive
              ? 'background: #ffffff08;'
              : 'background: #00000004;'
          "
          v-if="expandedRows[index]"
        >
          <td class="text-center"></td>
          <td colspan="3" style="width: 45%">
            <custom-input
              v-model="row.comment"
              placeholder="شرح ردیف"
              type="textarea"
              dense
            />
          </td>
          <td colspan="2" style="width: 25%">
            <custom-input
              v-model="row.discountComment"
              placeholder="شرح تخفیف"
              type="textarea"
              dense
            />
          </td>
          <td>
            <custom-input-number
              :disable="getDiscountType(index)"
              v-model="row.discount"
              placeholder="مبلغ تخفیف"
              dense
            />
          </td>
          <td>
            <div class="row justify-center items-center">
              <div class="q-mr-xs">مبلغ</div>
              <q-toggle
                :model-value="getDiscountType(index)"
                @update:model-value="
                  updateDiscountType(index, $event)
                "
                dense
                size="40px"
              />
              <div class="q-ml-xs">درصد</div>
            </div>
          </td>
          <td>
            <custom-input-number
              :disable="!getDiscountType(index)"
              v-model="row.discountPercent"
              placeholder="درصد تخفیف"
              dense
            />
          </td>
        </tr>
      </template>
    </tbody>

    <tbody v-if="model.invoiceItems.length === 0">
      <tr>
        <td colspan="9" class="text-center">
          <no-product-selected class="q-mt-md" />
          <q-btn
            class="q-mb-xl primary-shadow"
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

  <q-btn
    v-if="model.invoiceItems.length > 0"
    padding="4px 12px"
    unelevated
    rounded
    dense
    class="bg-primary primary-shadow text-white q-mt-md"
    @click="formStore.pushNewRow()"
  >
    <q-icon size="20px" name="o_add" class="q-mr-xs" />
    افزودن ردیف
  </q-btn>

  <footer-section
    v-if="model.invoiceItems.length > 0"
    :form-store="formStore"
    :form-type="formType"
  />
</template>

<script setup>
  import { ref, reactive, watch } from "vue";
  import {
    sqlOperator,
    invoiceFormType,
    vatType,
  } from "src/constants";
  import { helper } from "src/helpers";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import FooterSection from "./FooterSection.vue";
  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
  import VatLookup from "src/components/shared/lookups/VatLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import NoProductSelected from "../NoProductSelected.vue";

  const props = defineProps({
    formStore: useInvoiceModel,
    formType: invoiceFormType,
    model: invoiceModel,
  });

  const expandedRows = reactive({});
  const discountTypes = reactive({});

  const getDiscountType = (index) => {
    if (discountTypes[index] === undefined) {
      discountTypes[index] = false;
    }
    return discountTypes[index];
  };

  const updateDiscountType = (index, value) => {
    discountTypes[index] = value;

    // Update discount values when toggle changes
    const item = props.model.invoiceItems[index];
    if (item) {
      if (value) {
        item.discount = 0;
      } else {
        item.discountPercent = 0;
      }
    }
  };

  const toggleRowDetails = (index) => {
    expandedRows[index] = !expandedRows[index];
  };

  const productFilter =
    props.formType === invoiceFormType.sales ||
    props.formType === invoiceFormType.salesReturn
      ? [
          {
            fieldName: "isForSale",
            operator: sqlOperator.equal,
            value: "1",
          },
        ]
      : [
          {
            fieldName: "isForPurchase",
            operator: sqlOperator.equal,
            value: "1",
          },
        ];

  const vatFilter =
    props.formType === invoiceFormType.sales ||
    props.formType === invoiceFormType.salesReturn
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

  const productChanged = (product, row) => {
    if (
      props.formType === invoiceFormType.sales ||
      props.formType === invoiceFormType.purchaseReturn
    )
      row.price = product?.price ?? product?.maxPrice ?? 0;
    else row.price = product?.purchasePrice ?? product?.maxPrice ?? 0;
    row.productUnitId = product?.productUnitId ?? null;
    row.productUnitTitle = product?.productUnitTitle ?? null;
  };

  const vatChanged = (vat, item) => {
    item.vatPercent = vat?.rate ?? 0;
  };

  // Watch for changes in discount percent
  watch(
    () =>
      props.model.invoiceItems.map((item) => item.discountPercent),
    (discountPercents, oldDiscountPercents) => {
      discountPercents.forEach((percent, index) => {
        if (percent !== oldDiscountPercents[index]) {
          const item = props.model.invoiceItems[index];
          if (item && percent) {
            item.discount = Math.floor(
              (item.quantity * item.price * percent) / 100
            );
          }
        }
      });
    },
    { deep: true }
  );
</script>

<style lang="scss" scoped>
  th {
    background-color: #{$primary}10;
    border-bottom: 2px solid $primary;
  }

  .q-table {
    td {
      vertical-align: baseline;
    }
  }
</style>
