<template>
  <div>
    <ticket-fab @open-dialog="showDialog = true" />
    <ticket-dialog v-model="showDialog" />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import TicketFab from "src/components/areas/ticket/components/TicketFAB.vue";
  import TicketDialog from "src/components/areas/ticket/components/TicketDialog.vue";

  const showDialog = ref(false);
</script>
