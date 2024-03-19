<template>
  <q-markup-table flat dense bordered separator="horizontal">
    <thead>
      <tr>
        <th style="width: 1%">#</th>
        <th style="width: 28%">کالا/خدمت</th>
        <th style="width: 7%">تعداد/مقدار</th>
        <th style="width: 10%">واحد سنجش</th>
        <th style="width: 8%">مبلغ واحد</th>
        <th style="width: 8%">تخفیف</th>
        <th style="width: 12%">مالیات بر ارزش افزوده</th>
        <th style="width: 8%">مبلغ مالیات</th>
        <th style="width: 10%">
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
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in formStore.model.value.invoiceItems"
        :key="index"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <product-lookup
            placeholder="انتخاب کالا/خدمت"
            v-model:selectedId="row.productId"
            v-model:selectedText="row.productTitle"
            :filterExpression="productFilter"
            @rowSelected="productChanged($event, row)"
          />
        </td>
        <td>
          <custom-input-number v-model="row.quantity" placeholder="مقدار" />
        </td>
        <td>
          <product-unit-lookup
            placeholder="واحد سنجش"
            v-model:selectedId="row.productUnitId"
            v-model:selectedText="row.productUnitTitle"
          />
        </td>
        <td>
          <custom-input-number v-model="row.price" placeholder="مبلغ واحد" />
        </td>
        <td>
          <custom-input-number v-model="row.discount" placeholder="تخفیف" />
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
          <custom-input-number
            v-model="row.vatAmount"
            placeholder="مبلغ مالیات"
          />
        </td>
        <td>
          <q-field outlined dense disable>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ row.totalPrice?.toLocaleString() }}
              </div>
            </template>
          </q-field>
        </td>
        <td class="text-center q-gutter-x-sm">
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
              class="border-radius-xl"
            >
              <q-card>
                <q-card-section>
                  <h6>اطلاعات تکمیلی</h6>
                  {{ row.productTitle }}
                </q-card-section>
                <q-card-section>
                  <div class="">
                    <q-item-label caption class="q-mb-sm"
                      >شرح ردیف</q-item-label
                    >
                    <custom-input
                      hide-bottom-space
                      v-model="row.comment"
                      autogrow
                    />
                  </div>
                  <div class="q-mt-md">
                    <q-item-label caption class="q-mb-sm"
                      >شرح تخفیف</q-item-label
                    >
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
    <tbody v-if="formStore.model.value.invoiceItems.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <q-btn color="primary" icon="add" @click="formStore.pushNewRow()">
            افزودن ردیف
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <footer-section :form-store="formStore" />
</template>

<script setup>
import { sqlOperator } from "src/constants";

import FooterSection from "src/components/areas/sls/invoice/desktop/forms/v1/FooterSection.vue";
import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
import VatLookup from "src/components/shared/lookups/VatLookup.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

const props = defineProps({
  formStore: Object,
});

const vatFilter = [
  { fieldName: "isForSale", operator: sqlOperator.in, value: "1,2" },
];

const productFilter = [
  { fieldName: "isForSale", operator: sqlOperator.equal, value: "1" },
];

const vatChanged = (vat, row) => {
  row.vatPercent = vat?.rate ?? 0;
};

const productChanged = (product, row) => {
  row.price = product?.price ?? 0;
  row.productUnitId = product?.productUnitId ?? null;
  row.productUnitTitle = product?.productUnitTitle ?? null;
};
</script>
<style scoped>
td,
th {
  padding: 8px 2px !important;
}
</style>
