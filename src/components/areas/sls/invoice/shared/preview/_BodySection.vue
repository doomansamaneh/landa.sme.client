<template>
  <q-markup-table flat bordered dense separator="cell">
    <thead>
      <tr class="bg-on-dark">
        <th colspan="100%">
          <div class="text-body1 no-letter-spacing text-weight-700">
            مشخصات کالا یا خدمات مورد معامله
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ردیف</td>
        <td>کد</td>
        <td>کالا/خدمت</td>
        <td>مقدار</td>
        <td>واحد</td>
        <td>مبلغ واحد</td>
        <td>مبلغ کل ({{ model.value.currencyTitle }})</td>
        <td v-if="formStore.totalDiscount.value">تخفیف</td>
        <td v-if="formStore.totalDiscount.value">مبلغ پس از تخفیف</td>
        <td>جمع مالیات و عوارض</td>
        <td>جمع کل ({{ model.value.currencyTitle }})</td>
      </tr>
      <tr v-for="(item, index) in model.value.invoiceItems" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.productCode }} {{ item.productTaxCode }}</td>
        <td>{{ item.productTitle }}</td>
        <td>{{ item.quantity.toLocaleString() }}</td>
        <td>{{ item.productUnitTitle }}</td>
        <td>{{ item.price.toLocaleString() }}</td>
        <td>{{ (item.quantity * item.price).toLocaleString() }}</td>
        <td v-if="formStore.totalDiscount.value">
          {{ item.discount.toLocaleString() }}
        </td>
        <td v-if="formStore.totalDiscount.value">
          {{ (item.quantity * item.price - item.discount).toLocaleString() }}
        </td>
        <td>{{ item.vatAmount.toLocaleString() }}</td>
        <td>
          {{ item.totalPrice.toLocaleString() }}
        </td>
      </tr>
      <tr>
        <td colspan="6" class="text-right">
          <strong>جمع کل:</strong>
          ({{ numberToWords(formStore.totalPrice.value) }}
          <b>{{ model.value.currencyTitle }})</b>
        </td>
        <td>
          <strong>
            {{ formStore.totalNetPrice.value.toLocaleString() }}
          </strong>
        </td>
        <td v-if="formStore.totalDiscount.value">
          <strong>{{ formStore.totalDiscount.value.toLocaleString() }}</strong>
        </td>
        <td v-if="formStore.totalDiscount.value">
          <strong>{{
            (
              formStore.totalPrice.value - formStore.totalVat.value
            ).toLocaleString()
          }}</strong>
        </td>
        <td>
          <strong>{{ formStore.totalVat.value.toLocaleString() }}</strong>
        </td>
        <td>
          <strong>{{ formStore.totalPrice.value.toLocaleString() }}</strong>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { numberToWords } from "@persian-tools/persian-tools";

const props = defineProps({
  formStore: Object,
  model: Object,
});
</script>
