<template>
  <div class="q-table__middle scroll">
    <table
      style="
        width: 100%;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        border-collapse: collapse;
        font-size: 12.4px;
      "
      class="print-preview-table"
    >
      <thead>
        <tr
          class="text-center"
        >
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
            colspan="100%"
          >
            <div class="text-body2 text-weight-500">
              {{ $t("shared.labels.productOrServiceDetails") }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.rowNo") }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.code") }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.productTitle") }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.quantity") }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.productUnitTitle") }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.unitPrice") }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.totalPrice") }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model.totalDiscount"
          >
            {{ $t("shared.columns.discountAmount") }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model.totalDiscount"
          >
            {{ $t("shared.columns.netAmount") }}
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ $t("shared.columns.vatAmount") }}
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
            {{ $t("shared.columns.totalPrice") }}
            <span class="text-weight-700">
              (
              {{ model.currencyTitle }}
              )
            </span>
          </td>
        </tr>
        <tr
          v-for="(item, index) in model.invoiceItems"
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
                <span v-if="!item.productComment">
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
            v-if="model.totalDiscount"
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
            v-if="model.totalDiscount"
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
            {{ helper.formatNumber(item.totalPrice) }}
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
            <strong>{{ $t("shared.columns.total") }}:</strong>
            ({{ numberToWords(model.totalPrice ?? 0) }}
            <b>{{ model.currencyTitle }})</b>
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
              {{ helper.formatNumber(model.totalNetPrice) }}
            </strong>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model.totalDiscount"
          >
            <strong>
              {{ helper.formatNumber(model.totalDiscount) }}
            </strong>
          </td>
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            v-if="model.totalDiscount"
          >
            <strong>
              {{
                helper.formatNumber(model.totalPrice - model.totalVat)
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
              {{ helper.formatNumber(model.totalVat) }}
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
              {{ helper.formatNumber(model.totalPrice) }}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { numberToWords } from "src/helpers/numberToWords.js";
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });
</script>
