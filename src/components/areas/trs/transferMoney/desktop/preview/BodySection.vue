<template>
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
    <tbody>
      <tr>
        <td
          style="
            border-width: 1px;
            border-style: solid;
            border-image: initial;
            padding: 5px;
          "
        >
          {{ $t("shared.labels.fromTitle") }}:
          <span v-if="model?.fromBankTitle">
            {{ model?.fromBankTitle }} /
            {{ model?.fromBankAccountTypeTitle }} /
            {{ model?.fromBankAccountTitle }}
          </span>
          <span v-else>
            {{ model?.fromCashTitle }}
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
          {{ $t("shared.labels.toTitle") }}:
          <span v-if="model?.toBankTitle">
            {{ model?.toBankTitle }} /
            {{ model?.toBankAccountTypeTitle }} /
            {{ model?.toBankAccountTitle }}
          </span>
          <span v-else>
            {{ model?.toCashTitle }}
          </span>
        </td>
      </tr>
      <tr>
        <td
          colspan="2"
          style="
            border-width: 1px;
            border-style: solid;
            border-image: initial;
            padding: 5px;
          "
        >
          <div class="text-wrap">
            {{ $t("shared.labels.topic") }} {{ model?.subject }}
            {{ model?.summary }}
          </div>
        </td>
      </tr>
      <tr>
        <td
          colspan="2"
          style="
            border-width: 1px;
            border-style: solid;
            border-image: initial;
            padding: 5px;
          "
        >
          <span>
            {{ $t("shared.labels.total") }}:
            <span class="text-weight-800">
              {{ helper.formatNumber(model?.amount) }}
            </span>
            ({{ numberToWords(model?.amount) }}
            <strong>{{ model?.currencyTitle }}</strong>
            )
          </span>
          <span v-if="model?.fromFee" class="q-mx-md">
            {{ $t("shared.labels.fee") }}:
            {{ helper.formatNumber(model?.fromFee) }}
            ({{ numberToWords(model?.fromFee) }}
            <strong>{{ model?.currencyTitle }}</strong>
            )
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { numberToWords } from "src/helpers/numberToWords.js";

  const props = defineProps({
    model: Object,
  });
</script>
