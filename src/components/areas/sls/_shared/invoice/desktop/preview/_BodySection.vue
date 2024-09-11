<template>
  <div class="q-table__middle scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%;' : 'width: 900px;'"
      style="
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 12px;
      "
    >
      <thead>
        <tr class="bg-on-dark text-center">
          <td
            style="border: 1px solid #2d2d2d; padding: 5px"
            colspan="100%"
          >
            <div class="text-body2 no-letter-spacing text-weight-500">
              مشخصات کالا یا خدمات مورد معامله
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            ردیف
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">کد</td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            کالا/خدمت
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            مقدار
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            واحد
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            مبلغ واحد
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            مبلغ کل
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="totalDiscount"
          >
            تخفیف
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="totalDiscount"
          >
            مبلغ پس از تخفیف
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            جمع مالیات و عوارض
          </td>
          <td
            style="
              min-width: 100px;
              padding: 5px;
              border: 1px solid #2d2d2d;
            "
          >
            جمع کل (
            <span class="text-weight-700">
              {{ model.currencyTitle }}
            </span>
            )
          </td>
        </tr>
        <tr
          v-for="(item, index) in model.invoiceItems"
          :key="item.id"
        >
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
            {{ helper.formatNumber(item.quantity) }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ item.productUnitTitle }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item.price) }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item.quantity * item.price) }}
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="model.totalDiscount"
          >
            {{ helper.formatNumber(item.discount) }}
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="model.totalDiscount"
          >
            {{
              helper.formatNumber(
                item.quantity * item.price - item.discount
              )
            }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item.vatAmount) }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item.totalPrice) }}
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              text-align: end;
            "
            colspan="6"
            class="text-right"
          >
            <strong>جمع کل:</strong>
            ({{ numberToWords(model.totalPrice ?? 0) }}
            <b>{{ model.currencyTitle }})</b>
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>
              {{ helper.formatNumber(model.totalNetPrice) }}
            </strong>
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="model.totalDiscount"
          >
            <strong>
              {{ helper.formatNumber(model.totalDiscount) }}
            </strong>
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            v-if="model.totalDiscount"
          >
            <strong>
              {{
                helper.formatNumber(model.totalPrice - model.totalVat)
              }}
            </strong>
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>
              {{ helper.formatNumber(model.totalVat) }}
            </strong>
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>
              {{ helper.formatNumber(model.totalPrice) }}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { numberToWords } from "@persian-tools/persian-tools";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";

  const $q = useQuasar();

  const props = defineProps({
    model: Object,
  });
</script>
