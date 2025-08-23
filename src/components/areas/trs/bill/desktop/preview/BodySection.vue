<template>
  <div class="q-table__middle_ scroll">
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
            {{ $t("shared.labels.rowNo") }}
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            {{ $t("shared.columns.costComment") }}
          </th>
          <th
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
              width: 120px;
            "
          >
            {{ $t("shared.labels.vat") }}
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
            {{ $t("shared.labels.price") }} ({{
              model?.currencyTitle
            }})
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in model?.billItems" :key="item.Id">
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
            {{ item.slCode }} / {{ item.slTitle }} /
            {{ item.comment }}
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
            {{ helper.formatNumber(item.vatAmount) }}
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
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
              text-align: end;
            "
            colspan="3"
            class="text-right"
          >
            <strong>{{ $t("shared.labels.total") }}:</strong>
            (
            {{ numberToWords(model?.amount) }}

            <strong>{{ model?.currencyTitle }}</strong>
            )
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
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
            {{ $t("shared.labels.no") }}
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
            {{ $t("shared.labels.date") }}
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
            {{ $t("shared.labels.account") }} /
            {{ $t("shared.accountDLType.cash") }} /
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
            {{ $t("shared.labels.comment") }}
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
            {{ $t("shared.labels.price") }} ({{
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
            {{ item.itemDate?.substring(0, 10) }}
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
            {{ item.amount?.toLocaleString() }}
          </td>
        </tr>
        <tr>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
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

            <!-- {{ helper.getSubtotal(model?.paymentItems, "amount") }} -->
            <strong>{{ model?.currencyTitle }}</strong>
            )
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              padding: 5px;
            "
          >
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
