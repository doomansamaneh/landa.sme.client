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
        <th style="width: 28%">
          {{ $t("shared.columns.productTitle") }}
        </th>
        <th style="width: 7%">{{ $t("shared.columns.quantity") }}</th>
        <th style="width: 10%">
          {{ $t("shared.columns.productUnitTitle") }}
        </th>
        <th style="width: 10%">
          {{ $t("shared.columns.unitPrice") }}
        </th>
        <th style="width: 15%">
          {{ $t("shared.columns.vatAmount") }}
        </th>
        <th style="width: 10%">
          {{ $t("shared.columns.taxAmount") }}
        </th>
        <th style="width: 15%">
          {{ $t("shared.columns.totalPrice") }}
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
                {{ $t("shared.labels.totalAmountFormula") }}
              </span>
            </q-tooltip>
          </q-icon>
        </th>
        <th style="min-width: 140px" />
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(row, index) in model.invoiceItems"
        :key="index"
      >
        <tr>
          <td class="text-center">
            <div class="q-mt-sm">
              {{ index + 1 }}
            </div>
          </td>
          <td>
            <product-lookup
              autogrow
              no-error-icon
              :autofocus="index === formStore.newAddedItemIndex.value"
              :placeholder="$t('shared.labels.selectProduct')"
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
              :placeholder="$t('shared.labels.amount')"
              required
            />
          </td>
          <td>
            <product-unit-lookup
              no-error-icon
              :placeholder="$t('shared.labels.productUnitTitle')"
              v-model:selectedId="row.productUnitId"
              v-model:selectedText="row.productUnitTitle"
              required
            />
          </td>
          <td>
            <custom-input-number
              v-model="row.price"
              :placeholder="$t('shared.labels.unit-price')"
              required
            />
          </td>
          <td>
            <vat-lookup
              input-class="text-body3 no-letter-spacing"
              :placeholder="$t('shared.labels.vat')"
              v-model:selectedId="row.vatId"
              v-model:selectedText="row.vatTitle"
              :filterExpression="vatFilter"
              required
              no-error-icon
              @rowSelected="vatChanged($event, row)"
            />
          </td>
          <td>
            <custom-input-number
              input-class="text-body2 no-letter-spacing"
              v-model="row.vatAmount"
              :placeholder="$t('shared.labels.taxAmount')"
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
          <td>
            <div class="text-center q-mt-xs q-gutter-x-sm">
              <q-btn
                no-caps
                color="primary"
                unelevated
                round
                class="text-on-dark"
                size="sm"
                icon="o_add"
                @click="formStore.addNewRow(index, row)"
              />
              <!-- <q-btn no-caps
              color="red"
              unelevated
              round
              class="text-on-dark"
              size="sm"
              icon="o_delete"
              @click="formStore.deleteRow(index)"
            /> -->
              <q-btn
                no-caps
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
                no-caps
                @click="toggleRowDetails(index)"
                unelevated
                dense
                round
                class="text-on-dark"
                size="14px"
              >
                <q-icon size="24px" name="o_more_horiz" />
              </q-btn>
            </div>
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
            <comment-lookup
              v-model:selectedText="row.comment"
              :placeholder="$t('shared.labels.rowDescription')"
              autogrow
              dense
            />
            <!-- <custom-input
              v-model:selectedText="row.comment"
              :placeholder="$t('shared.labels.rowDescription')"
              autogrow
              dense
            /> -->
          </td>
          <td colspan="2" style="width: 25%">
            <custom-input
              v-model="row.discountComment"
              :placeholder="$t('shared.labels.discountDescription')"
              type="textarea"
              autogrow
              dense
            />
          </td>
          <td>
            <div class="row justify-center items-center">
              <custom-input-number
                v-model="row.discountValue"
                :placeholder="
                  formStore.getDiscountType(index)
                    ? $t('shared.labels.discountPercent')
                    : $t('shared.labels.discountAmount')
                "
                :model-value="row.discountValue || null"
                dense
              >
                <template #append>
                  <q-btn
                    no-caps
                    size="8px"
                    class="cursor-pointer"
                    :color="$q.dark.isActive ? 'yellow' : 'primary'"
                    round
                    outline
                    @click="formStore.toggleRowDiscountType(index)"
                  >
                    <q-icon
                      size="14px"
                      :name="
                        formStore.getDiscountType(index)
                          ? 'o_percent'
                          : 'attach_money'
                      "
                    />
                  </q-btn>
                </template>
              </custom-input-number>
            </div>
          </td>
          <td></td>
          <td></td>
        </tr>
      </template>
    </tbody>

    <tbody v-if="model.invoiceItems.length === 0">
      <tr>
        <td colspan="9" class="text-center">
          <no-product-selected class="q-mt-md" />
          <q-btn
            no-caps
            class="q-mb-xl primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewRow()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            {{ $t("shared.labels.addRow") }}
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <q-btn
    no-caps
    v-if="model.invoiceItems.length > 0"
    padding="4px 12px"
    unelevated
    rounded
    dense
    class="bg-primary primary-shadow text-white q-mt-md"
    @click="formStore.pushNewRow()"
  >
    <q-icon size="20px" name="o_add" class="q-mr-xs" />
    {{ $t("shared.labels.addRow") }}
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
  import CommentLookup from "src/components/shared/Lookups/CommentLookup.vue";

  const props = defineProps({
    formStore: useInvoiceModel,
    formType: invoiceFormType,
    model: invoiceModel,
  });

  const expandedRows = reactive({});

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

  watch(
    () => props.model.invoiceItems.map((item) => item.discountValue),
    (newValues, oldValues) => {
      newValues.forEach((value, index) => {
        if (value === oldValues[index]) return;
        props.formStore.setDiscountValue(index, value);
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
      vertical-align: top;
    }
  }
</style>
