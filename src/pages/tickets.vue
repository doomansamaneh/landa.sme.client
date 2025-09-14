<template>
  <toolbar-container />
  <ticket-list />
  <new-ticket-dialog />
  <contact-dialog />

  <q-page-sticky
    v-if="$q.screen.lt.md"
    position="bottom-right"
    :offset="[18, 18]"
  >
    <q-btn
      rounded
      unelevated
      color="primary"
      class="primary-shadow primary-gradient"
      @click="store.openNewTicketDialog"
    >
      <div class="flex items-center">
        <q-icon size="16px" name="o_add" class="q-mr-xs" />
        <span class="text-body2">{{ $t("shared.labels.registerNewTicket") }}</span>
      </div>
    </q-btn>
  </q-page-sticky>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useTickets } from "src/composables/useTickets.js";

  import ToolbarContainer from "src/components/areas/tickets/ToolbarContainer.vue";
  import TicketList from "src/components/areas/tickets/TicketList.vue";
  import NewTicketDialog from "src/components/areas/tickets/NewTicketDialog.vue";
  import ContactDialog from "src/components/areas/tickets/ContactDialog.vue";

  const $q = useQuasar();
  const store = useTickets();
</script>
