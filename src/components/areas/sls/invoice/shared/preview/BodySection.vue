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
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            ردیف
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            کد کالا
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            عنوان کالا
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            مقدار
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            واحد
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            مبلغ واحد
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            تخفیف
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            مبلغ کل ({{ model?.currencyTitle }})
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
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
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ index + 1 }}
          </td>

          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ item?.productCode }}
          </td>

          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ item?.productTitle }}
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ helper.formatNumber(item?.quantity) }}
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ item.productUnitTitle }}
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ helper.formatNumber(item?.price) }}
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ helper.formatNumber(item?.discount) }}
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{
              helper.formatNumber(
                item?.quantity * item?.price - item?.discount
              )
            }}
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ item?.comment }}
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              text-align: end;
            "
            colspan="7"
            class="text-right"
          >
            <strong>جمع کل:</strong>
            ({{ numberToWords(model?.totalPrice ?? 0) }}
            <b>{{ model?.currencyTitle }})</b>
          </td>
          <td
            style="
              padding: 4px 8px;
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
              padding: 4px 8px;
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
              padding: 4px 8px;
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
