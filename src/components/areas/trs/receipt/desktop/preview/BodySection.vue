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
              {{ $t("shared.labels.receipt") }}
              {{ $t("shared.labels.fromTitle") }}:
            </span>
            <span v-else>
              {{ $t("shared.labels.payment") }}
              {{ $t("shared.labels.toTitle") }}:
            </span>
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
            {{ $t("shared.labels.regarding") }}:
          </td>
          <td
            style="
              border-bottom: 1px solid;
              border-image: initial;
              padding: 5px;
            "
          >
            <div>
              {{ model?.subject }}
            </div>
            <div v-if="model?.summary">
              {{ model?.summary }}
            </div>
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
            {{ $t("shared.columns.rowNo") }}
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
            {{ $t("shared.columns.no") }}
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
            {{ $t("shared.columns.date") }}
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
            {{ $t("shared.columns.bankAccount") }} /
            {{ $t("shared.labels.cash") }} /
            {{ $t("shared.accountDLType.customer") }}
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            {{ $t("shared.labels.description") }}
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
            {{ $t("shared.labels.amount") }} ({{
              model?.currencyTitle
            }})
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
            {{ item.itemNo }}
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            {{ item?.itemDate?.substring(0, 10) }}
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
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

            <span v-if="item.bankBranchDisplay">
              | {{ $t("shared.labels.bankBranch") }}:
              {{ item.bankBranchDisplay }}
            </span>

            <span v-if="item.sayad">
              | {{ $t("shared.labels.sayadNumber") }}:
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
  import { numberToWords } from "src/helpers/numberToWords.js";
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
