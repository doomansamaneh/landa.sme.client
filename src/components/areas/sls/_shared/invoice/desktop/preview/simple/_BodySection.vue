<template>
  <div class="q-table__middle scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%;' : 'width: 900px;'"
      style="
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 13px;
      "
    >
      <tbody>
        <tr>
          <td
            style="width: 1%; padding: 5px; border: 1px solid #2d2d2d"
          >
            #
          </td>
          <td
            style="
              width: 34%;
              padding: 5px;
              border: 1px solid #2d2d2d;
            "
          >
            کالا/خدمت
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            مقدار
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">فی</td>
          <td
            style="
              width: 25%;
              padding: 5px;
              border: 1px solid #2d2d2d;
            "
          >
            مبلغ کل
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
            <div class="text-wrap">
              {{ item.productTitle }}
              <small v-if="item.comment">({{ item.comment }})</small>
            </div>
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item.quantity) }}
            ({{ item.productUnitTitle }})
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item.price) }}
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(item.quantity * item.price) }}
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              text-align: end;
            "
            colspan="4"
            class="text-right"
          >
            {{ $t("shared.labels.subTotal") }}:
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(model.totalNetPrice) }}
          </td>
        </tr>
        <tr v-if="model.totalDiscount">
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              text-align: end;
            "
            colspan="4"
            class="text-right"
          >
            discount
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>
              {{ helper.formatNumber(model.totalDiscount) }}
            </strong>
          </td>
        </tr>
        <tr v-if="model.totalVat">
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              text-align: end;
            "
            colspan="4"
            class="text-right"
          >
            {{ $t("shared.labels.vat") }}:
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            {{ helper.formatNumber(model.totalVat) }}
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              text-align: end;
            "
            colspan="4"
            class="text-right"
          >
            <strong>{{ $t("shared.labels.total") }}:</strong>
          </td>

          <td style="padding: 5px; border: 1px solid #2d2d2d">
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
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";

  const $q = useQuasar();

  const props = defineProps({
    model: Object,
  });
</script>
