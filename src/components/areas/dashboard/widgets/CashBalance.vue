<template>
  <cash-balance
    title="موجودی نقد"
    :height="$q.screen.gt.xs ? 350 : 10000"
    action="Cash"
  />
</template>

<script setup>
  import CashBalance from "./_CashBalance.vue";
</script>
