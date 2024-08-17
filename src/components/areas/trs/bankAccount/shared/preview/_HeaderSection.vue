<template>
  <div class="row q-mb-sm">
    <span class="col-1">بانک:</span>
    <span class="text-body1 q-mx-md">
      {{ model.bankTitle }} / {{ model?.bankBranchCode }} -
      {{ model?.bankBranchTitle }}
    </span>
  </div>

  <div class="row q-mb-sm">
    <span class="col-1">نوع حساب:</span>
    <span class="text-body1 q-mx-md">
      {{ model.bankAccountTypeTitle }}
    </span>
  </div>

  <div class="row q-mb-sm">
    <span class="col-1">شماره حساب:</span>
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
