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
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
            colspan="100%"
          >
            <div class="text-body2 text-weight-500">مشخصات کالا</div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            style="
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
            مقدار اصلی
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            واحد اصلی
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            مقدار فرعی
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            واحد فرعی
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
            مبلغ کل
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            توضیحات
          </td>
        </tr>
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
            {{ helper.formatNumber(item?.subQuantity) || 0 }}
          </td>
          <td
            style="
              padding: 4px 8px;
              border-width: 1px;
              border-style: solid;
              border-image: initial;
            "
          >
            {{ item?.subUnitTitle }}
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
            {{ helper.formatNumber(item?.totalPrice) }}
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
            colspan="8"
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
          <!-- <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>
              {{ helper.formatNumber(model?.totalVat) }}
            </strong>
          </td> -->
          <!-- <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>
              {{ helper.formatNumber(model?.totalPrice) }}
            </strong>
          </td> -->
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
