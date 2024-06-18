<template>
  <div class="row q-gutter-x-md text-bold q-mb-sm">
    <div style="width: 25%">کالا/خدمت</div>
    <div style="width: 7%">تعداد/مقدار</div>
    <div style="width: 10%">واحد سنجش</div>
    <div style="width: 10%">مبلغ</div>
    <div style="width: 15%">مالیات بر ارزش افزوده</div>
    <div style="width: 10%">مبلغ مالیات</div>
    <div class="col row justify-end items-center q-gutter-x-xs">
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
            مبلغ کل = (تعداد * مبلغ) - تخفیف + مالیات بر ارزش افزوده
          </span>
        </q-tooltip>
      </q-icon>
    </div>
    <div class="col-1 row justify-end"></div>
  </div>
  <q-separator class="q-mb-md" />
  <div class="column q-gutter-y-md">
    <template
      v-for="(row, index) in formStore.model.value.invoiceItems"
      :key="index"
    >
      <div class="row q-gutter-md">
        <div style="width: 25%">
          <product-lookup
            placeholder="انتخاب کالا/خدمت"
            v-model:selectedId="row.productId"
            v-model:selectedText="row.productTitle"
            :filterExpression="productFilter"
            @rowSelected="productChanged($event, row)"
          />
        </div>
        <div style="width: 7%">
          <custom-input-number
            v-model="row.quantity"
            placeholder="مقدار"
          />
        </div>
        <div style="width: 10%">
          <product-unit-lookup
            placeholder="واحد سنجش"
            v-model:selectedId="row.productUnitId"
            v-model:selectedText="row.productUnitTitle"
          />
        </div>
        <div style="width: 10%">
          <custom-input-number
            v-model="row.price"
            placeholder="مبلغ"
          />
        </div>
        <div style="width: 15%">
          <vat-lookup
            placeholder="مالیات بر ارزش افزوده"
            v-model:selectedId="row.vatId"
            v-model:selectedText="row.vatTitle"
            :filterExpression="vatFilter"
            @rowSelected="vatChanged($event, row)"
          />
        </div>
        <div style="width: 10%">
          <custom-input-number
            v-model="row.vatAmount"
            placeholder="مبلغ مالیات"
          />
        </div>
        <div class="col row items-center justify-end">
          {{ row.totalPrice?.toLocaleString() }}
        </div>
        <div class="col-1 row items-center justify-end q-gutter-x-sm">
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
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_more_horiz"
          >
            <q-menu
              :offset="[0, 20]"
              fit
              class="border-radius-lg"
              style="width: 150px"
            >
              <q-list dense padding>
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  @click="row.showDetail = !row.showDetail"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar class="bg-on-dark" size="sm">
                        <q-icon name="o_percent" size="14px" />
                      </q-avatar>
                    </q-item-section>
                  </div>
                  <q-item-section>
                    <div>تخفیف</div>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  @click="formStore.deleteRow(index)"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar class="bg-on-dark" size="sm">
                        <q-icon name="o_delete" size="14px" />
                      </q-avatar>
                    </q-item-section>
                  </div>
                  <q-item-section>
                    <div>حذف</div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
      <div v-if="row.showDetail" class="row q-gutter-md q-pt-md">
        <div style="width: 32%">
          <q-item-label caption class="q-mb-sm">
            شرح تکمیلی کالا
          </q-item-label>
          <custom-input v-model="row.comment" />
        </div>
        <div style="width: 20%">
          <q-item-label caption class="q-mb-sm">
            شرح تخفیف
          </q-item-label>
          <custom-input v-model="row.discountComment" />
        </div>
        <div style="width: 10%">
          <q-item-label caption class="q-mb-sm">تخفیف</q-item-label>
          <q-input dense outlined v-model="row.discount">
            <template v-slot:append>
              <q-btn
                size="8px"
                class="cursor-pointer"
                :color="$q.dark.isActive ? 'yellow' : 'primary'"
                round
                outline
                @click="toggleDiscountType"
              >
                <q-icon
                  size="14px"
                  :name="
                    discountIsCash ? 'attach_money' : 'o_percent'
                  "
                />
              </q-btn>
            </template>
          </q-input>
        </div>
      </div>
    </template>
  </div>

  <q-separator class="q-mt-md" />

  <footer :form-store="formStore" />
</template>

<script setup>
  import { ref } from "vue";

  import {
    sqlOperator,
    invoiceFormType,
    vatType,
  } from "src/constants";

  import Footer from "./FooterSection.vue";
  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
  import VatLookup from "src/components/shared/lookups/VatLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    formStore: Object,
    formType: Object,
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

  const productFilter =
    props.formType == invoiceFormType.sales
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

  const discountIsCash = ref(true);
  const discountVisible = ref(false);
  const generalDiscountValue = ref(0);

  const vatChanged = (vat, row) => {
    row.vatPercent = vat?.rate ?? 0;
  };

  const productChanged = (product, row) => {
    row.price = product?.price ?? 0;
    row.productUnitId = product?.productUnitId ?? null;
    row.productUnitTitle = product?.productUnitTitle ?? null;
  };

  const toggleDiscountType = () => {
    discountIsCash.value = !discountIsCash.value;
  };

  const confirmGeneralDiscount = () => {
    if (discountIsCash.value)
      props.formStore.applyDiscountAmount(generalDiscountValue.value);
    else
      props.formStore.applyDiscountPercent(
        generalDiscountValue.value
      );
    discountVisible.value = false;
  };
</script>
