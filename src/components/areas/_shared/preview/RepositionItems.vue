<template>
  <div class="q-table__middle_ scroll">
    <table
      style="
        width: 100%;
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 13px;
        margin-bottom: 5px;
      "
    >
      <thead>
        <tr>
          <th
            style="
              border: 1px solid #2d2d2d;
              padding: 5px;
              width: 1px;
            "
          >
            {{ $t("shared.labels.row") }}
          </th>
          <th
            style="
              text-wrap: wrap;
              border: 1px solid #2d2d2d;
              padding: 5px;
            "
          >
            {{ $t("shared.labels.productTitle") }}
          </th>
          <th style="border: 1px solid #2d2d2d; padding: 5px">
            {{ $t("shared.labels.productUnitTitle") }}
          </th>
          <th
            style="
              border: 1px solid #2d2d2d;
              padding: 5px;
              width: 90px;
            "
          >
            {{ $t("shared.columns.quantity") }}
          </th>
          <th
            style="
              border: 1px solid #2d2d2d;
              padding: 5px;
              width: 110px;
            "
          >
            {{ $t("shared.columns.unitPrice") }}
          </th>
          <th
            style="
              border: 1px solid #2d2d2d;
              padding: 5px;
              width: 120px;
            "
          >
            {{ $t("shared.labels.totalPrice") }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) in model?.repositionItems"
          :key="item.id"
        >
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ index + 1 }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.productCode }} / {{ item.productTitle }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.productUnitTitle }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.quantity?.toLocaleString() }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.price?.toLocaleString() }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.totalPrice?.toLocaleString() }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td
            style="border: 1px solid #2d2d2d; padding: 5px"
            colspan="3"
            class="text-right"
          >
            <strong>{{ $t("shared.labels.totalPrice") }}:</strong>
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            <span class="text-weight-700">
              {{
                helper
                  .getSubtotal(model?.repositionItems, "quantity")
                  ?.toLocaleString()
              }}
            </span>
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            <span class="text-weight-700">
              {{
                helper
                  .getSubtotal(model?.repositionItems, "price")
                  ?.toLocaleString()
              }}
            </span>
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            <span class="text-weight-700">
              {{
                helper
                  .getSubtotal(model?.repositionItems, "totalPrice")
                  ?.toLocaleString()
              }}
            </span>
          </td>
        </tr>
      </tfoot>
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
