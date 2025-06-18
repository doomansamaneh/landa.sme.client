<template>
  <cash-balance
    v-access="`acc.report.accountReview`"
    title="موجودی نقد"
    :height="$q.screen.gt.xs ? 350 : 10000"
    action="Cash"
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
