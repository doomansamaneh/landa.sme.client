<template>
  <cash-balance
    title="موجودی بانک"
    :height="$q.screen.gt.xs ? 450 : 10000"
    action="BankAccount"
  />
</template>

<script setup>
  import CashBalance from "./_CashBalance.vue";
</script>
