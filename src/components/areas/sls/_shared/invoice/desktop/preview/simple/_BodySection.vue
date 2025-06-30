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
        <tr>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            #
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            کالا/خدمت
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            مقدار
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            فی
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            مبلغ کل ({{ model.currencyTitle }})
          </th>
        </tr>
      </thead>

      <tbody>
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
            <div class="text-wrap">
              {{ item.productCode }} - {{ item.productTitle }}
              <small v-if="item.comment">({{ item.comment }})</small>
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
            <small>({{ item.productUnitTitle }})</small>
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
            colspan="4"
            class="text-right"
          >
            {{ $t("shared.labels.subTotal") }}:
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
        </tr>

        <tr v-if="model.totalDiscount">
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              text-align: end;
            "
            colspan="4"
            class="text-right"
          >
            {{ $t("shared.labels.discount") }}:
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
              {{ helper.formatNumber(model.totalDiscount) }}
            </strong>
          </td>
        </tr>

        <tr v-if="model.totalVat">
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              text-align: end;
            "
            colspan="4"
            class="text-right"
          >
            {{ $t("shared.labels.vat") }}:
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
        </tr>

        <tr v-if="model.invoiceItems?.length > 1">
          <td
            style="
              padding: 5px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              text-align: end;
            "
            colspan="4"
            class="text-right"
          >
            جمع مقدار:
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
              {{
                helper.formatNumber(
                  helper.getSubtotal(model.invoiceItems, "quantity")
                )
              }}
            </strong>
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
            colspan="4"
            class="text-right"
          >
            <strong>{{ $t("shared.labels.total") }}:</strong>
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
            {{ model.currencyTitle }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });
</script>
