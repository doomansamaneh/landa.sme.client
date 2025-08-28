<template>
  <div class="q-gutter-y-md">
    <div class="row">
      <div class="col-2">
        {{ $t("shared.paymentMethod.customer") }}:
      </div>
      <div class="col">{{ model?.customerName }}</div>
    </div>
    <div class="row">
      <div class="col-2">{{ $t("shared.labels.chequeNo") }}:</div>
      <div class="col">{{ model?.itemNo }}</div>
    </div>
    <div v-if="model?.sayad" class="row">
      <div class="col-2">{{ $t("shared.labels.sayadNumber") }}:</div>
      <div class="col">
        {{ model?.sayad }}
      </div>
    </div>
    <div class="row">
      <div class="col-2">{{ $t("shared.labels.chequeDate") }}:</div>
      <div class="col text-weight-600">
        {{ model?.itemDate?.substring(0, 10) }}
      </div>
    </div>
    <div class="row">
      <div class="col-2">{{ $t("shared.labels.chequeAmount") }}:</div>
      <div class="col text-weight-700">
        {{ helper.formatNumber(model?.amount) }}
      </div>
    </div>

    <div class="row">
      <div class="col-2">{{ $t("shared.labels.description") }}:</div>
      <div class="col">
        <div v-if="model?.checkBankTitle">
          {{ model?.checkBankTitle }} /
          {{ model?.checkBankBranchTitle }}
          <span v-if="model?.checkBankBranchCode">
            ( {{ $t("shared.labels.code") }}:
            {{ model?.checkBankBranchCode }})
          </span>
        </div>
        <div v-else>
          {{ model?.bankTitle }} / ({{
            $t("shared.labels.chequeAccount")
          }}: {{ model?.bankAccountNo }})
        </div>
        <div>{{ model?.subject }}</div>
        <div>{{ model?.comment }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });
</script>
