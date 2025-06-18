<template>
  <cash-balance
    v-access="`acc.report.accountReview`"
    title="موجودی بانک"
    :height="$q.screen.gt.xs ? 450 : 10000"
    action="BankAccount"
    @click="hideWidget"
  />
</template>

<script setup>
  import CashBalance from "./_CashBalance.vue";

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };
</script>
