<template>
  <div class="q-table__middle_ scroll">
    <table
      style="
        width: 100%;
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 12px;
        margin-bottom: 5px;
      "
    >
      <tbody>
        <tr>
          <td
            style="
              border-bottom: 1px solid #2d2d2d;
              padding: 5px;
              width: 120px;
            "
          >
            پرداخت به:
          </td>
          <td style="border-bottom: 1px solid #2d2d2d; padding: 5px">
            {{ model?.customerName }}
            <div v-if="model?.slCode">
              {{ model?.slCode }} / {{ model?.slTitle }}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 5px">بابت:</td>
          <td style="padding: 5px">
            {{ model?.subject }}
          </td>
        </tr>
      </tbody>
    </table>

    <table
      style="
        width: 100%;
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 12px;
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
            ردیف
          </th>
          <th
            style="
              border: 1px solid #2d2d2d;
              padding: 5px;
              width: 90px;
            "
          >
            شماره
          </th>
          <th
            style="
              border: 1px solid #2d2d2d;
              padding: 5px;
              width: 75px;
            "
          >
            تاریخ
          </th>
          <th
            style="
              border: 1px solid #2d2d2d;
              padding: 5px;
              width: 200px;
            "
          >
            حساب بانکی / صندوق / طرف حساب
          </th>
          <th style="border: 1px solid #2d2d2d; padding: 5px">شرح</th>
          <th
            style="
              border: 1px solid #2d2d2d;
              padding: 5px;
              width: 130px;
            "
          >
            مبلغ ({{ model?.currencyTitle }})
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in model?.paymentItems"
          :key="item.Id"
        >
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ index + 1 }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.itemNo }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.date ?? model?.date.substring(0, 10) }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            <div v-if="item.bankAccountNo">
              {{ item.bankAccountTitle }} /
              {{ item.bankAccountTypeTitle }} /
              {{ item.bankAccountNo }}
            </div>
            <div v-else>
              {{ item.cashTitle }}
              {{ item.customerName }}
            </div>
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.comment }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.amount?.toLocaleString() }}
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              text-align: end;
            "
            colspan="5"
            class="text-right"
          >
            <strong>جمع کل:</strong>
            (
            {{
              numberToWords(
                helper.getSubtotal(model?.paymentItems, "amount")
              )
            }}
            <strong>{{ model?.currencyTitle }}</strong>
            )
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>
              {{
                helper
                  .getSubtotal(model?.paymentItems, "amount")
                  ?.toLocaleString()
              }}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { numberToWords } from "@persian-tools/persian-tools";
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });
</script>
