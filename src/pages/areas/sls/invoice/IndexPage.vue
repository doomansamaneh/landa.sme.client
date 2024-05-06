<template>

<!-- <div class="q-mt-xl">
  <QCurrencyInput v-model="value" :currency="currency" :options="options" />
</div> -->

  <data-grid toolbar />
  
</template>

<script setup>
import { ref } from "vue"

import DataGrid from "src/components/areas/sls/invoice/shared/index/DataGrid.vue";
import QCurrencyInput from "src/components/shared/forms/QCurrencyInput.vue";

const value = ref(9000000);
const currency = ref("IRR")

const options = {
  "locale": "fa-IR",
  "currency": "IRR",
  "currencyDisplay": "hidden",
  "hideCurrencySymbolOnFocus": true,
  "hideGroupingSeparatorOnFocus": true,
  "hideNegligibleDecimalDigitsOnFocus": true,
  "autoDecimalDigits": false,
  "useGrouping": true,
  "accountingSign": false
}
</script>
