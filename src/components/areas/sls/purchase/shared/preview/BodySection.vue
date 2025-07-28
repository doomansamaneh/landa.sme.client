<template>
  <q-card-section>
    <table
      style="
        width: 100%;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        border-collapse: collapse;
        font-size: 12.4px;
      "
    >
      <thead>
        <tr class="bg-on-dark text-center">
          <td
            style="
              width: 5px;
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            ردیف
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            کد
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            کالا/خدمت
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            مقدار
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            واحد
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            مبلغ واحد
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            مبلغ کل
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model?.totalDiscount"
          >
            تخفیف
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model?.totalDiscount"
          >
            مبلغ پس از تخفیف
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            جمع مالیات و عوارض
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            حمل
          </td>
          <td
            style="
              min-width: 100px;
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            جمع کل
            <span class="text-weight-700">
              (
              {{ model?.currencyTitle }}
              )
            </span>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              width: 30%;
            "
          >
            شرح
          </td>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) in model?.invoiceItems"
          :key="item.id"
        >
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ index + 1 }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ item.productCode }}
            <small v-if="item.productTaxCode">
              {{ item.productTaxCode }}
            </small>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            <div class="text-wrap">
              {{ item.productTitle }}
              <small v-if="item.comment || item.productComment">
                (
                <span v-if="!item.productComment" class="q-pr-xs">
                  {{ item.productComment }}
                </span>
                <span v-if="item.comment">
                  {{ item.comment }}
                </span>
                )
              </small>
            </div>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ helper.formatNumber(item.quantity) }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ item.productUnitTitle }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ helper.formatNumber(item.price) }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ helper.formatNumber(item.quantity * item.price) }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model?.totalDiscount"
          >
            {{ helper.formatNumber(item.discount) }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model?.totalDiscount"
          >
            {{
              helper.formatNumber(
                item.quantity * item.price - item.discount
              )
            }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ helper.formatNumber(item.vatAmount) }}
          </td>

          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ helper.formatNumber(item?.totalShipping ?? 0) }}
          </td>

          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ helper.formatNumber(item.totalPrice) }}
          </td>

          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ model?.comment }}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              text-align: end;
            "
            colspan="6"
            class="text-right"
          >
            <strong>{{ $t("shared.labels.total") }}:</strong>
            ({{ numberToWords(model?.totalPrice ?? 0) }}
            <b>{{ model?.currencyTitle }})</b>
          </td>

          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            <strong>
              {{ helper.formatNumber(model?.totalNetPrice) }}
            </strong>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model?.totalDiscount"
          >
            <strong>
              {{ helper.formatNumber(model?.totalDiscount) }}
            </strong>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model?.totalDiscount"
          >
            <strong>
              {{
                helper.formatNumber(
                  model?.totalPrice - model?.totalVat
                )
              }}
            </strong>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            <strong>
              {{ helper.formatNumber(model?.totalVat) }}
            </strong>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            <strong>
              {{ helper.formatNumber(model?.totalShipping ?? 0) }}
            </strong>
          </td>

          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            <strong>
              {{ helper.formatNumber(model?.totalPrice) }}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  </q-card-section>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { numberToWords } from "@persian-tools/persian-tools";

  const props = defineProps({
    model: Object,
  });
</script>
