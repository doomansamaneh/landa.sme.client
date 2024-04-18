<template>
  <div class="print-only">
    <table
      style="border: 1px solid #2d2d2d; width: 100%; border-collapse: collapse"
    >
      <thead>
        <tr class="text-center">
          <td style="border: 1px solid #2d2d2d; padding: 8px" colspan="100%">
            <div class="text-body2 no-letter-spacing text-weight-500">
              مشخصات کالا یا خدمات مورد معامله
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">ردیف</td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">کد</td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">کالا/خدمت</td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">مقدار</td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">واحد</td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">مبلغ واحد</td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">مبلغ کل</td>
          <td
            style="padding: 6px 8px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            تخفیف
          </td>
          <td
            style="padding: 6px 8px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            مبلغ پس از تخفیف
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            جمع مالیات و عوارض
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            جمع کل (
            <span class="text-weight-700">
              {{ model.value.currencyTitle }}
            </span>
            )
          </td>
        </tr>
        <tr v-for="(item, index) in model.value.invoiceItems" :key="item.id">
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            {{ index + 1 }}
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            {{ item.productCode }} {{ item.productTaxCode }}
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            <div class="text-wrap">
              {{ item.productTitle }}
              <small v-if="item.comment">({{ item.comment }})</small>
            </div>
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            {{ item.quantity.toLocaleString() }}
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            {{ item.productUnitTitle }}
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            {{ item.price.toLocaleString() }}
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            {{ (item.quantity * item.price).toLocaleString() }}
          </td>
          <td
            style="padding: 6px 8px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            {{ item.discount.toLocaleString() }}
          </td>
          <td
            style="padding: 6px 8px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            {{ (item.quantity * item.price - item.discount).toLocaleString() }}
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            {{ item.vatAmount.toLocaleString() }}
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            {{ item.totalPrice.toLocaleString() }}
          </td>
        </tr>
        <tr>
          <td
            style="padding: 6px 8px; border: 1px solid #2d2d2d"
            colspan="6"
            class="text-right"
          >
            <strong>جمع کل:</strong>
            ({{ numberToWords(formStore.totalPrice.value) }}
            <b>{{ model.value.currencyTitle }})</b>
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            <strong>
              {{ formStore.totalNetPrice.value.toLocaleString() }}
            </strong>
          </td>
          <td
            style="padding: 6px 8px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            <strong>{{
              formStore.totalDiscount.value.toLocaleString()
            }}</strong>
          </td>
          <td
            style="padding: 6px 8px; border: 1px solid #2d2d2d"
            v-if="formStore.totalDiscount.value"
          >
            <strong>{{
              (
                formStore.totalPrice.value - formStore.totalVat.value
              ).toLocaleString()
            }}</strong>
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            <strong>{{ formStore.totalVat.value.toLocaleString() }}</strong>
          </td>
          <td style="padding: 6px 8px; border: 1px solid #2d2d2d">
            <strong>{{ formStore.totalPrice.value.toLocaleString() }}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="print-hide">
    <table
      style="width: 100%; border-collapse: collapse"
      :style="borderColor_()"
    >
      <thead>
        <tr class="bg-on-dark text-center">
          <td style="padding: 8px" :style="borderColor_()" colspan="100%">
            <div class="text-body2 no-letter-spacing text-weight-500">
              مشخصات کالا یا خدمات مورد معامله
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 6px 8px" :style="borderColor_()">ردیف</td>
          <td style="padding: 6px 8px" :style="borderColor_()">کد</td>
          <td style="padding: 6px 8px" :style="borderColor_()">کالا/خدمت</td>
          <td style="padding: 6px 8px" :style="borderColor_()">مقدار</td>
          <td style="padding: 6px 8px" :style="borderColor_()">واحد</td>
          <td style="padding: 6px 8px" :style="borderColor_()">مبلغ واحد</td>
          <td style="padding: 6px 8px" :style="borderColor_()">مبلغ کل</td>
          <td
            style="padding: 6px 8px"
            :style="borderColor_()"
            v-if="formStore.totalDiscount.value"
          >
            تخفیف
          </td>
          <td
            style="padding: 6px 8px"
            :style="borderColor_()"
            v-if="formStore.totalDiscount.value"
          >
            مبلغ پس از تخفیف
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            جمع مالیات و عوارض
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            جمع کل (
            <span class="text-weight-700">
              {{ model.value.currencyTitle }}
            </span>
            )
          </td>
        </tr>
        <tr v-for="(item, index) in model.value.invoiceItems" :key="item.id">
          <td style="padding: 6px 8px" :style="borderColor_()">
            {{ index + 1 }}
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            {{ item.productCode }} {{ item.productTaxCode }}
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            <div class="text-wrap">
              {{ item.productTitle }}
              <small v-if="item.comment">({{ item.comment }})</small>
            </div>
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            {{ item.quantity.toLocaleString() }}
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            {{ item.productUnitTitle }}
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            {{ item.price.toLocaleString() }}
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            {{ (item.quantity * item.price).toLocaleString() }}
          </td>
          <td
            style="padding: 6px 8px"
            :style="borderColor_()"
            v-if="formStore.totalDiscount.value"
          >
            {{ item.discount.toLocaleString() }}
          </td>
          <td
            style="padding: 6px 8px"
            :style="borderColor_()"
            v-if="formStore.totalDiscount.value"
          >
            {{ (item.quantity * item.price - item.discount).toLocaleString() }}
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            {{ item.vatAmount.toLocaleString() }}
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            {{ item.totalPrice.toLocaleString() }}
          </td>
        </tr>
        <tr>
          <td
            style="padding: 6px 8px"
            :style="borderColor_()"
            colspan="6"
            class="text-right"
          >
            <strong>جمع کل:</strong>
            ({{ numberToWords(formStore.totalPrice.value) }}
            <b>{{ model.value.currencyTitle }})</b>
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            <strong>
              {{ formStore.totalNetPrice.value.toLocaleString() }}
            </strong>
          </td>
          <td
            style="padding: 6px 8px"
            :style="borderColor_()"
            v-if="formStore.totalDiscount.value"
          >
            <strong>{{
              formStore.totalDiscount.value.toLocaleString()
            }}</strong>
          </td>
          <td
            style="padding: 6px 8px"
            :style="borderColor_()"
            v-if="formStore.totalDiscount.value"
          >
            <strong>{{
              (
                formStore.totalPrice.value - formStore.totalVat.value
              ).toLocaleString()
            }}</strong>
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
            <strong>{{ formStore.totalVat.value.toLocaleString() }}</strong>
          </td>
          <td style="padding: 6px 8px" :style="borderColor_()">
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

const borderColor_ = () => {
  if ($q.dark.isActive) {
    return "border: 1px solid #ffffff70;";
  } else {
    return "border: 1px solid #2d2d2d;";
  }
};
</script>

<style lang="scss"></style>
