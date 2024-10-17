<template>
  <table
    style="
      width: 100%;
      border: 1px solid #2d2d2d;
      border-collapse: collapse;
      font-size: 12px;
    "
  >
    <tbody>
      <tr>
        <td
          style="width: 50%; padding: 5px; border: 1px solid #2d2d2d"
        >
          از:
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
          style="width: 50%; padding: 5px; border: 1px solid #2d2d2d"
        >
          به:
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
          style="padding: 5px; border: 1px solid #2d2d2d"
        >
          <div class="text-wrap">
            موضوع: {{ model?.subject }} {{ model?.summary }}
          </div>
        </td>
      </tr>
      <tr>
        <td
          colspan="2"
          style="padding: 5px; border: 1px solid #2d2d2d"
        >
          <span>
            جمع کل:
            <span class="text-weight-800">
              {{ helper.formatNumber(model?.amount) }}
            </span>
            ({{ numberToWords(model?.amount) }}
            <strong>{{ model?.currencyTitle }}</strong>
            )
          </span>
          <span v-if="model?.fromFee" class="q-mx-md">
            کارمزد:
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
  import { numberToWords } from "@persian-tools/persian-tools";

  const props = defineProps({
    model: Object,
  });
</script>
