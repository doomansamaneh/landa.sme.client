<template>
  <div class="row q-mb-sm">
    <span class="col-1">{{ $t("shared.columns.bankTitle") }}:</span>
    <span class="text-body1 q-mx-md">
      {{ model.bankTitle }} / {{ model?.bankBranchCode }} -
      {{ model?.bankBranchTitle }}
    </span>
  </div>

  <div class="row q-mb-sm">
    <span class="col-1">
      {{ $t("shared.columns.bankAccountTypeTitle") }}:
    </span>
    <span class="text-body1 q-mx-md">
      {{ model.bankAccountTypeTitle }}
    </span>
  </div>

  <div class="row q-mb-sm">
    <span class="col-1">
      {{ $t("shared.labels.accountNumber") }}:
    </span>
    <span class="text-body1 q-mx-md">
      {{ model?.no }}
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    model: Object,
  });
</script>
