<template>
  <q-card-section>
    <table
      style="
        width: 100%;
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 13px;
      "
    >
      <tbody>
        <tr>
          <td
            style="
              width: 50%;
              padding: 5px;
              border: 1px solid #2d2d2d;
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
              width: 50%;
              padding: 5px;
              border: 1px solid #2d2d2d;
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
            style="padding: 5px; border: 1px solid #2d2d2d"
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
            style="padding: 5px; border: 1px solid #2d2d2d"
          >
            <span>
              {{ $t("shared.labels.total") }}:
              <span class="text-weight-800">
                {{ model?.amount.toLocaleString() }}
              </span>
              ({{ numberToWords(model?.amount) }}
              <strong>{{ model?.currencyTitle }}</strong>
              )
            </span>
            <span v-if="model?.fromFee" class="q-mx-md">
              {{ $t("shared.labels.fee") }}:
              {{ model?.fromFee.toLocaleString() }}
              ({{ numberToWords(model?.fromFee) }}
              <strong>{{ model?.currencyTitle }}</strong>
              )
            </span>
          </td>
        </tr>
        <tr>
          <td
            style="
              vertical-align: top;
              height: 120px;
              padding: 5px;
              border: 1px solid #2d2d2d;
            "
          >
            {{ $t("shared.labels.RecipientSignature") }}
          </td>
          <td
            style="
              vertical-align: top;
              padding: 5px;
              border: 1px solid #2d2d2d;
            "
          >
            {{ $t("shared.labels.payerSignature") }}
          </td>
        </tr>
      </tbody>
    </table>
  </q-card-section>
</template>

<script setup>
  import { numberToWords } from "src/helpers/numberToWords.js";

  const props = defineProps({
    model: Object,
  });
</script>
