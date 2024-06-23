<template>
  <div class="q-gutter-y-md">
    <div class="row">
      <div class="col-2">مخاطب:</div>
      <div class="col">{{ model?.customerName }}</div>
    </div>
    <div class="row">
      <div class="col-2">شماره چک:</div>
      <div class="col">{{ model?.itemNo }}</div>
    </div>
    <div class="row">
      <div class="col-2">تاریخ چک:</div>
      <div class="col text-weight-600">
        {{ model?.itemDate?.substring(0, 10) }}
      </div>
    </div>
    <div class="row">
      <div class="col-2">مبلغ چک:</div>
      <div class="col text-weight-700">
        {{ model?.amount?.toLocaleString() }}
      </div>
    </div>

    <div class="row">
      <div class="col-2">شرح:</div>
      <div class="col">
        {{ model?.checkBankTitle }} /
        {{ model?.checkBankBranchTitle }}
        <span v-if="model?.checkBankBranchCode">
          ( کد: {{ model?.checkBankBranchCode }})
        </span>
        <div>{{ model?.subject }}</div>
        <div>{{ model?.comment }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { numberToWords } from "@persian-tools/persian-tools";
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });
</script>
