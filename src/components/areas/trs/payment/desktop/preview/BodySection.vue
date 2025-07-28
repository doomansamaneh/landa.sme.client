<template>
  <div class="q-table__middle_ scroll">
    <table
      style="
        width: 100%;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        border-collapse: collapse;
        font-size: 13px;
        margin-bottom: 5px;
      "
      class="print-preview-table"
    >
      <tbody>
        <tr>
          <td
            style="
              border-bottom: 1px solid;
              border-image: initial;
              padding: 5px;
              width: 70px;
            "
          >
            <span v-if="type === documentType.receipt">
              دریافت از:
            </span>
            <span v-else>پرداخت به:</span>
          </td>
          <td
            style="
              border-bottom: 1px solid;
              border-image: initial;
              padding: 5px;
            "
          >
            {{ model?.customerName }}
            <div v-if="model?.slCode">
              {{ model?.slCode }} / {{ model?.slTitle }}
            </div>
          </td>
        </tr>
        <tr>
          <td
            style="
              border-bottom: 1px solid;
              border-image: initial;
              padding: 5px;
            "
          >
            بابت:
          </td>
          <td
            style="
              border-bottom: 1px solid;
              border-image: initial;
              padding: 5px;
            "
          >
            {{ model?.subject }}
          </td>
        </tr>
      </tbody>
    </table>

    <table
      style="
        width: 100%;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        border-collapse: collapse;
        font-size: 13px;
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
              width: 1px;
            "
          >
            ردیف
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
              width: 90px;
            "
          >
            شماره
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
              width: 75px;
            "
          >
            تاریخ
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
              width: 200px;
            "
          >
            حساب بانکی / صندوق / طرف حساب
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            شرح
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
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
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            {{ index + 1 }}
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            <span v-if="item.checkSpentNo">
              {{ item.checkSpentNo }}
            </span>
            <span v-else>{{ item.itemNo }}</span>
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            <span v-if="item.checkSpentDate">
              {{ item.checkSpentDate.substring(0, 10) }}
            </span>
            <span v-else>
              {{ item?.itemDate?.substring(0, 10) }}
            </span>
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            <span v-if="item.checkSpentCustomerName">
              {{ item.checkSpentCustomerName }}
            </span>
            <span v-else-if="item.bankAccountNo">
              {{ item.bankAccountTitle }} /
              {{ item.bankAccountTypeTitle }} /
              {{ item.bankAccountNo }}
            </span>
            <span v-else>
              {{ item.cashTitle }}
              {{ item.customerName }}
            </span>
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            {{
              $t(`shared.paymentMethod.${getItemType(item.typeId)}`)
            }}

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
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            {{ helper.formatNumber(item.amount) }}
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
            colspan="5"
            class="text-right"
          >
            <strong>{{ $t("shared.labels.total") }}:</strong>
            (
            {{
              numberToWords(
                helper.getSubtotal(model?.paymentItems, "amount")
              )
            }}
            <strong>{{ model?.currencyTitle }}</strong>
            )
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
                  helper.getSubtotal(model?.paymentItems, "amount")
                )
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
