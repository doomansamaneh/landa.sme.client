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
      class="print-preview-table"
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
          <th style="border: 1px solid #2d2d2d; padding: 5px">
            شرح هزینه
          </th>
          <th
            style="
              border: 1px solid #2d2d2d;
              padding: 5px;
              width: 120px;
            "
          >
            ارزش افزوده
          </th>
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
        <tr v-for="(item, index) in model?.billItems" :key="item.Id">
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ index + 1 }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ item.slCode }} / {{ item.slTitle }} /
            {{ item.comment }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ helper.formatNumber(item.vatAmount) }}
          </td>
          <td style="border: 1px solid #2d2d2d; padding: 5px">
            {{ helper.formatNumber(item.amount) }}
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              text-align: end;
            "
            colspan="3"
            class="text-right"
          >
            <strong>جمع کل:</strong>
            (
            {{ numberToWords(model?.amount) }}
            <strong>{{ model?.currencyTitle }}</strong>
            )
          </td>
          <td style="padding: 5px; border: 1px solid #2d2d2d">
            <strong>
              {{ helper.formatNumber(model?.amount) }}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>

    <table
      style="
        width: 100%;
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 13px;
      "
      class="print-preview-table"
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
            {{ item.itemDate?.substring(0, 10) }}
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
            {{
              $t(`shared.paymentMethod.${getItemType(item.typeId)}`)
            }}

            <span v-if="item.bankBranchDisplay">
              | شعبه بانک:
              {{ item.bankBranchDisplay }}
            </span>

            <span v-if="item.sayad">
              | ش صیاد:
              {{ item.sayad }}
            </span>

            <span v-if="item.comment">
              |
              {{ item.comment }}
            </span>
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
  import { documentType, paymentMethod } from "src/constants";

  const props = defineProps({
    model: Object,
    type: documentType,
  });

  const getItemType = (typeId) => {
    for (const key in paymentMethod) {
      if (paymentMethod[key].id === typeId) {
        return key;
      }
    }
    return paymentMethod[0];
  };
</script>
