<template>
  <div class="q-table__middle scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%;' : 'width: 900px;'"
      style="border: 1px solid #2d2d2d; border-collapse: collapse; font-size: 12px"
    >
      <thead>
        <tr class="bg-on-dark text-center">
          <td style="border: 1px solid #2d2d2d; padding: 5px" colspan="100%">
            <div class="text-body2 no-letter-spacing text-weight-500">
              مشخصات کالا یا خدمات مورد معامله
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px; border: 1px solid #2d2d2d">ردیف</td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">کد</td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">کالا/خدمت</td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">مقدار</td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">واحد</td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">مبلغ واحد</td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">مبلغ کل</td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            تخفیف
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            مبلغ پس از تخفیف
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">جمع مالیات و عوارض</td>
          <td style="min-width: 100px; padding: 5px; border: 1px solid #2d2d2d">
            جمع کل (<span class="text-weight-700">{{ model.value.currencyTitle }}</span
            >)
          </td>
        </tr>
        <tr v-for="(item, index) in model.value.invoiceItems" :key="item.id">
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ index + 1 }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item.productCode }}
            <small v-if="item.productTaxCode">
              {{ item.productTaxCode }}
            </small>
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <div class="text-wrap">
              {{ item.productTitle }}
              <small v-if="item.comment">({{ item.comment }})</small>
            </div>
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item.quantity.toLocaleString() }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item.productUnitTitle }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item.price.toLocaleString() }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ (item.quantity * item.price).toLocaleString() }}
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            {{ item.discount.toLocaleString() }}
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            {{ (item.quantity * item.price - item.discount).toLocaleString() }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item.vatAmount.toLocaleString() }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item.totalPrice.toLocaleString() }}
          </td>
        </tr>
        <tr>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d; text-align: end"
            colspan="6"
            class="text-right"
          >
            <strong>جمع کل:</strong>
            ({{ numberToWords(formStore.totalPrice.value) }}
            <b>{{ model.value.currencyTitle }})</b>
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>
              {{ formStore.totalNetPrice.value.toLocaleString() }}
            </strong>
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            <strong>{{ formStore.totalDiscount.value.toLocaleString() }}</strong>
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            <strong>{{
              (formStore.totalPrice.value - formStore.totalVat.value).toLocaleString()
            }}</strong>
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>{{ formStore.totalVat.value.toLocaleString() }}</strong>
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>{{ formStore.totalPrice.value.toLocaleString() }}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { numberToWords } from "@persian-tools/persian-tools";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps({
  formStore: Object,
  model: Object,
});
</script>

<style lang="scss"></style>
